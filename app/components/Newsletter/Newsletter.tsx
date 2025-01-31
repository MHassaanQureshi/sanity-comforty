import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/product";
import { client } from "@/sanity/lib/client";
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

export default async function Newsletter() {

  const products = await getProducts();

  
  const selectedProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 ">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold p-2">
          Or subscribe to the newsletter
        </h1>
        <span className="flex w-full gap-3 items-center justify-center">
          <input
            type="text"
            className="bg-transparent border-b-2 border-black"
          />
          <button className="border-b-2 border-black">
            <Link href="" className="text-sm">
              SUBMIT
            </Link>
          </button>
        </span>
      </div>
      <div className="w-full p-2 flex flex-col text-center">
        <h1 className="text-md font-bold p-2">
          Follow products and discounts on Instagram
        </h1>
        <span className="grid grid-cols-2 grid-rows-3 md:grid-cols-6 md:grid-rows-1 w-full place-items-center gap-2 md:gap-4 lg:gap-6 p-2 md:p-4">
          {selectedProducts.map((product: Product) => (
            <Link href={`/product/${product._id}`} key={product._id}>
            <Image
              
              src={product.image_url}
              alt={product.title || "Product Image"}
              width={150} // Default size for small screens
              height={150}
              className="md:w-36 md:h-36 lg:w-44 lg:h-44"
            />
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
}
