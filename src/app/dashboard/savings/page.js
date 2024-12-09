"use client";

import { useState } from "react";
import All from "./components/all";
import SaveWallet from "./components/saveWallet";
import GroupSaving from "./components/groupSaving";

export default function Page() {
  const [activeButton, setActiveButton] = useState("All");

  const buttons = [
    {
      label: "All",
      value: "All",
      component: <All />,
    },

    {
      label: "Savetown Wallet",
      value: "Wallet",
      component: <SaveWallet />,
    },
    {
      label: "Group Savings",
      value: "Group",
      component: <GroupSaving />,
    },
  ];

  const handleButtonClick = (value) => {
    setActiveButton(value);
  };

  return (
    <>
      <div className="flex w-full space-x-3 ">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={` font-Manrope text-xs md:text-sm px-4 py-2  rounded-[32px] transition-all ${
              activeButton === button.value
                ? "bg-[#FDE8EE] text-[#ED1450] font-bold"
                : " bg-[#F3F0E9] text-[#000000B2] font-normal"
            }`}
            onClick={() => handleButtonClick(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className=" mt-8">
        {buttons.find((button) => button.value === activeButton).component}
      </div>
    </>
  );
}
