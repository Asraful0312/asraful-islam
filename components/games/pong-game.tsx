"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface PongGameProps {
  onScoreUpdate: (score: number) => void;
}

export function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameState, setGameState] = useState({
    ball: { x: 200, y: 150, dx: 3, dy: 3 },
    playerPaddle: { y: 125 },
    aiPaddle: { y: 125 },
  });

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 300;
  const PADDLE_HEIGHT = 50;
  const PADDLE_WIDTH = 10;
  const BALL_SIZE = 8;

  const resetBall = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        dx: Math.random() > 0.5 ? 3 : -3,
        dy: (Math.random() - 0.5) * 4,
      },
    }));
  }, []);

  const gameLoop = useCallback(() => {
    if (!isPlaying) return;

    setGameState((prev) => {
      const newState = { ...prev };

      // Move ball
      newState.ball.x += newState.ball.dx;
      newState.ball.y += newState.ball.dy;

      // Ball collision with top/bottom walls
      if (
        newState.ball.y <= 0 ||
        newState.ball.y >= CANVAS_HEIGHT - BALL_SIZE
      ) {
        newState.ball.dy = -newState.ball.dy;
      }

      // Ball collision with paddles
      if (
        newState.ball.x <= PADDLE_WIDTH &&
        newState.ball.y >= newState.playerPaddle.y &&
        newState.ball.y <= newState.playerPaddle.y + PADDLE_HEIGHT
      ) {
        newState.ball.dx = -newState.ball.dx;
        newState.ball.x = PADDLE_WIDTH;
      }

      if (
        newState.ball.x >= CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE &&
        newState.ball.y >= newState.aiPaddle.y &&
        newState.ball.y <= newState.aiPaddle.y + PADDLE_HEIGHT
      ) {
        newState.ball.dx = -newState.ball.dx;
        newState.ball.x = CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE;
      }

      // Scoring
      if (newState.ball.x < 0) {
        setAiScore((prev) => prev + 1);
        setTimeout(resetBall, 1000);
      } else if (newState.ball.x > CANVAS_WIDTH) {
        setPlayerScore((prev) => {
          const newScore = prev + 1;

          return newScore;
        });
        setTimeout(resetBall, 1000);
      }

      // AI paddle movement
      const aiCenter = newState.aiPaddle.y + PADDLE_HEIGHT / 2;
      const ballCenter = newState.ball.y + BALL_SIZE / 2;
      if (aiCenter < ballCenter - 10) {
        newState.aiPaddle.y = Math.min(
          newState.aiPaddle.y + 2,
          CANVAS_HEIGHT - PADDLE_HEIGHT
        );
      } else if (aiCenter > ballCenter + 10) {
        newState.aiPaddle.y = Math.max(newState.aiPaddle.y - 2, 0);
      }

      return newState;
    });
  }, [isPlaying, resetBall]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, [gameLoop]);

  // Handle mouse movement for player paddle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPlaying) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      setGameState((prev) => ({
        ...prev,
        playerPaddle: {
          y: Math.max(
            0,
            Math.min(mouseY - PADDLE_HEIGHT / 2, CANVAS_HEIGHT - PADDLE_HEIGHT)
          ),
        },
      }));
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      return () => canvas.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isPlaying]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#0f0f0f";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = "#374151";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = "#8b5cf6";
    ctx.fillRect(0, gameState.playerPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(
      CANVAS_WIDTH - PADDLE_WIDTH,
      gameState.aiPaddle.y,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );

    // Draw ball
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(gameState.ball.x, gameState.ball.y, BALL_SIZE, BALL_SIZE);
  }, [gameState]);

  const resetGame = () => {
    setPlayerScore(0);
    setAiScore(0);
    setIsPlaying(false);
    resetBall();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="mb-4 text-center">
        <div className="text-xl font-bold mb-2">
          Player: {playerScore} | AI: {aiScore}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-gray-700 rounded cursor-none"
      />

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-jordy_blue hover:bg-purple-700 rounded text-white"
        >
          {isPlaying ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
        >
          Reset
        </button>
      </div>

      <div className="mt-2 text-center text-sm text-gray-400">
        Move your mouse to control the left paddle
      </div>
    </div>
  );
}
