"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Product, Order } from "../types/product";
import Image from "next/image";

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

        const productsData = await client.fetch(
          `
          *[_type == "products"]{
            _id,
            title,
            description,
            price,
            "image_url": image.asset->url,
            inventory,
            priceWithoutDiscount,
            tags,
            badge,
            userId
          }
          `
        );
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

      <div className="flex flex-col items-center align-middle md:flex-col md:w-full gap-4">
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
            <ul className="mt-4 p-2 grid grid-cols-1 md:grid-cols-3 md:gap-4">
              {products.map((product: Product) => (
                <li key={product._id} className="text-sm">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      width={300}
                      height={200}
                    />
                  ) : (
                    <div className="w-[300px] h-[200px] bg-gray-300 flex items-center justify-center text-white">No Image</div> // Fallback content
                  )}
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
