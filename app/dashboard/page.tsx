"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Product , Order } from "../types/product";

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [customization, setCustomization] = useState<boolean>(false);
  
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const ordersData = await client.fetch('*[_type == "order"]');
        setOrders(ordersData);
        setOrderCount(ordersData.length);

        const productsData = await client.fetch('*[_type == "products"]');
        setProducts(productsData);
        setProductCount(productsData.length);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, [router]);

  const handleCustomization = () => {
    setCustomization(!customization);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-2xl">{orderCount} Orders</p>
          {orders.length > 0 && (
            <ul className="mt-4">
              {orders.map((order: Order) => (
                <li key={order._id} className="text-sm">
                  <strong>{order.customer.name}</strong> - Shipment ID: {order.shipmentId}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-2xl">{productCount} Products</p>
          {products.length > 0 && (
            <ul className="mt-4">
              {products.map((product: Product) => (
                <li key={product._id} className="text-sm">
                  <strong>{product.title}</strong> - Price: ${product.price} - Inventory: {product.inventory}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Product Customization</h2>
          <button
            onClick={handleCustomization}
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          >
            {customization ? "Stop Customizing" : "Start Customizing"}
          </button>
          {customization && <p className="mt-4">Customize your products here.</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
