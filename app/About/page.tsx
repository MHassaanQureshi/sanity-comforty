import AboutDiff from "../components/AboutDiff/AboutDiff";
import AboutHero from "../components/AboutHero/AboutHero";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Product } from "../types/product";
import Image from "next/image";

const getProducts = async () => {
  const products = await client.fetch(
    `
    *[_type == "products"]{
      
      "image_url": image.asset->url
    }
    `
  );
  return products;
};

export default async function About() {
  const products = await getProducts();
  const selectedProducts = products.slice(0, 5);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <AboutHero />
      </div>

      <div className="flex w-full flex-col justify-center items-center gap-20 pt-4 pb-4 mt-10">
        <div className="flex items-center justify-center flex-col md:flex-row">
          <AboutDiff
            img="/images/delivery.png"
            text1="Next day as standard"
            text2="Order before 3pm and get your order the next day as standard"
          />
          <AboutDiff
            img="/images/Checkmark.png"
            text1="Made by true artisans"
            text2="Handmade crafted goods made with real passion and craftmanship"
          />
          <AboutDiff
            img="/images/Purchase.png"
            text1="Unbeatable prices"
            text2="For our materials and quality you won’t find better prices anywhere"
          />
          <AboutDiff
            img="/images/Sprout.png"
            text1="Recycled Packaging"
            text2="We use 100% recycled to ensure our footprint is more manageable"
          />
        </div>
      </div>

      <div className="w-full flex flex-col p-2 mt-20 md:mt-32">
        <h1 className="text-2xl font-bold p-2">Featured Products</h1>
        <div className="w-full flex flex-col items-center mt-5 gap-4 md:flex-row md:justify-center md:gap-10">
          {selectedProducts.map((product: Product) => (
            <Link href={`/product/${product._id}`} key={product._id}>
           <div >
             <Image src={product.image_url} width={400} height={100} alt={product.title} />
           </div>
           </Link>
          ))}
        </div>
      </div>
    </>
  );
}
