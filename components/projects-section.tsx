"use client";
import React from "react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectsSection() {
  const projects = useQuery(api.project.getUserFeatureProjects);

  return (
    <section className="py-24 bg-background" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-block mb-4">
            <span className="py-1 px-3 rounded-full bg-secondary border border-border text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Latest work
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
                Featured <span className="text-jordy_blue-400 dark:text-jordy_blue">projects</span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
                A selection of full-stack apps and tools I've built — real problems, real users.
              </p>
            </div>
            <Link
              href="/project-list"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-jordy_blue-400 dark:text-jordy_blue hover:underline underline-offset-4 shrink-0"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects?.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-jordy_blue-400/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Thumbnail */}
              <Link href={`/projects-details/${project._id}`} className="block overflow-hidden aspect-video relative">
                <img
                  src={project.thumbnailUrl || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-1.5 leading-snug">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Actions — pinned to bottom */}
                <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                  {project.demoLink && (
                    <Link
                      href={project.demoLink}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200"
                    >
                      Live <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {project.sourceCode && (
                    <Link
                      href={project.sourceCode}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-secondary border border-border text-secondary-foreground text-xs font-semibold hover:bg-secondary/80 active:scale-95 transition-all duration-200"
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </Link>
                  )}
                  <Link
                    href={`/projects-details/${project._id}`}
                    className="ml-auto text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
