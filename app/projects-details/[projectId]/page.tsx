"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectDetails } from "@/components/project-details";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Project } from "@/lib/types";
import { use } from "react";

interface ProjectProps {
  params: { projectId: Id<"projects"> };
}

export default function ProjectPage({ params }: ProjectProps) {
  const { projectId } = use<any>(params as any);
  const project = useQuery(api.project.getProject, {
    projectId: projectId,
  });
  const relatedProjects = useQuery(api.project.getRelatedProjects, {
    ids: project?.relatedId || [],
  });

  if (project instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-center text-red-500">{project?.message}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProjectDetails
        project={project as Project}
        relatedProjects={relatedProjects as Project[]}
      />
      <Footer />
    </main>
  );
}
