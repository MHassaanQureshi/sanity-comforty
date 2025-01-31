import { client } from "@/sanity/lib/client";

import { Product } from "./types/product";
import Categorycard from "./components/Categorycard/Categorycard";
import Explore from "./components/Explore/Explore";
import Hero from "./components/Hero-section/Hero";
import NewProduct from "./components/NewProduct/NewProduct";
import NotSaleProduct from "./components/NotSaleProduct/NotSaleProduct";
import Partners from "./components/Partners/Partners";
import SaleProductcard from "./components/SaleProductcard/SaleProductcard";

const getCategory = async () => {
  const category = await client.fetch(
    `
    *[_type == "categories"]{
      _id,
      title,
      "image_url": image.asset->url
    }
    `
  );
  return category;
};
const getProducts = async () => {
  const products = await client.fetch(
    `
    *[_type == "products"]{
      _id,
      title,
      description,
      inventory,
      price,
      priceWithoutDiscount,
      tags,
      badge,
      "image_url": image.asset->url
    }
    `
  );
  return products;
};
const getRandomProducts = (products: Product[], count: number) => {
  
  const shuffled = products.sort(() => Math.random() - 0.5);
  
  
  return shuffled.slice(0, count);
};
export default async function Home() {
  const products = await getProducts();
  const category = await getCategory();
  const randomProducts = getRandomProducts(products, 8);
  const newProduct = products.find((product: Product) => product._id === "newProductId");
  const saleProduct = products.find((product: Product) => product._id === "saleProductId");
  const notSaleProduct = products.find((product: Product) => product._id === "notSaleProductId");

  return (
    <>
      <div className="w-[full] flex items-center justify-center">
        <Hero />
      </div>
      <div className="flex justify-center mt-10">
        <Partners />
      </div>
      <div className="w-full flex flex-col p-2 mt-10">
        <h1 className="text-2xl font-bold p-2">Featured Products</h1>
        <div className="w-[full] flex flex-col items-center mt-5 gap-4 md:flex-row md:justify-center md:gap-10">
          {newProduct && <NewProduct product={newProduct} />}
          {saleProduct && <SaleProductcard product={saleProduct} />}
          {notSaleProduct && <NotSaleProduct product={notSaleProduct} />}
        </div>
      </div>
      <div className="w-full flex flex-col p-2 mt-10 items-center">
        <h1 className="text-2xl font-bold p-2">Top Categories</h1>
        <div className="w-[80%] flex flex-col place-items-center mt-5 gap-10 items-center md:flex-row md:justify-center">
        <Categorycard categories={category} />
        </div>
      </div>
      <div className="w-[full] mt-10 p-2 flex items-center justify-center">
        <Explore imageUrl={randomProducts.map((product) => product.image_url)}/>
      </div>
      <div className="w-full items-center flex flex-col p-2 mt-10">
        <h1 className="text-2xl font-bold p-2">Our Products</h1>
        <div className="w-[80%] grid grid-cols-2 mt-5 gap-10 items-center justify-center md:flex-row md:justify-center md:grid-cols-3 lg:grid-cols-4 md:gap-10">
          {products.map((product: Product) => (
            <NotSaleProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
