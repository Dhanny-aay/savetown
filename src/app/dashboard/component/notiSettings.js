"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";

export default function NotiSettings({ goBack }) {
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  const handleToggle1 = () => {
    setIsActive1(!isActive1);
  };

  const handleToggle2 = () => {
    setIsActive2(!isActive2);
  };

  return (
    <>
      <img
        src={ArrowRightBlk.src}
        onClick={goBack}
        className="cursor-pointer"
        alt=""
      />
      <div className=" w-full flex items-center justify-between mt-9">
        <h3 className="text-h5 font-Manrope font-bold text-[#595A5C]">
          Notification Settings
        </h3>
      </div>
      <div className=" w-full mt-8">
        <div className=" w-full flex items-center justify-between">
          <div className="">
            <h6 className=" text-base font-Manrope font-semibold text-[#000000]">
              Email marketing notifications
            </h6>
            <p className=" mt-2 text-[#595A5C] text-body14Medium">
              Receive offers and news via email
            </p>
          </div>
          <div
            className={`w-12 h-6  rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isActive1 ? "bg-[#8133F1]" : "bg-gray-300"
            }`}
            onClick={handleToggle1}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                isActive1 ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>
        <div className=" w-full flex items-center justify-between mt-5">
          <div className="">
            <h6 className=" text-base font-Manrope font-semibold text-[#000000]">
              Email marketing notifications
            </h6>
            <p className=" mt-2 text-[#595A5C] text-body14Medium">
              Receive offers and news via email
            </p>
          </div>
          <div
            className={`w-12 h-6  rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isActive2 ? "bg-[#8133F1]" : "bg-gray-300"
            }`}
            onClick={handleToggle2}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                isActive2 ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
