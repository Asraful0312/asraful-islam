"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingBag, CreditCard } from "lucide-react";

import Link from "next/link";
import { useCart } from "@/contexts/use-context";

export function CheckoutPage() {
  const { items, removeFromCart, getTotalPrice } = useCart();

  // TODO: wire up Creem checkout here
  const handleCreemCheckout = () => {
    alert("Creem payment integration coming soon!");
  };

  if (items.length === 0) {
    return (
      <div className="section-container pt-24">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">
            Add some amazing code products to get started!
          </p>
          <Button asChild className="bg-jordy_blue hover:bg-purple-700">
            <Link href="/codes">Browse Codes</Link>
          </Button>
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
        <h1 className="text-3xl font-bold mb-8 gradient-text">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary ({items.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg"
                  >
                    <div className="w-16 h-12 overflow-hidden rounded border border-border">
                      <img
                        src={item.preview || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.language}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {item.price === 0 ? "Free" : `$${item.price}`}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Separator className="bg-border" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee:</span>
                    <span>$0.00</span>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-400">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment — Creem placeholder */}
          <div>
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-dashed border-border p-6 text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Powered by{" "}
                    <span className="font-semibold text-foreground">Creem</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Creem checkout will open here once the integration is wired up.
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={handleCreemCheckout}
                  disabled={items.length === 0}
                >
                  Pay ${getTotalPrice().toFixed(2)} with Creem
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
