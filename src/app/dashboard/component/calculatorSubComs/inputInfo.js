"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import stepper from "./assets/stepper.svg";

export default function InputInfo({ updateFormData, formData, onClose }) {
  const [housePrice, setHousePrice] = useState(0);
  const [monthlyCommitment, setMonthlyCommitment] = useState(0);
  const [savingDuration, setSavingDuration] = useState(1);
  const MIN_PRICE = 0;
  const MAX_HOUSE_PRICE = 10000000;
  const MAX_MONTHLY_COMMITMENT = 500000;
  const MIN_SAVING_DURATION = 1;
  const MAX_SAVING_DURATION = 15;

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

  const handleHousePriceChange = (e) => {
    const numericValue = Number(e.target.value.replace(/[^0-9.-]+/g, ""));
    setHousePrice(Math.min(Math.max(numericValue, MIN_PRICE), MAX_HOUSE_PRICE));
  };

  const handleHousePriceRangeChange = (e) => {
    const rangeValue = e.target.value;
    const calculatedPrice =
      MIN_PRICE + (rangeValue / 100) * (MAX_HOUSE_PRICE - MIN_PRICE);
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
    const calculatedCommitment =
      MIN_PRICE + (rangeValue / 100) * (MAX_MONTHLY_COMMITMENT - MIN_PRICE);
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

  return (
    <div>
      <img
        src={ArrowRightBlk.src}
        onClick={onClose}
        className=" cursor-pointer"
        alt=""
      />

      <img src={stepper.src} className=" mt-8 w-full" alt="" />
      <h3 className="text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
        What can I save with my monthly payment
      </h3>

      <div className=" w-full mt-8">
        <div className="">
          <label htmlFor="">
            How much is the price of house you’re looking to get ?
          </label>
          <input
            placeholder="₦ 0.00"
            value={formatPrice(housePrice)}
            onChange={handleHousePriceChange}
            className="w-full border border-[#D5D7DA] rounded-[32px] mt-2 text-body14Regular font-Manrope px-6 py-3"
          />
          <input
            id=""
            type="range"
            min="0"
            max="100"
            value={(housePrice / MAX_HOUSE_PRICE) * 100}
            onChange={handleHousePriceRangeChange}
            className="w-full h-[6px] bg-[#D5D7DA] rounded-lg appearance-none cursor-pointer range-slider"
          />
        </div>
        <div className=" mt-4">
          <label htmlFor="">
            How much are you willing to commit per month ?
          </label>
          <input
            placeholder="₦ 0.00"
            value={formatPrice(monthlyCommitment)}
            onChange={handleMonthlyCommitmentChange}
            className="w-full border border-[#D5D7DA] rounded-[32px] mt-2 text-body14Regular font-Manrope px-6 py-3"
          />
          <input
            id=""
            type="range"
            min="0"
            max="100"
            value={(monthlyCommitment / MAX_MONTHLY_COMMITMENT) * 100}
            onChange={handleMonthlyCommitmentRangeChange}
            className="w-full h-[6px] bg-[#D5D7DA] rounded-lg appearance-none cursor-pointer range-slider"
          />
        </div>
        <div className=" mt-4">
          <label htmlFor="">
            How long do you want to save for your house ?
          </label>
          <input
            id="saving-duration-input"
            placeholder="1 year"
            value={formatPrice(savingDuration, "years")}
            onChange={handleSavingDurationChange}
            className="w-full border border-[#D5D7DA] rounded-[32px] mt-2 text-body14Regular font-Manrope px-6 py-3"
          />
          <input
            id=""
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

        <div className=" flex flex-col w-full mt-4">
          <label htmlFor="type">What type of house are you looking for?</label>
          <div className=" mt-3">
            <div className=" flex flex-wrap gap-2">
              <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
                1 Bed room
              </button>
              <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
                2 Bed room
              </button>
              <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
                3 Bed room
              </button>
              <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
                4 Bed room
              </button>
              <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
                5 Bed room
              </button>
              <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
                Studio
              </button>
              <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
                Penthouse
              </button>
            </div>
          </div>
        </div>

        <div className=" flex flex-col w-full mt-4">
          <label htmlFor="location">Where is the location?</label>
          <span className=" mt-2 bg-white border border-[#D5D7DA] rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]">
            <select name="location" className=" w-full bg-transparent" id="">
              <option value="">Choose house location</option>
            </select>
          </span>
        </div>
      </div>
    </div>
  );
}
