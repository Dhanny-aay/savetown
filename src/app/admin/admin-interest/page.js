"use client";
import { useEffect, useState } from "react";
import {
  editInterest,
  showInterest,
} from "../adminControllers/interestController";

export default function InterestRate() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({ id: 0, interestRate: "N/A" }); // Default value
  const [tempRate, setTempRate] = useState(data); // Temporary value for editing

  const handleSave = async () => {
    setData(tempRate);
    setIsEditing(false);
    console.log("Saved Interest Rate:", tempRate);
    let id = 0;
    await editInterest(
      `${id}`,
      { tempRate },
      (response) => {
        console.log(response);
      },
      (err) => {
        console.error("unable to edit interest", err);
      }
    );
  };

  const handleCancel = () => {
    setTempRate(data);
    setIsEditing(false);
  };

  const fetchInterest = async () => {
    let response = await showInterest({});
    let interest = response.data;
    // console.log(interest);
    if (interest.length === 0) {
      setData("N/A");
    } else {
      setData(interest);
    }
  };

  useEffect(() => {
    fetchInterest();
  }, []);

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h3 className="text-[18px] md:text-[18px] font-bold text-black">
            Manage Interest Rates
          </h3>
          <p className="text-gray-600 text-sm md:text-sm">
            Set and update the interest rates for homeownership savings plans to
            align with current financial strategies.
          </p>
        </div>
        {/* Buttons */}
        {isEditing ? (
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <button
              className="bg-gray-100 text-gray-600 px-[30px] py-[10px] text-sm font-medium rounded-[32px] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-[#ED1450] text-white px-[30px] py-[10px] text-sm font-medium rounded-[32px] hover:bg-[#d01245] focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            className="bg-[#ED1450] text-white px-[30px] py-[10px] text-sm font-medium rounded-[32px] hover:bg-[#d01245] focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      {/* Interest Rate Input */}
      <form
  className="space-y-4"
  onSubmit={(e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (isEditing) {
      handleSave(); // Call the save function if editing
    }
  }}
>
  <div className="flex flex-col w-full">
    <label
      htmlFor="interest-rate"
      className="text-sm font-medium text-gray-700 mb-1"
    >
      Interest Rate
    </label>
    <input
  id="interest-rate"
  type="text"
  placeholder=""
  className="w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
  value={isEditing ? tempRate.interestRate || "" : data.interestRate || ""}
  onChange={(e) => setTempRate({ ...tempRate, interestRate: e.target.value })}
  readOnly={!isEditing}
/>
  </div>
</form>

    </div>
  );
}
