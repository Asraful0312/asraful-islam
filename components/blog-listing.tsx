"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search, User } from "lucide-react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";

export function BlogListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [paginationOpts, setPaginationOpts] = useState({
    numItems: 6,
    cursor: null as string | null,
  });

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

  const categories = [
    "All",
    ...Array.from(new Set(blogs.flatMap((blog) => blog.categories))),
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  console.log("blogs", blogs);

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Blog
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology,
            and the creative process.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-jordy_blue-400 hover:bg-jordy_blue-500 text-indigo_dye rounded-3xl"
                    : "border-gray-700 hover:bg-jordy_blue/10 rounded-3xl"
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1a1a1a] border-gray-700 focus:border-jordy_blue-500"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBlogs.map((blog) => (
            <motion.article
              key={blog._id}
              variants={itemVariants}
              className="bg-[#1a1a1a] rounded-3xl overflow-hidden border border-gray-800 hover:border-jor-500/50 transition-all duration-300 group"
            >
              <Link href={`/blog/${blog._id}`}>
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={blog?.featureImageUrl || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-jordy_blue text-indigo_dye hover:bg-jordy_blue">
                      {blog.categories[0]}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(blog?._creationTime, "MM/dd/yyyy")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blog.readingTime} min read
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-jordy_blue-500 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-2">
                    {blog.authorImage ? (
                      <img
                        className="size-10 shrink-0 rounded-full object-cover"
                        src={blog.authorImage}
                        alt={blog.author}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-jordy_blue flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                    <span className="text-sm text-gray-400">{blog.author}</span>
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
            </motion.article>
          ))}
        </motion.div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        )}

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
      </motion.div>
    </div>
  );
}
