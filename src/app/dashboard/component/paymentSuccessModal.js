"use client";
import React from "react";
import tick from "./assets/tick-circle.svg";

export default function PaymentSuccessModal({
  isVisible,
  onClose,
  savingdetails,
  setSavingDetails,
}) {
  //   console.log(savingdetails);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00"; // Handle 0, null, and undefined
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBackToHome = () => {
    setSavingDetails([]);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 right-0 z-[999] h-screen overflow-y-auto flex items-center p-6 justify-center w-full bg-[#D5D7DA4D]">
          <div className=" relative w-full md:w-[90%] max-w-lg flex items-center justify-center">
            <div className="bg-white w-full rounded-[12px] border border-[#DAE0E6] p-6 pb-12 relative">
              <div className=" w-full absolute -top-6 left-0 flex items-center justify-center">
                <div className=" w-14 h-14 rounded-full shadow shadow-[#7A7A7A1F] bg-white flex items-center justify-center">
                  <img src={tick.src} alt="" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h2 className="mt-4 text-h6 md:text-h5 font-Manrope font-semibold text-center text-black">
                  Payment Success!
                </h2>
                <p className=" w-full md:w-auto text-body12Regular md:text-body14Regular text-[#474747] font-normal text-center mt-1 border-b pb-4 border-[#E8EAED]">
                  Your payment has been successfully done.
                </p>
                <span className="mt-3 px-4 py-2 font-Manrope bg-[#D6FFE1] text-[#2DA64F] text-center text-body12SemiBold font-bold rounded-[16px]">
                  Transfer Success
                </span>
              </div>

              <div className="mt-6 ">
                <div className="flex justify-between mb-4">
                  <span className=" text-[#9B9B9B] font-Manrope text-body10Regular md:text-body14Regular">
                    Transaction Number
                  </span>
                  <span className=" text-[#1B1B1B] font-Manrope text-body10Medium md:text-body14Medium">
                    {savingdetails?.identifier}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className=" text-[#9B9B9B] font-Manrope text-body10Regular md:text-body14Regular">
                    Time
                  </span>
                  <span className=" text-[#1B1B1B] font-Manrope text-body10Medium md:text-body14Medium">
                    {formatTime(savingdetails.updated_at)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className=" text-[#9B9B9B] font-Manrope text-body10Regular md:text-body14Regular">
                    Amount
                  </span>
                  <span className=" text-[#1B1B1B] font-Manrope text-body10Medium md:text-body14Medium">
                    {savingdetails?.converted_currency === "NGN" ? "₦" : "$"}
                    {formatWithCommas(
                      savingdetails?.converted_currency_amount
                    ) ?? 0}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className=" text-[#9B9B9B] font-Manrope text-body10Regular md:text-body14Regular">
                    Sender
                  </span>
                  <span className=" text-[#1B1B1B] capitalize font-Manrope text-body10Medium md:text-body14Medium">
                    {savingdetails?.user?.first_name}{" "}
                    {savingdetails?.user?.last_name}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className=" text-[#9B9B9B] font-Manrope text-body10Regular md:text-body14Regular">
                    Status
                  </span>
                  <span className=" text-[#1B1B1B] font-Manrope capitalize text-body10Medium md:text-body14Medium">
                    {savingdetails?.status}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className=" text-[#9B9B9B] font-Manrope text-body10Regular md:text-body14Regular">
                    Description
                  </span>
                  <span className=" text-[#1B1B1B] font-Manrope text-body10Medium md:text-body14Medium">
                    {savingdetails?.description}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className=" text-[#9B9B9B] font-Manrope text-body10Regular md:text-body14Regular">
                    Estimated Arrival
                  </span>
                  <span className=" text-[#1B1B1B] font-Manrope text-body10Medium md:text-body14Medium">
                    Sep 15, 2023
                  </span>
                </div> */}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleBackToHome}
                  className="bg-[#ED1450] font-Manrope hover:bg-[#e32b50] w-full text-white py-2 px-6 rounded-[10000px] text-body14Bold md:text-body16Bold"
                >
                  Back to home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
