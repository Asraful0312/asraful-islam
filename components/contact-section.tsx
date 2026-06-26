"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail, Phone, MapPin, ArrowRight, Sprout,
  Github, Linkedin, Twitter, Instagram,
} from "lucide-react";
import { sendEMail } from "@/actions";
import { toast } from "sonner";
import { BackgroundBeams } from "./ui/background-beams";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await sendEMail(
      formState.email,
      formState.subject,
      formState.message
    );
    if (response?.error) {
      setIsSubmitting(false);
      return toast.error(response?.error);
    }
    setIsSubmitting(false);
    setFormState({ name: "", email: "", subject: "", message: "" });
    toast.success("Message sent successfully!");
  };

  return (
    <section
      id="contact"
      className="section-container relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      ref={ref}
    >
      <BackgroundBeams className="-z-10" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
        >
          {/* Left — info */}
          <div className="flex flex-col gap-6">
            <Badge className="w-fit gap-1.5">
              <Sprout className="size-3.5 text-primary-foreground" />
              Available for Work
            </Badge>

            <h2 className="text-foreground text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Let&apos;s build something{" "}
              <span className="text-primary block">worth shipping.</span>
            </h2>

            <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
              Have a project in mind or want to talk through an idea? Send me a
              message and I&apos;ll get back to you within a day.
            </p>

            <Separator className="my-2 w-16 border-primary/40" />

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div className="bg-muted flex items-center gap-3 rounded-2xl p-1">
                <div className="bg-card flex size-12 shrink-0 items-center justify-center rounded-xl">
                  <Mail className="text-primary size-4" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Email
                  </p>
                  <a
                    href="mailto:asrafulislam0312@gmail.com"
                    className="text-foreground text-sm font-semibold pr-3 hover:text-primary transition-colors"
                  >
                    asrafulislam0312@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-muted flex items-center gap-3 rounded-2xl p-1">
                <div className="bg-card flex size-12 shrink-0 items-center justify-center rounded-xl">
                  <Phone className="text-primary size-4" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Phone
                  </p>
                  <a
                    href="https://wa.me/8801873239795"
                    className="text-foreground text-sm font-semibold pr-3 hover:text-primary transition-colors"
                  >
                    +880 1873-239795
                  </a>
                </div>
              </div>

              <div className="bg-muted flex items-center gap-3 rounded-2xl p-1">
                <div className="bg-card flex size-12 shrink-0 items-center justify-center rounded-xl">
                  <MapPin className="text-primary size-4" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Location
                  </p>
                  <p className="text-foreground text-sm font-semibold pr-3">
                    Noakhali, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-sm font-medium mb-3">
                Connect with me
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Github, link: "https://github.com/Asraful0312", label: "GitHub" },
                  { icon: Linkedin, link: "#", label: "LinkedIn" },
                  { icon: Twitter, link: "#", label: "Twitter" },
                  { icon: Instagram, link: "#", label: "Instagram" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    aria-label={social.label}
                    className="h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form card */}
          <Card className="bg-muted rounded-4xl shadow-sm ring-0 border-0">
            <CardContent className="flex flex-col gap-5 p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name" className="text-foreground text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Alex Rivera"
                    required
                    className="bg-input focus-visible:ring-primary rounded-xl border-0 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] focus-visible:ring-1 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" className="text-foreground text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    required
                    className="bg-input focus-visible:ring-primary rounded-xl border-0 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] focus-visible:ring-1 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="subject" className="text-foreground text-sm font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    required
                    className="bg-input focus-visible:ring-primary rounded-xl border-0 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] focus-visible:ring-1 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="message" className="text-foreground text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea…"
                    rows={4}
                    required
                    className="bg-input focus-visible:ring-primary resize-none rounded-xl border-0 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] focus-visible:ring-1 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 group mt-1 w-full rounded-xl py-5 text-sm font-semibold shadow-[inset_0_2px_0_0_rgba(255,255,255,0.5),inset_0_-2px_0_0_rgba(0,0,0,0.2)] transition-all dark:shadow-[inset_0_2px_0_0_rgba(255,255,255,0.2)]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
