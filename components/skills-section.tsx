"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Layout, Server, Smartphone, Layers, Palette, GitBranch } from "lucide-react"

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const skills = [
    {
      category: "Frontend",
      icon: <Layout className="h-6 w-6 text-purple-500" />,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend",
      icon: <Server className="h-6 w-6 text-blue-500" />,
      items: ["Node.js", "Express", "NestJS", "GraphQL", "REST APIs"],
    },
    {
      category: "Database",
      icon: <Database className="h-6 w-6 text-green-500" />,
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma"],
    },
    {
      category: "Mobile",
      icon: <Smartphone className="h-6 w-6 text-yellow-500" />,
      items: ["React Native", "Expo", "Flutter", "Mobile-First Design"],
    },
    {
      category: "DevOps",
      icon: <GitBranch className="h-6 w-6 text-red-500" />,
      items: ["Git", "GitHub Actions", "Docker", "AWS", "Vercel"],
    },
    {
      category: "UI/UX",
      icon: <Palette className="h-6 w-6 text-pink-500" />,
      items: ["Figma", "Adobe XD", "Responsive Design", "Accessibility"],
    },
    {
      category: "Languages",
      icon: <Code className="h-6 w-6 text-indigo-500" />,
      items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
    },
    {
      category: "Architecture",
      icon: <Layers className="h-6 w-6 text-orange-500" />,
      items: ["Microservices", "Serverless", "MVC", "Clean Architecture"],
    },
  ]

  return (
    <section id="skills" className="section-container bg-[#121212]" ref={ref}>
      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <motion.h2 variants={itemVariants} className="section-heading text-center">
          My Skills
        </motion.h2>
        <motion.p variants={itemVariants} className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg">
          I've worked with a variety of technologies in the web development world. Here's a quick overview of my
          technical skillset and areas of expertise.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              variants={itemVariants}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 skill-card"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                {skill.icon}
                <h3 className="text-xl font-bold ml-2">{skill.category}</h3>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-gray-400 flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

