import Image from "next/image"
interface props{
    question:string;
    answer:string;
}
export default function Questions({question,answer}:props){
    return(
        <div className="w-[80%] flex justify-start items-center flex-col gap-2">
            <div className="w-full flex  justify-between">
                <h1>{question}</h1>
                <Image src="/images/plus.png" alt="unable to load" width={20} height={20} />
            </div>
            <div>
                <p>{answer}</p>
            </div>
        </div>
    )
}