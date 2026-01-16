"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

interface Ghost {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  scared: boolean;
  scaredTime: number;
}

const FloatingGhostsCanvas: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ghostsRef = useRef<Ghost[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Initialize ghosts
  useEffect(() => {
    const createGhosts = (): Ghost[] =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: 20 + Math.random() * 15,
        opacity: 0.7 + Math.random() * 0.3,
        scared: false,
        scaredTime: 0,
      }));

    ghostsRef.current = createGhosts();
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ghostsRef.current = ghostsRef.current.map((ghost) => {
        let { x, y, vx, vy, scared, scaredTime } = ghost;
        const dx = mousePosRef.current.x - (x + ghost.size / 2);
        const dy = mousePosRef.current.y - (y + ghost.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Scare ghost if too close
        if (distance < 80 && !scared) {
          scared = true;
          scaredTime = Date.now();
          const angle = Math.atan2(dy, dx);
          vx = -Math.cos(angle) * 5;
          vy = -Math.sin(angle) * 5;
        }

        // Reset scared state
        if (scared && Date.now() - scaredTime > 1500) {
          scared = false;
          const angle = Math.random() * Math.PI * 2;
          vx = Math.cos(angle) * 2;
          vy = Math.sin(angle) * 2;
        }

        if (!scared) {
          vx += (Math.random() - 0.5) * 0.2;
          vy += (Math.random() - 0.5) * 0.2;

          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > 2.5) {
            vx = (vx / speed) * 2.5;
            vy = (vy / speed) * 2.5;
          }
        }

        x += vx;
        y += vy;

        // Bounce off walls
        if (x <= 0 || x >= canvas.width - ghost.size) vx *= -1;
        if (y <= 0 || y >= canvas.height - ghost.size) vy *= -1;

        // Draw ghost
        ctx.save();
        ctx.globalAlpha = ghost.opacity;
        ctx.translate(x + ghost.size / 2, y + ghost.size / 2);
        ctx.scale(scared ? 0.8 : 1, scared ? 0.8 : 1);

        // Ghost body
        ctx.fillStyle = scared ? "rgba(255, 200, 200, 0.8)" : resolvedTheme === "dark" ? "white" : "#9ca3af";
        ctx.beginPath();
        ctx.arc(0, 0, ghost.size / 2, 0, Math.PI, true);
        ctx.lineTo(-ghost.size / 2, ghost.size / 2);
        for (let i = -1.5; i <= 1.5; i++) {
          ctx.arc(
            i * (ghost.size / 6),
            ghost.size / 2,
            ghost.size / 10,
            0,
            Math.PI,
            true
          );
        }
        ctx.closePath();
        ctx.fill();

        // Eyes
        ctx.fillStyle = scared ? "red" : "black";
        const eyeOffset = ghost.size / 6;
        ctx.beginPath();
        ctx.arc(-eyeOffset, -eyeOffset, 2, 0, 2 * Math.PI);
        ctx.arc(eyeOffset, -eyeOffset, 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();

        return { ...ghost, x, y, vx, vy, scared, scaredTime };
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
    />
  );
};

export default FloatingGhostsCanvas;
