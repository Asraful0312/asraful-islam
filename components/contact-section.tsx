"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";
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
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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
    setSubmitSuccess(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
    toast.success("Mail sent successfully");
  };

  return (
    <section id="contact" className="section-container relative min-h-screen flex items-center justify-center overflow-hidden py-20" ref={ref}>
      <BackgroundBeams className="-z-10" />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center h-full">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Let's Build Something <br />
                  <span className="text-jordy_blue-400 dark:text-jordy_blue-500">
                    Amazing Together
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                  Have a project in mind or want to discuss potential opportunities?
                  I'm always open to new challenges and creative collaborations.
                </p>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-jordy_blue-500/10 flex items-center justify-center border border-jordy_blue-500/20">
                    <Mail className="h-6 w-6  dark:text-jordy_blue-500 text-jordy_blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Email Me</p>
                    <a href="mailto:asrafulislam0312@gmail.com" className="text-foreground hover:text-jordy_blue-500 dark:hover:text-jordy_blue-400 transition-colors bg-left-bottom bg-gradient-to-r from-jordy_blue-400 to-jordy_blue-400 bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px]">
                      asrafulislam0312@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-jordy_blue-500/10 flex items-center justify-center border border-jordy_blue-500/20">
                    <Phone className="h-6 w-6  dark:text-jordy_blue-500 text-jordy_blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Call Me</p>
                    <a href="https://wa.me/8801873239795" className="text-foreground hover:text-jordy_blue-500 dark:hover:text-jordy_blue-400 transition-colors">
                      +880 1873-239795
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-jordy_blue-500/10 flex items-center justify-center border border-jordy_blue-500/20">
                    <MapPin className="h-6 w-6  dark:text-jordy_blue-500 text-jordy_blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Location</p>
                    <p className="text-foreground">Noakhali, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground font-medium mb-4">Connect with me</p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, link: "https://github.com/Asraful0312", label: "GitHub" },
                    { icon: Linkedin, link: "#", label: "LinkedIn" },
                    { icon: Twitter, link: "#", label: "Twitter" },
                    { icon: Instagram, link: "#", label: "Instagram" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-jordy_blue-500/50 hover:bg-jordy_blue-500/10 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div variants={itemVariants} className="relative">
              {/* Glow Effect from behind form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-jordy_blue-500 to-purple-600 rounded-3xl blur opacity-20 pointer-events-none" />

              <form
                onSubmit={handleSubmit}
                className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border shadow-2xl"
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-background/50 border-border focus:border-jordy_blue-500 focus:ring-1 focus:ring-jordy_blue-500 transition-all rounded-xl py-6 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-background/50 border-border focus:border-jordy_blue-500 focus:ring-1 focus:ring-jordy_blue-500 transition-all rounded-xl py-6 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-muted-foreground ml-1">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      required
                      className="bg-background/50 border-border focus:border-jordy_blue-500 focus:ring-1 focus:ring-jordy_blue-500 transition-all rounded-xl py-6 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      className="bg-background/50 border-border focus:border-jordy_blue-500 focus:ring-1 focus:ring-jordy_blue-500 transition-all rounded-xl resize-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full  text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-jordy_blue-500/25 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
