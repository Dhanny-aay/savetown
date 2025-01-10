import React, { useState } from "react";
import { editHouseType } from "../../adminControllers/calculatorController";

const EditEntry = ({ onClose, onDurationChange, user }) => {
  const [formData, setFormData] = useState({
    ...user,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const newDuration = {
        ...formData,
      };
    console.log("Input Values:", newDuration);
    let id = newDuration.id
    let value = newDuration.value;
    let min = newDuration.min_saving_period;
    let max = newDuration.max_saving_period;
    await editHouseType(
        `${id}`,
      {
        category: "Duration",
        value: `${value}`,
        min_house_price: 16,
        max_house_price: 19,
        min_saving_period: `${min}`,
        max_saving_period: `${max}`,
        min_monthly_commitment: 15,
        max_monthly_commitment: 17,
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
              name="value"
              value={formData.value}
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
                name="min_saving_period"
                value={formData.min_saving_period}
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
                name="max_saving_period"
                value={formData.max_saving_period}
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

export default EditEntry;
