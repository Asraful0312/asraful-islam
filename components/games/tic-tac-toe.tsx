"use client";

import { useState } from "react";

export function TicTacToeGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isDraw = board.every((square) => square !== null) && !winner;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="mb-4 text-center">
        <div className="text-2xl font-bold mb-2">
          {winner
            ? `Winner: ${winner}`
            : isDraw
              ? "It's a Draw!"
              : `Next Player: ${isXNext ? "X" : "O"}`}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-[#1a1a1a] border border-gray-700 rounded text-3xl font-bold hover:bg-[#232323] transition-colors"
            disabled={!!square || !!winner}
          >
            <span
              className={square === "X" ? "text-purple-400" : "text-blue-400"}
            >
              {square}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
      >
        New Game
      </button>
    </div>
  );
}
