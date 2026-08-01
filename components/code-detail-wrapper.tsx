"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { CodeDetails } from "@/components/code-details";
import { notFound } from "next/navigation";
import type { CodeProduct } from "@/lib/types";

export function CodeDetailWrapper({ slug }: { slug: string }) {
  const product = useQuery(api.products.getProductBySlug, { slug });
  const allProducts = useQuery(api.products.getAllProducts, {});

  if (product === undefined || allProducts === undefined) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const toCodeProduct = (p: typeof product): CodeProduct => ({
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
  });

  const related: CodeProduct[] = (allProducts as typeof product[])
    .filter(
      (p) =>
        p._id !== product._id &&
        (p.language === product.language ||
          p.categories.some((c) => product.categories.includes(c)))
    )
    .slice(0, 3)
    .map(toCodeProduct);

  return <CodeDetails code={toCodeProduct(product)} relatedCodes={related} />;
}
