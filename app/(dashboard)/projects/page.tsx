/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import AppShell from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import React from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

const Projects = () => {
  const projects = useQuery(api.project.getUserProjects);
  const deleteProject = useMutation(api.project.deleteProject);

  const handleDelete = async (projectId: Id<"projects">) => {
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      try {
        await deleteProject({ projectId });
        toast.success("Project deleted successfully!");
      } catch (error: any) {
        toast.error(error.message || "Failed to delete project");
        console.error(error);
      }
    }
  };

  console.log("projects", projects);

  return (
    <AppShell>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Projects</h1>
          <Link href="/create-project">
            <Button>Create New Project</Button>
          </Link>
        </div>
        {projects instanceof Error ? (
          <p className="text-red-500 text-center">{projects?.message}</p>
        ) : projects === undefined ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : projects.length === 0 ? (
          <div>No projects found. Create one to get started!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="border rounded-lg p-4 shadow-md"
              >
                {project.thumbnailUrl && (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-gray-300 mb-4">
                  {project.description.substring(0, 150)}...
                </p>
                <div className="flex space-x-2">
                  <Link href={`/projects/${project._id}`}>
                    <Button variant="outline">View</Button>
                  </Link>
                  <Link href={`/edit-project/${project._id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default Projects;
