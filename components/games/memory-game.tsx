"use client";

import { useState, useEffect } from "react";

interface MemoryGameProps {
  onScoreUpdate: (score: number) => void;
}

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const symbols = ["🎮", "🎯", "🎲", "🎪", "🎨", "🎭", "🎸", "🎺"];

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        value: symbol,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      cards[cardId].isFlipped ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard].value === cards[secondCard].value) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard || card.id === secondCard
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches(matches + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard || card.id === secondCard
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="mb-4 text-center">
        <div className="text-xl font-bold mb-2">
          Moves: {moves} | Matches: {matches}/{symbols.length}
        </div>
        {gameWon && (
          <div className="text-green-400 text-lg">
            Congratulations! You won in {moves} moves!
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-16 h-16 rounded text-2xl font-bold transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? "bg-jordy_blue text-white"
                : "bg-[#1a1a1a] border border-gray-700 hover:bg-[#232323]"
            } ${card.isMatched ? "opacity-75" : ""}`}
            disabled={
              card.isFlipped || card.isMatched || flippedCards.length === 2
            }
          >
            {card.isFlipped || card.isMatched ? card.value : "?"}
          </button>
        ))}
      </div>

      <button
        onClick={initializeGame}
        className="px-6 py-2 bg-jordy_blue hover:bg-purple-700 rounded text-white"
      >
        New Game
      </button>
    </div>
  );
}
