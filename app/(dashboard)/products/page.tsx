"use client";

import AppShell from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "convex/react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { stripMarkdown } from "@/lib/utils";

export default function ProductsPage() {
  const [paginationOpts, setPaginationOpts] = useState({
    numItems: 12,
    cursor: null as string | null,
  });

  const result = useQuery(api.products.getProducts, {
    paginationOpts,
    isAdmin: true,
  });
  const deleteProduct = useMutation(api.products.deleteProduct);

  const handleDelete = async (productId: Id<"products">) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      await deleteProduct({ productId });
      toast.success("Product deleted");
    } catch (e: any) {
      toast.error(e.message || "Failed to delete");
    }
  };

  return (
    <AppShell>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Marketplace Products</h1>
          <Link href="/products/create">
            <Button>Add Product</Button>
          </Link>
        </div>

        {result instanceof Error ? (
          <p className="text-red-500">{result.message}</p>
        ) : result === undefined ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : result.page.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            No products yet.{" "}
            <Link href="/products/create" className="underline text-primary">
              Add your first product.
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.page.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg overflow-hidden"
                >
                  {product.previewImageUrl && (
                    <img
                      src={product.previewImageUrl}
                      alt={product.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold text-sm leading-tight">
                        {product.title}
                      </h2>
                      <Badge variant={product.published ? "default" : "secondary"}>
                        {product.published ? "Live" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {product.descriptionFormat === "markdown"
                        ? stripMarkdown(product.description)
                        : product.description}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-primary">
                        {product.price === 0 ? "Free" : `$${product.price}`}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        v{product.version}
                      </span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/products/${product._id}/edit`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6">
              {paginationOpts.cursor && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setPaginationOpts({ numItems: 12, cursor: null })
                  }
                >
                  Previous
                </Button>
              )}
              {!result.isDone && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setPaginationOpts({
                      numItems: 12,
                      cursor: result.continueCursor,
                    })
                  }
                >
                  Load more
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
