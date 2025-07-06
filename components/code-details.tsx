"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Star,
  Download,
  Eye,
  ShoppingCart,
  Heart,
  Share2,
  Play,
  FileText,
  Shield,
  RefreshCw,
} from "lucide-react";

import type { CodeProduct } from "@/lib/types";
import { useCart } from "@/contexts/use-context";

interface CodeDetailsProps {
  code: CodeProduct;
  relatedCodes: CodeProduct[];
}

export function CodeDetails({ code, relatedCodes }: CodeDetailsProps) {
  const [activeTab, setActiveTab] = useState("preview");
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart(code);
  };

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/codes"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {code.categories.map((category) => (
                  <Badge
                    key={category}
                    className="bg-jordy_blue hover:bg-purple-700"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold mb-4">{code.title}</h1>
              <p className="text-gray-400 text-lg mb-6">{code.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(code.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-gray-400">
                    ({code.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Download className="h-4 w-4" />
                  {code.downloads} downloads
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Eye className="h-4 w-4" />
                  {Math.floor(Math.random() * 1000) + 500} views
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="bg-[#232323] border border-gray-800">
                <TabsTrigger value="preview">Live Preview</TabsTrigger>
                <TabsTrigger value="code">Source Code</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-6">
                <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Run Demo
                    </Button>
                  </div>
                  <div className="aspect-video bg-[#0f0f0f] rounded border border-gray-700 flex items-center justify-center">
                    <img
                      src={code.preview || "/placeholder.svg"}
                      alt={`${code.title} preview`}
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Source Code Preview
                    </h3>
                    <Badge variant="outline">{code.language}</Badge>
                  </div>
                  <pre className="bg-[#0f0f0f] p-4 rounded border border-gray-700 overflow-x-auto text-sm">
                    <code className="text-gray-300">
                      {`// ${code.title} - ${code.language} Code
// This is a preview of the source code

import React from 'react';
import './styles.css';

const ${code.title.replace(/\s+/g, "")} = () => {
  return (
    <div className="container">
      <h1>Welcome to ${code.title}</h1>
      <p>This is a premium code component.</p>
      {/* Full source code available after purchase */}
    </div>
  );
};

export default ${code.title.replace(/\s+/g, "")};`}
                    </code>
                  </pre>
                  <p className="text-gray-400 text-sm mt-4">
                    * Complete source code with all features will be available
                    after purchase
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="documentation" className="mt-6">
                <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">Documentation</h3>
                  <div className="prose prose-invert max-w-none">
                    <h4>Installation</h4>
                    <pre className="bg-[#0f0f0f] p-3 rounded text-sm">
                      <code>
                        npm install{" "}
                        {code.title.toLowerCase().replace(/\s+/g, "-")}
                      </code>
                    </pre>

                    <h4>Usage</h4>
                    <p>
                      Import and use the component in your React application:
                    </p>
                    <pre className="bg-[#0f0f0f] p-3 rounded text-sm">
                      <code>{`import { ${code.title.replace(/\s+/g, "")} } from './${code.title.toLowerCase().replace(/\s+/g, "-")}';`}</code>
                    </pre>

                    <h4>Features</h4>
                    <ul>
                      <li>Fully responsive design</li>
                      <li>TypeScript support</li>
                      <li>Customizable styling</li>
                      <li>Accessibility compliant</li>
                      <li>Well-documented code</li>
                    </ul>

                    <h4>Browser Support</h4>
                    <p>
                      Compatible with all modern browsers including Chrome,
                      Firefox, Safari, and Edge.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div
                      key={review}
                      className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-jordy_blue flex items-center justify-center">
                          <span className="text-sm font-bold">U{review}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">User {review}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">
                              2 days ago
                            </span>
                          </div>
                          <p className="text-gray-300">
                            Excellent code quality! Very well documented and
                            easy to integrate. Saved me hours of development
                            time. Highly recommended!
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {code.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-[#232323] border-gray-700"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Purchase Card */}
              <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                <div className="text-center mb-6">
                  {code.price === 0 ? (
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      FREE
                    </div>
                  ) : (
                    <div className="text-3xl font-bold mb-2">
                      <span className="text-2xl text-gray-400">$</span>
                      {code.price}
                    </div>
                  )}
                  <p className="text-gray-400 text-sm">One-time purchase</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-jordy_blue hover:bg-purple-700"
                    disabled={isInCart(code.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isInCart(code.id)
                      ? "Added to Cart"
                      : code.price === 0
                        ? "Get Free"
                        : "Add to Cart"}
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart
                        className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                      />
                      {isLiked ? "Liked" : "Like"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-800" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Full Source Code</p>
                      <p className="text-sm text-gray-400">
                        Complete, well-documented code
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">License Included</p>
                      <p className="text-sm text-gray-400">
                        Commercial use allowed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Free Updates</p>
                      <p className="text-sm text-gray-400">
                        Lifetime updates included
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Info */}
              <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4">Code Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Language:</span>
                    <span>{code.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">File Size:</span>
                    <span>{Math.floor(Math.random() * 50) + 10} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span>{new Date(code.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version:</span>
                    <span>v{code.version}</span>
                  </div>
                </div>
              </div>

              {/* Related Codes */}
              {relatedCodes.length > 0 && (
                <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Codes</h3>
                  <div className="space-y-4">
                    {relatedCodes.map((relatedCode) => (
                      <Link
                        key={relatedCode.id}
                        href={`/codes/${relatedCode.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-16 h-12 overflow-hidden rounded border border-gray-800">
                            <img
                              src={relatedCode.preview || "/placeholder.svg"}
                              alt={relatedCode.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium group-hover:text-purple-400 transition-colors line-clamp-1 text-sm">
                              {relatedCode.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {relatedCode.price === 0
                                ? "Free"
                                : `$${relatedCode.price}`}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
