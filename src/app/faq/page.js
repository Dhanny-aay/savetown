"use client";
import { useState } from "react";
import NavDash from "../components/navDash";
import grid from "./assests/grid.svg";
import General from "./components/general";
import Housing from "./components/housing";
import Saving from "./components/saving";
import Payment from "./components/payment";
import Banner from "../components/banner";
import Footer from "../components/footer";

export default function Page() {
  const [activeButton, setActiveButton] = useState("General");

  const buttons = [
    {
      label: "General",
      value: "General",
      component: <General />,
    },

    {
      label: "Housing",
      value: "Housing",
      component: <Housing />,
    },
    {
      label: "Saving",
      value: "Saving",
      component: <Saving />,
    },
    {
      label: "Payment",
      value: "Payment",
      component: <Payment />,
    },
  ];

  const handleButtonClick = (value) => {
    setActiveButton(value);
  };
  return (
    <>
      <NavDash />
      <div className=" w-full hero-gradient h-[350px] relative flex flex-col items-center justify-center z-10 px-4 md:px-14">
        <img
          src={grid.src}
          className=" w-full absolute top-0 left-0 z-[1]"
          alt=""
        />
        <div className=" flex-col flex justify-center items-center z-10">
          <h1 className=" text-black">Our FAQ's</h1>
          <p className=" font-Manrope text-base md:text-xl font-normal text-black mt-3 max-w-[800px] text-center">
            Find answers to your questions about saving, mortgage options, and
            our home ownership plans.
          </p>
        </div>
      </div>

      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <div className="flex justify-center items-center border-b w-full border-[#EAECF0]">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`font-normal font-Yeseva w-1/4 lg:w-auto text-base md:text-xl pb-4 px-2 transition-all ${
                activeButton === button.value
                  ? "border-b-2 border-btnPrimary text-btnPrimary"
                  : ""
              }`}
              onClick={() => handleButtonClick(button.value)}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className=" mt-16">
          {buttons.find((button) => button.value === activeButton).component}
        </div>
      </div>

      <Banner />

      <Footer />
    </>
  );
}
