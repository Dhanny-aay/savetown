"use client";
import bgImg from "./assets/bgimage.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import Link from "next/link";
// import PasswordCreate from "../utils/passwordCreate";
import { useState } from "react";
import PasswordCreate from "@/app/utils/passwordCreate";

export default function Page() {
  const savedEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("savetown_reset_email")
      : null;
  const [password, setPassword] = useState("");

  const handlePasswordValid = (password) => {
    console.log("Valid password submitted:", password);
    setPassword(password);
  };

  return (
    <div className="  w-full h-svh flex justify-center items-center bg-[#f1f1f1] text-[#000]">
      <div className="w-full max-w-[1280px] lg:max-h-[650px] bg-[rgb(255,255,255)] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
        <div
          style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="  bg-bgSecondary w-[50%] h-full relative lg:flex flex-col hidden justify-center"
        ></div>
        <div className=" w-full lg:w-[50%] h-full flex flex-col justify-center items-center px-4 md:px-12">
          <div className=" bg-white sign-shadow md:p-8 w-full rounded-2xl">
            <Link href="/forgot-password">
              <img src={ArrowRight.src} className="" alt="" />
            </Link>
            <h2 className=" text-h3 font-Yeseva mt-5">Create New Password</h2>
            <p className=" m text-body14Regular mt-1  text-[#737373]">
              Set your new password so you can login and continue saving for
              your house
            </p>

            <div className=" mt-6">
              <PasswordCreate onPasswordValid={handlePasswordValid} />
              <button className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
