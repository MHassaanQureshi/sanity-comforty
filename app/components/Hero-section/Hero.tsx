import Image from "next/image";
import Link from "next/link";
export default function Hero(){
    return(
        <div className="bg-[#F0F2F3] w-full flex flex-col md:flex-row md:w-[80%] md:p-4 md:h-[30rem] md:items-center ">
            <div className="flex flex-col p-2  w-[70%] md:ml-20"> 
                <p className="text-[#272343] ">WELCOME TO CHAIRY</p>
                <p className="text-[#272343] font-bold text-4xl p-2">Best Furniture Collection for your interior.</p>
                <button className="bg-[#029FAE] rounded-lg flex flex-row py-2 text-white gap-3 w-[60%] items-center justify-center"><Link href="/Products">Shop Now </Link><Image src="/images/right-arrow.png" alt="unable to load" width={20} height={20} className="hover:scale-105 transition-transform duration-500" /></button>
            </div>
            <div className="w-full  flex justify-center items-center">
                <Image src="/images/Product1.png" alt="unable to load" width={200} height={100} className="md:w-[300px] lg-[400px] hover:scale-105 transition-transform duration-500"/>
             </div>
        </div>
    )
}