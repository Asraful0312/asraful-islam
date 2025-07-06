"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { useCart } from "@/contexts/use-context";

export function CartIcon() {
  const { items } = useCart();

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/checkout">
        <ShoppingCart className="h-5 w-5" />
        {items.length > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-jordy_blue text-xs">
            {items.length}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
