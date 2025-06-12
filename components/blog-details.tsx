"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  Check,
} from "lucide-react";

import type { Blog } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Unauthenticated, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import CommentSection from "./comments-section";
import { useQuery } from "convex-helpers/react/cache";

interface BlogDetailsProps {
  blog: Blog;
  relatedBlogs?: any[];
}

export function BlogDetails({ blog }: BlogDetailsProps) {
  const [copied, setCopied] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const batchToggleLike = useMutation(api.blogs.batchToggleLike);
  // Optimized like handler with debouncing and optimistic updates
  const relatedBlogs = useQuery(api.blogs.getRelatedBlogs, {
    ids: blog?.relatedBlogs || [],
  });

  const handleLike = useCallback(async () => {
    if (isLiking || !blog) return;

    setIsLiking(true);
    try {
      // Use batch operation for better concurrency handling
      const action = blog.isLiked ? "unlike" : "like";
      await batchToggleLike({
        blogId: blog._id as Id<"blogs">,
        action,
      });
    } catch (error) {
      toast.error("Failed to update like did you logged in?");
      console.error("Like error:", error);
    } finally {
      // Add small delay to prevent rapid clicking
      setTimeout(() => setIsLiking(false), 300);
    }
  }, [batchToggleLike, blog?._id, blog?.isLiked, isLiking]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareUrl = encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : ""
  );
  const shareTitle = encodeURIComponent(blog.title);

  return (
    <div className="section-container pt-24">
      <Unauthenticated>
        <div className="p-3 rounded-md bg-[#1a1a1a] w-full mb-8">
          <p className="text-white font-semibold">
            Please{" "}
            <Link className="underline" href="/signin">
              Login
            </Link>{" "}
            to like and and comment to an blog.
          </p>
        </div>
      </Unauthenticated>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3">
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.categories.map((category) => (
                  <Badge
                    key={category}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <span>{blog?.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDistanceToNow(new Date(blog._creationTime), {
                    addSuffix: true,
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blog.readingTime} min read
                </div>

                {/* like */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    disabled={isLiking}
                    title="Like"
                    className="heart-container"
                  >
                    <input
                      id="Give-It-An-Id"
                      className="checkbox"
                      type="checkbox"
                      checked={blog?.isLiked}
                    />
                    <div className="svg-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-outline"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-filled"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="100"
                        width="100"
                        className="svg-celebrate"
                      >
                        <polygon points="10,10 20,20"></polygon>
                        <polygon points="10,50 20,50"></polygon>
                        <polygon points="20,80 30,70"></polygon>
                        <polygon points="90,10 80,20"></polygon>
                        <polygon points="90,50 80,50"></polygon>
                        <polygon points="80,80 70,70"></polygon>
                      </svg>
                    </div>
                  </button>
                  <p className="text-gray-400">
                    {" "}
                    {blog.likesCount} {blog.likesCount === 1 ? "Like" : "Likes"}
                  </p>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden border border-gray-800">
              <img
                src={blog?.featureImageUrl || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-[#232323] border-gray-700"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-8 bg-gray-800" />

            {/* Share */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share this article
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-gray-700 hover:bg-blue-600/10 hover:border-blue-600"
                >
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-gray-700 hover:bg-blue-700/10 hover:border-blue-700"
                >
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-gray-700 hover:bg-blue-800/10 hover:border-blue-800"
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </a>
                </Button>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 hover:bg-gray-700/10"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Comments */}
            <CommentSection blogId={blog._id} />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  <a
                    href="#introduction"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Introduction
                  </a>
                  <a
                    href="#getting-started"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Getting Started
                  </a>
                  <a
                    href="#best-practices"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Best Practices
                  </a>
                  <a
                    href="#conclusion"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Conclusion
                  </a>
                </nav>
              </div>

              {/* Related Posts */}
              {relatedBlogs && relatedBlogs?.length > 0 && (
                <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs?.map((relatedBlog) => (
                      <Link
                        key={relatedBlog._id}
                        href={`/blog/${relatedBlog._id}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-16 h-12 overflow-hidden rounded border border-gray-800">
                            <img
                              src={
                                relatedBlog.featureImageUrl ||
                                "/placeholder.svg"
                              }
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium group-hover:text-purple-400 transition-colors line-clamp-2 text-sm">
                              {relatedBlog.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(
                                relatedBlog._creationTime
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Get notified when I publish new articles about web development
                  and technology.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
