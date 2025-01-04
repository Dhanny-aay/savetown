"use client";
import { useEffect, useState } from "react";
import caretright from "./assets/caretright.svg";
import Bvn from "./verifySubComps/bvn";
import Nin from "./verifySubComps/nin";
import IntlPass from "./verifySubComps/intlPass";
import DriverLsc from "./verifySubComps/driverLsc";
import Voters from "./verifySubComps/voters";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import countryCodes from "country-codes-list";
import { handleGetKYCSettings } from "@/app/userControllers/kycController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function VerifyDrawer({ onClose, isVisible }) {
  const [kycSettings, setKycSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(null);

  const fetchKycSettings = async () => {
    setLoading(true);
    try {
      const data = await handleGetKYCSettings();
      if (data) {
        setKycSettings(data.data);
      }
    } catch (error) {
      console.log("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKycSettings();
  }, []);

  // Extract a list of countries from the package
  const countryCodeList = countryCodes.all().map((country) => ({
    name: country.countryNameEn,
  }));

  const goBack = () => {
    setCurrentComponent(null); // Reset to show the options list
  };

  // Define the IDs of the KYC options you care about
  const requiredKycOptions = [
    {
      type: "id_bvn",
      label: "Bank Verification Number (BVN)",
      component: (props) => (
        <Bvn {...props} goBack={goBack} onClose={onClose} />
      ),
    },
    {
      type: "id_nin",
      label: "National Identification Number (NIN)",
      component: (props) => (
        <Nin {...props} goBack={goBack} onClose={onClose} />
      ),
    },
    {
      type: "id_drivers_license",
      label: "Drivers License",
      component: (props) => (
        <DriverLsc {...props} goBack={goBack} onClose={onClose} />
      ),
    },
    {
      type: "id_passport",
      label: "International Passport",
      component: (props) => (
        <IntlPass {...props} goBack={goBack} onClose={onClose} />
      ),
    },
    {
      type: "id_voters_card",
      label: "Voter's Card",
      component: (props) => (
        <Voters {...props} goBack={goBack} onClose={onClose} />
      ),
    },
  ];
  // Filter to include only the required KYC options that are active in settings
  const visibleOptions = requiredKycOptions.filter((option) =>
    kycSettings.some(
      (setting) =>
        setting.backend_code_name === option.type && setting.active === 1
    )
  );

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-4 md:px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
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

            {/* <div className=" mt-6">
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
            </div> */}

            <div className="mt-8">
              <h4 className="text-[#595A5C] font-Manrope text-body16Bold ">
                Choose one of the following listed below to verify
              </h4>

              {loading ? (
                <div className=" w-full mt-8">
                  <Skeleton
                    width="100%"
                    height={28}
                    containerClassName=" mt-1 opacity-50"
                  />
                  <Skeleton
                    width="100%"
                    height={28}
                    containerClassName=" mt-1 opacity-50"
                  />
                  <Skeleton
                    width="100%"
                    height={28}
                    containerClassName=" mt-1 opacity-50"
                  />
                  <Skeleton
                    width="100%"
                    height={28}
                    containerClassName=" mt-1 opacity-50"
                  />
                </div>
              ) : (
                <div className="mt-8 w-full ">
                  {visibleOptions.map((item, index) => (
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
              )}
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
