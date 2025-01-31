import { Product } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";

interface NotSaleProductProps {
  product: Product;
}

export default function NotSaleProduct({ product }: NotSaleProductProps) {


  return (
    <div className="flex flex-col w-full">
      
      <div className="relative">
        <span className="absolute bg-[#F5813F] p-1 text-white ml-2 mt-4 text-sm rounded-lg">
          Sale
        </span>
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

       
        <span className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center">
            <p className="text-lg font-semibold">${product.price}</p>
            <p className="line-through text-[#9A9CAA] text-sm">${product.priceWithoutDiscount}</p>
          </div>

          
          
        </span>
        
      </div>
    </div>
  );
}
