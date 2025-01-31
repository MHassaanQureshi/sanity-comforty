import { Product } from "../types/product";
import Image from "next/image";
import Newsletter from "../components/Newsletter/Newsletter";
import Link from "next/link";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="w-full flex flex-col items-center p-4 mt-10">
      <h1 className="text-2xl font-bold p-2">Our Products</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <div key={product._id} className="flex flex-col w-full">
              <div className="relative">
                {product.badge && (
                  <span className="absolute bg-[#F5813F] p-1 text-white ml-2 mt-4 text-sm rounded-lg">
                    {product.badge}
                  </span>
                )}

                <Link href={`/product/${product._id}`}>
                  <Image
                    src={product.image_url}
                    alt={product.title || "Product Image"}
                    width={250}
                    height={100}
                    className="hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>

              <div className="flex flex-col mt-2">
                <h1 className="font-bold text-lg">{product.title}</h1>
                <div className="flex justify-between p-2 items-center">
                  <div className="flex gap-2 items-center">
                    <p className="text-lg font-semibold">${product.price}</p>
                    <p className="line-through text-[#9A9CAA] text-sm">
                      {product.priceWithoutDiscount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <div className="w-full flex items-baseline bg-[#1E2832] bg-opacity-10 mt-10">
        <Newsletter />
      </div>
    </div>
  );
}
