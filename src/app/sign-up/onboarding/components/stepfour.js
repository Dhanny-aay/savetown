"use client";
import PasswordCreate from "@/app/utils/passwordCreate";
import ArrowRight from "./assets/ArrowRight.svg";
import stepper3 from "./assets/stepper4.svg";
import { useCallback } from "react";

export default function StepFour({ formData, updateFormData, handleBack }) {
  // Handle valid password and update formData
  // Use useCallback to memoize the handler
  // const handlePasswordValid = useCallback((password) => {
  //   updateFormData((prevState) => ({
  //     ...prevState,
  //     password,
  //   }));
  // }, []);

  const handlePasswordValid = (password) => {
    updateFormData({ password: password });
  };
  return (
    <>
      <img src={stepper3.src} className="mt-4" alt="" />
      <img onClick={handleBack} src={ArrowRight.src} className="mt-4" alt="" />
      <h2 className="text-h5 md:text-h3 font-Yeseva mt-5">Create Password</h2>
      <p className="text-body12Regular md:text-body14Regular mt-1 text-[#737373]">
        Enter a password for your Savetown account
      </p>

      <div className="mt-6">
        <PasswordCreate onPasswordValid={handlePasswordValid} />
      </div>
    </>
  );
}
