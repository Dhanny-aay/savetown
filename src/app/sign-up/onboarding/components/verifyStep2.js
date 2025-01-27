"use client";
import { useState } from "react";
import CodeInputForm from "../../component/codeInputForm";
import ArrowRight from "./assets/ArrowRight.svg";
import stepper1 from "./assets/stepper2.svg";
import Link from "next/link";

export default function VerifyStep2({
  formData,
  updateFormData,
  handleBack,
  code,
  setCode,
}) {
  const handleCodeChange = (updatedCode) => {
    setCode(updatedCode);
  };

  return (
    <>
      <img src={stepper1.src} className=" mt-4" alt="" />
      <img onClick={handleBack} src={ArrowRight.src} className=" mt-4" alt="" />
      <h2 className=" text-h5 md:text-h3 font-Yeseva mt-5">
        Enter verification code
      </h2>
      <p className="text-body12Regular md:text-body14Regular mt-1 text-[#737373]">
        We sent a verification code to {formData.phone || "your phone number"}
      </p>
      <CodeInputForm code={code} onCodeChange={handleCodeChange} />

      {/* <button className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
        Verify
      </button> */}
    </>
  );
}
