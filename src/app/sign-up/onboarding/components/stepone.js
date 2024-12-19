"use client";
import ArrowRight from "./assets/ArrowRight.svg";
import stepper from "./assets/stepper.svg";
import Link from "next/link";

export default function StepOne({ formData, updateFormData }) {
  // Handle input changes and update formData directly
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <>
      <img src={stepper.src} className="w-full" alt="" />
      <Link href="/sign-up">
        <img src={ArrowRight.src} className="mt-4" alt="" />
      </Link>
      <h2 className="text-h5 md:text-h3 font-Yeseva mt-5">
        Let’s Get To Know You More
      </h2>
      <p className="text-body12Regular md:text-body14Regular mt-1 text-[#737373]">
        Let’s get you started to savings for your dream house
      </p>

      <div className="mt-6">
        <div className="flex flex-col w-full">
          <label htmlFor="first_name">Legal First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
            className="mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter First Name"
          />
        </div>
        <div className="flex flex-col w-full mt-3">
          <label htmlFor="last_name">Legal Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleChange}
            className="mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="flex flex-col w-full mt-3">
          <label htmlFor="middle_name">Legal Middle Name (Optional)</label>
          <input
            type="text"
            name="middle_name"
            value={formData.middle_name || ""}
            onChange={handleChange}
            className="mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter Middle Name"
          />
        </div>
      </div>
    </>
  );
}
