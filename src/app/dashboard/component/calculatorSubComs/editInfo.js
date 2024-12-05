"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import stepper from "./assets/stepper1.svg";

export default function EditInfo({ formData, handleBack, updateFormData }) {
  return (
    <div>
      <img src={stepper.src} className=" w-full" alt="" />
      <img
        src={ArrowRightBlk.src}
        className=" mt-8 w-auto"
        alt="back"
        onClick={handleBack}
      />
      <div className="flex items-center w-full justify-between mt-9 mb-8">
        <h3 className="text-h5 font-Manrope font-bold text-[#595A5C] ">
          What can I save with my monthly payment
        </h3>
        <button
          onClick={handleBack}
          className=" text-[#F14373] font-Manrope text-body16Bold"
        >
          Edit
        </button>
      </div>
      {/* info */}
      <div className=" space-y-6">
        <div>
          <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
            How much is the price of house you’re looking to get ?
          </h4>
          <p className=" font-Manrope text-body14SemiBold text-black mt-3 ">
            ₦ 300,000,000.00
          </p>
        </div>
        <div>
          <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
            How much are you willing to commit per month ?
          </h4>
          <p className=" font-Manrope text-body14SemiBold text-black mt-3 ">
            ₦ 100,000.00
          </p>
        </div>
        <div>
          <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
            How long do you want to save for your house ?
          </h4>
          <p className=" font-Manrope text-body14SemiBold text-black mt-3 ">
            2 years
          </p>
        </div>
        <div>
          <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
            What type of house are you looking for?
          </h4>
          <p className=" font-Manrope text-body14SemiBold text-black mt-3 ">
            3 Bedroom
          </p>
        </div>
        <div>
          <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
            What location are you looking at?
          </h4>
          <p className=" font-Manrope text-body14SemiBold text-black mt-3 ">
            Yaba
          </p>
        </div>
      </div>
    </div>
  );
}
