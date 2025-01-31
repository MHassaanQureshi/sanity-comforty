"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { CartItem } from "../types/product"; // Adjusted path to the correct type file

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateCart } = useCart();
  const router = useRouter();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const subtotal: number = cart.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );
  const estimatedDelivery = 0; // Free delivery
  const total: number = subtotal + estimatedDelivery;

  const updateQuantity = ({
    productId,
    newQuantity,
  }: {
    productId: string;
    newQuantity: number;
  }): void => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      showNotification("Item removed from cart", "success");
    } else {
      updateCart(productId, newQuantity);
      showNotification("Cart updated successfully", "success");
    }
  };

  const syncCartWithSanity = async (): Promise<void> => {
    try {
      for (const item of cart) {
        const existingDoc = await client.fetch(
          `*[_type == "cartItem" && productId == $id][0]`,
          { id: item._id }
        );
  
        if (existingDoc) {
          // Update the existing document with the _id
          await client
            .patch(existingDoc._id) // Using existing _id from fetched doc
            .set({
              title: item.title,
              quantity: item.quantity,
              price: item.price,
              image_url: item.image_url,
              userId: item.userId, // Ensure this is passed
            })
            .commit();
        } else {
          // Create a new document if it doesn't exist
          await client.create({
            _type: "cartItem",
            productId: item._id, // No _id here, Sanity will generate it
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            image_url: item.image_url,
            userId: item.userId, // Ensure this is passed
          });
        }
      }
      showNotification("Cart synced successfully with database!", "success");
    } catch (error) {
      console.error("Error syncing cart with Sanity:", error);
      showNotification("Failed to sync cart. Please try again.", "error");
    }
  };
  

  return (
    <div className="p-6 md:flex md:gap-10">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {notification && (
        <div
          className={`fixed top-4 right-4 p-3 rounded-lg shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex flex-col w-full">
        {cart.length === 0 ? (
          <p className="text-center mt-4">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item: CartItem) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md gap-4 flex-wrap"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image_url || "/fallback-image.jpg"}
                      alt={item.title || "Product image"}
                      width={100}
                      height={100}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity({
                          productId: item._id,
                          newQuantity: item.quantity - 1,
                        })
                      }
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity({
                          productId: item._id,
                          newQuantity: item.quantity + 1,
                        })
                      }
                    >
                      +
                    </button>
                    <span className="font-bold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="text-red-500"
                      onClick={() => {
                        removeFromCart(item._id);
                        showNotification("Item removed from cart", "success");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  clearCart();
                  showNotification("Cart cleared successfully", "success");
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
      {cart.length > 0 && (
        <div className="flex flex-col w-full max-w-sm bg-gray-50 p-6 rounded-lg shadow-md mt-6 md:mt-0">
          <h2 className="font-bold text-xl mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Estimated Delivery:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="bg-[#007580] text-white py-2 rounded-lg w-full"
            onClick={() => {
              syncCartWithSanity();
              router.push("/checkout");
            }}
          >
            Member Checkout
          </button>
        </div>
      )}
    </div>
  );
}
