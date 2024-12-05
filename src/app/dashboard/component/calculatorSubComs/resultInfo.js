"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import stepper from "./assets/stepper2.svg";

export default function ResultInfo({ formData, handleBack, updateFormData }) {
  return (
    <div>
      <img src={stepper.src} className=" w-full" alt="" />
      <img
        src={ArrowRightBlk.src}
        className=" mt-8 w-auto"
        alt="back"
        onClick={handleBack}
      />
      <h3 className="text-h5 font-Manrope font-bold text-[#595A5C] mt-9 ">
        Calculator result
      </h3>

      <div className=" mt-8">
        <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
          Monthly Payment Breakdown
        </h4>
        <p className=" font-Manrope text-h3 font-bold text-black mt-3 ">
          ₦ 100,000.00
        </p>

        <div className="flex mt-4 mb-6  w-full">
          <div className="bg-[#EE9D1A] rounded-l-[4px] w-[22%] h-4"></div>
          <div className="bg-[#3FC8E4] w-[40%] h-4"></div>
          <div className="bg-[#5654D4] rounded-r-[4px] w-[38%] h-4"></div>
        </div>

        <div className=" space-y-6">
          <div className="">
            <div className=" flex items-center space-x-2">
              <span className=" w-3 h-3 bg-[#EE9D1A] rounded-[4px]"></span>
              <p className="text-[#878787] font-Manrope text-body14Regular">
                House Tax
              </p>
            </div>
            <div className="font-Manrope text-h4 mt-2 font-bold text-black">
              ₦ 50,000
            </div>
          </div>
          <div className="">
            <div className=" flex items-center space-x-2">
              <span className=" w-3 h-3 bg-[#3FC8E4] rounded-[4px]"></span>
              <p className="text-[#878787] font-Manrope text-body14Regular">
                Principal & Interest
              </p>
            </div>
            <div className="font-Manrope text-h4 mt-2 font-bold text-black">
              ₦ 40,000
            </div>
          </div>
          <div className="">
            <div className=" flex items-center space-x-2">
              <span className=" w-3 h-3 bg-[#5654D4] rounded-[4px]"></span>
              <p className="text-[#878787] font-Manrope text-body14Regular">
                Homeowner Insurance
              </p>
            </div>
            <div className="font-Manrope text-h4 mt-2 font-bold text-black">
              ₦ 10,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
