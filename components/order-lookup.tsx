"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Download,
  Loader2,
  PackageSearch,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

function LookupForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const requestOrderLookup = useMutation(api.billing.requestOrderLookup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      await requestOrderLookup({ email });
      setSent(true);
    } catch {
      toast.error("Something went wrong — try again");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4">
        <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold">Check your inbox</h1>
        <p className="text-muted-foreground text-sm">
          If <strong>{email}</strong> has any paid orders, we've sent a link
          to view them — it's valid for 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <PackageSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground text-sm">
          Enter the email you used at checkout — we'll send you a secure link
          to view your orders and downloads.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="lookup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="lookup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Send me my orders"
          )}
        </Button>
      </form>
    </div>
  );
}

function LookupResults({ token }: { token: string }) {
  const result = useQuery(api.billing.getOrdersByLookupToken, { token });

  if (result === undefined) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold">Link expired or invalid</h1>
        <p className="text-muted-foreground text-sm">
          This lookup link is no longer valid. Request a new one below.
        </p>
        <LookupForm />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
        <p className="text-muted-foreground text-sm">{result.email}</p>
      </div>

      {result.orders.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No paid orders found for this email.
        </p>
      ) : (
        <div className="space-y-4">
          {result.orders.map((order) => (
            <div key={order.orderId} className="border rounded-lg p-5">
              <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                <span>{format(new Date(order.createdAt), "PPP")}</span>
                <span className="font-semibold text-foreground">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="space-y-3">
                {order.products.map((product) => (
                  <div
                    key={product.slug}
                    className="flex items-center justify-between gap-4"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function OrderLookup({ token }: { token: string | null }) {
  return (
    <div className="section-container pt-32 pb-20">
      {token ? <LookupResults token={token} /> : <LookupForm />}
    </div>
  );
}
