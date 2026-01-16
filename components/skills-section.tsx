"use client";

import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Cpu,
  Cloud,
  Layers,
  Box,
  Figma,
  GitBranch,
} from "lucide-react";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-block mb-3">
          <span className="py-1 px-3 rounded-full bg-secondary border border-border text-sm font-medium text-purple-600 dark:text-purple-300">
            Expertise
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          My Tech <span className="text-jordy_blue-400 dark:text-jordy_blue-500">Stack</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          A curated list of technologies I use to build robust and scalable digital solutions.
        </p>
      </div>

      <div className="relative flex flex-col gap-8 overflow-hidden py-4">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}

const SkillCard = ({
  icon: Icon,
  name,
  description,
}: {
  icon: any;
  name: string;
  description: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-border bg-card hover:bg-secondary/20 hover:border-primary/20 transition-colors backdrop-blur-sm shadow-sm",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <Icon className="h-6 w-6 text-foreground" />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-foreground">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

const skills = [
  {
    name: "React",
    description: "Frontend Library",
    icon: Code2,
  },
  {
    name: "Next.js",
    description: "React Framework",
    icon: Globe,
  },
  {
    name: "TypeScript",
    description: "Typed JavaScript",
    icon: Terminal,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS",
    icon: Layout,
  },
  {
    name: "Node.js",
    description: "JavaScript Runtime",
    icon: Server,
  },
  {
    name: "PostgreSQL",
    description: "Relational Database",
    icon: Database,
  },
  {
    name: "React Native",
    description: "Mobile Framework",
    icon: Smartphone,
  },
  {
    name: "AWS",
    description: "Cloud Services",
    icon: Cloud,
  },
  {
    name: "Docker",
    description: "Containerization",
    icon: Box,
  },
  {
    name: "Figma",
    description: "Design Tool",
    icon: Figma,
  },
  {
    name: "Git",
    description: "Version Control",
    icon: GitBranch,
  },
  {
    name: "GraphQL",
    description: "Query Language",
    icon: Layers,
  },
  {
    name: "Prisma",
    description: "ORM",
    icon: Database
  },
  {
    name: "Redis",
    description: "In-memory Store",
    icon: Layers
  }

];

const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
const secondRow = skills.slice(Math.ceil(skills.length / 2));
