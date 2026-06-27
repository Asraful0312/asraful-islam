"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Globe,
  LayoutDashboard,
  Rocket,
  Database,
  Server,
  Monitor,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { useTheme } from "next-themes";

/* ─────────────────────────────────────────────
   Visual 1 — Stack layers cycling highlight
────────────────────────────────────────────── */
function StackLayersVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % 3), 1600);
    return () => clearInterval(id);
  }, []);

  const layers = [
    { icon: Monitor, label: "UI Layer", tech: "React / Next.js" },
    { icon: Server, label: "API Layer", tech: "Node.js / REST" },
    { icon: Database, label: "Data Layer", tech: "PostgreSQL" },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {layers.map((l, i) => {
        const isActive = active === i;
        return (
          <motion.div
            key={l.label}
            animate={{
              backgroundColor: isActive
                ? "rgba(163,230,53,0.08)"
                : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex items-center gap-3 rounded-xl p-3 border transition-colors duration-300",
              isActive
                ? "border-jordy_blue-400/30"
                : "bg-muted/60 border-transparent"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                isActive
                  ? "bg-jordy_blue-400/20 text-jordy_blue-400"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <l.icon className="h-4 w-4" />
            </div>
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {l.label}
            </span>
            <span className="ml-auto text-xs text-muted-foreground">
              {l.tech}
            </span>
            {isActive && (
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-jordy_blue-400 shrink-0"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            )}
          </motion.div>
        );
      })}

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <LayoutDashboard className="h-3 w-3" />
          Full ownership
        </span>
        <span className="text-xs text-jordy_blue-400 font-medium">
          Schema → Deploy
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Visual 2 — Timezone cycling with live pulse
────────────────────────────────────────────── */
function TimezoneVisual() {
  const [activeTz, setActiveTz] = useState(0);
  const {theme } = useTheme();

  useEffect(() => {
    const id = setInterval(() => setActiveTz((p) => (p + 1) % 3), 2000);
    return () => clearInterval(id);
  }, []);

  const zones = [
    { zone: "UTC−8", label: "Pacific" },
    { zone: "UTC+0", label: "London" },
    { zone: "UTC+6", label: "Dhaka" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-jordy_blue-400" />
        <span className="text-xs text-muted-foreground">
          Timezone-aware delivery
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="relative flex items-center justify-center w-2 h-2">
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400/40"
              animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-green-500">available</span>
        </div>
      </div>

      <div className="space-y-2">
        {zones.map((tz, i) => {
          const isActive = activeTz === i;
          return (
            <motion.div
              key={tz.zone}
              animate={{
                 backgroundColor: isActive
                ? "rgba(163,230,53,0.08)"
                : "rgba(0,0,0,0)",
              }}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-300",
                isActive
                  ? "border border-jordy_blue-400/30"
                  : "bg-muted/60 border border-transparent"
              )}
            >
              <span className="text-xs text-muted-foreground">{tz.zone}</span>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isActive ? "text-jordy_blue-400" : "text-foreground"
                )}
              >
                {tz.label}
              </span>
              <motion.span
                animate={{ opacity: isActive ? 1 : 0.4 }}
                className={cn(
                  "text-xs",
                  isActive ? "text-jordy_blue-400" : "text-muted-foreground/40"
                )}
              >
                {isActive ? "●" : "○"}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-muted/60 rounded-lg p-3 flex justify-between text-xs">
        <span className="text-muted-foreground">Async preferred</span>
        <span className="text-jordy_blue-400 font-medium">Clear handoffs</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Visual 3 — Tech badges cycling highlight
────────────────────────────────────────────── */
const TECHS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Prisma",
  "AWS",
];

function TechStackVisual() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActiveIdx((p) => (p + 1) % TECHS.length),
      700
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Code2 className="h-4 w-4 text-jordy_blue-400" />
        <span className="text-xs text-muted-foreground">Current stack</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {TECHS.map((tech, i) => {
          const isActive = activeIdx === i;
          return (
            <motion.span
              key={tech}
              animate={{
                scale: isActive ? 1.06 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-300",
                isActive
                  ? "bg-jordy_blue-400/15 border-jordy_blue-400/40 text-jordy_blue-400"
                  : "bg-muted/80 border-border text-foreground"
              )}
            >
              {tech}
            </motion.span>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        Chosen for the problem, not the resume.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Visual 4 — Problem → Tool → Shipped pipeline
────────────────────────────────────────────── */
const PIPELINE_STEPS = [
  { icon: Lightbulb, label: "Problem", color: "text-muted-foreground", activeBg: "bg-muted/60", activeColor: "text-foreground" },
  { icon: Wrench, label: "Right tool", color: "text-jordy_blue-400", activeBg: "bg-jordy_blue-400/10", activeColor: "text-jordy_blue-400" },
  { icon: Rocket, label: "Shipped", color: "text-green-500", activeBg: "bg-green-500/10", activeColor: "text-green-500" },
];

function PipelineVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setStep((p) => (p + 1) % PIPELINE_STEPS.length),
      1400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-jordy_blue-400" />
        <span className="text-xs text-muted-foreground">My approach</span>
      </div>

      <div className="flex items-center gap-2">
        {PIPELINE_STEPS.map((s, i) => {
          const isActive = step === i;
          const isPast = step > i;
          return (
            <React.Fragment key={s.label}>
              <motion.div
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "rounded-xl p-3 flex-1 text-center border transition-colors duration-300",
                  isActive
                    ? `${s.activeBg} border-current/20`
                    : isPast
                    ? "bg-muted/40 border-transparent"
                    : "bg-muted/60 border-transparent"
                )}
              >
                <s.icon
                  className={cn(
                    "h-5 w-5 mx-auto mb-1 transition-colors duration-300",
                    isActive ? s.activeColor : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-xs transition-colors duration-300",
                    isActive ? s.activeColor : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
              </motion.div>

              {i < PIPELINE_STEPS.length - 1 && (
                <motion.div
                  animate={{ opacity: step > i ? 1 : 0.25 }}
                  transition={{ duration: 0.4 }}
                >
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors duration-300",
                      step > i ? "text-jordy_blue-400" : "text-muted-foreground"
                    )}
                  />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="space-y-2">
        {[
          "Boring tech when it solves the problem",
          "New tools only when they genuinely help",
        ].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="flex items-center gap-2 text-xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-jordy_blue-400 shrink-0" />
            <span className="text-muted-foreground">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card definitions
────────────────────────────────────────────── */
const cards = [
  {
    title: "End-to-end ownership",
    description:
      "From database schema to UI animation — I own the full stack without dropping quality at either end.",
    visual: <StackLayersVisual />,
  },
  {
    title: "Remote-first",
    description:
      "Clear async communication, timezone-aware delivery, and work you can rely on.",
    visual: <TimezoneVisual />,
  },
  {
    title: "Practical tech choices",
    description:
      "React, Next.js, Node.js, PostgreSQL, and the cloud — chosen for the problem, not the resume.",
    visual: <TechStackVisual />,
  },
  {
    title: "Problem first, technology second",
    description:
      "I reach for boring, proven tools when they work, and new ones only when they genuinely solve a real problem.",
    visual: <PipelineVisual />,
  },
];

/* ─────────────────────────────────────────────
   Section
────────────────────────────────────────────── */
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
          <div className="inline-block mb-4">
            <span className="py-1 px-3 rounded-full bg-secondary border border-border text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Background
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            About <span className="text-jordy_blue-400 dark:text-jordy_blue-500">me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            I write code that works, ships, and holds up over time. Here&apos;s
            what that looks like in practice.
          </p>
        </motion.div>

        <div className="grid w-full max-w-5xl mx-auto gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-muted/40 flex h-full flex-col rounded-[32px] p-0 border-border">
                <CardContent className="flex h-full flex-col gap-6 p-4">
                  <div className="text-center pt-2">
                    <h3 className="text-foreground text-xl font-semibold">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-6 mt-1">
                      {card.description}
                    </p>
                  </div>
                  <div className="bg-background dark:bg-background/60 flex min-h-[220px] flex-col justify-between rounded-3xl p-4 shadow-[0px_3px_8px_-1px_rgba(0,0,0,0.03),0px_1px_2px_-1px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[0px_3px_8px_-1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04),inset_0px_2px_0px_0px_rgba(255,255,255,0.05)]">
                    {card.visual}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
