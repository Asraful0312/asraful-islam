"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Search,
  Play,
  Star,
  Users,
  Clock,
  Gamepad2,
  Trophy,
  Filter,
} from "lucide-react";
import type { Game } from "@/lib/types";

interface GamesListingProps {
  games: Game[];
}

export function GamesListing({ games }: GamesListingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(games.map((game) => game.category))),
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || game.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "All" || game.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600";
      case "Medium":
        return "bg-yellow-600";
      case "Hard":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Game <span className="text-jordy_blue">Arcade</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fun interactive games that i vibe coded. Challenge yourself and have
            fun!
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-gray-700 focus:border-jordy_blue"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-jordy_blue-400 hover:bg-jordy_blue-400 rounded-3xl"
                      : "border text-indigo_dye-10 hover:bg-jordy_blue/10 rounded-3xl"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 ml-4">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={
                    selectedDifficulty === difficulty ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={
                    selectedDifficulty === difficulty
                      ? "bg-jordy_blue-400 hover:bg-jordy_blue-400 rounded-3xl"
                      : "border text-indigo_dye-10 hover:bg-jordy_blue/10 rounded-3xl"
                  }
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a1a] rounded-3xl border border-gray-800 p-4 text-center">
            <Gamepad2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{games.length}</div>
            <div className="text-sm text-gray-400">Total Games</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-3xl border border-gray-800 p-4 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {Math.floor(Math.random() * 10000) + 5000}
            </div>
            <div className="text-sm text-gray-400">Players</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-3xl border border-gray-800 p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {Math.floor(Math.random() * 1000) + 500}
            </div>
            <div className="text-sm text-gray-400">High Scores</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-3xl border border-gray-800 p-4 text-center">
            <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {Math.floor(Math.random() * 100) + 50}h
            </div>
            <div className="text-sm text-gray-400">Playtime</div>
          </div>
        </div>

        {/* Games Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGames.map((game) => (
            <motion.div key={game.id} variants={itemVariants}>
              <Card className="bg-[#1a1a1a] border-gray-800 hover:border-jordy_blue-400/50 transition-all duration-300 group h-full flex flex-col rounded-3xl overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden aspect-video rounded-t-lg">
                    <img
                      src={game.thumbnail || "/placeholder.svg"}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-jordy_blue-400 hover:bg-pjordy_blue-400 text-indigo_dye-100">
                        {game.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/games/play/${game.slug}`}>
                        <Button
                          size="lg"
                          className="bg-jordy_blue-400 hover:bg-jordy_blue-400 text-indigo_dye-100 rounded-3xl"
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Play Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(game.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">
                        ({game.plays})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {game.avgPlayTime}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-jordy_blue transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {game.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-[#232323] border-gray-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-400">
                      {game.players}
                    </span>
                  </div>
                  <Button
                    asChild
                    className="bg-jordy_blue-400 hover:bg-pjordy_blue-400 text-indigo_dye-100"
                  >
                    <Link href={`/games/${game.slug}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No games found matching your criteria.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
