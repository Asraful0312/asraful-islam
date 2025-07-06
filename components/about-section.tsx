"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  return (
    <section id="about" className="section-container" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="section-heading text-center"
        >
          About <span className="text-jordy_blue">Me</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center ">
          <motion.div variants={itemVariants} className="md:col-span-3 ">
            <p className="text-gray-300 mb-4 text-lg">
              Hello! I'm Asraful, a passionate full-stack developer with a love
              for creating beautiful, functional, and user-friendly websites and
              applications. My journey in web development began in 2018, and
              I've been hooked ever since.
            </p>
            <p className="text-gray-300 mb-4 text-lg">
              I specialize in JavaScript ecosystems, particularly React,
              Next.js, and Node.js. I enjoy working on both the front-end and
              back-end, crafting seamless experiences that users love.
            </p>
            <p className="text-gray-300 text-lg">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or enjoying outdoor
              activities. I believe in continuous learning and pushing the
              boundaries of what's possible on the web.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-gray-800">
                <img
                  src="/man.jpg"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
