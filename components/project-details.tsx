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

interface ProjectDetailsProps {
  project: Project;
  relatedProjects: Project[];
}

export function ProjectDetails({
  project,
  relatedProjects,
}: ProjectDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
  ];

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/#projects"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-8">
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

            <div className="mb-8 relative overflow-hidden rounded-lg border border-gray-800">
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev - 1 + images.length) % images.length
                    )
                  }
                  className="bg-black/50 backdrop-blur-sm border-gray-700 hover:bg-black/70"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev + 1) % images.length)
                  }
                  className="bg-black/50 backdrop-blur-sm border-gray-700 hover:bg-black/70"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 mb-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 border-2 rounded overflow-hidden ${
                    currentImageIndex === index
                      ? "border-purple-500"
                      : "border-gray-700"
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
              <TabsList className="bg-[#232323] border border-gray-800 flex-wrap h-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="technical">Technical Details</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p>{project.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl,
                    eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel
                    ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl
                    nisl sit amet nisl.
                  </p>
                  <p>
                    Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam
                    nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl
                    vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam
                    nisl nisl sit amet nisl.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-purple-500/10 p-2 rounded-full mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">
                        User Authentication
                      </h3>
                      <p className="text-gray-400">
                        Secure login and registration system with email
                        verification and password recovery.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-500/10 p-2 rounded-full mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Real-time Updates</h3>
                      <p className="text-gray-400">
                        Instant data synchronization across all connected
                        clients using WebSockets.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-500/10 p-2 rounded-full mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Responsive Design</h3>
                      <p className="text-gray-400">
                        Fully responsive interface that works seamlessly on
                        desktop, tablet, and mobile devices.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-500/10 p-2 rounded-full mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">
                        Data Visualization
                      </h3>
                      <p className="text-gray-400">
                        Interactive charts and graphs for visualizing complex
                        data sets and analytics.
                      </p>
                    </div>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="technical" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Frontend</h3>
                    <p className="text-gray-400 mb-2">
                      Built with React and Next.js for server-side rendering and
                      optimal performance. Styled with Tailwind CSS for a
                      responsive and customizable design system.
                    </p>
                    <div className="flex flex-wrap gap-2">
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
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Backend</h3>
                    <p className="text-gray-400 mb-2">
                      Node.js API with Express, using MongoDB for data storage.
                      Authentication handled with JWT tokens and bcrypt for
                      password hashing.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Node.js",
                        "Express",
                        "MongoDB",
                        "JWT",
                        "Socket.io",
                      ].map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="bg-[#232323] text-gray-300 border-gray-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Deployment</h3>
                    <p className="text-gray-400 mb-2">
                      Frontend deployed on Vercel with CI/CD pipeline. Backend
                      hosted on AWS with containerization using Docker.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Vercel",
                        "AWS",
                        "Docker",
                        "GitHub Actions",
                        "Cloudflare",
                      ].map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="bg-[#232323] text-gray-300 border-gray-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="challenges" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p>
                    During the development of this project, several challenges
                    were encountered and overcome:
                  </p>
                  <ul>
                    <li>
                      <strong>Real-time Synchronization:</strong> Implementing
                      real-time updates across multiple clients required careful
                      consideration of data consistency and conflict resolution.
                    </li>
                    <li>
                      <strong>Performance Optimization:</strong> Ensuring fast
                      load times and smooth interactions with large datasets
                      required implementing virtualization and efficient data
                      fetching strategies.
                    </li>
                    <li>
                      <strong>Responsive Design:</strong> Creating a consistent
                      user experience across various device sizes while
                      maintaining complex UI components presented unique design
                      challenges.
                    </li>
                    <li>
                      <strong>Authentication Security:</strong> Implementing
                      robust security measures to protect user data and prevent
                      common vulnerabilities required extensive testing and
                      security audits.
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Project Details</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Project Type</h3>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Web Application</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Timeline</h3>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                    <span>3 months (Jan - Mar 2023)</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Role</h3>
                  <div className="flex items-center">
                    <Layers className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Full-stack Developer</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Links</h3>
                  <div className="space-y-2">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <h2 className="text-xl font-bold mb-6">Related Projects</h2>
                <div className="space-y-4">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      href={`/projects/${relatedProject.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-16 h-12 overflow-hidden rounded border border-gray-800">
                          <img
                            src={relatedProject.image || "/placeholder.svg"}
                            alt={relatedProject.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-purple-400 transition-colors">
                            {relatedProject.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-1">
                            {relatedProject.description.substring(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
