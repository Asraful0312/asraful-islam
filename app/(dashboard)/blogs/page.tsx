"use client";
import AppShell from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import { Calendar, Clock, User } from "lucide-react";

import Link from "next/link";
import React, { useState } from "react";
import { format } from "date-fns";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

const BlogsPage = () => {
  const [paginationOpts, setPaginationOpts] = useState({
    numItems: 6,
    cursor: null as string | null,
  });
  const deleteBlog = useMutation(api.blogs.deleteBlog);

  const result = useQuery(api.blogs.getBlogs, { paginationOpts });

  if (result instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-center text-red-500">{result?.message}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { page: blogs, isDone, continueCursor } = result;

  const loadMore = () => {
    setPaginationOpts({
      numItems: 6,
      cursor: continueCursor,
    });
  };

  const loadPrevious = () => {
    setPaginationOpts({
      numItems: 6,
      cursor: null,
    });
  };

  const handleDelete = async (
    projectId: Id<"blogs">,
    imageId: Id<"_storage">
  ) => {
    if (
      confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      try {
        await deleteBlog({ blogId: projectId, imageId });
        toast.success("Blog deleted successfully!");
      } catch (error: any) {
        toast.error(error.message || "Failed to delete Blog");
        console.error(error);
      }
    }
  };
  return (
    <AppShell>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Blogs</h1>
          <Link href="/blogs/create-blog">
            <Button>Create New Project</Button>
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No blog posts yet. Be the first to write one!
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs?.map((blog) => (
                <>
                  <article
                    key={blog._id}
                    className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <Link href={`/blog/${blog._id}`}>
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={blog?.featureImageUrl || "/placeholder.svg"}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-purple-600 hover:bg-purple-700">
                            {blog.categories[0]}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {/* {new Date(blog.publishedAt).toLocaleDateString()} */}
                            {format(blog._creationTime, "M/d/yyyy")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {blog.readingTime} min read
                          </div>
                        </div>
                        <h2 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="text-gray-400 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <span className="text-sm text-gray-400">
                            {blog.author}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-4">
                          {blog?.tags?.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs bg-[#232323] border-gray-700"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-3 px-6 pb-6">
                      <Link
                        className={buttonVariants()}
                        href={`/blogs/edit-blog/${blog._id}`}
                      >
                        Edit
                      </Link>

                      <Button
                        onClick={() =>
                          handleDelete(blog._id, blog.featuredImage)
                        }
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </article>
                </>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              {paginationOpts.cursor && (
                <button
                  onClick={loadPrevious}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
              )}
              {!isDone && (
                <button
                  onClick={loadMore}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
                >
                  Load More
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
};

export default BlogsPage;
