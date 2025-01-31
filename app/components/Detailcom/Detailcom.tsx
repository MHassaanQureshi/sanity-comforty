import Image from "next/image";
interface props{
    logo:string;
    text1:string;
    text2:string;
}
export default function Detailcom({logo,text1,text2}:props){
    return(
        <div className=" p-4">
            <Image src={logo} alt="unable to load" width={15} height={20}/>
            <span>
                <h1 className="font-bold">{text1}</h1>
                <p className="text-sm opacity-50">{text2}</p>
            </span>
        </div>
    )
}