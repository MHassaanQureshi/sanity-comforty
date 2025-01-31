import Image from "next/image";
import Link from "next/link";
export default function AboutHero(){
    return(
        <div className="w-[80%] flex flex-col gap-4 md:flex-row md:w-full md:items-center md:justify-center">
            <div className="w-[300px] h-[350px] bg-[#007580] text-white p-2 gap-4 md:w-[400px]">
                <span className="h-full w-full">
                <h1 className="text-2xl font-bold p-2">About Us-Comforty</h1>
                <p className="text-xsm p-2">At Comforty, we believe that the right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials, and modern aesthetics, we craft chairs that seamlessly blend style with functionality. </p>
                </span>
                <span className="absolute bottom-42 bg-[#007580] blur-1 px-8 py-2 border-2 opacity-50 p-2  md:bottom-[60%] lg:bottom-12">
                    <button><Link href="" className="text-white">Vew Collection</Link></button>
                </span>

            </div>
            <div className="w-[300px] md:w-[400px]">
                <Image src="/images/product-1.png" alt="unable to load" width={300} height={200} className="md:w-[350px]"/>
            </div>
        </div>
    )
}