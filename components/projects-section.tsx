"use client";
import React from "react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export function ProjectsSection() {
  const projects = useQuery(api.project.getUserFeatureProjects);

  return (
    <div className="w-full py-20 bg-background" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="inline-block mb-3">
          <span className="py-1 px-3 rounded-full bg-secondary border border-border text-sm font-medium text-muted-foreground">
            Latest Work
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground font-sans mb-4">
          Featured <span className="text-jordy_blue-400 dark:text-jordy_blue">Projects</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Explore a selection of my recent work, featuring full-stack applications and innovative designs. Hover over the cards to see the 3D effect.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects?.map((project) => (
          <CardContainer key={project._id} className="inter-var">
            <CardBody className="bg-card relative group/card hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-border w-auto sm:w-[30rem] h-auto rounded-xl p-6 border shadow-sm dark:shadow-none">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-foreground"
              >
                {project.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-muted-foreground text-sm max-w-sm mt-2 line-clamp-2"
              >
                {project.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-6">
                <Link href={`/projects-details/${project._id}`} className="block">
                  <img
                    src={project.thumbnailUrl || "/placeholder.svg"}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl cursor-pointer"
                    alt={project.name}
                  />
                </Link>
              </CardItem>
              <div className="flex justify-between items-center mt-10">
                <div className="flex gap-2">
                  {project.demoLink && (
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href={project.demoLink}
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal text-primary-foreground bg-primary"
                    >
                      <div className="flex items-center gap-2 group-hover:text-jordy_blue transition-colors">
                        Live <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </CardItem>
                  )}
                  {project.sourceCode && (
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href={project.sourceCode}
                      target="__blank"
                      className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-bold border border-border"
                    >
                      GitHub
                    </CardItem>
                  )}
                </div>
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={`/projects-details/${project._id}`}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-bold hover:bg-secondary/50 transition-colors text-foreground"
                >
                  Details
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/project-list"
          className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-primary-foreground bg-primary border border-transparent rounded-full hover:bg-primary/90 transition-all duration-300 group"
        >
          View All Projects
          <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
