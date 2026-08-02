"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { CheckCircle2, Download, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/contexts/use-context";

export function CheckoutSuccess({ token }: { token: string }) {
  const order = useQuery(
    api.billing.getOrderByToken,
    token ? { token } : "skip"
  );
  const { removeFromCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (order?.status === "paid" && !cleared.current) {
      cleared.current = true;
      order.products.forEach((p) => removeFromCart(p.productId));
    }
  }, [order, removeFromCart]);

  if (!token) {
    return (
      <div className="section-container pt-32 pb-20 text-center">
        <XCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Invalid checkout link</h1>
        <Button asChild className="mt-4">
          <Link href="/codes">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }

  if (order === undefined) {
    return (
      <div className="section-container pt-32 pb-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="section-container pt-32 pb-20 text-center">
        <XCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order not found</h1>
        <Button asChild className="mt-4">
          <Link href="/codes">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }

  if (order.status === "pending") {
    return (
      <div className="section-container pt-32 pb-20 text-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground mx-auto" />
        <h1 className="text-2xl font-bold">Confirming your payment…</h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          This usually takes just a few seconds — this page updates automatically once Creem confirms the payment.
        </p>
      </div>
    );
  }

  if (order.status === "failed") {
    return (
      <div className="section-container pt-32 pb-20 text-center space-y-4">
        <XCircle className="h-14 w-14 text-red-500 mx-auto" />
        <h1 className="text-2xl font-bold">Payment failed</h1>
        <p className="text-muted-foreground text-sm">
          Your payment wasn't completed. No charge was made.
        </p>
        <Button asChild>
          <Link href="/checkout">Back to Checkout</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="section-container pt-32 pb-20">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold">Payment successful!</h1>
        <p className="text-muted-foreground">
          A receipt was sent to {order.buyerEmail}. Download your source code below.
        </p>

        <div className="space-y-3">
          {order.products.map((product) => (
            <div
              key={product.slug}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <span className="font-medium">{product.title}</span>
              {product.sourceFileUrl ? (
                <Button asChild size="sm">
                  <a href={product.sourceFileUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">
                  File unavailable — contact support
                </span>
              )}
            </div>
          ))}
        </div>

        <Button asChild variant="outline">
          <Link href="/codes">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
