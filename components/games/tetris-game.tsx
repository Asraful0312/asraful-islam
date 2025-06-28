"use client";
import React, { useState, useEffect, useRef } from "react";

const ROWS = 20;
const COLS = 10;
const BLOCKS: { [key: string]: number[][] } = {
  I: [[1, 1, 1, 1]],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

const COLORS: { [key: string]: string } = {
  I: "cyan",
  J: "blue",
  L: "orange",
  O: "yellow",
  S: "#4ade80  ",
  T: "#9333ea",
  Z: "red",
};

// Interfaces
interface Block {
  shape: number[][];
  type: string;
  x: number;
  y: number;
}

type Grid = (string | null)[][];

function getRandomBlock(): Block {
  const keys = Object.keys(BLOCKS);
  const rand = keys[Math.floor(Math.random() * keys.length)];
  return { shape: BLOCKS[rand], type: rand, x: 3, y: 0 };
}

const createEmptyGrid = (): Grid =>
  Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null));

export default function TetrisGame() {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid());
  const [current, setCurrent] = useState<Block | null>(null);
  const [next, setNext] = useState<Block>(getRandomBlock());
  const [hold, setHold] = useState<Block | null>(null);
  const [canHold, setCanHold] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [speed, setSpeed] = useState<number>(1000);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  const merge = (grid: Grid, block: Block) => {
    const newGrid = grid.map((row) => [...row]);
    block.shape.forEach((row, dy) => {
      row.forEach((val, dx) => {
        if (val) newGrid[block.y + dy][block.x + dx] = block.type;
      });
    });
    return newGrid;
  };

  const isValidMove = (shape: number[][], x: number, y: number) => {
    return shape.every((row, dy) =>
      row.every((val, dx) => {
        if (!val) return true;
        const newY = y + dy;
        const newX = x + dx;
        return (
          newY >= 0 &&
          newY < ROWS &&
          newX >= 0 &&
          newX < COLS &&
          !grid[newY][newX]
        );
      })
    );
  };

  const rotate = (shape: number[][]) =>
    shape[0].map((_, i) => shape.map((row) => row[i]).reverse());

  const drop = () => {
    if (!current) return;
    if (isValidMove(current.shape, current.x, current.y + 1)) {
      setCurrent((prev: any) => ({ ...prev, y: prev.y + 1 }));
    } else {
      const newGrid = merge(grid, current);
      clearLines(newGrid);
    }
  };

  const clearLines = (mergedGrid: Grid) => {
    let linesCleared = 0;
    const newGrid = mergedGrid.filter((row) => {
      const full = row.every((cell) => cell !== null);
      if (full) linesCleared++;
      return !full;
    });

    while (newGrid.length < ROWS) {
      newGrid.unshift(Array(COLS).fill(null));
    }

    if (linesCleared) {
      playSound("/clear.mp3");
      const newScore = score + linesCleared * 100;
      setScore(newScore);
      setLevel(1 + Math.floor(newScore / 500));
      setSpeed(1000 - Math.min(800, Math.floor(newScore / 100)));
    }

    setGrid(newGrid);
    const nextBlock = next;
    if (!isValidMove(nextBlock.shape, nextBlock.x, nextBlock.y)) {
      setGameOver(true);
      clearInterval(gameInterval.current as any);
    } else {
      setCurrent(nextBlock);
      setNext(getRandomBlock());
      setCanHold(true);
    }
  };

  const move = (dir: number) => {
    if (!current) return;
    const newX = current.x + dir;
    if (isValidMove(current.shape, newX, current.y)) {
      setCurrent((prev: any) => ({ ...prev, x: newX }));
    }
  };

  const rotateBlock = () => {
    if (!current) return;
    const newShape = rotate(current.shape);
    if (isValidMove(newShape, current.x, current.y)) {
      setCurrent((prev: any) => ({ ...prev, shape: newShape }));
    }
  };

  const holdBlock = () => {
    if (!current || !canHold) return;
    playSound("/hold.mp3");
    if (!hold) {
      setHold(current);
      setCurrent(next);
      setNext(getRandomBlock());
    } else {
      const temp = hold;
      setHold(current);
      setCurrent({ ...temp, x: 3, y: 0 });
    }
    setCanHold(false);
  };

  const drawGrid = () => {
    const tempGrid = grid.map((row) => [...row]);
    if (current) {
      current.shape.forEach((row, dy) => {
        row.forEach((val, dx) => {
          if (val && current.y + dy >= 0) {
            tempGrid[current.y + dy][current.x + dx] = current.type;
          }
        });
      });
    }

    return (
      <div
        id="game-grid"
        onClick={() => started && !gameOver && rotateBlock()}
        className="grid grid-rows-[repeat(20,_1fr)] grid-cols-[repeat(10,_1fr)] gap-[1px] bg-gray-800 touch-none select-none"
        style={{ width: 300, height: 550 }}
      >
        {tempGrid.flat().map((cell, idx) => (
          <div
            key={idx}
            className="w-full h-full border "
            style={{ backgroundColor: cell ? COLORS[cell] : "#111" }}
          />
        ))}
      </div>
    );
  };

  const drawMini = (block: Block) => {
    if (!block) return null;
    return block.shape.map((row, y) => (
      <div key={y} style={{ display: "flex" }}>
        {row.map((val, x) => (
          <div
            key={x}
            style={{
              backgroundColor: val ? COLORS[block.type] : "#111",
            }}
            className="size-5 border"
          />
        ))}
      </div>
    ));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!started || gameOver) return;
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowDown") drop();
      if (e.key === "ArrowUp") rotateBlock();
      if (e.key === "c") holdBlock();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, grid, started]);

  useEffect(() => {
    if (started && current && !gameOver) {
      clearInterval(gameInterval.current as any);
      gameInterval.current = setInterval(drop, speed);
      return () => clearInterval(gameInterval.current as any);
    }
  }, [current, speed, started]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const threshold = 30;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold)
          move(1); // Swipe right
        else if (deltaX < -threshold) move(-1); // Swipe left
      } else {
        if (deltaY > threshold)
          drop(); // Swipe down
        else if (deltaY < -threshold) holdBlock(); // Swipe up
      }
    };

    const gridEl = document.getElementById("game-grid");
    gridEl?.addEventListener("touchstart", handleTouchStart);
    gridEl?.addEventListener("touchend", handleTouchEnd);

    return () => {
      gridEl?.removeEventListener("touchstart", handleTouchStart);
      gridEl?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [started, gameOver, current]);

  const startGame = () => {
    setGrid(createEmptyGrid());
    setScore(0);
    setLevel(1);
    setSpeed(1000);
    setGameOver(false);
    setHold(null);
    setNext(getRandomBlock());
    const block = getRandomBlock();
    setCurrent(block);
    setStarted(true);
  };

  return (
    <div
      style={{
        textAlign: "center",
        color: "#fff",
        fontFamily: "monospace",
        padding: "10px",
      }}
    >
      {started && (
        <div className="flex items-start justify-between w-full max-w-2xl mx-auto">
          <div>
            <h1>Tetris</h1>

            <h3 className="text-lg">🎯 Score: {score}</h3>
            <h3 className="text-lg">⚡ Level: {level}</h3>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <h4 className="font-semibold">Next:</h4>
              {drawMini(next)}
            </div>
            <div>
              <h4 className="font-semibold">Hold:</h4>
              {drawMini(hold as Block)}
            </div>
          </div>
        </div>
      )}

      {!started ? (
        <button
          onClick={startGame}
          className="p-[10px] rounded-sm bg-primary text-white mt-20"
        >
          Start Game
        </button>
      ) : (
        <>
          {gameOver && <h2 className="text-red-600 text-xl">Game Over</h2>}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div>{drawGrid()}</div>
          </div>
        </>
      )}
      <p className="mt-4 text-sm text-gray-400">
        Pc Controls: ← → ↑ ↓, C = Hold
      </p>
      <p className="text-sm mt-4 text-gray-400 block md:hidden">
        Mobile Controls: Tap to rotate, swipe to move/drop/hold
      </p>

      {/* Mobile Controls */}
      {started && !gameOver && (
        <div className="flex flex-wrap justify-center gap-2 mt-4 md:hidden">
          <button
            onClick={() => move(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ← Left
          </button>
          <button
            onClick={() => move(1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            → Right
          </button>
          <button
            onClick={rotateBlock}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ⟲ Rotate
          </button>
          <button
            onClick={drop}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            ↓ Drop
          </button>
          <button
            onClick={holdBlock}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            ⏸ Hold
          </button>
        </div>
      )}
    </div>
  );
}
