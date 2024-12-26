"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DateFilter = ({ onFilterChange }) => {
  const [filterType, setFilterType] = useState("thisMonth");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterType(value);

    if (value === "custom") {
      setShowCalendar(true);
      return;
    }

    setShowCalendar(false);
    const now = new Date();
    let from = new Date();
    let to = new Date();

    switch (value) {
      case "previousMonth":
        from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        to = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case "thisMonth":
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case "thisWeek":
        const day = now.getDay();
        from = new Date(now.setDate(now.getDate() - day));
        to = new Date(now.setDate(now.getDate() + 6));
        break;
    }

    onFilterChange([from, to]);
  };

  const handleDateChange = (value) => {
    setDateRange(value);
    onFilterChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        value={filterType}
        onChange={handleFilterChange}
        className="px-4 py-2 border rounded-md"
      >
        <option value="thisMonth">This Month</option>
        <option value="previousMonth">Previous Month</option>
        <option value="thisWeek">This Week</option>
        <option value="custom">Custom Range</option>
      </select>

      {showCalendar && (
        <div className="mt-2">
          <Calendar
            onChange={handleDateChange}
            value={dateRange}
            selectRange={true}
            className="border rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
