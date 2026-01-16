"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GitlabIcon as GitHub,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { SparklesText } from "./ui/spark-text";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuroraBackground } from "./ui/aurora-background";

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
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col justify-center min-h-[calc(100vh-64px)]"
      >
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 mb-4 text-sm font-medium tracking-wider text-foreground uppercase bg-secondary/50 rounded-full border border-border backdrop-blur-sm">
                Full Stack Developer
              </div>
              <h1

                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3"
              >
                {/* <span className="text-color">Asraful Islam</span> */}
                <SparklesText className="text-jordy_blue-400 dark:text-jordy_blue" text="Asraful Islam" />
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Crafting exceptional digital experiences with a focus on accessibility
              and human-centered design. I build things for the web that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-semibold shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] transition-all duration-300"
              >
                <Link href="/#projects">
                  View Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary rounded-full px-8 backdrop-blur-md bg-background/5"
              >
                <Link href="/#contact">Contact Me</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex gap-6 mt-8"
            >
              {[
                { icon: GitHub, href: "https://github.com/Asraful0312", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110 duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative hidden md:block"
          >
            <div className="relative w-80 h-80 lg:w-[400px] lg:h-[400px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[2rem] opacity-30 blur-3xl animate-pulse"></div>
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 bg-Card backdrop-blur-sm shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/me.png"
                  alt="Asraful Islam"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">Asraful Islam</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </AuroraBackground>
  );
}
