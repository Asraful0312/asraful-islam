"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  LayoutDashboard,
  Rocket,
  ArrowRight,
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-3">
            <span className="py-1 px-3 rounded-full bg-secondary border border-border text-sm font-medium text-muted-foreground">
              Discover
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-jordy_blue-400 dark:text-jordy_blue-500">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            I'm a developer who loves building things that are both beautiful and functional.
            Here's a bit more about what drives me.
          </p>
        </motion.div>

        <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[280px]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(item.className)}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={item.header}
                className={cn(
                  "[&>p:text-lg]",
                  "bg-card border-border hover:bg-secondary/20 hover:border-primary/20 transition-all duration-300 backdrop-blur-sm h-full shadow-sm"
                )}
                icon={item.icon}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const items = [
  {
    title: "Full Stack Mastery",
    description: "Building scalable applications end-to-end with the modern web stack.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-secondary/50 to-secondary items-center justify-center border border-border group-hover/bento:border-purple-500/30 transition-colors">
        <LayoutDashboard className="w-12 h-12 text-muted-foreground group-hover/bento:text-purple-600 dark:group-hover/bento:text-purple-400 transition-colors duration-300" />
      </div>
    ),
    className: "md:col-span-2",
    icon: <ArrowRight className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Global Perspective",
    description: "Collaborating with clients worldwide to deliver impact.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-secondary/50 to-secondary items-center justify-center border border-border group-hover/bento:border-blue-500/30 transition-colors">
        <Globe className="w-12 h-12 text-muted-foreground group-hover/bento:text-blue-600 dark:group-hover/bento:text-blue-400 transition-colors duration-300" />
      </div>
    ),
    className: "md:col-span-1",
    icon: <ArrowRight className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Modern Tech Stack",
    description: "Expertise in React, Next.js, Node.js, and Cloud Infrastructure.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-secondary/50 to-secondary items-center justify-center border border-border group-hover/bento:border-orange-500/30 transition-colors">
        <Code2 className="w-12 h-12 text-muted-foreground group-hover/bento:text-orange-600 dark:group-hover/bento:text-orange-400 transition-colors duration-300" />
      </div>
    ),
    className: "md:col-span-1",
    icon: <ArrowRight className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Innovation Driven",
    description: "Constantly pushing boundaries and exploring new frontiers in tech.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-secondary/50 to-secondary items-center justify-center border border-border group-hover/bento:border-green-500/30 transition-colors">
        <Rocket className="w-12 h-12 text-muted-foreground group-hover/bento:text-green-600 dark:group-hover/bento:text-green-400 transition-colors duration-300" />
      </div>
    ),
    className: "md:col-span-2",
    icon: <ArrowRight className="h-4 w-4 text-muted-foreground" />,
  },
];
