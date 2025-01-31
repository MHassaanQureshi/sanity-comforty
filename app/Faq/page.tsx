import Questions from "../components/Questions/Questions";

export default function Faq(){
    return(
<div className="flex justify-center flex-col items-center">
   <div className="flex flex-col text-center p-4">
   <h1 className="text-2xl font-bold capitalize">QUESTIONS LOOK HERE</h1>
   <p className="opacity-50">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
   </div>
<div className="place-items-center grid grid-cols-1 gap-10 pb-10 md:grid-cols-2 md:w-[80%]">
            <Questions question="What types of chairs do you offer?" answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"/>
            <Questions question="How can we get in touch with you?" answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"/>
            <Questions question="Do your chairs come with a warranty?" answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"/>
            <Questions question="What types of chairs do you offer?" answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"/>
            <Questions question="What types of chairs do you offer?" answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"/>
            <Questions question="What types of chairs do you offer?" answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"/>
            <Questions question="What types of chairs do you offer?" answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"/>
            <Questions question="What types of chairs do you offer?" answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"/>
        </div>
</div>
    )
}