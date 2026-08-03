"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { CodesListing } from "@/components/codes-listing";
import type { CodeProduct } from "@/lib/types";

export function CodesListingWrapper() {
  const products = useQuery(api.products.getAllProducts, {});

  if (products === undefined) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (products instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-red-500">{products.message}</p>
      </div>
    );
  }

  // Map Convex product shape → CodeProduct for the existing listing component
  const codes: CodeProduct[] = products.map((p) => ({
    id: p._id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    preview: p.previewImageUrl ?? "/placeholder.svg?height=400&width=600",
    price: p.price,
    language: p.language,
    categories: p.categories,
    tags: p.tags,
    downloads: p.downloads ?? 0,
    createdAt: new Date(p._creationTime).toISOString(),
    updatedAt: new Date(p._creationTime).toISOString(),
    version: p.version,
    sourceFileUrl: p.sourceFileUrl,
    demoUrl: p.demoUrl,
  }));

  return <CodesListing codes={codes} />;
}
