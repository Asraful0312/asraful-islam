"use client";

import AppShell from "@/components/app-shell";
import { ProductForm } from "@/components/product-form";

export default function CreateProductPage() {
  return (
    <AppShell>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <ProductForm mode="create" />
      </div>
    </AppShell>
  );
}
