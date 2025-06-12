"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogDetails } from "@/components/blog-details";
import { useQuery } from "convex-helpers/react/cache";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { use } from "react";
import { Blog } from "@/lib/types";

interface BlogProps {
  params: { blogId: Id<"blogs"> };
}

export default function BlogDetailPage({ params }: BlogProps) {
  const { blogId } = use<any>(params as any);

  const blog = useQuery(api.blogs.getBlog, { blogId });

  if (blog instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-center text-red-500">{blog?.message}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <BlogDetails blog={blog as Blog} />
      <Footer />
    </main>
  );
}
