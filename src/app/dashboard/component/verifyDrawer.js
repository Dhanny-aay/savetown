"use client";
import { useState } from "react";
import caretright from "./assets/caretright.svg";
import Bvn from "./verifySubComps/bvn";
import Nin from "./verifySubComps/nin";
import IntlPass from "./verifySubComps/intlPass";
import DriverLsc from "./verifySubComps/driverLsc";
import Voters from "./verifySubComps/voters";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";

export default function VerifyDrawer({ onClose, isVisible }) {
  const [currentComponent, setCurrentComponent] = useState(null);

  const options = [
    {
      label: "Bank verification number(BVN)",
      component: <Bvn goBack={() => setCurrentComponent(null)} />,
    },
    {
      label: "National Identification Number (NIN)",
      component: <Nin goBack={() => setCurrentComponent(null)} />,
    },
    {
      label: "International Passport",
      component: <IntlPass goBack={() => setCurrentComponent(null)} />,
    },
    {
      label: "Drivers License",
      component: <DriverLsc goBack={() => setCurrentComponent(null)} />,
    },
    {
      label: "Voter’s Card",
      component: <Voters goBack={() => setCurrentComponent(null)} />,
    },
  ];
  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[800px] h-full py-8 px-4 md:px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {currentComponent ? (
          // Render the selected component
          <div className="flex-1 overflow-y-auto h-full  pb-16">
            {currentComponent}
          </div>
        ) : (
          // Render the options
          <div className="flex-1 overflow-y-auto h-full pb-16">
            <img src={ArrowRightBlk.src} onClick={onClose} alt="" />

            <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
              Complete Profile Verification
            </h3>
            <div className="w-full bg-[#ECEDEE] rounded-full mt-6">
              <div
                className="bg-[#6200EE] text-xs font-medium text-blue-100 font-Manrope text-center p-0.5 leading-none rounded-full"
                style={{ width: "70%" }}
              >
                70%
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-[#595A5C] font-Manrope text-body16Bold ">
                Choose one of the following listed below to verify
              </h4>
              <div className="mt-8 w-full">
                {options.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentComponent(item.component)} // Set the current component
                    className="w-full flex items-center justify-between py-3 px-6 border-b border-[#C2C4C6]"
                  >
                    <p className="text-[#666666] text-body14Bold font-Manrope">
                      {item.label}
                    </p>
                    <img src={caretright.src} className="h-3" alt="" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fixed Navigation Buttons */}
        {/* <div className="absolute bottom-0 left-0 w-full bg-white py-4 px-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-btnPrimary py-3 w-full rounded-[50px] font-semibold font-Manrope text-white text-xs 2xl:text-lg"
          >
            Back to home
          </button>
        </div> */}
      </div>
    </div>
  );
}
