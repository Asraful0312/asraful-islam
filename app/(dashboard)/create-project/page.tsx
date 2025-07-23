/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import AppShell from "@/components/app-shell";
import DynamicSection from "@/components/project/DynamicSection";
import Tags from "@/components/tags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import SearchRelatedProjects from "@/components/search-related-projects";
import { Switch } from "@/components/ui/switch";

const CreateProject = () => {
  const insertProject = useMutation(api.project.insertProject);
  const generateUploadUrl = useMutation(api.project.generateUploadUrl);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [relatedProjects, setRelatedProjects] = useState<Id<"projects">[]>([]);
  const [projectName, setProjectName] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const handleThumbnailSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 25 * 1024 * 1024) {
      toast.error("Thumbnail file size exceeds 25MB");
      return;
    }
    setThumbnailFile(file || null);
  };

  const handleGallerySelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newTotal = galleryFiles.length + fileArray.length;
      if (newTotal > 10) {
        toast.error(
          `Cannot add ${fileArray.length} images. Maximum 10 images allowed (currently have ${galleryFiles.length}).`
        );
        return;
      }
      if (fileArray.some((file) => file.size > 25 * 1024 * 1024)) {
        toast.error("One or more gallery images exceed 25MB");
        return;
      }
      setGalleryFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (file: File): Promise<Id<"_storage">> => {
    const postUrl = await generateUploadUrl();
    const uploadResult = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadResult.ok) {
      const errorJson = await uploadResult.json();
      throw new Error(
        `Upload failed for ${file.name}: ${JSON.stringify(errorJson)}`
      );
    }
    const { storageId } = (await uploadResult.json()) as {
      storageId: Id<"_storage">;
    };
    return storageId;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Collect dynamic fields
      const features = [];
      const technicalDetails = [];
      const challenges = [];
      for (let i = 0; formData.has(`title-title-${i}`); i++) {
        const title = formData.get(`title-title-${i}`) as string;
        const description = formData.get(`title-description-${i}`) as string;
        if (title && description) {
          features.push({ title, description });
        }
      }
      for (let i = 0; formData.has(`tech-title-title-${i}`); i++) {
        const title = formData.get(`tech-title-title-${i}`) as string;
        const description = formData.get(
          `tech-title-description-${i}`
        ) as string;
        if (title && description) {
          technicalDetails.push({ title, description });
        }
      }
      for (let i = 0; formData.has(`challenges-title-title-${i}`); i++) {
        const title = formData.get(`challenges-title-title-${i}`) as string;
        const description = formData.get(
          `challenges-title-description-${i}`
        ) as string;
        if (title && description) {
          challenges.push({ title, description });
        }
      }

      // Collect tags
      const tags = formData.getAll("tags") as string[];

      // Validate thumbnail
      if (!thumbnailFile || !thumbnailFile.type.startsWith("image/")) {
        throw new Error("A valid thumbnail image or GIF is required");
      }

      // Upload thumbnail
      const thumbnailId = await uploadFile(thumbnailFile);

      // Upload gallery images
      const galleryIds = await Promise.all(galleryFiles.map(uploadFile));

      // Prepare project data
      const projectData = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        description: formData.get("description") as string,
        thumbnail: thumbnailId,
        imageGallery: galleryIds,
        projectType: formData.get("project-type") as string,
        role: formData.get("role") as string,
        sourceCode: (formData.get("source-code") as string) || undefined,
        demoLink: (formData.get("demo") as string) || undefined,
        tags,
        timeline: formData.get("timeline") as string,
        features,
        technicalDetails,
        challenges,
        relatedId: relatedProjects,
        isFeatured,
      };

      // Call Convex mutation
      const projectId = await insertProject(projectData);
      toast.success("Project created successfully!");
      router.push(`/projects/${projectId}`);
      setThumbnailFile(null);
      setGalleryFiles([]);
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    } catch (error: any) {
      toast.error(error.message || "Failed to create project");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell>
      <form className="space-y-4 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="w-full md:basis-1/2 space-y-1">
            <Label htmlFor="name">Name*</Label>
            <Input
              className="w-full"
              name="name"
              id="name"
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
              required
            />
          </div>
          <div className="w-full md:basis-1/2 space-y-1">
            <Label htmlFor="slug">Slug*</Label>
            <Input
              className="w-full"
              name="slug"
              id="slug"
              value={projectName.split(" ").join("-").toLocaleLowerCase()}
              placeholder="Project slug"
              required
            />
          </div>
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="description">Description*</Label>
          <Textarea
            className="w-full"
            name="description"
            id="description"
            rows={5}
            placeholder="Project description"
            required
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="thumbnail">Thumbnail (Image or GIF, Required)*</Label>
          <Input
            type="file"
            className="w-full"
            name="thumbnail"
            id="thumbnail"
            accept="image/*,.gif"
            onChange={handleThumbnailSelection}
            ref={thumbnailInputRef}
            required
            disabled={submitting}
          />
          {thumbnailFile && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(thumbnailFile)}
                alt="Thumbnail preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="image-gallery">
            Image Gallery (Images or GIFs, Max 10)*
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            💡 Hold Ctrl (or Cmd on Mac) to select multiple images at once
          </p>
          <Input
            type="file"
            className="w-full"
            name="image-gallery"
            id="image-gallery"
            accept="image/*,.gif"
            multiple
            onChange={handleGallerySelection}
            ref={galleryInputRef}
            disabled={submitting}
          />
          {galleryFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Selected images ({galleryFiles.length}/10):
                </p>
                {galleryFiles.length < 10 && (
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark"
                    disabled={submitting}
                  >
                    + Add More
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {galleryFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-100 p-2 rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 truncate flex-1">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="ml-2 text-red-500 hover:text-red-700 text-sm font-bold"
                        disabled={submitting}
                      >
                        ×
                      </button>
                    </div>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Gallery preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded mt-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col space-y-1">
          <Label htmlFor="featured-project">Featured Project</Label>
          <Switch
            checked={isFeatured}
            onClick={() => setIsFeatured((prev) => !prev)}
            id="featured-project"
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="project-type">Project Type*</Label>
          <Select name="project-type" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="Web Application">Web Application</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="Desktop Software">
                  Desktop Software
                </SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="role">Role*</Label>
          <Select name="role" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="Full-stack Developer">
                  Full-stack Developer
                </SelectItem>
                <SelectItem value="Backend Developer">
                  Backend Developer
                </SelectItem>
                <SelectItem value="Frontend Developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="source-code">Source Code</Label>
          <Input
            className="w-full"
            name="source-code"
            id="source-code"
            placeholder="http://github.com"
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="demo">Demo Link</Label>
          <Input
            className="w-full"
            name="demo"
            id="demo"
            placeholder="http://example.com"
          />
        </div>
        <div className="w-full space-y-1">
          <Tags />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="timeline">Timeline*</Label>
          <Input
            className="w-full"
            name="timeline"
            id="timeline"
            placeholder="3 months (Jan - Mar 2023)"
            required
          />
        </div>

        <SearchRelatedProjects
          relatedProjects={relatedProjects}
          setRelatedProjects={setRelatedProjects}
        />
        <DynamicSection sectionName="Features" namePrefix="title" />
        <DynamicSection
          sectionName="Technical Details"
          namePrefix="tech-title"
        />
        <DynamicSection
          sectionName="Challenges"
          namePrefix="challenges-title"
        />
        <Button
          className="w-full"
          type="submit"
          disabled={submitting || !thumbnailFile}
        >
          {submitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </AppShell>
  );
};

export default CreateProject;
