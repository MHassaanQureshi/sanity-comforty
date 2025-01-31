"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "../types/product";
import { client } from "@/sanity/lib/client";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCart: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const syncCartToSanity = async (updatedCart: CartItem[]) => {
    try {
      const operations = updatedCart.map((item) => ({
        _type: "cartItem",
        _id: item._id,
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url,
        userId: item.userId || "defaultUserId", // Ensure userId is passed
      }));

      await client.createOrReplace({
        _type: "cart",
        _id: `cart_${"defaultUserId"}`, // Use user-specific ID
        items: operations,
      });
    } catch (error) {
      console.error("Error syncing cart with Sanity:", error);
    }
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];

      syncCartToSanity(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== id);
      syncCartToSanity(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    syncCartToSanity([]);
  };

  const updateCart = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id ? { ...item, quantity } : item
      );
      syncCartToSanity(updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
