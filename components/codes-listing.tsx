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
  Star,
  Download,
  Eye,
  Code,
  ShoppingCart,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

import type { CodeProduct } from "@/lib/types";
import { useCart } from "@/contexts/use-context";

interface CodesListingProps {
  codes: CodeProduct[];
}

export function CodesListing({ codes }: CodesListingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const { addToCart } = useCart();

  const categories = [
    "All",
    ...Array.from(new Set(codes.flatMap((code) => code.categories))),
  ];
  const priceRanges = ["All", "Free", "$1-$10", "$11-$25", "$26-$50", "$50+"];

  const filteredCodes = codes
    .filter((code) => {
      const matchesSearch =
        code.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" ||
        code.categories.includes(selectedCategory);

      const matchesPrice = (() => {
        if (priceFilter === "All") return true;
        if (priceFilter === "Free") return code.price === 0;
        if (priceFilter === "$1-$10") return code.price > 0 && code.price <= 10;
        if (priceFilter === "$11-$25")
          return code.price > 10 && code.price <= 25;
        if (priceFilter === "$26-$50")
          return code.price > 25 && code.price <= 50;
        if (priceFilter === "$50+") return code.price > 50;
        return true;
      })();

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return b.downloads - a.downloads;
        case "rating":
          return b.rating - a.rating;
        default: // newest
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
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

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Code Marketplace
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Premium code snippets, templates, and components to accelerate your
            development workflow.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-gray-700 focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
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
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-gray-700 hover:bg-purple-600/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 ml-4">
              {priceRanges.map((range) => (
                <Button
                  key={range}
                  variant={priceFilter === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriceFilter(range)}
                  className={
                    priceFilter === range
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-gray-700 hover:bg-green-600/10"
                  }
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredCodes.length} of {codes.length} code products
          </p>
        </div>

        {/* Codes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCodes.map((code) => (
            <motion.div key={code.id} variants={itemVariants}>
              <Card className="bg-[#1a1a1a] border-gray-800 hover:border-purple-500/50 transition-all duration-300 group h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden aspect-video rounded-t-lg">
                    <img
                      src={code.preview || "/placeholder.svg"}
                      alt={code.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-purple-600 hover:bg-purple-700">
                        {code.categories[0]}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      {code.price === 0 ? (
                        <Badge className="bg-green-600 hover:bg-green-700">
                          FREE
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-600 hover:bg-blue-700">
                          ${code.price}
                        </Badge>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/codes/${code.slug}`}>
                        <Button
                          size="sm"
                          className="bg-white text-black hover:bg-gray-200"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
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
                            i < Math.floor(code.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">
                        ({code.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Download className="h-3 w-3" />
                      {code.downloads}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {code.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {code.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {code.tags.slice(0, 3).map((tag) => (
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
                    <Code className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-400">
                      {code.language}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/codes/${code.slug}`}>View Details</Link>
                    </Button>
                    <Button
                      onClick={() => addToCart(code)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {code.price === 0 ? "Get Free" : `$${code.price}`}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredCodes.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No code products found matching your criteria.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
