"use client";
import { useState, useEffect } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import stepper from "./assets/stepper.svg";

export default function InputInfo({ updateFormData, formData, onClose }) {
  const [housePrice, setHousePrice] = useState(formData.house_price || 0);
  const [monthlyCommitment, setMonthlyCommitment] = useState(
    formData.monthly_commitment || 0
  );
  const [savingDuration, setSavingDuration] = useState(
    formData.saving_period || 1
  );
  const [houseType, setHouseType] = useState(formData.house_type || "");
  const [location, setLocation] = useState(formData.location || "");

  const MIN_PRICE = 0;
  const MAX_HOUSE_PRICE = 10000000;
  const MAX_MONTHLY_COMMITMENT = 500000;
  const MIN_SAVING_DURATION = 1;
  const MAX_SAVING_DURATION = 15;

  // Format price and duration for display
  const formatPrice = (value, type = "currency") => {
    if (type === "currency") {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
    return `${value} year${value !== 1 ? "s" : ""}`;
  };

  // Update formData whenever the local state changes
  useEffect(() => {
    updateFormData({
      house_price: housePrice,
      monthly_commitment: monthlyCommitment,
      saving_period: savingDuration,
      house_type: houseType,
      location: location,
    });
  }, [housePrice, monthlyCommitment, savingDuration, houseType, location]);

  // Handlers for input changes
  const handleHousePriceChange = (e) => {
    const numericValue = Number(e.target.value.replace(/[^0-9.-]+/g, ""));
    setHousePrice(Math.min(Math.max(numericValue, MIN_PRICE), MAX_HOUSE_PRICE));
  };

  const handleHousePriceRangeChange = (e) => {
    const rangeValue = e.target.value;
    const calculatedPrice = (rangeValue / 100) * MAX_HOUSE_PRICE;
    setHousePrice(calculatedPrice);
  };

  const handleMonthlyCommitmentChange = (e) => {
    const numericValue = Number(e.target.value.replace(/[^0-9.-]+/g, ""));
    setMonthlyCommitment(
      Math.min(Math.max(numericValue, MIN_PRICE), MAX_MONTHLY_COMMITMENT)
    );
  };

  const handleMonthlyCommitmentRangeChange = (e) => {
    const rangeValue = e.target.value;
    const calculatedCommitment = (rangeValue / 100) * MAX_MONTHLY_COMMITMENT;
    setMonthlyCommitment(calculatedCommitment);
  };

  const handleSavingDurationChange = (e) => {
    const numericValue = Number(e.target.value.replace(/[^0-9.-]+/g, ""));
    setSavingDuration(
      Math.min(Math.max(numericValue, MIN_SAVING_DURATION), MAX_SAVING_DURATION)
    );
  };

  const handleSavingDurationRangeChange = (e) => {
    const rangeValue = e.target.value;
    const calculatedDuration =
      MIN_SAVING_DURATION +
      (rangeValue / 100) * (MAX_SAVING_DURATION - MIN_SAVING_DURATION);
    setSavingDuration(Math.round(calculatedDuration));
  };

  const handleHouseTypeChange = (type) => {
    setHouseType(type);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <img
        src={ArrowRightBlk.src}
        onClick={onClose}
        className="cursor-pointer"
        alt=""
      />

      <img src={stepper.src} className="mt-8 w-full" alt="" />
      <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
        What can I save with my monthly payment
      </h3>

      <div className="w-full mt-8">
        {/* House Price Input and Range Slider */}
        <div>
          <label>
            How much is the price of the house you’re looking to get?
          </label>
          <input
            placeholder="₦ 0.00"
            value={formatPrice(housePrice)}
            onChange={handleHousePriceChange}
            className="w-full border border-[#D5D7DA] rounded-[32px] mt-2 text-body14Regular font-Manrope px-6 py-3"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={(housePrice / MAX_HOUSE_PRICE) * 100}
            onChange={handleHousePriceRangeChange}
            className="w-full h-[6px] bg-[#D5D7DA] rounded-lg appearance-none cursor-pointer range-slider"
          />
        </div>

        {/* Monthly Commitment Input and Range Slider */}
        <div className="mt-4">
          <label>How much are you willing to commit per month?</label>
          <input
            placeholder="₦ 0.00"
            value={formatPrice(monthlyCommitment)}
            onChange={handleMonthlyCommitmentChange}
            className="w-full border border-[#D5D7DA] rounded-[32px] mt-2 text-body14Regular font-Manrope px-6 py-3"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={(monthlyCommitment / MAX_MONTHLY_COMMITMENT) * 100}
            onChange={handleMonthlyCommitmentRangeChange}
            className="w-full h-[6px] bg-[#D5D7DA] rounded-lg appearance-none cursor-pointer range-slider"
          />
        </div>

        {/* Saving Duration Input and Range Slider */}
        <div className="mt-4">
          <label>How long do you want to save for your house?</label>
          <input
            placeholder="1 year"
            value={formatPrice(savingDuration, "years")}
            onChange={handleSavingDurationChange}
            className="w-full border border-[#D5D7DA] rounded-[32px] mt-2 text-body14Regular font-Manrope px-6 py-3"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={
              ((savingDuration - MIN_SAVING_DURATION) /
                (MAX_SAVING_DURATION - MIN_SAVING_DURATION)) *
              100
            }
            onChange={handleSavingDurationRangeChange}
            className="w-full h-[6px] bg-[#D5D7DA] rounded-lg appearance-none cursor-pointer range-slider"
          />
        </div>

        {/* House Type Selection */}
        <div className="mt-4">
          <label>What type of house are you looking for?</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "1 Bed room",
              "2 Bed room",
              "3 Bed room",
              "4 Bed room",
              "5 Bed room",
              "Studio",
              "Penthouse",
            ].map((type) => (
              <button
                key={type}
                onClick={() => handleHouseTypeChange(type)}
                className={`border rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg font-Manrope ${
                  houseType === type
                    ? "border-[#6200ee] text-[#8133f1] font-bold"
                    : "border-[#595A5C] text-[#595A5C]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Location Selection */}
        <div className="mt-4">
          <label>Where is the location?</label>
          <span className="block mt-2 bg-white border border-[#D5D7DA] rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]">
            <select
              name="location"
              value={location}
              onChange={handleLocationChange}
              className="w-full bg-transparent"
            >
              <option value="">Choose house location</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>
          </span>
        </div>
      </div>
    </div>
  );
}
