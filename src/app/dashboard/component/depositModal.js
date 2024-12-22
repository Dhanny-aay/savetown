"use client";
import React, { useState } from "react";
import XClose from "./assets/XClose.svg";
import { useUserContext } from "../UserContext";
import GroupDrawer from "./groupDrawer";

export default function DepositModal({
  isVisible,
  onClose,
  showWalletDepositDrawer,
  showGroupDepositDrawer,
}) {
  const { userProfile, loadingProfile } = useUserContext();
  const [isGroupDrawerVisible, setGroupDrawerVisible] = useState(false);

  // group drawer
  const showGroupDrawer = () => setGroupDrawerVisible(true);
  const closeGroupDrawer = () => setGroupDrawerVisible(false);

  const handleWalletDepo = () => {
    onClose(); // Close the modal
    showWalletDepositDrawer(); // Then call the function to show the dinner drawer
  };
  const handleGroupDepo = () => {
    onClose(); // Close the modal
    showGroupDepositDrawer(); // Then call the function to show the dinner drawer
  };
  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto flex items-center p-6 justify-center w-full bg-[#D5D7DA4D]`}
          onClick={onClose}
        >
          <div
            className=" w-full md:w-[600px] bg-white plansbg rounded-2xl border border-[#DAE0E6] flex items-start justify-center flex-col p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <img
              src={XClose.src}
              onClick={onClose}
              className=" absolute top-4 right-4"
              alt=""
            />
            <h5 className=" text-h55 md:text-h5 font-semibold font-Manrope text-black">
              Deposit Fund
            </h5>
            <div className=" max-w-[380p text-left mt-6 md:mt-8 text-[#595A5C] text-body14Regular font-Manrope">
              Which of the plans would you like to deposit fund?
            </div>
            <div className="flex flex-col items-center gap-4 mt-9 w-full">
              <button
                onClick={handleWalletDepo}
                className="w-full py-5 px-8 font-Manrope text-base font-medium text-[#595a5c] border border-gray-300 rounded-full text-left hover:bg-gray-100 transition"
              >
                Savetown Wallet
              </button>
              {userProfile.group_savings?.length > 0 ? (
                <button
                  onClick={handleGroupDepo}
                  className="w-full py-5 px-8 font-Manrope text-base font-medium text-[#595a5c] border border-gray-300 rounded-full text-left hover:bg-gray-100 transition"
                >
                  Group Savings
                </button>
              ) : (
                <button
                  onClick={showGroupDrawer}
                  className="w-full py-5 px-8 font-Manrope text-base font-medium text-[#595a5c] border border-gray-300 rounded-full text-left hover:bg-gray-100 transition"
                >
                  Create Group Savings
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* groups */}
      <GroupDrawer
        isVisible={isGroupDrawerVisible}
        onClose={closeGroupDrawer}
      />
    </>
  );
}
