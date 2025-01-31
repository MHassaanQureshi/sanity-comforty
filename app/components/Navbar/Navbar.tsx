"use client";

import { useState } from "react";
import Link from "next/link";


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className=" text-black p-4">
            <div className="container mx-auto flex justify-between px-4">

                <div className="block lg:hidden ml-[90%] ">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)} 
                        className="text-black focus:outline-none"
                    >
                        {menuOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </button>
                </div>
               
                <ul className="hidden md:lg:flex space-x-8 text-xl px-6 py-2 items-center text-[#636270]">
                <li>
                    <Link href="/" className="hover:border-b-2 border-black hover:scale-105 transition-transform duration-500">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/Products" className="hover:border-b-2 border-black hover:scale-105 transition-transform duration-500">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/Products" className="hover:border-b-2 border-black hover:scale-105 transition-transform duration-500">
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link href="/About" className="hover:border-b-2 border-black hover:scale-105 transition-transform duration-500">
                      About
                    </Link>
                   
                  </li>
                  <li>
                  <Link href="/Faq" className="hover:border-b-2 border-black hover:scale-105 transition-transform duration-500">
                      Questions
                    </Link>
                  </li>
                  <li>
                  <Link href="/OrderConfirmation" className="hover:border-b-2 border-black hover:scale-105 transition-transform duration-500">
                  Orders
                    </Link>
                  </li>
                 
                </ul>
                <span className=" hidden lg:flex flex-row items-center gap-2">
                    <h1 className="text-[#636270]">Contact:</h1>
                    <h1 >(808) 555-0111</h1>
                </span>

            </div>
            
            {menuOpen && (
                <div className="lg:hidden w-[50%] items-center bg-[#272343] flex flex-col rounded-lg text-white shadow-lg   absolute right-2    z-10 pb-2">
                <ul className="flex flex-col space-y-4 mt-4 p-2 items-center">
                  <li>
                    <Link href="/" className="hover:border-b-2 border-black">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/Products" className="hover:border-b-2 border-black">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/Products" className="hover:border-b-2 border-black">
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link href="/About" className="hover:border-b-2 border-black">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/Faq" className="hover:border-b-2 border-black">
                      Questions
                    </Link>
                  </li>
                  <li>
                    <Link href="/OrderConfirmation" className="hover:border-b-2 border-black">
                    Orders
                    </Link>
                  </li>
                 
                </ul>
                <span className="flex flex-col items-center">
                    <h1>Contact:</h1>
                    <h1>(808) 555-0111</h1>
                </span>
              </div>
              
            )}
        </nav>
    );
}
