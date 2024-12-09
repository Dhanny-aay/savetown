"use client";
import React, { useState, useEffect } from "react";
import Personal from "./components/personal";
import Password from "./components/password";
import Payment from "./components/payment";

export default function Page() {
  const [activeButton, setActiveButton] = useState("Personal");
  const [isMobile, setIsMobile] = useState(false);

  const buttons = [
    {
      label: "Personal Info",
      value: "Personal",
      component: <Personal />,
    },
    {
      label: "Password",
      value: "Password",
      component: <Password />,
    },
    {
      label: "Payment Method",
      value: "Payment",
      component: <Payment />,
    },
    {
      label: "Privacy Policy",
      value: "Privacy",
      component: null, // Replace with actual component
    },
    {
      label: "Log out",
      value: "logout",
      component: null, // Replace with actual component or logout logic
    },
  ];

  // Check screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []); // Empty dependency array to run only on mount

  const handleButtonClick = (value) => {
    setActiveButton(value);
  };

  // Desktop view with buttons
  const DesktopNavigation = () => (
    <div className="flex mt-6 border-b w-full border-[#EAECF0]">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`font-medium font-Manrope text-sm pb-4 px-2 transition-all ${
            activeButton === button.value
              ? "border-b-2 border-btnPrimary text-btnPrimary"
              : "text-[#667085]"
          }`}
          onClick={() => handleButtonClick(button.value)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );

  // Mobile view with select dropdown
  const MobileNavigation = () => (
    <div className="mt-6 px-6 py-3 w-full border border-[#EAECF0] rounded-md">
      <select
        value={activeButton}
        onChange={(e) => handleButtonClick(e.target.value)}
        className="w-full bg-transparent text-sm font-Manrope"
      >
        {buttons.map((button, index) => (
          <option
            key={index}
            value={button.value}
            className="font-Manrope text-sm"
          >
            {button.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <p className="text-[#262626] block md:hidden font-bold text-lg py-3 md:text-xl leading-none font-Manrope">
        Settings
      </p>
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}

      <div className="mt-6">
        {buttons.find((button) => button.value === activeButton)?.component ||
          null}
      </div>
    </>
  );
}
