"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { client } from "@/sanity/lib/client";

export default function Checkout() {
  const { cart } = useCart();
  const router = useRouter();

  const [shipmentId, setShipmentId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");

  useEffect(() => {
    setShipmentId(uuidv4());
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email address.";
    if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10-15 digits.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!/^\d{4,10}$/.test(formData.postalCode)) newErrors.postalCode = "Postal code must be 4-10 digits.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderData = {
      _type: "order",
      shipmentId,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      cart: cart.map((item) => ({
        _type: "cartItem",
        productId: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    try {
      await client.create(orderData);
      alert("Order placed successfully!");
      router.push("/");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("An error occurred while placing your order.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty!</h1>
      </div>
    );
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Checkout</h1>
      <p className="text-sm mb-2">
        Shipment ID: <strong>{shipmentId}</strong>
      </p>

      {/* Display Cart Items */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Order Items</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border p-4 rounded-lg bg-gray-50 shadow-md"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Price: ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <p className="text-lg font-semibold">
            Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone", "address", "city", "postalCode", "country"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
              placeholder={`Enter your ${field}`}
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label className="block font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={handlePaymentChange}
            className="w-full border rounded p-2"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {paymentMethod === "Credit Card" && (
          <div>
            <label className="block font-medium">Credit Card Number</label>
            <input
              type="text"
              name="creditCardNumber"
              className="w-full border rounded p-2"
              placeholder="Enter your credit card number"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
