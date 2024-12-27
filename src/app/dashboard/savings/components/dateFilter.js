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
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const datePickerRef = useRef(null);

  const calculateDateRange = (option) => {
    const today = new Date();
    let startDate, endDate;

    if (option === "Previous Month") {
      const firstDayOfPreviousMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastDayOfPreviousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );
      startDate = firstDayOfPreviousMonth;
      endDate = lastDayOfPreviousMonth;
    } else if (option === "This Month") {
      const firstDayOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      startDate = firstDayOfThisMonth;
      endDate = lastDayOfThisMonth;
    } else if (option === "This Week") {
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Assuming week starts on Monday
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      startDate = firstDayOfWeek;
      endDate = lastDayOfWeek;
    }

    return { startDate, endDate };
  };

  const handleFilterChange = (filter) => {
    if (filter.startDate && filter.endDate) {
      const startDate = new Date(filter.startDate).setHours(0, 0, 0, 0);
      const endDate = new Date(filter.endDate).setHours(23, 59, 59, 999);

      const filtered = transactions.filter((tx) => {
        const transactionDate = new Date(tx.created_at).getTime();
        return transactionDate >= startDate && transactionDate <= endDate;
      });

      setFilteredTransactions(filtered);
    } else {
      // If no date range is provided, reset to all transactions
      setFilteredTransactions(transactions);
    }
  };

  useEffect(() => {
    const { startDate, endDate } = calculateDateRange(selectedOption);
    handleFilterChange({ startDate, endDate });
  }, [transactions, selectedOption]);

  useEffect(() => {
    onFilterChange(filteredTransactions);
  }, [filteredTransactions]);

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
    handleFilterChange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  const currentRange = calculateDateRange(selectedOption);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative ">
        <select
          className="appearance-none  bg-[#F2F3F4] font-Manrope w-[158px] font-medium px-4 py-2 rounded-lg text-sm text-[#595A5C] shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
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
        <div className=" bg-[#F2F3F4] font-Manrope font-medium px-4 py-2 rounded-lg text-sm text-[#595A5C] shadow-sm">
          {currentRange.startDate?.toLocaleDateString() || "N/A"} -{" "}
          {currentRange.endDate?.toLocaleDateString() || "N/A"}
        </div>
      )}

      {showDatePicker && (
        <div
          ref={datePickerRef}
          className="absolute z-50 bg-white shadow-md p-4 rounded-md"
        >
          <DateRangePicker
            ranges={customDateRange}
            onChange={handleDateRangeChange}
            rangeColors={["#4F46E5"]}
          />
        </div>
      )}
    </div>
  );
};

export default TableFilter;
