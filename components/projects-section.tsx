"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import SkeletonLoader from "./project-skeleton-loader";

export function ProjectsSection() {
  const projects = useQuery(api.project.getUserProjects);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="section-container" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="section-heading text-center"
        >
          <span className="text-jordy_blue">Featured</span> Projects
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg"
        >
          Here are some of my recent projects. Each project reflects my passion
          for building innovative and user-friendly applications.
        </motion.p>

        {projects instanceof Error ? (
          <p className="text-center text-red-500">{projects?.message}</p>
        ) : projects === undefined ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects &&
              projects?.map((project) => (
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
          </div>
        )}

        {projects && projects.length > 6 && (
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-jordy_blue hover:bg-purple-700"
            >
              <Link href="/">View All Projects</Link>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
