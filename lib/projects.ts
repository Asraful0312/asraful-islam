import type { Project } from "./types"

const projects: Project[] = [
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
]

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string): Project[] {
  return projects.filter((project) => project.slug !== currentSlug).slice(0, 3)
}

