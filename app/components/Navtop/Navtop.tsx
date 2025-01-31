import Image from "next/image";
import Link from "next/link";
export default function Navtop(){
    return(
        <div className="bg-[#F0F2F3] w-[full] flex  justify-between p-2 ">
            <div className="flex flex-row items-center gap-1">
                <Image src="/images/logo.png" alt="umable to load" width={40} height={40} />
                <h1 className="text-[#272343] font-bold text-xl">Comforty</h1>
            </div>
            <div className="bg-white flex items-center gap-3 px-2 rounded-lg">
            <Link href="/Cart"><Image src="/images/cart.png" alt="umable to load" width={20} height={20} /></Link>
            <h1>Cart</h1>
            <p className="bg-[#007580] text-white rounded-full px-2">2</p>
            </div>
        </div>
    )
}