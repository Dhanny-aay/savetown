"use client";
import { useState } from "react";
import ArrowRight from "./assets/ArrowRight.svg";
import stepper from "./assets/stepper.svg";
import Link from "next/link";

export default function StepOne({ formData, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <>
      <img src={stepper.src} className="" alt="" />
      <Link href="/sign-up">
        <img src={ArrowRight.src} className=" mt-4" alt="" />
      </Link>
      <h2 className=" text-h5 md:text-h3 font-Yeseva mt-5">
        Let’s Get To Know You More
      </h2>
      <p className="  text-body12Regular md:text-body14Regular mt-1  text-[#737373]">
        Let’s get you started to savings for your dream house
      </p>

      <div className=" mt-6">
        <div className=" flex flex-col w-full">
          <label htmlFor=" First Name">Legal First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className=" mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter First Name"
          />
        </div>
        <div className=" flex flex-col w-full mt-3">
          <label htmlFor=" Last Name">Legal Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            className=" mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter Last Name"
          />
        </div>
        <div className=" flex flex-col w-full mt-3">
          <label htmlFor="Middle Name">Legal Middle Name (Optional)</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            className=" mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter Middle Name"
          />
        </div>
      </div>
    </>
  );
}
