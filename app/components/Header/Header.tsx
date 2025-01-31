import Image from "next/image"
export default function Header(){
    return(
        <div className="bg-[#272343] w-full h-8 flex flex-row gap-16 md:justify-between">
            <div className="flex text-[8px] items-center">
                <Image src="/images/check.png" alt="unable to load" width={5} height={5} className="w-[16px] h-[14px]"/>
                <p className="text-white ">Free shipping on all orders over $50</p>
            </div>
            <div className="flex flex-row gap-2 text-[8px]">
                <span className="flex items-center">
                    <p className="text-white ">Eng</p>
                    <Image src="/images/arrow-down.png" alt="unable to load" width={5} height={5} className="w-[7px] h-[3.5px]"/>
                </span>
                <span className="flex items-center text-[8px]">
                    <p className="text-white ">FAQS</p>
                    
                </span>
                <span className="flex items-center text-[8px]">
                <Image src="/images/alert.png" alt="unable to load" width={5} height={5} className="w-[16px] h-[14px]"/>
                    <p className="text-white ">Need Help</p>
                    
                </span>
            </div>
        </div>
    )
}