/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import AppShell from "@/components/app-shell";
import RichTextEditor from "@/components/RichTextEditor";
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
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SearchRelated from "@/components/search-related";

const CreateBlog = () => {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [published, setPublished] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const generateUploadUrl = useMutation(api.project.generateUploadUrl);
  const createBlog = useMutation(api.blogs.createBlog);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState<Id<"blogs">[]>([]);

  const handleThumbnailSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 25 * 1024 * 1024) {
      toast.error("Thumbnail file size exceeds 25MB");
      return;
    }
    setThumbnailFile(file || null);
  };

  const handleCategoryChange = (c: string) => {
    if (!categories.includes(c)) {
      setCategories((prev) => [c, ...prev]);
    }
  };

  const removeCategory = (c: string) => {
    const newCategory = categories.filter((cte) => cte !== c);
    setCategories(newCategory);
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

      // Collect form data
      const title = formData.get("title") as string;
      const slug = formData.get("slug") as string;
      const readingTime = parseInt(formData.get("reading-time") as string, 10);
      const excerpt = formData.get("excerpt") as string;
      const tags = formData.getAll("tags") as string[];

      // Validate required fields
      if (!title || !slug || !excerpt || !description || isNaN(readingTime)) {
        throw new Error("All required fields must be filled");
      }

      // Validate thumbnail
      if (!thumbnailFile || !thumbnailFile.type.startsWith("image/")) {
        throw new Error("A valid feature image is required");
      }

      // Validate categories
      if (categories.length === 0) {
        throw new Error("At least one category is required");
      }

      // Upload thumbnail
      const featuredImage = await uploadFile(thumbnailFile);

      console.log("tags", tags);

      // Prepare blog data
      const blogData = {
        title,
        content: description,
        excerpt,
        published,
        tags: tags.length > 0 ? tags : undefined,
        readingTime,
        featuredImage,
        categories,
        slug,
        relatedBlogs,
      };

      // Call Convex mutation
      const blogId = await createBlog(blogData);
      toast.success("Blog created successfully!");
      router.push(`/blogs`);

      // Reset form
      setThumbnailFile(null);
      setDescription("");
      setCategories([]);
      setPublished(false);
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
      e?.currentTarget?.reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to create blog");
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
            <Label htmlFor="title">Title</Label>
            <Input
              className="w-full"
              name="title"
              id="title"
              placeholder="Title"
              required
            />
          </div>
          <div className="w-full md:basis-1/2 space-y-1">
            <Label htmlFor="slug">Slug</Label>
            <Input
              className="w-full"
              name="slug"
              id="slug"
              placeholder="Blog slug"
              required
            />
          </div>
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="reading-time">Reading Time (mins)</Label>
          <Input
            className="w-full"
            name="reading-time"
            id="reading-time"
            type="number"
            min="1"
            required
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            className="w-full"
            name="excerpt"
            id="excerpt"
            rows={5}
            placeholder="Excerpt"
            required
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="description">Description</Label>
          <RichTextEditor
            setDescription={setDescription}
            description={description}
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="thumbnail">Feature Image</Label>
          <Input
            type="file"
            className="w-full"
            name="thumbnail"
            id="thumbnail"
            accept="image/*,.gif"
            onChange={handleThumbnailSelection}
            ref={thumbnailInputRef}
            required
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

        <SearchRelated
          relatedBlogs={relatedBlogs}
          setRelatedBlogs={setRelatedBlogs}
        />

        <div className="w-full space-y-1">
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={handleCategoryChange} name="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Web Application">Web Application</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="Desktop Software">
                  Desktop Software
                </SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {categories?.map((c) => (
            <div
              key={c}
              className="flex items-center gap-2 text-white py-1 px-2 border justify-between border-purple-500 mt-5"
            >
              {c}
              <button onClick={() => removeCategory(c)} type="button">
                <X className="size-4 text-white shrink-0" />
              </button>
            </div>
          ))}
        </div>
        <div className="w-full space-y-1">
          <Tags />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 text-gray-300 focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="published"
            className="ml-2 block text-sm text-gray-300"
          >
            Publish immediately (uncheck to save as draft)
          </label>
        </div>
        <Button className="w-full" type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </AppShell>
  );
};

export default CreateBlog;
