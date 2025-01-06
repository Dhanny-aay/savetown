import React, { useState } from "react";
import { showAvailableDays } from "../../adminControllers/eventsController";

const EditDayModal = ({ onClose, day }) => {
  const [selectedDay, setSelectedDay] = useState("Friday");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  const handleCheckboxChange = (day) => {
    setSelectedDay(day);
  };

  const onSave = async (selectedDay) => {
    await showAvailableDays(
      {
        schedule: [
          {
            day: `${selectedDay}`,
            time: "00:40",
          },
        ],
      },
      (response) => {
        day(selectedDay)
        console.log(response?.data.message);
      },
      (err) => {
        console.error("unable to display available days", err);
      }
    );
    onClose(false);
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center "
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-lg w-[90%] p-6 max-w-md shadow-lg font-Manrope"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-[20px] font-bold font-Manrope">
            Edit Day For Event
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        {/* Days List */}
        <ul className="space-y-3 mb-6 w-full">
          {days.map((day) => (
            <li key={day} className="flex items-center">
              <input
                type="checkbox"
                id={day}
                checked={selectedDay === day}
                onChange={() => handleCheckboxChange(day)}
                className="w-4 h-4 text-[#ED1450] accent-[#ED1450] cursor-pointer"
              />
              <label
                htmlFor={day}
                className="ml-3 text-[14px] font-normal text-[#272D37] cursor-pointer"
              >
                {day}
              </label>
            </li>
          ))}
        </ul>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center w-full space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-[10px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedDay) }
            className="px-3 py-[10px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDayModal;
