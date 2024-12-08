"use client";
import { useState } from "react";
import Personal from "./components/personal";
import Password from "./components/password";
import Payment from "./components/payment";

export default function Page() {
  const [activeButton, setActiveButton] = useState("Personal");

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
    // {
    //   label: "Language",
    //   value: "Language",
    //   component: "<Faqs />",
    // },
    {
      label: "Privacy Policy",
      value: "Privacy",
      component: "<Testimonial />",
    },
    {
      label: "Log out",
      value: "logout",
      component: "<Features />",
    },
  ];

  const handleButtonClick = (value) => {
    setActiveButton(value);
  };

  return (
    <>
      <div className="flex mt-6 border-b w-full border-[#EAECF0]">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`font-medium font-Manrope text-sm pb-4 px-2 transition-all ${
              activeButton === button.value
                ? "border-b-2 border-btnPrimary text-btnPrimary"
                : " text-[#667085]"
            }`}
            onClick={() => handleButtonClick(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className=" mt-6">
        {buttons.find((button) => button.value === activeButton).component}
      </div>
    </>
  );
}
