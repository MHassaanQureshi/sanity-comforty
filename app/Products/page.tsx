import { client } from "@/sanity/lib/client";
import Products from "./Products";
import { Product} from "../types/product";

const getProducts = async (): Promise<Product[]> => {
  try {
    const products = await client.fetch(
      `*[_type == "products"]{
        _id,
        title,
        description,
        inventory,
        price,
        priceWithoutDiscount,
        tags,
        badge,
        "image_url": image.asset->url
      }`
    );
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

// const getCategory = async (): Promise<Category[]> => {
//   try {
//     const category = await client.fetch(
//       `*[_type == "categories"]{
//         _id,
//         title,
//         "image_url": image.asset->url
//       }`
//     );
//     return category;
//   } catch (error) {
//     console.error("Failed to fetch categories:", error);
//     return [];
//   }
// };

export default async function ProductsPage() {
  const products = await getProducts();
  

  return (
    <Products products={products}  />
  );
}
