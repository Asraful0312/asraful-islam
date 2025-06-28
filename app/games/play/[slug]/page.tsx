import { FlappyBirdGame } from "@/components/games/flappy-bird-game";
import { MemoryGame } from "@/components/games/memory-game";
import DrawPerfectCircle from "@/components/games/perfect-circle-game";
import { PongGame } from "@/components/games/pong-game";
import { SnakeGame } from "@/components/games/snake-game";
import TetrisGame from "@/components/games/tetris-game";

import { TicTacToeGame } from "@/components/games/tic-tac-toe";
import React from "react";

const GamePlayPage = ({ params }: { params: { slug: string } }) => {
  const renderGame = () => {
    switch (params.slug) {
      case "snake":
        return <SnakeGame />;
      case "tic-tac-toe":
        return <TicTacToeGame />;
      case "memory-cards":
        return <MemoryGame />;
      case "pong":
        return <PongGame />;
      case "tetris":
        return <TetrisGame />;
      case "flappy-bird":
        return <FlappyBirdGame />;
      case "draw-a-perfect-circle":
        return <DrawPerfectCircle />;
      default:
        return (
          <div className="flex items-center justify-center h-96 bg-[#0f0f0f] rounded-lg border border-gray-700">
            <p className="text-gray-400">Game not implemented yet</p>
          </div>
        );
    }
  };
  return <div>{renderGame()}</div>;
};

export default GamePlayPage;
