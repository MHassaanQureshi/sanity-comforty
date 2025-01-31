import Image from "next/image";
interface props{
    text1:string;
    text2:string;
    img:string;
}
export default function AboutDiff({text1,text2,img}:props){
    return(
        <div className="w-[200px] h-[72px] flex flex-col p-4 md:w-[300px]">

            <Image src={img} alt="unable to load" width={20} height={20}/>
            <span className="text-[#007580]">
                <h1 className="font-bold">{text1}</h1>
                <p>{text2}</p>
            </span>
        </div>
    )
}