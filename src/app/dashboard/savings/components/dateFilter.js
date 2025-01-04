import React, { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const TableFilter = ({ transactions, onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [customDateRange, setCustomDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const calculateDateRange = (option) => {
    const today = new Date();
    let startDate, endDate;

    if (option === "Previous Month") {
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
    } else if (option === "This Month") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (option === "This Week") {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay());
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
    }

    return { startDate, endDate };
  };

  const applyFilter = (startDate, endDate) => {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    const filtered = transactions.filter((tx) => {
      const transactionDate = new Date(tx.created_at).getTime();
      return transactionDate >= start && transactionDate <= end;
    });

    onFilterChange(filtered);
  };

  useEffect(() => {
    if (selectedOption !== "Custom") {
      const { startDate, endDate } = calculateDateRange(selectedOption);
      applyFilter(startDate, endDate);
    }
  }, [selectedOption, transactions]);

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === "Custom") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleDateRangeChange = (ranges) => {
    setCustomDateRange([ranges.selection]);
  };

  const handleDateRangeComplete = () => {
    const { startDate, endDate } = customDateRange[0];
    applyFilter(startDate, endDate);
    setShowDatePicker(false);
  };

  const handleCancel = () => {
    // If there was a previous custom range, revert to it
    if (selectedOption !== "Custom") {
      const { startDate, endDate } = calculateDateRange(selectedOption);
      applyFilter(startDate, endDate);
    }
    setShowDatePicker(false);
  };

  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      handleDateRangeComplete();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleDateRangeComplete();
    }
  };

  useEffect(() => {
    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDatePicker, customDateRange]);

  const currentRange = calculateDateRange(selectedOption);

  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
      <div className="relative w-full sm:w-auto">
        <select
          className="appearance-none bg-[#F2F3F4] font-Manrope w-full sm:w-[158px] font-medium px-4 py-2 rounded-lg text-sm text-[#595A5C] shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          <option value="Previous Month">Prev Month</option>
          <option value="This Month">This Month</option>
          <option value="This Week">This Week</option>
          <option value="Custom">Custom</option>
        </select>
        <svg
          className="absolute right-3 top-3 pointer-events-none h-4 w-4 text-[#272D37]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {!showDatePicker && (
        <div className="w-full sm:w-auto bg-[#F2F3F4] font-Manrope font-medium px-4 py-2 rounded-lg text-sm text-[#595A5C] shadow-sm">
          {selectedOption === "Custom"
            ? `${customDateRange[0].startDate.toLocaleDateString()} - ${customDateRange[0].endDate.toLocaleDateString()}`
            : `${currentRange.startDate?.toLocaleDateString()} - ${currentRange.endDate?.toLocaleDateString()}`}
        </div>
      )}

      {showDatePicker && (
        <div
          ref={datePickerRef}
          className="fixed z-50 bg-white shadow-lg rounded-lg p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-auto"
        >
          <div className="relative">
            <button
              onClick={handleCancel}
              className="absolute right-0 top-0 text-gray-500 hover:text-gray-700 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <DateRangePicker
              ranges={customDateRange}
              onChange={handleDateRangeChange}
              rangeColors={["#4F46E5"]}
              months={1}
              direction="vertical"
              className="w-full overflow-auto"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDateRangeComplete}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFilter;
