"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Download,
  ShoppingCart,
  Share2,
  FileText,
  Shield,
  RefreshCw,
  Code,
  Lock,
  Package,
  ExternalLink,
} from "lucide-react";

import type { CodeProduct } from "@/lib/types";
import { useCart } from "@/contexts/use-context";
import { toast } from "sonner";

interface CodeDetailsProps {
  code: CodeProduct;
  relatedCodes: CodeProduct[];
}

export function CodeDetails({ code, relatedCodes }: CodeDetailsProps) {
  const { addToCart, isInCart } = useCart();
  const isFree = code.price === 0;
  const hasFile = !!code.sourceFileUrl;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
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
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {code.categories.map((category) => (
                  <Badge key={category}>{category}</Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {code.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {code.description}
              </p>

              <div className="flex items-center gap-4 mt-4">
                {code.downloads > 0 && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="h-4 w-4" />
                    {code.downloads} downloads
                  </div>
                )}
                {code.demoUrl && (
                  <a
                    href={code.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Preview image */}
            <div className="rounded-lg border overflow-hidden">
              <img
                src={code.preview || "/placeholder.svg"}
                alt={`${code.title} preview`}
                className="w-full object-cover"
              />
            </div>

            {/* Source file state */}
            <div className="rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Source Code
                </h3>
                <Badge variant="outline">{code.language}</Badge>
              </div>

              {isFree && hasFile ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This product is free. Click below to download the source code directly.
                  </p>
                  <Button asChild>
                    <a href={code.sourceFileUrl!} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download Source Code
                    </a>
                  </Button>
                </div>
              ) : isFree && !hasFile ? (
                <p className="text-sm text-muted-foreground">
                  Source file not available yet — check back soon.
                </p>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 space-y-3 text-center">
                  <div className="rounded-full bg-muted p-4">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Purchase this product to get instant access to the full source code via a permanent download link.
                  </p>
                  <Button
                    onClick={() => addToCart(code)}
                    disabled={isInCart(code.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isInCart(code.id) ? "Added to Cart" : `Buy for $${code.price}`}
                  </Button>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {code.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Purchase card */}
              <div className="rounded-lg border p-6 space-y-5">
                <div className="text-center">
                  {isFree ? (
                    <div className="text-3xl font-bold text-green-500 mb-1">FREE</div>
                  ) : (
                    <div className="text-3xl font-bold mb-1">
                      <span className="text-xl text-muted-foreground">$</span>
                      {code.price}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">One-time purchase</p>
                </div>

                {code.demoUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={code.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Demo
                    </a>
                  </Button>
                )}

                {isFree && hasFile ? (
                  <Button className="w-full" asChild>
                    <a href={code.sourceFileUrl!} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download Free
                    </a>
                  </Button>
                ) : isFree ? (
                  <Button className="w-full" variant="secondary" disabled>
                    <Package className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => addToCart(code)}
                    disabled={isInCart(code.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isInCart(code.id) ? "In Cart" : "Add to Cart"}
                  </Button>
                )}

                {!isFree && isInCart(code.id) && (
                  <Button className="w-full" variant="secondary" asChild>
                    <Link href="/checkout">Go to Checkout</Link>
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>

                <Separator />

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Full Source Code</p>
                      <p className="text-muted-foreground text-xs">Complete, well-documented</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">License Included</p>
                      <p className="text-muted-foreground text-xs">Commercial use allowed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Permanent Download Link</p>
                      <p className="text-muted-foreground text-xs">No expiry — download anytime</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product details */}
              <div className="rounded-lg border p-6">
                <h3 className="font-semibold mb-4">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span>{code.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span>v{code.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Added</span>
                    <span>{new Date(code.createdAt).toLocaleDateString()}</span>
                  </div>
                  {code.downloads > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downloads</span>
                      <span>{code.downloads}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Related */}
              {relatedCodes.length > 0 && (
                <div className="rounded-lg border p-6">
                  <h3 className="font-semibold mb-4">Related Products</h3>
                  <div className="space-y-4">
                    {relatedCodes.map((related) => (
                      <Link
                        key={related.id}
                        href={`/codes/${related.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-16 h-12 rounded border overflow-hidden shrink-0">
                          <img
                            src={related.preview || "/placeholder.svg"}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                            {related.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {related.price === 0 ? "Free" : `$${related.price}`}
                          </p>
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
