"use client";
import { useState } from "react";
import caretright from "./assets/caretright.svg";
import Bvn from "./verifySubComps/bvn";
import Nin from "./verifySubComps/nin";
import IntlPass from "./verifySubComps/intlPass";
import DriverLsc from "./verifySubComps/driverLsc";
import Voters from "./verifySubComps/voters";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import countryCodes from "country-codes-list";

export default function VerifyDrawer({ onClose, isVisible }) {
  const [currentComponent, setCurrentComponent] = useState(null);

  // Extract a list of countries from the package
  const countryCodeList = countryCodes.all().map((country) => ({
    name: country.countryNameEn,
  }));

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
            <div className="flex items-center w-full space-x-2 mt-12">
              <div className="flex-grow bg-[#ECEDEE] rounded-full">
                <div
                  className="bg-[#9900CC] text-xs font-Manrope text-center p-0.5 leading-none rounded-full text-blue-100"
                  style={{ width: `70%` }}
                />
              </div>
              <div className="text-sm font-medium font-Manrope text-[#000]">
                70%
              </div>
            </div>

            <div className=" mt-6">
              <label htmlFor="Nationality">Nationality</label>
              <span className="rounded-[32px] border border-[#D5D7DA] block py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-full mt-2">
                <select
                  // value={selectedCode}
                  // onChange={(e) => handleCodeChange(e.target.value)}
                  className="z-10 w-full bg-transparent"
                >
                  <option value="">Choose Country</option>
                  {countryCodeList.map(({ code, name }, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            <div className="mt-8">
              <h4 className="text-[#595A5C] font-Manrope text-body16Bold ">
                Choose one of the following listed below to verify
              </h4>
              <div className="mt-8 w-full ">
                {options.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentComponent(item.component)} // Set the current component
                    className="w-full flex items-center justify-between py-5 px-4 border-b border-[#C2C4C6]"
                  >
                    <p className="text-[#666666] text-body14Regular md:text-body14Bold font-Manrope">
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
