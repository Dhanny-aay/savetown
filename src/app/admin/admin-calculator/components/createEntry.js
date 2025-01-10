import React, { useState } from "react";
import { createHouseType } from "../../adminControllers/calculatorController";

const CreateEntry = ({ onClose, onDurationChange }) => {
  const [formData, setFormData] = useState({
    title: "",
    minValue: "",
    maxValue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("Input Values:", formData);
    await createHouseType(
      {
        category: "Duration",
        value: `${formData.title}`,
        min_house_price: 16,
        max_house_price: 10,
        min_saving_period: `${formData.minValue}`,
      max_saving_period:`${formData.maxValue}`,
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
    onDurationChange();
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
        <h2 className="text-lg font-bold font-Manrope">Add New Entry</h2>
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter duration"
              className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
            />
          </div>
          {/* Minimum and Maximum Value Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Minimum Value
              </label>
              <input
                type="number"
                name="minValue"
                value={formData.minValue}
                onChange={handleChange}
                placeholder="Enter"
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Maximum Value
              </label>
              <input
                type="number"
                name="maxValue"
                value={formData.maxValue}
                onChange={handleChange}
                placeholder="Enter"
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
              />
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-between items-center w-full space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-[12px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-[12px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEntry;
