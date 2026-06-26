"use client";
import React from "react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ProjectCard({
  name,
  description,
  thumbnailUrl,
  demoLink,
  sourceCode,
  detailsHref,
  index,
}: {
  name: string;
  description: string;
  thumbnailUrl?: string | null;
  demoLink?: string | null;
  sourceCode?: string | null;
  detailsHref: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-[20px] p-4",
        "bg-white dark:bg-neutral-900",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.2)]"
      )}
    >
     

      {/* Title + description */}
      <div className="z-10 flex flex-col gap-1.5">
        <h3 className="font-semibold text-foreground text-sm tracking-tight leading-snug">
          {name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 max-w-[90%]">
          {description}
        </p>
      </div>

      {/* Action links */}
      <div className="flex items-center gap-2 mt-auto">
        {demoLink && (
          <Link
            href={demoLink}
            target="_blank"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200"
          >
            <ExternalLink className="w-3 h-3" /> Live
          </Link>
        )}
        {sourceCode && (
          <Link
            href={sourceCode}
            target="_blank"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary border border-border text-secondary-foreground text-[11px] font-semibold hover:bg-secondary/80 active:scale-95 transition-all duration-200"
          >
            <Github className="w-3 h-3" /> GitHub
          </Link>
        )}
        <Link
          href={detailsHref}
          className="ml-auto text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Details →
        </Link>
      </div>

       {/* Thumbnail — inner card style matching AgentBentoGrid visual area */}
      <Link
        href={detailsHref}
        className="relative w-full overflow-hidden rounded-[14px] border border-border/50 bg-background/50 dark:bg-neutral-950/50 aspect-video block shrink-0"
      >
        <img
          src={thumbnailUrl || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[14px]" />
      </Link>
    </motion.div>
  );
}

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
                A selection of full-stack apps and tools I&apos;ve built — real problems, real users.
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

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects?.map((project, i) => (
            <ProjectCard
              key={project._id}
              index={i}
              name={project.name}
              description={project.description}
              thumbnailUrl={project.thumbnailUrl}
              demoLink={project.demoLink}
              sourceCode={project.sourceCode}
              detailsHref={`/projects-details/${project._id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
