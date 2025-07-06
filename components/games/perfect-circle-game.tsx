"use client";
import React, { useState, useRef, useEffect } from "react";

// Define types for points and evaluation result
interface Point {
  x: number;
  y: number;
}

interface EvaluationResult {
  score: number;
  message: string;
  isClosed: boolean;
}

export default function DrawPerfectCircle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [bestScore, setBestScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  // Function to evaluate circle quality
  const evaluateCircle = (points: Point[]): EvaluationResult => {
    if (points.length < 10) {
      return { score: 0, message: "Draw a complete circle!", isClosed: false };
    }

    // Calculate center using average of all points
    const center = points.reduce(
      (acc: Point, point: Point) => ({
        x: acc.x + point.x,
        y: acc.y + point.y,
      }),
      { x: 0, y: 0 }
    );

    center.x /= points.length;
    center.y /= points.length;

    // Calculate average radius and variance
    let avgRadius = 0;
    for (const point of points) {
      const distance = Math.sqrt(
        Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)
      );
      avgRadius += distance;
    }
    avgRadius /= points.length;

    let radiusVariance = 0;
    for (const point of points) {
      const distance = Math.sqrt(
        Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)
      );
      radiusVariance += Math.pow(distance - avgRadius, 2);
    }
    radiusVariance = Math.sqrt(radiusVariance / points.length);

    // Check if circle is closed
    const startPoint = points[0];
    const endPoint = points[points.length - 1];
    const closureDistance = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.y - startPoint.y, 2)
    );
    const maxClosureDistance = avgRadius * 0.2;
    const isClosed = closureDistance < maxClosureDistance;

    // Calculate score
    const maxVariance = avgRadius * 0.5;
    const varianceScore = Math.max(0, 1 - radiusVariance / maxVariance);
    const closureScore = isClosed ? 1 : 0.5;

    let totalScore = Math.round(
      (varianceScore * 0.6 + closureScore * 0.4) * 100
    );
    totalScore = Math.max(0, Math.min(100, totalScore));

    // Get appropriate message
    let message: string;
    if (totalScore >= 95) {
      message = "Perfect circle! You're a true artist! ✨";
    } else if (totalScore >= 85) {
      message = "Excellent! Almost perfect! 🎯";
    } else if (totalScore >= 75) {
      message = "Great job! Very circular! 👏";
    } else if (totalScore >= 60) {
      message = "Good effort! Keep practicing! 💪";
    } else if (totalScore >= 40) {
      message = "Not bad! Try drawing slower? 🖊️";
    } else if (totalScore >= 20) {
      message = "Give it another shot! Practice makes perfect! 🔄";
    } else {
      message = "Hmm, that looks more like abstract art! 🎨";
    }

    return { score: totalScore, message, isClosed };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawCanvas();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [points, showGrid, result]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid if enabled
    if (showGrid) {
      ctx.strokeStyle = "#f0f0f0";
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Draw the circle
    if (points.length > 1) {
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      ctx.stroke();
    }

    // Draw result overlay if exists
    if (result) {
      // Semi-transparent overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Score display
      ctx.fillStyle = "#000000";
      ctx.font = "bold 42px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const scoreText = `${result.score}/100`;
      ctx.fillText(scoreText, canvas.width / 2, canvas.height / 2 - 50);

      // Message
      ctx.font = "18px system-ui, -apple-system, sans-serif";
      ctx.fillText(result.message, canvas.width / 2, canvas.height / 2 + 30);

      // Stats
      ctx.font = "14px system-ui, -apple-system, sans-serif";
      ctx.fillText(
        `Best Score: ${bestScore} | Attempts: ${attempts}`,
        canvas.width / 2,
        canvas.height / 2 + 70
      );
    }
  };

  const getMousePos = (
    e: React.MouseEvent<HTMLCanvasElement>
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const getTouchPos = (
    e: React.TouchEvent<HTMLCanvasElement>
  ): Point | null => {
    if (e.touches.length === 0) return null;
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  };

  const startDrawing = (pos: Point | null) => {
    if (!pos) return;
    setIsDrawing(true);
    setPoints([pos]);
    setResult(null);
  };

  const draw = (pos: Point | null) => {
    if (!pos || !isDrawing || result) return;
    setPoints((prev) => [...prev, pos]);
  };

  const stopDrawing = () => {
    if (!isDrawing || result) return;
    setIsDrawing(false);

    const evaluation = evaluateCircle(points);
    setResult(evaluation);
    setAttempts((prev) => prev + 1);

    if (evaluation.score > bestScore) {
      setBestScore(evaluation.score);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    startDrawing(getMousePos(e));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    draw(getMousePos(e));
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    startDrawing(getTouchPos(e));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    draw(getTouchPos(e));
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  const clearCanvas = () => {
    setPoints([]);
    setResult(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Controls */}
      <div className="absolute top-4 left-4 flex gap-2 overflow-hidden">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-jordy_blue-400 text-indigo_dye-100 rounded-3xl border border-gray-300 rounded-lg shadow-sm  transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="px-4 py-2 bg-jordy_blue-400 text-indigo_dye-100 rounded-3xl border border-gray-300 rounded-lg shadow-sm  transition-colors"
        >
          {showGrid ? "Hide Grid" : "Show Grid"}
        </button>
      </div>

      {/* Instructions */}
      {points.length === 0 && !result && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <h1 className="text-lg md:text-4xl font-bold mb-4">
            Draw a Perfect Circle
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Click and drag to draw your circle
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Best Score: {bestScore} | Attempts: {attempts}
          </p>
        </div>
      )}

      {/* Try Again button */}
      {result && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={clearCanvas}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
