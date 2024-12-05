"use client";
import bgImg from "./assets/bgimage.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import Link from "next/link";
import { useState } from "react";
import CodeInputForm from "../component/codeInputForm";

export default function Page() {
  const [code, setCode] = useState(Array(6).fill("")); // Initialize with six empty strings

  const handleCodeChange = (updatedCode) => {
    setCode(updatedCode);
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

        <div className=" w-full lg:w-[50%] h-full flex flex-col justify-center items-center px-12">
          <div className=" bg-white sign-shadow p-8 w-full rounded-2xl">
            <img src={ArrowRight.src} className="" alt="" />
            <h2 className=" text-h3 font-Yeseva mt-5">
              Enter verification code
            </h2>
            <p className=" m text-body14Regular mt-1  text-[#737373]">
              We sent a verification code to daniel*******@gmail.com
            </p>

            <CodeInputForm code={code} onCodeChange={handleCodeChange} />

            <button className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
              Verify
            </button>
            <p className=" block mt-4 px-8 text-body14Regular font-Manrope text-[#595959] text-center">
              Didn’t receive the code?
              <Link href="" className=" text-[#8133F1]">
                Send again
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
