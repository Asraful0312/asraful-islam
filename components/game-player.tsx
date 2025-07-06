"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, RotateCcw, Trophy, Star, Share2 } from "lucide-react";

import type { Game } from "@/lib/types";
import Image from "next/image";

interface GamePlayerProps {
  game: Game;
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const generateGmaeLink = () => {
    switch (game.slug) {
      case "snake":
        return "snake";
      case "tic-tac-toe":
        return "tic-tac-toe";
      case "memory-cards":
        return "memory-cards";
      case "pong":
        return "pong";
      case "tetris":
        return "tetris";
      case "flappy-bird":
        return "flappy-bird";
      case "draw-a-perfect-circle":
        return "draw-a-perfect-circle";
      default:
        return "";
    }
  };

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/games"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-jordy_blue">{game.category}</Badge>
                <Badge
                  className={`${
                    game.difficulty === "Easy"
                      ? "bg-green-600"
                      : game.difficulty === "Medium"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                >
                  {game.difficulty}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
              <p className="text-gray-400 text-lg mb-6">{game.description}</p>
            </div>

            {/* Game Canvas */}
            <Card className="bg-[#1a1a1a] border-gray-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  {game.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-auto bg-[#0f0f0f] rounded-lg border border-gray-700 overflow-hidden">
                  <figure className="relative">
                    <Image
                      src={game.thumbnail}
                      width={500}
                      height={400}
                      className="aspect-video w-full brightness-50"
                      alt={game.title}
                    />
                    <Link href={`/games/play/${game.slug}`}>
                      <Button
                        size="lg"
                        className="bg-jordy_blue-400 text-indigo_dye-100 hover:bg-jordy_blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Play Now
                      </Button>
                    </Link>
                  </figure>
                </div>
              </CardContent>
            </Card>

            {/* Game Tabs */}
            <Tabs defaultValue="instructions" className="mb-8">
              <TabsList className="bg-[#232323] border border-gray-800">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>

              <TabsContent value="instructions" className="mt-6">
                <Card className="bg-[#1a1a1a] border-gray-800">
                  <CardHeader>
                    <CardTitle>How to Play</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      {game.instructions.map((instruction, index) => (
                        <p key={index} className="mb-2">
                          <strong>Step {index + 1}:</strong> {instruction}
                        </p>
                      ))}
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Controls:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {game.controls.map((control, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-[#232323]">
                              {control.key}
                            </Badge>
                            <span className="text-sm text-gray-400">
                              {control.action}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-6">
                <Card className="bg-[#1a1a1a] border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Top Scores
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((rank) => (
                        <div
                          key={rank}
                          className="flex items-center justify-between p-3 bg-[#232323] rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                rank === 1
                                  ? "bg-yellow-600"
                                  : rank === 2
                                    ? "bg-gray-400"
                                    : rank === 3
                                      ? "bg-orange-600"
                                      : "bg-gray-600"
                              }`}
                            >
                              {rank}
                            </div>
                            <span>Player {rank}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              {Math.floor(Math.random() * 10000) + 1000}
                            </div>
                            <div className="text-xs text-gray-400">
                              {Math.floor(Math.random() * 30) + 1} days ago
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <Card className="bg-[#1a1a1a] border-gray-800">
                  <CardHeader>
                    <CardTitle>Player Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((comment) => (
                        <div
                          key={comment}
                          className="p-4 bg-[#232323] rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-jordy_blue flex items-center justify-center text-sm font-bold">
                              P{comment}
                            </div>
                            <span className="font-medium">
                              Player {comment}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Great game! Really addictive and fun to play. The
                            controls are smooth and responsive.
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Game Stats */}
              <Card className="bg-[#1a1a1a] border-gray-800">
                <CardHeader>
                  <CardTitle>Game Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Your Best:</span>
                    <span className="font-bold text-purple-400">
                      {highScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{game.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Plays:</span>
                    <span>{game.plays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Avg Time:</span>
                    <span>{game.avgPlayTime}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Share */}
              <Card className="bg-[#1a1a1a] border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share Game
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      Facebook
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="bg-[#1a1a1a] border-gray-800">
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-[#232323] border-gray-700"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
