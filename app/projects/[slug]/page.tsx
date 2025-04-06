import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectDetails } from "@/components/project-details"
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects"
import { notFound } from "next/navigation"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = getRelatedProjects(params.slug)

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <ProjectDetails project={project} relatedProjects={relatedProjects} />
      <Footer />
    </main>
  )
}

