"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react"; // Import useState for state management
import logo from "./assets/logo.svg";


export default function AdminLogin() {

    const handleLogout =()=>{
        console.log('logout')
    }

  return (
    <div className="flex items-center justify-center border bg-white">
      <div className="w-full max-w-md p-3 bg-white flex justify-center items-center flex-col">
        <div className="flex items-center justify-center">
          <Link href="/">
            <Image
              src={logo.src}
              alt="Savetown logo"
              width={132}
              height={44}
              priority
            />
          </Link>
        </div>
        <h1 className="text-2xl font-normal text-[#101828] text-center md:text-3xl">
          Log out of Admin Portal
        </h1>
        <p className="text-base font-normal font-Manrope text-[#475467] text-center mt-1">
         Thank you for using savetown
        </p>

        <button  onClick={handleLogout}
        className="px-3 py-[10px] w-1/2 bg-[#ED1450] text-white rounded-[32px]">
            Log Out
        </button>

      </div>
    </div>
  );
}
