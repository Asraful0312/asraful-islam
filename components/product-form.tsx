"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { useQuery } from "convex-helpers/react/cache";
import { useUploadFile } from "@convex-dev/r2/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, FileCode, CreditCard, Globe } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: Id<"products">;
  defaultValues?: {
    title?: string;
    slug?: string;
    description?: string;
    price?: number;
    tags?: string;
    categories?: string;
    language?: string;
    published?: boolean;
    version?: string;
    previewImage?: Id<"_storage">;
    previewImageUrl?: string | null;
    sourceFileKey?: string;
    sourceFileName?: string;
    creemProductId?: string;
    demoUrl?: string;
    descriptionFormat?: "html" | "markdown";
  };
}

export function ProductForm({ mode, productId, defaultValues }: ProductFormProps) {
  const router = useRouter();
  const previewFileRef = useRef<HTMLInputElement>(null);
  const sourceFileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [descriptionFormat, setDescriptionFormat] = useState<"markdown" | "html">(
    defaultValues?.descriptionFormat ?? "markdown"
  );
  const [descPreviewMode, setDescPreviewMode] = useState<"edit" | "preview">("edit");
  const [price, setPrice] = useState(String(defaultValues?.price ?? 0));
  const [tags, setTags] = useState(defaultValues?.tags ?? "");
  const [categories, setCategories] = useState(defaultValues?.categories ?? "");
  const [language, setLanguage] = useState(defaultValues?.language ?? "");
  const [version, setVersion] = useState(defaultValues?.version ?? "1.0.0");
  const [published, setPublished] = useState(defaultValues?.published ?? false);

  // Preview image (Convex storage)
  const [previewImageId, setPreviewImageId] = useState<Id<"_storage"> | null>(
    defaultValues?.previewImage ?? null
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    defaultValues?.previewImageUrl ?? null
  );
  const [uploadingPreview, setUploadingPreview] = useState(false);

  // Source code file (R2 via custom domain)
  const [sourceFileKey, setSourceFileKey] = useState<string | null>(
    defaultValues?.sourceFileKey ?? null
  );
  const [sourceFileName, setSourceFileName] = useState<string | null>(
    defaultValues?.sourceFileName ?? null
  );
  const [uploadingSource, setUploadingSource] = useState(false);

  // Creem product link (for paid checkout)
  const [creemProductId, setCreemProductId] = useState(
    defaultValues?.creemProductId ?? ""
  );

  // Live demo URL (optional)
  const [demoUrl, setDemoUrl] = useState(defaultValues?.demoUrl ?? "");

  const [saving, setSaving] = useState(false);

  const generatePreviewUploadUrl = useMutation(api.products.generatePreviewUploadUrl);
  const uploadSourceFile = useUploadFile(api.r2);
  const createProduct = useMutation(api.products.createProduct);
  const updateProduct = useMutation(api.products.updateProduct);
  const creemProducts = useQuery(api.billing.listCreemProducts, {});

  const handlePreviewUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPreview(true);
    try {
      const uploadUrl = await generatePreviewUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();
      setPreviewImageId(storageId);
      setPreviewImageUrl(URL.createObjectURL(file));
    } catch {
      toast.error("Preview image upload failed");
    } finally {
      setUploadingPreview(false);
    }
  };

  const handleSourceFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSource(true);
    try {
      // useUploadFile uploads to R2 and returns the object key
      const key = await uploadSourceFile(file);
      setSourceFileKey(key);
      setSourceFileName(file.name);
      toast.success("Source file uploaded to R2");
    } catch {
      toast.error("Source file upload failed");
    } finally {
      setUploadingSource(false);
    }
  };

  const handleSlugFromTitle = (value: string) => {
    setTitle(value);
    if (mode === "create") {
      setSlug(
        value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImageId) {
      toast.error("Please upload a preview image");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title,
        slug,
        description,
        price: Number(price),
        previewImage: previewImageId,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        categories: categories.split(",").map((c) => c.trim()).filter(Boolean),
        language,
        version,
        published,
        sourceFileKey: sourceFileKey ?? undefined,
        sourceFileName: sourceFileName ?? undefined,
        creemProductId: creemProductId.trim() || undefined,
        demoUrl: demoUrl.trim() || undefined,
        descriptionFormat,
      };

      if (mode === "create") {
        await createProduct(payload);
        toast.success("Product created");
      } else {
        await updateProduct({ productId: productId!, ...payload });
        toast.success("Product updated");
      }
      router.push("/products");
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="space-y-1">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => handleSlugFromTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <Label>Slug</Label>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Description</Label>
          <div className="flex items-center gap-1 rounded-md border p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setDescPreviewMode("edit")}
              className={`px-2.5 py-1 rounded transition-colors ${
                descPreviewMode === "edit"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setDescPreviewMode("preview")}
              className={`px-2.5 py-1 rounded transition-colors ${
                descPreviewMode === "preview"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {descPreviewMode === "edit" ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
            required
            placeholder={"## What's included\n\n- Feature one\n- Feature two\n\n## Tech stack\n\nNext.js, Tailwind CSS, TypeScript"}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ) : (
          <div className="min-h-[200px] rounded-md border border-input bg-muted/30 px-4 py-3 prose prose-sm max-w-none dark:prose-invert overflow-auto">
            {description ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-foreground italic text-sm">Nothing to preview yet — switch to Edit and write some markdown.</p>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Supports markdown: **bold**, *italic*, `code`, ## headings, - lists, etc.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Price (USD, 0 = free)</Label>
          <Input
            type="number"
            min={0}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label>Version</Label>
          <Input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            required
          />
        </div>
      </div>

      {Number(price) > 0 && (
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Creem Product ID
          </Label>
          <Input
            value={creemProductId}
            onChange={(e) => setCreemProductId(e.target.value)}
            placeholder="prod_xxxxxxxxxxxx"
          />
          <p className="text-xs text-muted-foreground">
            Create a product with this exact price in your Creem dashboard first, then paste (or pick below) its Product ID here. Required for paid checkout.
          </p>
          {creemProducts && creemProducts.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {creemProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCreemProductId(p.id)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    creemProductId === p.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {p.name} · ${(p.price / 100).toFixed(2)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-1">
        <Label className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Live Demo URL
          <span className="text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        </Label>
        <Input
          type="url"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
          placeholder="https://your-demo.example.com"
        />
      </div>

      <div className="space-y-1">
        <Label>Language / Framework</Label>
        <Input
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="e.g. Next.js, React, Python"
          required
        />
      </div>

      <div className="space-y-1">
        <Label>Categories (comma-separated)</Label>
        <Input
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Templates, React"
        />
      </div>

      <div className="space-y-1">
        <Label>Tags (comma-separated)</Label>
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Next.js, TypeScript, Tailwind"
        />
      </div>

      {/* Preview Image — stored in Convex _storage */}
      <div className="space-y-2">
        <Label>Preview Image</Label>
        {previewImageUrl && (
          <img
            src={previewImageUrl}
            alt="Preview"
            className="w-full max-h-48 object-cover rounded-md"
          />
        )}
        <div className="flex items-center gap-3">
          <Input
            ref={previewFileRef}
            type="file"
            accept="image/*"
            onChange={handlePreviewUpload}
            disabled={uploadingPreview}
            className="flex-1"
          />
          {uploadingPreview && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Uploading…
            </span>
          )}
        </div>
      </div>

      {/* Source Code File — stored in Cloudflare R2, served via assets.asostacks.com */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <FileCode className="h-4 w-4" />
          Source Code File
          <span className="text-xs font-normal text-muted-foreground">
            (stored on R2 · permanent URL via assets.asrafulislam.uk)
          </span>
        </Label>

        {sourceFileKey && sourceFileName && (
          <div className="flex items-center gap-2 p-3 rounded-md border bg-muted/30">
            <FileCode className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm font-medium truncate">{sourceFileName}</span>
            <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
              Uploaded
            </Badge>
          </div>
        )}

        <div className="flex items-center gap-3">
          <label className="flex-1 cursor-pointer">
            <div
              className={`flex items-center gap-2 px-4 py-2 border border-dashed rounded-md text-sm transition-colors ${
                uploadingSource
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-primary hover:text-primary"
              }`}
            >
              <Upload className="h-4 w-4" />
              {uploadingSource
                ? "Uploading to R2…"
                : sourceFileName
                ? "Replace file"
                : "Upload .zip / source file"}
            </div>
            <input
              ref={sourceFileRef}
              type="file"
              className="hidden"
              onChange={handleSourceFileUpload}
              disabled={uploadingSource}
            />
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          Buyers receive a permanent link:{" "}
          <code className="text-xs">
            assets.asrafulislam.uk/
            {sourceFileKey ? sourceFileKey.slice(0, 20) + "…" : "<key>"}
          </code>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="published"
          checked={published}
          onCheckedChange={setPublished}
        />
        <Label htmlFor="published">Published (visible on public site)</Label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving || uploadingPreview || uploadingSource}>
          {saving
            ? "Saving…"
            : mode === "create"
            ? "Create Product"
            : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
