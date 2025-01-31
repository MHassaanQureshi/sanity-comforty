import { client } from "@/sanity/lib/client";
import { Product  } from "../types/product"; 

// Fetch products from Sanity
export const getProducts = async (): Promise<Product[]> => {
  try {
    const products = await client.fetch(
      `
      *[_type == "products"]{
        _id,
        title,
        description,
        price,
        image_url,
        inventory,
        priceWithoutDiscount,
        tags,
        badge,
        userId
      }
      `
    );
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

// Fetch categories from Sanity
// export const getCategory = async (): Promise<Category[]> => {
//   try {
//     const category = await client.fetch(
//       `
//       *[_type == "categories"]{
//         _id,
//         title,
//         "image_url": image.asset->url
//       }
//       `
//     );
//     return category;
//   } catch (error) {
//     console.error("Failed to fetch categories:", error);
//     return [];
//   }
// };

// Function to fetch both products and categories
export const fetch = async () => {
  const products = await getProducts();
  // const categories = await getCategory();
  return products; 
};
