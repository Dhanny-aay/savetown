"use client";

import { useEffect, useState } from "react";
import {
  handleCalculatorRequest,
  handleGetCalculatorControl,
} from "../userControllers/calculatorController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import load from "./assets/load.gif";
import ArrowRightBlk from "./assets/ArrowRight.svg";

export default function Calculator() {
  const [calculatorAccess, setcalculatorAccess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [houseTypeOptions, setHouseTypeOptions] = useState([]);
  const [houseLocationOptions, setHouseLocationOptions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [houseType, setHouseType] = useState("");
  const [houseLocation, setHouseLocation] = useState("");
  const [saving_period, setSaving_period] = useState("");
  const [monthly_commitment, setMonthly_commitment] = useState(null);
  const [house_price, setHouse_price] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingCalculate, setLoadingCalculate] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [durationOptions, setDurationOptions] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!houseType) newErrors.houseType = "House type is required";
    if (!houseLocation) newErrors.houseLocation = "House location is required";
    if (!saving_period) newErrors.saving_period = "Saving period is required";
    if (!monthly_commitment)
      newErrors.monthly_commitment = "Monthly commitment is required";
    if (!house_price) newErrors.house_price = "House price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  const fetchCalculatorinputs = async () => {
    setLoading(true);
    try {
      const data = await handleGetCalculatorControl();
      if (data) {
        setcalculatorAccess(data.data);
        // Extract and save house location and house type options
        setHouseLocationOptions(data.data.houseLocation);
        setHouseTypeOptions(data.data.houseType);
        setDurationOptions(data.data.duration);
      }
    } catch (error) {
      console.error("Error fetching calc:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalculatorinputs();
  }, []);

  const handleHouseTypeChange = (type) => {
    setHouseType(type);
  };

  const handleLocationChange = (e) => {
    setHouseLocation(e.target.value);
  };

  const handleSavingDurationChange = (e) => {
    setSaving_period(e.target.value);
  };

  const onSuccess = (response) => {
    setLoadingCalculate(false);

    if (response && response.data) {
      setResult(response.data);
      setShowResult(true);
    }
  };

  const onError = (error) => {
    setLoadingCalculate(false);

    // enqueueSnackbar( "Log in failed", {
    //   variant: "error",
    // });
  };

  const handleCalculate = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoadingCalculate(true);
      const userData = {
        name,
        email,
        house_type: houseType,
        location: houseLocation,
        saving_period,
        monthly_commitment,
        house_price,
      };
      handleCalculatorRequest(userData, onSuccess, onError);
    }
  };
  // Function to format numbers with commas
  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00"; // Handle 0, null, and undefined
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const intValue = rawValue ? parseInt(rawValue, 10) : "";
    setHouse_price(intValue);
  };

  const handleMonthlyPriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const intValue = rawValue ? parseInt(rawValue, 10) : "";
    setMonthly_commitment(intValue); // Update raw state without commas
  };

  // Destructure breakdown and monthly_payment from result
  const { breakdown, monthly_payment } = result || {};
  const { homeowner_insurance, house_tax, principal_interest } =
    breakdown || {};

  // Ensure monthly_payment is a valid number to avoid division by zero
  const total = monthly_payment || 1;

  // Calculate percentage widths for each segment
  const houseTaxWidth = ((house_tax || 0) / total) * 100;
  const principalInterestWidth = ((principal_interest || 0) / total) * 100;
  const homeownerInsuranceWidth = ((homeowner_insurance || 0) / total) * 100;

  const handleBack = () => {
    setShowResult(false);
  };

  return (
    <>
      {showResult ? (
        <>
          <img
            src={ArrowRightBlk.src}
            className="mt- w-auto cursor-pointer"
            alt="back"
            onClick={handleBack}
          />
          <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#000] mt-6">
            Calculator result
          </h3>

          <div className="mt-6">
            <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
              Monthly Payment Breakdown
            </h4>
            <p className="font-Manrope text-h5 md:text-h5 font-bold text-black mt-3">
              ₦ {result?.monthly_payment?.toLocaleString() || "0.00"}
            </p>

            {/* Functional Progress Bar */}
            <div className="flex mt-4 mb-6 w-full">
              <div
                className="bg-[#EE9D1A] rounded-l-[4px] h-4"
                style={{ width: `${houseTaxWidth}%` }}
              ></div>
              <div
                className="bg-[#3FC8E4] h-4"
                style={{ width: `${principalInterestWidth}%` }}
              ></div>
              <div
                className="bg-[#5654D4] rounded-r-[4px] h-4"
                style={{ width: `${homeownerInsuranceWidth}%` }}
              ></div>
            </div>

            <div className=" space-y-4 md:space-y-6">
              {/* House Tax */}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-[#EE9D1A] rounded-[4px]"></span>
                  <p className="text-[#878787] font-Manrope text-body14Regular">
                    House Tax
                  </p>
                </div>
                <div className="font-Manrope text-h5 md:text-h5 mt-2 font-bold text-black">
                  ₦ {result?.breakdown?.house_tax?.toLocaleString() || "0"}
                </div>
              </div>

              {/* Principal & Interest */}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-[#3FC8E4] rounded-[4px]"></span>
                  <p className="text-[#878787] font-Manrope text-body14Regular">
                    Principal & Interest
                  </p>
                </div>
                <div className="font-Manrope text-h5 md:text-h5 mt-2 font-bold text-black">
                  ₦{" "}
                  {result?.breakdown?.principal_interest?.toLocaleString() ||
                    "0"}
                </div>
              </div>

              {/* Homeowner Insurance */}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-[#5654D4] rounded-[4px]"></span>
                  <p className="text-[#878787] font-Manrope text-body14Regular">
                    Homeowner Insurance
                  </p>
                </div>
                <div className="font-Manrope text-h5 md:text-h5 mt-2 font-bold text-black">
                  ₦{" "}
                  {result?.breakdown?.homeowner_insurance?.toLocaleString() ||
                    "0"}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Message */}
          {result?.message && (
            <div className="mt-6">
              <p className="font-Manrope text-body14Medium text-[#878787]">
                {result.message}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className=" font-Yeseva font-normal text-[28px] 2xl:text-4xl text-black leading-[24px]">
            Saving Calculator
          </h2>
          <div className=" w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" flex flex-col w-full">
              <label htmlFor="Full-Name">Full Name</label>
              <input
                type="text"
                name="Full-Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-base placeholder:text-[#000000B2]"
                placeholder="Enter full name"
              />
              {errors.name && (
                <span className="text-[#DC3545] text-[10px] font-Manrope">
                  {errors.name}
                </span>
              )}
            </div>
            <div className=" flex flex-col w-full">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-base placeholder:text-[#000000B2]"
                placeholder="Enter email address"
              />
              {errors.email && (
                <span className="text-[#DC3545] text-[10px] font-Manrope">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className=" w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" flex flex-col w-full">
              <label htmlFor="targetPrice">How much is the house?</label>
              <input
                type="text"
                name="targetPrice"
                value={formatWithCommas(house_price)} // Display formatted value
                onChange={handlePriceChange}
                className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-base placeholder:text-[#000000B2]"
                placeholder="₦ 0.00"
              />
              {errors.house_price && (
                <span className="text-[#DC3545] text-[10px] font-Manrope">
                  {errors.house_price}
                </span>
              )}
            </div>
            <div className=" flex flex-col w-full">
              <label htmlFor="commit">What can you pay monthly?</label>
              <input
                type="text"
                name="commit"
                value={formatWithCommas(monthly_commitment)} // Display formatted value
                onChange={handleMonthlyPriceChange}
                className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-base placeholder:text-[#000000B2]"
                placeholder="₦ 0.00"
              />
              {errors.monthly_commitment && (
                <span className="text-[#DC3545] text-[10px] font-Manrope">
                  {errors.monthly_commitment}
                </span>
              )}
            </div>
          </div>
          <div className=" w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <Skeleton
                height={36}
                width={"100%"}
                containerClassName=" mt-2 w-full"
              />
            ) : (
              <div className=" flex flex-col w-full">
                <label htmlFor="duration">How long will you save?</label>
                <span className="mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-base placeholder:text-[#000000B2]">
                  <select
                    name="duration"
                    value={saving_period}
                    onChange={handleSavingDurationChange}
                    className="w-full bg-transparent"
                  >
                    <option value="">Choose saving duration</option>
                    {durationOptions.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </span>
                {/* <input
                type="number"
                name="duration"
                value={saving_period}
                onChange={(e) => setSaving_period(e.target.value)}
                className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-base placeholder:text-[#000000B2]"
                placeholder="1 Year"
              /> */}
                {errors.saving_period && (
                  <span className="text-[#DC3545] text-[10px] font-Manrope">
                    {errors.saving_period}
                  </span>
                )}
              </div>
            )}

            {loading ? (
              <Skeleton
                height={36}
                width={"100%"}
                containerClassName=" w-full"
              />
            ) : (
              <div className=" flex flex-col w-full">
                <label className="leading-none">Where is the location?</label>

                <div className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-base placeholder:text-[#000000B2]">
                  <select
                    name="location"
                    value={houseLocation}
                    onChange={handleLocationChange}
                    className="w-full bg-transparent"
                  >
                    <option value="">Choose house location</option>
                    {houseLocationOptions.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.houseLocation && (
                  <span className="text-[#DC3545] text-[10px] font-Manrope">
                    {errors.houseLocation}
                  </span>
                )}
              </div>
            )}
          </div>
          {/* House Type Selection */}
          {loading ? (
            <Skeleton
              height={36}
              width={"100%"}
              containerClassName=" w-full mt-4"
            />
          ) : (
            <div className="mt-4">
              <label>What type of house are you looking for?</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {houseTypeOptions.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => handleHouseTypeChange(type.value)}
                    className={`border rounded-[10000px] py-2 px-3 text-xs 2xl:text-base font-Manrope ${
                      houseType === type.value
                        ? "border-[#6200ee] text-[#8133f1] font-bold"
                        : "border-[#595A5C] text-[#595A5C]"
                    }`}
                  >
                    {type.value}
                  </button>
                ))}
              </div>
              {errors.houseType && (
                <span className="text-[#DC3545] text-[10px] font-Manrope">
                  {errors.houseType}
                </span>
              )}
            </div>
          )}

          <button
            onClick={handleCalculate}
            disabled={loadingCalculate}
            className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-base flex items-center justify-center"
          >
            {loadingCalculate ? (
              <img src={load.src} className="w-4" alt="" />
            ) : (
              "Calculate"
            )}
          </button>
        </>
      )}
    </>
  );
}
