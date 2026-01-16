"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Github,
  Globe,
  Layers,
} from "lucide-react";
import type { Project } from "@/lib/types";
import { ProjectVideoPlayer } from "./project-video-player";

interface ProjectDetailsProps {
  project?: Project;
  relatedProjects?: Project[];
}

export function ProjectDetails({
  project,
  relatedProjects,
}: ProjectDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project?.galleryImageUrls;

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/#projects"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-6">{project?.name}</h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {project?.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-secondary/50 text-muted-foreground border-border"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mb-8 relative overflow-hidden rounded-lg border border-gray-800">
              <img
                src={
                  (images && images[currentImageIndex]) || "/placeholder.svg"
                }
                alt={`${project?.name} screenshot ${currentImageIndex + 1}`}
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (images) {
                      setCurrentImageIndex(
                        (prev) => (prev - 1 + images?.length) % images?.length
                      );
                    }
                  }}
                  className="bg-background/50 backdrop-blur-sm border-border hover:bg-background/80"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (images) {
                      setCurrentImageIndex(
                        (prev) => (prev + 1) % images.length
                      );
                    }
                  }}
                  className="bg-background/50 backdrop-blur-sm border-border hover:bg-background/80"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 mb-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {images &&
                images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 border-2 rounded overflow-hidden ${currentImageIndex === index
                      ? "border-primary"
                      : "border-border"
                      }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-24 h-16 object-cover"
                    />
                  </button>
                ))}
            </div>

            <Tabs defaultValue="overview" className="mb-12">
              <TabsList className="bg-secondary border border-border flex-wrap h-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="technical">Technical Details</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                {project?.videoUrl && (
                  <ProjectVideoPlayer videoUrl={project.videoUrl} />
                )}
                <div className="prose prose-invert max-w-none text-foreground">
                  <p>{project?.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-6">
                <ul className="space-y-4">
                  {project?.features.map((feature) => (
                    <li key={feature.title} className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-foreground">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="technical" className="mt-6">
                <div className="space-y-6">
                  {project?.technicalDetails.map((td) => (
                    <div key={td.title}>
                      <h3 className="text-lg font-medium mb-2 text-foreground">{td.title}</h3>
                      <p className="text-muted-foreground mb-2">{td.description}</p>
                      {/* <div className="flex flex-wrap gap-2">
                        {[
                          "React",
                          "Next.js",
                          "TypeScript",
                          "Tailwind CSS",
                          "Framer Motion",
                        ].map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-[#232323] text-gray-300 border-gray-700"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div> */}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="challenges" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground">
                    During the development of this project, several challenges
                    were encountered and overcome:
                  </p>
                  <ul className="space-y-5 text-foreground">
                    {project?.challenges.map((challenge) => (
                      <li>
                        <strong>{challenge.title}: </strong>
                        {challenge.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Project Details</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Project Type</h3>
                  <div className="flex items-center text-foreground">
                    <Globe className="h-5 w-5 text-primary mr-2" />
                    <span>Web Application</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Timeline</h3>
                  <div className="flex items-center text-foreground">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span>3 months (Jan - Mar 2023)</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Role</h3>
                  <div className="flex items-center text-foreground">
                    <Layers className="h-5 w-5 text-primary mr-2" />
                    <span>Full-stack Developer</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Links</h3>
                  <div className="space-y-2">
                    <a
                      href={project?.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Live Demo
                    </a>
                    <a
                      href={project?.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h2 className="text-xl font-bold mb-6">Related Projects</h2>
                {relatedProjects instanceof Error ? (
                  <p className="text-sm text-center text-red-500">
                    {relatedProjects.message}
                  </p>
                ) : relatedProjects === undefined ? (
                  <div className="flex justify-center items-center min-h-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : relatedProjects.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground">
                    No related projects added
                  </p>
                ) : (
                  <div className="space-y-4">
                    {relatedProjects.map((relatedProject) => (
                      <Link
                        key={relatedProject._id}
                        href={`/projects-details/${relatedProject._id}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-16 h-12 overflow-hidden rounded border border-border">
                            <img
                              src={
                                relatedProject?.thumbnailUrl ||
                                "/placeholder.svg"
                              }
                              alt={relatedProject?.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-primary transition-colors text-foreground">
                              {relatedProject?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {relatedProject.description.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
