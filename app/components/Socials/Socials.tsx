import Image from "next/image";
interface props{
    img:string;
}
export default function Socials({img}:props){
    return(
        <div className="border-2 rounded-full border-gray-500 p-2">
            <Image src={img} alt="unable to load" width={10} height={10} className=""/>
        </div>
    )
}