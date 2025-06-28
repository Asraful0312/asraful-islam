"use client";

import { useFullscreen } from "@mantine/hooks";
import { useState, useEffect, useRef, useCallback } from "react";

interface FlappyBirdGameProps {
  onScoreUpdate: (score: number) => void;
}

export function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bird, setBird] = useState({ y: 150, velocity: 0 });
  const [pipes, setPipes] = useState<{ x: number; gap: number }[]>([]);
  const { ref, toggle, fullscreen } = useFullscreen();

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 300;
  const BIRD_SIZE = 20;
  const PIPE_WIDTH = 50;
  const PIPE_GAP = 100;
  const GRAVITY = 0.5;
  const JUMP_FORCE = -8;

  const resetGame = useCallback(() => {
    setBird({ y: 150, velocity: 0 });
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
  }, []);

  const gameLoop = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setBird((prevBird) => {
      const newBird = {
        y: prevBird.y + prevBird.velocity,
        velocity: prevBird.velocity + GRAVITY,
      };

      // Check ground/ceiling collision
      if (newBird.y <= 0 || newBird.y >= CANVAS_HEIGHT - BIRD_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return prevBird;
      }

      return newBird;
    });

    setPipes((prevPipes) => {
      let newPipes = prevPipes.map((pipe) => ({ ...pipe, x: pipe.x - 2 }));

      // Remove pipes that are off screen
      newPipes = newPipes.filter((pipe) => pipe.x > -PIPE_WIDTH);

      // Add new pipes
      if (
        newPipes.length === 0 ||
        newPipes[newPipes.length - 1].x < CANVAS_WIDTH - 200
      ) {
        newPipes.push({
          x: CANVAS_WIDTH,
          gap: Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 100) + 50,
        });
      }

      // Check pipe collision
      newPipes.forEach((pipe) => {
        if (
          pipe.x < 50 + BIRD_SIZE &&
          pipe.x + PIPE_WIDTH > 50 &&
          (bird.y < pipe.gap || bird.y + BIRD_SIZE > pipe.gap + PIPE_GAP)
        ) {
          setGameOver(true);
          setIsPlaying(false);
        }

        // Score when passing pipe
        if (pipe.x + PIPE_WIDTH === 50) {
          setScore((prevScore) => {
            const newScore = prevScore + 1;

            return newScore;
          });
        }
      });

      return newPipes;
    });
  }, [isPlaying, gameOver, bird.y]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, [gameLoop]);

  const jump = useCallback(() => {
    if (!isPlaying || gameOver) return;
    setBird((prev) => ({ ...prev, velocity: JUMP_FORCE }));
  }, [isPlaying, gameOver]);

  // Handle spacebar and click
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [jump]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw bird
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(50, bird.y, BIRD_SIZE, BIRD_SIZE);

    // Draw pipes
    ctx.fillStyle = "#228B22";
    pipes.forEach((pipe) => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gap);
      // Bottom pipe
      ctx.fillRect(
        pipe.x,
        pipe.gap + PIPE_GAP,
        PIPE_WIDTH,
        CANVAS_HEIGHT - pipe.gap - PIPE_GAP
      );
    });
  }, [bird, pipes]);

  return (
    <iframe
      ref={ref}
      src="https://prototype-projects.vercel.app/bird.html"
      width="100%"
      className="h-screen"
      loading="lazy"
    ></iframe>
  );
}
