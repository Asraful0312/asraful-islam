"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import React, { useState, useEffect, useRef } from "react";

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
  isAnimating?: boolean;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [animatingText, setAnimatingText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const currentUser = useQuery(api.auth.loggedInUser);

  const displayName = currentUser?.name
    ? currentUser.name
    : currentUser?.email
      ? currentUser?.email?.split("@")[0]
      : "guest";

  console.log(currentUser);

  const animateText = async (text: string, callback: () => void) => {
    const skipAnimation = text.length > 200; // or based on a user setting

    if (skipAnimation) {
      setAnimatingText(text);
      setIsAnimating(false);
      callback();
      return;
    }

    setIsAnimating(true);
    setAnimatingText("");

    let currentText = "";

    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setAnimatingText(currentText);
      await new Promise((resolve) =>
        setTimeout(resolve, 1 + Math.random() * 1)
      );
    }

    setTimeout(() => {
      setIsAnimating(false);
      callback();
    }, 50);
  };

  const renderWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const commands = {
    help: `Available commands:
┌─────────────┬──────────────────────────────────────┐
│ Command     │ Description                          │
├─────────────┼──────────────────────────────────────┤
│ help        │ Show this help message               │
│ about       │ Learn about me                       │
│ projects    │ View my projects                     │
│ skills      │ List technical skills                │
│ contact     │ Get contact information              │
│ experience  │ View work experience                 │
│ clear       │ Clear the terminal                   │
│ whoami      │ Display current user info            │
│ ls          │ List directory contents              │
│ pwd         │ Print working directory              │
│ date        │ Show current date and time           │
│ history     │ Show command history                 │
│ home        │ Go back to home page                 │
└─────────────┴──────────────────────────────────────┘`,

    about: `About Me
════════════════════════════════════════════════════════════════
Hello! I'm Asraful, a passionate full-stack developer with a love.

🚀 I love building interactive web applications using React, Next.js, 
   and TypeScript. My focus is on creating clean, efficient, and 
   user-friendly applications.

💡 Always learning and exploring new technologies to stay current 
   with the rapidly evolving web development landscape.

🎯 Goal: To create meaningful digital experiences that solve real 
   problems and delight users.`,

    projects: `My Projects
════════════════════════════════════════════════════════════════
Here are some of my featured projects:

┌─ Extract Images ────────────────────────────────────────────────┐
│ Extract text from images built with Next.js 14                  │
│ 🔗 https://github.com/Asraful0312/image-wizard                   │
│ 🌐 https://imagetotextnow.xyz/                       │
│ 🛠️  Next.js, TypeScript, Tailwind CSS, Prisma                  │
└────────────────────────────────────────────────────────────────┘

┌─ E-commerce website ───────────────────────────────────────────┐
│ E-commerce website built using wordpress and nextjs            │
│ 🌐 https://ajhar-rashed.com/                                  │
│ 🛠️  Nextjs, TypeScript, Wordpress, Woocommerce                │
└────────────────────────────────────────────────────────────────┘

Type 'project <n>' for more details on a specific project.`,

    skills: `Technical Skills
════════════════════════════════════════════════════════════════
Frontend Technologies:
├── React.js (Hooks, Context API, Custom Hooks)
├── Next.js (SSR, SSG, API Routes, App Router)
├── TypeScript (Advanced Types, Generics)
├── JavaScript (ES6+, Async/Await, Promises)
├── HTML5 & CSS3 (Flexbox, Grid, Animations)
├── Tailwind CSS (Responsive Design, Utilities)
└── Styled Components & CSS Modules

Backend & Database:
├── Node.js (Express, RESTful APIs)
├── tRPC (Type-safe APIs)
├── PostgreSQL & MongoDB
├── Prisma ORM
└── Firebase & Supabase

Tools & Workflow:
├── Git & GitHub (Version Control)
├── Docker (Containerization)
├── Vercel & Netlify (Deployment)
├── VS Code (Primary IDE)
├── Figma (UI/UX Design)
└── Jest & Testing Library (Testing)

Current Learning:
├── Python (Machine Learning)
├── GraphQL (API Query Language)
└── Three.js (3D Web Graphics)`,

    contact: `Contact Information
════════════════════════════════════════════════════════════════
Let's connect! Feel free to reach out through any of these channels:

📧 Email:     asrafulislam0312@gmail.com
🐙 GitHub:    https://github.com/Asraful0312
💼 LinkedIn:  https://linkedin.com/
🐦 Twitter:   https://twitter.com/
🌐 Website:   https://asraful-islam-s9s6.vercel.app/
📱 Discord:   asraful0312

💬 I'm always open to discussing new opportunities, collaborations,
   or just chatting about technology and development!

🕐 Response Time: Usually within 24 hours`,

    experience: `Work Experience
════════════════════════════════════════════════════════════════
┌─ Senior Frontend Developer @ Tech Corp ───────────────────────┐
│ 2023 - Present                                                │
│ • Lead development of React-based web applications            │
│ • Mentor junior developers and conduct code reviews          │
│ • Implement modern CI/CD practices and testing strategies    │
│ • Technologies: React, Next.js, TypeScript, AWS              │
└────────────────────────────────────────────────────────────────┘

┌─ Full Stack Developer @ StartupXYZ ───────────────────────────┐
│ 2021 - 2023                                                   │
│ • Built scalable web applications from ground up             │
│ • Collaborated with design team to implement pixel-perfect UI│
│ • Optimized application performance and user experience      │
│ • Technologies: React, Node.js, PostgreSQL, Docker           │
└────────────────────────────────────────────────────────────────┘

┌─ Junior Developer @ WebSolutions ─────────────────────────────┐
│ 2020 - 2021                                                   │
│ • Developed responsive websites and web applications          │
│ • Maintained and updated existing client projects            │
│ • Learned modern development practices and workflows         │
│ • Technologies: HTML, CSS, JavaScript, React                 │
└────────────────────────────────────────────────────────────────┘`,

    whoami: `${displayName}@terminal-portfolio:~$
Current user: ${displayName}
System: Terminal Portfolio v2.0
Shell: /bin/bash
Home: /home/terminal/${displayName}
Access Level: Visitor`,

    ls: `total 8
drwxr-xr-x  2 guest guest 4096 Jul 01 2025 projects/
drwxr-xr-x  2 guest guest 4096 Jul 01 2025 skills/
drwxr-xr-x  2 guest guest 4096 Jul 01 2025 experience/
-rw-r--r--  1 guest guest  256 Jul 01 2025 about.txt
-rw-r--r--  1 guest guest  128 Jul 01 2025 contact.txt
-rw-r--r--  1 guest guest   64 Jul 01 2025 README.md`,

    pwd: `/home/terminal/${displayName}/portfolio`,

    home: "Redirecting to home page...",

    date: () => new Date().toLocaleString(),

    history: () => {
      return commandHistory.length > 0
        ? commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join("\n")
        : "No commands in history yet.";
    },
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string): string => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "") return "";

    if (trimmedCmd === "clear") {
      setHistory([]);
      return "";
    }

    if (trimmedCmd.startsWith("project ")) {
      const projectName = trimmedCmd.split(" ")[1];
      return `Project details for "${projectName}" - Feature coming soon! 
Use 'projects' to see all available projects.`;
    }

    if (trimmedCmd === "date") {
      return commands.date();
    }

    if (trimmedCmd === "history") {
      return commands.history();
    }

    if (trimmedCmd === "home") {
      location.href = "/";
    }

    if (trimmedCmd in commands) {
      return commands[trimmedCmd as keyof typeof commands] as string;
    }

    return `Command '${cmd}' not found. Type 'help' to see available commands.`;
  };

  const handleSubmit = (e: React.KeyboardEvent | React.FormEvent) => {
    e.preventDefault();

    if (input.trim() && !isAnimating) {
      const command = input.trim();
      const output = executeCommand(command);

      if (command.toLowerCase() === "clear") {
        setHistory([]);
        setInput("");
        return;
      }

      // Add command to history immediately
      const newEntry: CommandHistory = {
        command,
        output: "",
        timestamp: new Date(),
        isAnimating: true,
      };

      setHistory((prev) => [...prev, newEntry]);
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
      setInput("");

      // Animate the output
      animateText(output, () => {
        setHistory((prev) =>
          prev.map((entry, index) =>
            index === prev.length - 1
              ? { ...entry, output, isAnimating: false }
              : entry
          )
        );
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isAnimating && e.key === "Enter") {
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono text-sm p-4">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="mb-6">
          <div className="text-green-300 mb-2">
            ╭─────────────────────────────────────────────────────────────────╮
          </div>
          <div className="text-green-300 mb-2">
            │ Welcome to Terminal Portfolio - Interactive Developer Showcase │
          </div>
          <div className="text-green-300 mb-2">
            ╰─────────────────────────────────────────────────────────────────╯
          </div>
          <div className="text-green-500 mb-4">
            Type 'help' to get started or explore the available commands.
          </div>
        </div>

        {/* Terminal Content */}

        <div
          ref={terminalRef}
          className="max-h-96 overflow-y-auto mb-4  rounded "
          onClick={() => !isAnimating && inputRef.current?.focus()}
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-4">
              <div className="text-green-500">
                <span className="text-green-300">{displayName}@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ </span>
                <span className="text-green-400">{entry.command}</span>
              </div>
              <div className="text-green-400 whitespace-pre-wrap mt-1 ml-0">
                {entry.isAnimating ? (
                  <div className="flex items-center">
                    <span>{renderWithLinks(animatingText)}</span>
                    <span className="ml-1 animate-pulse text-green-300">█</span>
                  </div>
                ) : (
                  renderWithLinks(entry.output)
                )}
              </div>
            </div>
          ))}

          {/* Show current animation if animating */}
          {isAnimating && history.length === 0 && (
            <div className="mb-4">
              <div className="text-green-400 whitespace-pre-wrap">
                <div className="flex items-center">
                  <span>{renderWithLinks(animatingText)}</span>
                  <span className="ml-1 animate-pulse text-green-300">█</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Command Input */}
        {!isAnimating && (
          <div className="flex items-center">
            <span className="text-green-300">{displayName}@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                } else {
                  handleKeyDown(e);
                }
              }}
              className="flex-1 bg-transparent text-green-400 outline-none ml-2 caret-green-400"
              placeholder={isAnimating ? "Processing..." : "Type a command..."}
              autoComplete="off"
              spellCheck="false"
              disabled={isAnimating}
            />
            {isAnimating && (
              <span className="ml-2 animate-spin text-green-400">⟳</span>
            )}
          </div>
        )}

        {/* Footer */}
        {/* <div className="mt-8 text-center text-green-600 text-xs">
          Built with React + TypeScript | Use arrow keys for command history
        </div> */}
      </div>
    </div>
  );
};

export default Terminal;
