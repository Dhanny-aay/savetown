"use client";
import React, { useState, useEffect } from "react";
import Personal from "./components/personal";
import Password from "./components/password";
import Payment from "./components/payment";
import forward from "./assets/forward.svg";
import Cardholder from "./assets/Cardholder.svg";
import Lock from "./assets/Lock.svg";
import User from "./assets/User.svg";
import ArrowSquareOut from "./assets/ArrowSquareOut.svg";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import Logout from "./components/logOut";

export default function Page() {
  const [activeButton, setActiveButton] = useState(null); // Initially null for mobile
  const [isMobile, setIsMobile] = useState(false);

  const buttons = [
    {
      label: "Personal Info",
      value: "Personal",
      component: <Personal />,
      icon: User,
    },
    {
      label: "Password",
      value: "Password",
      component: <Password />,
      icon: Lock,
    },
    {
      label: "Payment Method",
      value: "Payment",
      component: <Payment />,
      icon: Cardholder,
    },
    {
      label: "Privacy Policy",
      value: "Privacy",
      component: null, // Replace with actual component
      icon: Lock,
    },
    {
      label: "Log out",
      value: "logout",
      component: <Logout />,
      icon: ArrowSquareOut,
    },
  ];
  // Check screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      const mobileView = window.innerWidth < 768; // Tailwind's md breakpoint
      setIsMobile(mobileView);
      setActiveButton(mobileView ? null : "Personal"); // Set activeButton to null for mobile
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

  const goBack = () => {
    setActiveButton(null);
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
  // Mobile Navigation
  const MobileNavigation = () => (
    <div className="mt-6 w-full">
      <div className=" w-full space-y-3">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="w-full p-4 bg-white border rounded-lg border-[#C2C4C6] flex items-center justify-between cursor-pointer"
            onClick={() => handleButtonClick(button.value)}
          >
            <div className=" flex space-x-4 items-center">
              <span className=" w-12 h-12 rounded-full bg-[#F2F3F4] flex items-center justify-center">
                <img src={button.icon.src} alt="" />
              </span>
              <span className="text-[#262626] font-Manrope text-sm font-medium">
                {button.label}
              </span>
            </div>
            <img src={forward.src} className=" h-3" alt="" />
          </div>
        ))}
      </div>
    </div>
  );

  // Display Active Component for Mobile
  const ActiveComponentMobile = () => {
    const activeButtonData = buttons.find(
      (button) => button.value === activeButton
    );
    return (
      <div className="w-full">
        <button
          onClick={goBack}
          className="text-btnPrimary font-Manrope text-sm mb-6 flex items-center mt-4"
        >
          <img src={ArrowRightBlk.src} className=" w-4" alt="" />
        </button>
        {activeButtonData?.component || null}
      </div>
    );
  };

  return (
    <>
      <p className="text-[#262626] block md:hidden font-bold text-lg py-3 md:text-xl leading-none font-Manrope">
        Settings
      </p>
      {isMobile ? (
        activeButton ? (
          <ActiveComponentMobile />
        ) : (
          <MobileNavigation />
        )
      ) : (
        <DesktopNavigation />
      )}

      <div className="mt-6">
        {!isMobile &&
          (buttons.find((button) => button.value === activeButton)?.component ||
            null)}
      </div>
    </>
  );
}
