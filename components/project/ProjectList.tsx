"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Search } from "lucide-react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";

export function ProjectListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [paginationOpts, setPaginationOpts] = useState({
    numItems: 6,
    cursor: null as string | null,
  });

  const result = useQuery(api.project.getUserProjectList, {
    paginationOpts,
  });


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

  const { page: projects, isDone, continueCursor } = result;

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
    ...Array.from(new Set(projects.flatMap((project) => project.projectType))),
  ];

  const filteredProject = projects;

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


  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are all my projects. Each project reflects my passion for building innovative and user-friendly applications.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-start justify-between">
          <div> 

          <div className="relative w-full mb-4 md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1a1a1a] border-gray-700 focus:border-jordy_blue-500"
            />
          </div>
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
          </div>
        </div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProject.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              className="bg-[#1a1a1a] rounded-3xl overflow-hidden border border-gray-800 project-card"
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden aspect-[15/7]">
                <img
                  src={project.thumbnailUrl || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 oveflow-hidden"
                />
              </div>
              <div className="p-6">
                <Link
                  href={`/projects-details/${project._id}`}
                  className="text-xl font-bold mb-2"
                >
                  {project.name}
                </Link>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-[#232323] text-gray-300 border-gray-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-jordy_blue-400 hover:text-jordy_blue-400 hover:bg-jordy_blue-500/10 px-2"
                  >
                    <Link href={`/projects-details/${project._id}`}>
                      View Details <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full"
                    >
                      <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full"
                    >
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProject.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No project found matching your criteria.
            </p>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-8">
          {paginationOpts.cursor && (
            <button
              onClick={loadPrevious}
              className="px-4 py-2 bg-gray-200 text-sm rounded-full text-gray-700 hover:bg-gray-300 transition-colors rounded-full"
            >
              Previous
            </button>
          )}
          {!isDone && (
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-jordy_blue text-sm text-indigo_dye rounded-full"
            >
              Load More
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
