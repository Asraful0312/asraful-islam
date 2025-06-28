import type { Game } from "./types";

const games: Game[] = [
  {
    id: "game-1",
    title: "Snake vs Snake",
    slug: "snake",
    description:
      "Snake game where AI will play the game with Another AI or AI will play with the user. you eat food to grow longer while avoiding walls and your own tail.",
    thumbnail: "/games/snake.png",
    category: "Arcade",
    difficulty: "Hard",
    rating: 4.5,
    plays: 15420,
    avgPlayTime: "5 min",
    players: "Single Player",
    tags: ["classic", "arcade", "retro"],
    instructions: [
      "Choose Snake vs Snake or Player vs Snake in Snake vs Snake the Snake will play automatically",
      "Use arrow keys to control the snake",
      "Eat the red food to grow longer",
      "Avoid hitting walls or your own tail",
      "Try to get the highest score possible",
    ],
    controls: [
      { key: "↑", action: "Move Up" },
      { key: "↓", action: "Move Down" },
      { key: "←", action: "Move Left" },
      { key: "→", action: "Move Right" },
    ],
  },
  {
    id: "perfect-circle",
    title: "Draw a perfect circle",
    slug: "draw-a-perfect-circle",
    description:
      "Snake game where AI will play the game with Another AI or AI will play with the user. you eat food to grow longer while avoiding walls and your own tail.",
    thumbnail: "/games/circle.png",
    category: "Arcade",
    difficulty: "Hard",
    rating: 4.5,
    plays: 15420,
    avgPlayTime: "5 min",
    players: "Single Player",
    tags: ["classic", "arcade", "retro"],
    instructions: [
      "Choose Snake vs Snake or Player vs Snake in Snake vs Snake the Snake will play automatically",
      "Use arrow keys to control the snake",
      "Eat the red food to grow longer",
      "Avoid hitting walls or your own tail",
      "Try to get the highest score possible",
    ],
    controls: [
      { key: "↑", action: "Move Up" },
      { key: "↓", action: "Move Down" },
      { key: "←", action: "Move Left" },
      { key: "→", action: "Move Right" },
    ],
  },
  {
    id: "game-2",
    title: "Tic Tac Toe",
    slug: "tic-tac-toe",
    description:
      "Classic strategy game for two players. Get three in a row to win!",
    thumbnail: "/games/tictactoe.png",
    category: "Strategy",
    difficulty: "Easy",
    rating: 4.2,
    plays: 8930,
    avgPlayTime: "3 min",
    players: "Two Players",
    tags: ["strategy", "classic", "multiplayer"],
    instructions: [
      "Players take turns placing X and O",
      "First player to get 3 in a row wins",
      "Rows can be horizontal, vertical, or diagonal",
      "Game ends in a draw if board is full",
    ],
    controls: [{ key: "Click", action: "Place mark" }],
  },
  {
    id: "game-3",
    title: "Memory Cards",
    slug: "memory-cards",
    description:
      "Test your memory by matching pairs of cards. Flip cards to find matching symbols.",
    thumbnail: "/games/memory.png",
    category: "Puzzle",
    difficulty: "Medium",
    rating: 4.7,
    plays: 12650,
    avgPlayTime: "8 min",
    players: "Single Player",
    tags: ["memory", "puzzle", "cards"],
    instructions: [
      "Click on cards to flip them over",
      "Find matching pairs of symbols",
      "Remember where each symbol is located",
      "Match all pairs to win the game",
    ],
    controls: [{ key: "Click", action: "Flip card" }],
  },
  // {
  //   id: "game-4",
  //   title: "Pong",
  //   slug: "pong",
  //   description:
  //     "Classic arcade game. Control your paddle to hit the ball and score against the AI opponent.",
  //   thumbnail: "/placeholder.svg?height=300&width=400",
  //   category: "Arcade",
  //   difficulty: "Medium",
  //   rating: 4.3,
  //   plays: 9870,
  //   avgPlayTime: "10 min",
  //   players: "Single Player vs AI",
  //   tags: ["classic", "arcade", "sports"],
  //   instructions: [
  //     "Move your paddle up and down to hit the ball",
  //     "Prevent the ball from reaching your side",
  //     "Score points when the ball passes the AI paddle",
  //     "First to reach the target score wins",
  //   ],
  //   controls: [{ key: "Mouse", action: "Move paddle" }],
  // },
  {
    id: "game-5",
    title: "Tetris",
    slug: "tetris",
    description:
      "Arrange falling blocks to create complete lines. Clear lines to score points and prevent the stack from reaching the top.",
    thumbnail: "/games/tetris.png",
    category: "Puzzle",
    difficulty: "Easy",
    rating: 4.8,
    plays: 18750,
    avgPlayTime: "15 min",
    players: "Single Player",
    tags: ["puzzle", "classic", "blocks"],
    instructions: [
      "Rotate and move falling blocks",
      "Create complete horizontal lines",
      "Lines disappear when completed",
      "Game ends when blocks reach the top",
    ],
    controls: [
      { key: "←→", action: "Move block" },
      { key: "↓", action: "Drop faster" },
      { key: "↑", action: "Rotate block" },
    ],
  },
  {
    id: "game-6",
    title: "Flappy Bird",
    slug: "flappy-bird",
    description:
      "Navigate a bird through pipes by tapping to flap. Simple controls, challenging gameplay!",
    thumbnail: "/games/bird.png",
    category: "Arcade",
    difficulty: "Hard",
    rating: 4.1,
    plays: 22340,
    avgPlayTime: "4 min",
    players: "Single Player",
    tags: ["arcade", "endless", "challenging"],
    instructions: [
      "Tap or press space to make the bird flap",
      "Navigate through the gaps in pipes",
      "Avoid hitting pipes or the ground",
      "Score points for each pipe passed",
    ],
    controls: [
      { key: "Space", action: "Flap wings" },
      { key: "Click", action: "Flap wings" },
    ],
  },
];

export function getAllGames(): Game[] {
  return games.sort((a, b) => b.plays - a.plays);
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  return games.filter((game) => game.category === category);
}

export function getGamesByDifficulty(difficulty: string): Game[] {
  return games.filter((game) => game.difficulty === difficulty);
}
