"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingBag, CreditCard, Download, Loader2 } from "lucide-react";

import Link from "next/link";
import { useCart } from "@/contexts/use-context";
import { toast } from "sonner";

export function CheckoutPage() {
  const { items, removeFromCart, getTotalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const startCheckout = useAction(api.billing.startCheckout);

  const paidItems = items.filter((item) => item.price > 0);

  const handleBuy = async (itemId: string) => {
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email first — it's how you'll get your receipt");
      return;
    }
    setLoadingId(itemId);
    try {
      const { url } = await startCheckout({
        productId: itemId as Id<"products">,
        buyerEmail: email,
      });
      window.location.href = url;
    } catch (e: any) {
      toast.error(e.message || "Could not start checkout");
      setLoadingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="section-container pt-24">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some amazing code products to get started!
          </p>
          <Button asChild>
            <Link href="/codes">Browse Codes</Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Already bought something?{" "}
            <Link href="/orders" className="underline hover:text-foreground">
              Track your order
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 gradient-text">Checkout</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Each product is a separate, secure Creem payment — hit "Pay" next to
          the item you want.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cart */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Cart ({items.length} item{items.length !== 1 ? "s" : ""})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-card rounded-lg border"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-16 h-12 overflow-hidden rounded border border-border shrink-0">
                        <img
                          src={item.preview || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="outline" className="text-xs max-w-[160px] truncate">
                            {item.language}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {item.price === 0 ? "Free" : `$${item.price}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 shrink-0">
                      {item.price === 0 ? (
                        item.sourceFileUrl ? (
                          <Button size="sm" variant="secondary" asChild>
                            <a href={item.sourceFileUrl} download>
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground shrink-0">
                            Unavailable
                          </span>
                        )
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleBuy(item.id)}
                          disabled={loadingId === item.id}
                        >
                          {loadingId === item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            `Pay $${item.price}`
                          )}
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Separator className="bg-border" />

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {paidItems.length} paid item{paidItems.length !== 1 ? "s" : ""}
                  </span>
                  <span className="font-semibold">
                    ${getTotalPrice().toFixed(2)} total
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for your Creem receipt and to tie the purchase to your download.
                  </p>
                </div>

                <div className="rounded-lg border border-dashed border-border p-6 text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Powered by{" "}
                    <span className="font-semibold text-foreground">Creem</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Clicking "Pay" opens a secure Creem checkout for that product.
                    After payment you'll land on a success page with your download link.
                  </p>
                </div>

                {paidItems.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    No paid items in your cart yet — free items can be downloaded directly.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
