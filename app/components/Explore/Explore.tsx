import Image from "next/image";

interface ExploreProps {
  imageUrl: string[]; }

export default function Explore({ imageUrl }: ExploreProps) {
  return (
    <div className="w-[90%] flex flex-col items-center justify-center space-y-8 ">
    <h1 className="text-xl uppercase font-extrabold md:mb-10 items-center">
          EXPLORE NEW AND POPULAR STYLES
        </h1>
      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
      <div className="w-full flex flex-col items-center  md:h-[80%] ">
        
        <div className="w-full flex  ">
          <Image
            src={imageUrl[0]} 
            alt="unable to load"
            width={300}
            height={200}
            className="max-w-full md:h-[80%] md:w-[100%] hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:w-full md:gap-4 md:h-[80%]">
        <span className="flex flex-col gap-4 md:h-full md:gap-4">
          <Image
            src={imageUrl[1]}
            alt="unable to load"
            width={150}
            height={100}
            className="max-w-full md:w-[22rem] hover:scale-105 transition-transform duration-500"
          />
          <Image
            src={imageUrl[2]}
            alt="unable to load"
            width={150}
            height={100}
            className="max-w-full md:w-[20rem] hover:scale-105 transition-transform duration-500"
          />
        </span>
        <span className="flex flex-col gap-4 md:h-full md:gap-4">
          <Image
            src={imageUrl[3]} 
            alt="unable to load"
            width={150}
            height={100}
            className="max-w-full md:w-[20rem] hover:scale-105 transition-transform duration-500"
          />
          <Image
            src={imageUrl[5]} 
            alt="unable to load"
            width={150}
            height={100}
            className="max-w-full md:w-[20rem] hover:scale-105 transition-transform duration-500"
          />
        </span>
      </div>
      </div>
    </div>
  );
}
