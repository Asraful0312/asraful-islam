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
  Download,
  Eye,
  Code,
  ShoppingCart,
  Filter,
  SlidersHorizontal,
  Package,
} from "lucide-react";

import type { CodeProduct } from "@/lib/types";
import { useCart } from "@/contexts/use-context";
import { stripMarkdown } from "@/lib/utils";

interface CodesListingProps {
  codes: CodeProduct[];
}

export function CodesListing({ codes }: CodesListingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const { addToCart, isInCart } = useCart();

  const categories = [
    "All",
    ...Array.from(new Set(codes.flatMap((code) => code.categories))),
  ];
  const priceRanges = ["All", "Free", "$1-$25", "$26-$50", "$50+"];

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
        if (priceFilter === "$1-$25") return code.price > 0 && code.price <= 25;
        if (priceFilter === "$26-$50") return code.price > 25 && code.price <= 50;
        if (priceFilter === "$50+") return code.price > 50;
        return true;
      })();
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "popular") return b.downloads - a.downloads;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Code Marketplace
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Source code, templates, and components built by Asraful Islam — ready to drop into your project.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Downloaded</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 ml-4">
              {priceRanges.map((range) => (
                <Button
                  key={range}
                  variant={priceFilter === range ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setPriceFilter(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {filteredCodes.length} product{filteredCodes.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCodes.map((code) => (
            <motion.div
              key={code.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <Card className="group h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden aspect-video rounded-t-lg">
                    <img
                      src={code.preview || "/placeholder.svg"}
                      alt={code.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary">{code.categories[0]}</Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      {code.price === 0 ? (
                        <Badge className="bg-green-600 hover:bg-green-700 text-white">
                          FREE
                        </Badge>
                      ) : (
                        <Badge className="bg-primary">${code.price}</Badge>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/codes/${code.slug}`}>
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 flex-1 space-y-3">
                  <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1">
                    {code.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {code.descriptionFormat === "markdown"
                      ? stripMarkdown(code.description)
                      : code.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {code.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Code className="h-3 w-3" />
                      {code.language}
                    </span>
                    {code.downloads > 0 && (
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {code.downloads}
                      </span>
                    )}
                  </div>

                  {code.price === 0 && code.sourceFileUrl ? (
                    <Button size="sm" variant="secondary" asChild>
                      <a href={code.sourceFileUrl} download>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => addToCart(code)}
                      disabled={isInCart(code.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {isInCart(code.id)
                        ? "In Cart"
                        : code.price === 0
                        ? "Get Free"
                        : `$${code.price}`}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredCodes.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {codes.length === 0
                ? "No products yet — check back soon."
                : "No products match your filters."}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
