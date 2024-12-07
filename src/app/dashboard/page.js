"use client";
import { useState } from "react";
import open from "./assets/open.svg";
import depo from "./assets/depo.svg";
import Calculator from "./assets/Calculator.svg";
import ArrowRightwhite from "./assets/ArrowRightwhite.svg";
import xml from "./assets/xml.svg";
import share from "./assets/share.svg";
import SavingPlanTab from "./component/savingPlanTab";
import Link from "next/link";
import DinnerDrawer from "./component/dinnerDrawer";
import ReferralDrawer from "./component/referralDrawer";
import CalculatorDrawer from "./component/calculatorDrawer";
import VerifyDrawer from "./component/verifyDrawer";
import DepositDrawer from "./component/depositDrawer";

export default function Page() {
  const [isDinnerDrawerVisible, setDinnerDrawerVisible] = useState(false);
  const [isReferralDrawerVisible, setReferralDrawerVisible] = useState(false);
  const [isCalculatorDrawerVisible, setCalculatorDrawerVisible] =
    useState(false);
  const [isVerifyDrawerVisible, setVerifyDrawerVisible] = useState(false);
  const [isDepositDrawerVisible, setDepositDrawerVisible] = useState(false);
  // dinner drawer
  const showDinnerDrawer = () => setDinnerDrawerVisible(true);
  const closeDinnerDrawer = () => setDinnerDrawerVisible(false);

  // referral drawer
  const showReferralDrawer = () => setReferralDrawerVisible(true);
  const closeReferralDrawer = () => setReferralDrawerVisible(false);

  // calculator drawer
  const showCalculatorDrawer = () => setCalculatorDrawerVisible(true);
  const closeCalculatorDrawer = () => setCalculatorDrawerVisible(false);

  // verification drawer
  const showVerifyDrawer = () => setVerifyDrawerVisible(true);
  const closeVerifyDrawer = () => setVerifyDrawerVisible(false);

  // deposit drawer
  const showDepositDrawer = () => setDepositDrawerVisible(true);
  const closeDepositDrawer = () => setDepositDrawerVisible(false);

  return (
    <>
      <div className=" shadowDB w-full bg-white rounded-[32px] p-8 flex items-center justify-between">
        <div className=" w-1/2">
          <div className=" flex items-center space-x-3">
            <p className=" text-body16Bold font-Manrope text-[#595A5C]">
              Total Balance
            </p>

            <img src={open.src} className=" w-5" alt="" />
          </div>
          <h2 className=" text-h1 font-Manrope font-bold mt-1">$ 0.00</h2>
        </div>
        <div className=" w-1/2 flex items-center justify-end space-x-3">
          <button
            onClick={showDepositDrawer}
            className=" bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 px-6 flex items-center space-x-2"
          >
            <img src={depo.src} className=" w-5" alt="" />
            <p className="text-body16Bold font-Manrope text-white">Deposit</p>
          </button>
          <button
            onClick={showCalculatorDrawer}
            className=" rounded-[40px] border border-[#C2C4C6] py-3 px-6 flex items-center space-x-2"
          >
            <img src={Calculator.src} className=" w-5" alt="" />
            <p className="text-body16Bold font-Manrope text-[#262626]">
              Calculator
            </p>
          </button>
        </div>
      </div>

      <h2 className=" text-h5 font-bold text-[#262626] mt-8 font-Manrope">
        My Savings Plan
      </h2>
      <SavingPlanTab />

      <div className=" w-full mt-6 rfrcode h-[150px] rounded-[24px] py-8 px-6 flex justify-between items-center">
        <div className=" w-[48%]">
          <h3 className=" text-h5 font-bold font-Manrope text-white">
            Refer your friends and Earn
          </h3>
          <p className=" mt-1 font-Manrope font-normal text-body14Regular text-white">
            Your friend gets 10% bonus on sign up and you get 20% bonus on house
            listing which will reflect on your wallet.
          </p>
        </div>
        <div className=" w-[48%] flex items-center justify-between">
          <img src={xml.src} className=" mt-[54px]" alt="" />

          <button className=" flex items-center bg-[#FFFFFF] rounded-[32px] px-6 py-3 space-x-2 text-[#262626] font-Manrope text-body14SemiBold">
            <p>ABCDG234</p>
            <img src={share.src} className=" w-5" alt="" />
          </button>

          <button
            onClick={showReferralDrawer}
            className="flex items-center space-x-2"
          >
            <span className="text-[#FFFFFF] text-body14Bold font-Manrope">
              View referrals
            </span>
            <img src={ArrowRightwhite.src} className="" alt="" />
          </button>
        </div>
      </div>

      <div className=" w-full ">
        <h2 className=" text-h5 font-bold text-[#262626] mt-8 font-Manrope">
          My To-Dos
        </h2>
        <div className=" w-full h-[140px] rounded-3xl bg-[#F3F0E9] mt-6 p-6">
          <h4 className=" text-h5 font-Manrope font-bold text-black">
            Profile Verification
          </h4>
          <p className=" text-body14Regular font-Manrope text-black mt-1">
            Complete your profile verification to unlock all features
          </p>

          <div className=" flex items-end justify-between">
            <div className="w-[70%] bg-[#FFFFFF] rounded-full mt-3">
              <div
                className="bg-[#9900CC] text-xs font-medium text-blue-100 font-Manrope text-center p-0.5 leading-none rounded-full"
                style={{ width: "70%" }}
              >
                70%
              </div>
            </div>
            <button
              onClick={showVerifyDrawer}
              className=" bg-btnPrimary rounded-[40px] w-[25%] border border-[#EAEBF0] py-3 px-6 "
            >
              <p className="text-xs font-bold font-Manrope text-white">
                Complete Verification Now
              </p>
            </button>
          </div>
        </div>
      </div>

      <div className=" w-full">
        <div className=" flex space-x-3 items-center mt-8">
          <h2 className=" text-h5 font-bold text-[#262626] font-Manrope">
            House Model
          </h2>

          <button className=" bg-[#EAF6EC] rounded-[40px] py-2 px-3 text-[#24983F] text-body12SemiBold font-Manrope">
            Coming soon
          </button>
        </div>

        <div className=" w-full mt-6 grid grid-cols-3 gap-6">
          <div className="plansbg w-full h-[250px] bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]"></div>
          <div className="plansbg w-full h-[250px] bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]"></div>
          <div className="plansbg w-full h-[250px] bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]"></div>
        </div>
      </div>
      {/* <SavingPlanTab /> */}

      {/* dinner form */}
      <DinnerDrawer
        isVisible={isDinnerDrawerVisible}
        onClose={closeDinnerDrawer}
      />
      {/* referrals */}
      <ReferralDrawer
        isVisible={isReferralDrawerVisible}
        onClose={closeReferralDrawer}
      />

      {/* calculator */}
      <CalculatorDrawer
        isVisible={isCalculatorDrawerVisible}
        onClose={closeCalculatorDrawer}
      />

      {/* calculator */}
      <VerifyDrawer
        isVisible={isVerifyDrawerVisible}
        onClose={closeVerifyDrawer}
      />

      {/* deposit */}
      <DepositDrawer
        isVisible={isDepositDrawerVisible}
        onClose={closeDepositDrawer}
      />
    </>
  );
}
