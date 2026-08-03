"use client";

import { use } from "react";
import AppShell from "@/components/app-shell";
import { ProductForm } from "@/components/product-form";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const product = useQuery(api.products.getProductById, {
    productId: productId as Id<"products">,
  });

  if (product === undefined) {
    return (
      <AppShell>
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AppShell>
    );
  }

  if (!product) {
    return (
      <AppShell>
        <p className="text-red-500">Product not found.</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <ProductForm
          mode="edit"
          productId={product._id}
          defaultValues={{
            title: product.title,
            slug: product.slug,
            description: product.description,
            price: product.price,
            tags: product.tags.join(", "),
            categories: product.categories.join(", "),
            language: product.language,
            version: product.version,
            published: product.published,
            previewImage: product.previewImage,
            previewImageUrl: product.previewImageUrl,
            sourceFileKey: product.sourceFileKey,
            sourceFileName: product.sourceFileName,
            creemProductId: product.creemProductId,
            demoUrl: product.demoUrl,
          }}
        />
      </div>
    </AppShell>
  );
}
