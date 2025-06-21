"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import type { CodeProduct } from "@/lib/types";

interface CartContextType {
  items: CodeProduct[];
  addToCart: (product: CodeProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CodeProduct[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: CodeProduct) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev; // Already in cart
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const isInCart = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
