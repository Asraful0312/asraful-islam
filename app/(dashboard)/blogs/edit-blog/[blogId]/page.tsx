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
import { useMutation, useQuery } from "convex/react";
import { X } from "lucide-react";
import React, { use, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SearchRelated from "@/components/search-related";
import { Blog } from "@/lib/types";

interface EditBlogProps {
  params: { blogId: Id<"blogs"> };
}

const EditBlog = ({ params }: EditBlogProps) => {
  const { blogId } = use<any>(params as any);
  const blog = useQuery(api.blogs.getBlog, { blogId: blogId });
  const updateBlog = useMutation(api.blogs.updateBlog);
  const generateUploadUrl = useMutation(api.project.generateUploadUrl);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [deletedImageId, setDeletedImageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [relatedBlogs, setRelatedBlogs] = useState<Id<"blogs">[] | undefined>(
    []
  );
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const deleteImage = useMutation(api.image.deleteImage);

  // Initialize state with blog data
  React.useEffect(() => {
    if (blog) {
      setDescription(blog.content);
      setPublished(blog.published);
      setCategories(blog.categories);
      setRelatedBlogs(blog?.relatedBlogs);
    }
  }, [blog]);

  if (blog instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-center text-red-500">{blog?.message}</p>
      </div>
    );
  }

  if (!blog)
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  const handleThumbnailSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 25 * 1024 * 1024) {
      toast.error("Thumbnail file size exceeds 25MB");
      return;
    }
    setThumbnailFile(file || null);
    if (file && blog.featuredImage) {
      setDeletedImageId(blog.featuredImage);
    }
  };

  const handleCategoryChange = (c: string) => {
    if (!categories.includes(c)) {
      setCategories((prev) => [c, ...prev]);
    }
  };

  const removeCategory = (c: string) => {
    setCategories((prev) => prev.filter((cte) => cte !== c));
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

      // Validate categories
      if (categories.length === 0) {
        throw new Error("At least one category is required");
      }

      // Determine featured image
      let featuredImage = blog.featuredImage;
      if (thumbnailFile && thumbnailFile.type.startsWith("image/")) {
        featuredImage = await uploadFile(thumbnailFile);
      } else if (!featuredImage) {
        throw new Error("A valid feature image is required");
      }

      // Prepare blog data
      const blogData = {
        blogId: params.blogId,
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

      // Update blog
      await updateBlog(blogData);

      // Delete old featured image if replaced
      if (deletedImageId) {
        await deleteImage({ imageId: deletedImageId });
      }

      toast.success("Blog updated successfully!");
      router.push(`/blogs`);

      // Reset form state
      setThumbnailFile(null);
      setDeletedImageId(null);
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
    } catch (error: any) {
      toast.error(error.message || "Failed to update blog");
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
              defaultValue={blog.title}
              required
            />
          </div>
          <div className="w-full md:basis-1/2 space-y-1">
            <Label htmlFor="slug">Slug</Label>
            <Input
              className="w-full"
              name="slug"
              id="slug"
              defaultValue={blog.slug}
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
            defaultValue={blog.readingTime}
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
            defaultValue={blog.excerpt}
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
          {blog.featuredImage && !thumbnailFile && (
            <img
              src={`${blog?.featureImageUrl || ""}`}
              alt="Current feature image"
              className="w-32 h-32 object-cover rounded mb-2"
            />
          )}
          <Input
            type="file"
            className="w-full"
            name="thumbnail"
            id="thumbnail"
            accept="image/*,.gif"
            onChange={handleThumbnailSelection}
            ref={thumbnailInputRef}
            disabled={submitting}
          />
          {thumbnailFile && (
            <img
              src={URL.createObjectURL(thumbnailFile)}
              alt="New feature image preview"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          )}
        </div>
        <SearchRelated
          relatedBlogs={relatedBlogs}
          setRelatedBlogs={setRelatedBlogs}
        />
        <div className="w-full">
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
          <div className="ml-4 mt-5">
            <h2 className="text-white font-semibold">Selected Categories</h2>
            {categories?.map((c) => (
              <div
                key={c}
                className="flex items-center gap-2 text-white py-1 px-2 border justify-between border-purple-500 mt-1"
              >
                {c}
                <button onClick={() => removeCategory(c)} type="button">
                  <X className="size-4 shrink-0 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full space-y-1">
          <Tags initialTags={blog.tags} />
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
          {submitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </AppShell>
  );
};

export default EditBlog;
