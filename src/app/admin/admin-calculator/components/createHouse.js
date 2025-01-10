"use client";
import Image from "next/image";
import { useState } from "react";
import cancel from "../assets/cancel.svg";
import { createHouseType } from "@/app/admin/adminControllers/calculatorController";

export default function CreateHouseLocationModal({ onClose, onLocationChange }) {
  const [houseLocation, setHouseLocation] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setHouseLocation((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index) => {
    setHouseLocation((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // const { name, value } = e.target;
    // setInputValue((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const handleAddLocation = async () => {
    console.log(houseLocation);
    await createHouseType(
      {
        category: "House Location",
        value: `${houseLocation}`,
        min_house_price: 16,
        max_house_price: 10,
        min_saving_period: 20,
        max_saving_period: 4,
        min_monthly_commitment: 17,
        max_monthly_commitment: 14,
      },
      (response) => {
        console.log(response);
      },
      (err) => {
        console.error("unable to create house type", err);
      }
    );
    onLocationChange()
    onClose(false);
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold font-Manrope">Add New House Location</h2>
        <label className="block mb-1 text-sm font-semibold">
          Add available new house location{" "}
        </label>

        <div className="flex flex-wrap items-center gap-2 mb-4 p-2 border rounded-md">
          {houseLocation.map((type, index) => (
            <div
              key={index}
              className="flex items-center bg-[#F2F3F4] text-sm px-3 py-2 rounded-lg"
            >
              <span className="mr-2 text-[#595A5C] text-sm capitalize">
                {type}
              </span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-black hover:text-[#ED1450]"
              >
                <Image
                  src={cancel.src}
                  priority
                  width={12}
                  height={12}
                  alt="cancel btn"
                />
              </button>
            </div>
          ))}
          <textarea
            type="text"
            name="name"
            placeholder="Enter House Locations"
            value={inputValue}
            onKeyDown={handleAddItem}
            onChange={handleChange}
            className="w-full h-32 px-3 py-2 resize-none"
          />
        </div>

        <div className="flex items-center justify-between w-full space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-[13px] w-1/2 border text-sm bg-white border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            onClick={handleAddLocation}
            disabled={houseLocation.length === 0}
            className={`px-3 py-[13px] w-1/2 text-sm rounded-[32px] ${
              houseLocation.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#ED1450] text-white"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
