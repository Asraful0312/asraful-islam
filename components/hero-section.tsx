"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SparklesText } from "./ui/spark-text";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuroraBackground } from "./ui/aurora-background";
import Image from "next/image";

const socials = [
  { url: "/github.png", href: "https://github.com/Asraful0312", label: "GitHub" },
  { url: "/linkedin.png", href: "https://www.linkedin.com/in/asraful-islam-rayhan-434998335/", label: "LinkedIn" },
  { url: "/twitter.png", href: "https://x.com/AsrafulIslam031", label: "Twitter" },
];

const stats = [
  { value: "23", label: "projects shipped" },
  { value: "4", label: "years experience" },
  { value: "96%", label: "client satisfaction" },
];

export function HeroSection() {
  const router = useRouter();
  const updateUserName = useMutation(api.auth.updateUserName);
  const user = useQuery(api.auth.loggedInUser);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const isNewUser = urlParams.get("newUser");

    if (name && isNewUser && user) {
      updateUserName({ name }).catch(console.error);
      router.replace("/");
    }
  }, [updateUserName, router, user]);

  return (
    <AuroraBackground>
      <section
        id="hero"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[calc(100dvh-64px)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center py-24 md:py-0">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs font-semibold tracking-widest text-muted-foreground uppercase bg-secondary/60 rounded-full border border-border/60 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-jordy_blue-400 dark:bg-jordy_blue animate-pulse" />
                Available for work
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <SparklesText className="text-jordy_blue-400 dark:text-jordy_blue" text="Asraful Islam" />
              </h1>
              <p className="mt-2 text-lg font-medium text-muted-foreground">Full Stack Developer</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              I build full-stack web applications — clean code, reliable architecture, shipped on time. Based in Bangladesh, working with teams worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.97] rounded-full px-8 font-semibold transition-all duration-200"
              >
                <Link href="/#projects">
                  View work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/60 text-foreground hover:bg-secondary active:scale-[0.97] rounded-full px-8 backdrop-blur-md transition-all duration-200"
              >
                <Link href="/#contact">Get in touch</Link>
              </Button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-6 pt-2 border-t border-border/50"
            >
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl font-bold text-foreground tabular-nums tracking-tight">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex gap-3"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl flex items-center justify-center bg-secondary/60 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-jordy_blue-400/40 transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label={s.label}
                >
                  <Image src={s.url} alt={s.label} width={18} height={18} className="dark:invert-0 opacity-70 hover:opacity-100" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right column — photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="relative w-72 h-72 lg:w-[380px] lg:h-[380px]">
              {/* Ambient glow */}
              <div className="absolute -inset-4 rounded-[3rem] bg-jordy_blue-400/8 dark:bg-jordy_blue/8 blur-3xl" />
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-[2.5rem] border border-jordy_blue-400/20 dark:border-jordy_blue/15" />
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-border/40 shadow-2xl group">
                <img
                  src="/me.png"
                  alt="Asraful Islam — Full Stack Developer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-white font-semibold text-sm">Asraful Islam</p>
                    <p className="text-white/70 text-xs">Full Stack Developer</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border/60 rounded-2xl px-4 py-2.5 shadow-lg backdrop-blur-sm">
                <p className="text-xs text-muted-foreground">Open to</p>
                <p className="text-sm font-semibold text-foreground">Remote Work</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </section>
    </AuroraBackground>
  );
}
