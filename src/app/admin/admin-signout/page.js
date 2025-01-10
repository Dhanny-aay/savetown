"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react"; // Import useState for state management
import logo from "./assets/logo.svg";
import { useRouter } from "next/navigation";


export default function AdminLogin() {
const [showModal, setShowModal] = useState(false)
const router = useRouter();


    const handleLogout =()=>{
        console.log('logout')
        localStorage.clear();
        router.push("/admin-login");
    }

  return (
    <>
    {showModal ? (
      <div onClick={() => setShowModal(false)} className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
        <div  onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope ">
          <h2 className="text-lg font-bold font-Manrope text-center">
            Log Out
          </h2>
          <p className="text-center">
            {" "}
            Are you sure you want to logout?
          </p>
          <div className="flex justify-between items-center gap-4 ">
            <button
              onClick={() => setShowModal(false)}
              className="px-3 py-[13px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
            >
              No, go back
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-[13px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    ) : null}
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

        <button  onClick={()=>setShowModal(true)}
        className="px-3 py-[10px] w-1/2 bg-[#ED1450] text-white rounded-[32px]">
            Log Out
        </button>

      </div>
    </div>
    </>
  );
}
