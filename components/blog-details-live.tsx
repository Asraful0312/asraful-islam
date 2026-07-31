"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BlogDetails } from "./blog-details";
import type { Blog } from "@/lib/types";

export function BlogDetailsLive({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.blogs.getBlog>;
}) {
  const blog = usePreloadedQuery(preloaded);

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-center text-red-500">Blog not found</p>
      </div>
    );
  }

  return <BlogDetails blog={blog as Blog} />;
}
