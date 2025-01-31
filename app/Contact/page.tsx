import ContactForm from "../components/ContactForm/ContactForm";
import Detailcom from "../components/Detailcom/Detailcom";

export default function Contact(){
    return(
        <div className="w-full flex flex-col items-center">
            <span className="text-center flex flex-col w-[70%]">
                <h1 className="font-bold text-lg">Get In Touch With Us</h1>
                <p className="text-sm opacity-50">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
            </span>
            <div className="w-full flex flex-col items-center md:flex-row">
                <div className="w-[80%] flex flex-col gap-2 p-4">
                    <Detailcom  logo="/images/location.png" text1="Address" text2="236 5th SE Avenue, New York NY10000, United States"/>
                    <Detailcom  logo="/images/phone.png" text1="Phone" text2="Mobile: +(84) 546-6789
Hotline: +(84) 456-6789"/>
                    <Detailcom  logo="/images/clock.png" text1="Working Time" text2="Monday-Friday: 9:00 - 22:00
Saturday-Sunday: 9:00 - 21:00"/>
                </div>
                <div className="w-[100%] items-center place-items-center md:mt-10">
                <ContactForm />
            </div>
            </div>
           
        </div>
    )
}