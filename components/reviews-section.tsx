"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

export function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });


  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

  ];


  return (
    <section id="reviews" className="section-container overflow-hidden py-20 bg-background" ref={ref}>
      <div className="text-center mb-10">
        <h2 className="section-heading">
          Client <span className="dark:text-jordy_blue text-jordy_blue-400">Testimonials</span>
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Don't just take my word for it. Here's what clients and colleagues
          have to say about working with me.
        </p>
      </div>

      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-card rounded-3xl p-6 border border-border flex flex-col items-center text-center hover:border-jordy_blue/30 transition-colors shadow-none">
          <div className="bg-jordy_blue/10 p-4 rounded-full mb-4">
            <span className="text-2xl font-bold text-jordy_blue-400 dark:text-jordy_blue">25+</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">Projects</h3>
          <p className="text-muted-foreground">
            Successfully completed for clients across various industries
          </p>
        </div>

        <div className="bg-card rounded-3xl p-6 border border-border flex flex-col items-center text-center hover:border-jordy_blue/30 transition-colors shadow-none">
          <div className="bg-jordy_blue/10 p-4 rounded-full mb-4">
            <span className="text-2xl font-bold text-jordy_blue-400 dark:text-jordy_blue">5+</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">Years</h3>
          <p className="text-muted-foreground">
            Of experience in web development and design
          </p>
        </div>

        <div className="bg-card rounded-3xl p-6 border border-border flex flex-col items-center text-center hover:border-jordy_blue/30 transition-colors shadow-none">
          <div className="bg-jordy_blue/10 p-4 rounded-full mb-4">
            <span className="text-2xl font-bold text-jordy_blue-400 dark:text-jordy_blue">100%</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">Satisfaction</h3>
          <p className="text-muted-foreground">
            Client satisfaction rate with project deliverables
          </p>
        </div>
      </div>
    </section>
  );
}
