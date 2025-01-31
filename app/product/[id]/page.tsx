import ProductClientComponent from "./ProductClientComponent";
import { Product } from "@/app/types/product";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

async function fetchProduct(id: string): Promise<Product | null> {
  try {
    return await client.fetch<Product>(
      `*[_type == "products" && _id == $productId][0]{
        _id,
        title,
        description,
        price,
        inventory,
        "image_url": image.asset->url
      }`,
      { productId: id }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; 

  if (!resolvedParams?.id) {
    return notFound();
  }

  const product = await fetchProduct(resolvedParams.id);

  if (!product) {
    return notFound();
  }

  return <ProductClientComponent product={product} />;
}

export async function generateStaticParams() {
  const products: { _id: string }[] = await client.fetch(`*[_type == "products"]{_id}`);
  return products.map((product) => ({ id: product._id }));
}


export const revalidate = 60;
