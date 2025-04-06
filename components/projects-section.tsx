"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProjectsSection() {
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

  const projects = [
    {
      id: "project-1",
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, payment processing, and order tracking.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB"],
      demoLink: "#",
      githubLink: "#",
      slug: "e-commerce-platform",
    },
    {
      id: "project-2",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Firebase", "Tailwind CSS", "React DnD", "Redux"],
      demoLink: "#",
      githubLink: "#",
      slug: "task-management-app",
    },
    {
      id: "project-3",
      title: "Social Media Dashboard",
      description:
        "A comprehensive dashboard for social media analytics with data visualization, reporting tools, and scheduling capabilities.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "Chart.js", "TypeScript", "Prisma", "PostgreSQL"],
      demoLink: "#",
      githubLink: "#",
      slug: "social-media-dashboard",
    },
    {
      id: "project-4",
      title: "AI Content Generator",
      description:
        "An AI-powered content generation tool that creates blog posts, social media content, and marketing copy based on user prompts.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Node.js", "OpenAI API", "Express", "MongoDB"],
      demoLink: "#",
      githubLink: "#",
      slug: "ai-content-generator",
    },
    {
      id: "project-5",
      title: "Fitness Tracking App",
      description:
        "A mobile-first fitness tracking application with workout plans, progress tracking, and social features.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React Native", "GraphQL", "Node.js", "MongoDB", "AWS"],
      demoLink: "#",
      githubLink: "#",
      slug: "fitness-tracking-app",
    },
    {
      id: "project-6",
      title: "Real Estate Platform",
      description:
        "A real estate listing platform with property search, virtual tours, and agent communication features.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "Mapbox", "Prisma", "PostgreSQL", "AWS S3"],
      demoLink: "#",
      githubLink: "#",
      slug: "real-estate-platform",
    },
  ];

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
          Featured Projects
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg"
        >
          Here are some of my recent projects. Each project reflects my passion
          for building innovative and user-friendly applications.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 project-card"
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
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
                    className="text-purple-500 hover:text-purple-400 hover:bg-purple-500/10 px-2"
                  >
                    <Link href={`/projects/${project.slug}`}>
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
                        href={project.githubLink}
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

        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Link href="/projects">View All Projects</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
