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
  Cloud,
  Layers,
  Box,
  Figma,
  GitBranch,
} from "lucide-react";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.03]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <div className="inline-block mb-4">
          <span className="py-1 px-3 rounded-full bg-secondary border border-border text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Expertise
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
          My tech <span className="text-jordy_blue-400 dark:text-jordy_blue-500">stack</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
          Tools I use to build production-grade applications — chosen for the right reasons.
        </p>
      </div>

      <div className="relative flex flex-col gap-5 overflow-hidden py-2">
        <Marquee pauseOnHover className="[--duration:45s]">
          {firstRow.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:45s]">
          {secondRow.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
      </div>
    </section>
  );
}

const SkillCard = ({
  icon: Icon,
  name,
  description,
  color,
}: {
  icon: React.ElementType;
  name: string;
  description: string;
  color: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-56 select-none overflow-hidden rounded-2xl border border-border/60 bg-card p-4",
        "hover:border-jordy_blue-400/30 hover:bg-card/80 transition-all duration-300 shadow-sm hover:shadow-md"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", color)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  );
};

const skills = [
  { name: "React", description: "Frontend library", icon: Code2, color: "bg-sky-500/10 text-sky-500" },
  { name: "Next.js", description: "React framework", icon: Globe, color: "bg-foreground/10 text-foreground" },
  { name: "TypeScript", description: "Typed JavaScript", icon: Terminal, color: "bg-blue-500/10 text-blue-500" },
  { name: "Tailwind CSS", description: "Utility-first CSS", icon: Layout, color: "bg-cyan-500/10 text-cyan-500" },
  { name: "Node.js", description: "JS runtime", icon: Server, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { name: "PostgreSQL", description: "Relational database", icon: Database, color: "bg-indigo-500/10 text-indigo-500" },
  { name: "React Native", description: "Mobile framework", icon: Smartphone, color: "bg-sky-500/10 text-sky-500" },
  { name: "AWS", description: "Cloud services", icon: Cloud, color: "bg-orange-500/10 text-orange-500" },
  { name: "Docker", description: "Containerization", icon: Box, color: "bg-blue-500/10 text-blue-500" },
  { name: "Figma", description: "Design tool", icon: Figma, color: "bg-pink-500/10 text-pink-500" },
  { name: "Git", description: "Version control", icon: GitBranch, color: "bg-red-500/10 text-red-500" },
  { name: "GraphQL", description: "Query language", icon: Layers, color: "bg-pink-500/10 text-pink-500" },
  { name: "Prisma", description: "ORM", icon: Database, color: "bg-emerald-500/10 text-emerald-500" },
  { name: "Redis", description: "In-memory store", icon: Layers, color: "bg-red-500/10 text-red-500" },
];

const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
const secondRow = skills.slice(Math.ceil(skills.length / 2));
