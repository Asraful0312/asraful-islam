"use client";
import AppShell from "@/components/app-shell";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

interface ProjectProps {
  params: { projectId: Id<"projects"> };
}

const Project = ({ params }: ProjectProps) => {
  const project = useQuery(api.project.getProject, {
    projectId: params.projectId,
  });

  if (project instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-center text-red-500">{project?.message}</p>
      </div>
    );
  }

  if (!project) return <div>Loading...</div>;

  return (
    <AppShell>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
        {project.thumbnailUrl && (
          <img
            src={project.thumbnailUrl}
            alt={project.name}
            className="w-full max-w-md h-auto object-cover rounded mb-6"
          />
        )}
        <p className="text-gray-300 mb-4">{project.description}</p>
        <p>
          <strong>Project Type:</strong> {project.projectType}
        </p>
        <p>
          <strong>Role:</strong> {project.role}
        </p>
        {project.sourceCode && (
          <p>
            <strong>Source Code:</strong>{" "}
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.sourceCode}
            </a>
          </p>
        )}
        {project.demoLink && (
          <p>
            <strong>Demo Link:</strong>{" "}
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.demoLink}
            </a>
          </p>
        )}
        <p>
          <strong>Timeline:</strong> {project.timeline}
        </p>
        {project.relatedId && (
          <p>
            <strong>Related ID:</strong> {project.relatedId}
          </p>
        )}
        <p>
          <strong>Tags:</strong> {project.tags.join(", ")}
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Image Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {project.imageGalleryUrls.map(
              (url, index) =>
                url && (
                  <img
                    key={index}
                    src={url}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                )
            )}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="list-disc pl-5">
            {project.features.map((feature, index) => (
              <li key={index}>
                <strong>{feature.title}:</strong> {feature.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Technical Details</h2>
          <ul className="list-disc pl-5">
            {project.technicalDetails.map((detail, index) => (
              <li key={index}>
                <strong>{detail.title}:</strong> {detail.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Challenges</h2>
          <ul className="list-disc pl-5">
            {project.challenges.map((challenge, index) => (
              <li key={index}>
                <strong>{challenge.title}:</strong> {challenge.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
};

export default Project;
