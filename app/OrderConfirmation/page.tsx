"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type CartItem = {
  productId: string;
  title: string;
  quantity: number;
  price: number;
};

type Order = {
  shipmentId: string;
  customer: Customer;
  cart: CartItem[];
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
};

export default function OrderConfirmation() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data: Order[] = await client.fetch(`
          *[_type == "order"]{
            shipmentId,
            customer,
            cart,
            paymentMethod,
            createdAt,
            estimatedDelivery
          }
        `);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (!orders.length) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold">No Orders Yet!</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Your Orders</h1>
      <div className="p-4 flex flex-col items-center align-middle md:flex-row md:gap-5">
        {orders.map((order) => (
          <div key={order.shipmentId} className="border p-4 rounded shadow-md bg-gray-50">
            <h2 className="font-bold text-lg">Shipment ID: {order.shipmentId}</h2>
            <p><strong>Customer:</strong> {order.customer.name}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
            <p><strong>Address:</strong> {order.customer.address}, {order.customer.city}, {order.customer.country}</p>
            <p><strong>Postal Code:</strong> {order.customer.postalCode}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
            <div className="mt-3">
              <h3 className="font-bold text-lg">Order Items:</h3>
              {order.cart.map((item) => (
                <div key={item.productId} className="ml-4">
                  <p>{item.title} (x{item.quantity}) - ${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
