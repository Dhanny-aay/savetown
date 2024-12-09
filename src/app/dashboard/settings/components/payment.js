"use client";
import { useState } from "react";
import AddPayment from "./addPayment";
import PlusCircle from "./assets/PlusCircle.svg";
import Bank from "./assets/Bank.svg";
import Trash from "./assets/Trash.svg";
import RemoveModal from "./removeModal";
import ChangeMeth from "./changeMeth";

export default function Payment() {
  const [isPaymentDrawerVisible, setPaymentDrawerVisible] = useState(false);
  const [isChangeDrawerVisible, setChangeDrawerVisible] = useState(false);
  const [isMethodAdded, setMethodAdded] = useState(true);
  const [isRemoveVisible, setRemoveVisible] = useState(false);

  // Remove modal
  const showRemoveModal = () => setRemoveVisible(true);
  const closeRemoveModal = () => setRemoveVisible(false);

  // payment meth drawer
  const showPaymentDrawer = () => setPaymentDrawerVisible(true);
  const closePaymentDrawer = () => setPaymentDrawerVisible(false);

  // change drawer
  const showChangeDrawer = () => setChangeDrawerVisible(true);
  const closeChangeDrawer = () => setChangeDrawerVisible(false);

  return (
    <>
      <div className=" w-full flex items-center justify-between pb-5 border-b border-[#E4E7EC]">
        <div>
          <h3 className="text-body16Bold font-Manrope text-[#595A5C]">
            Payment Method
          </h3>
          <p className=" text-body12Regular font-Manrope text-[#475467] mt-1">
            Update your account number here.
          </p>
        </div>
        {/* <button className=" bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 px-6 flex items-center">
          <p className="text-body14SemiBold font-Manrope text-white">Save</p>
        </button> */}
      </div>

      <div className=" mt-6">
        {isMethodAdded ? (
          <>
            <div className=" w-full border border-[#EAEBF0] p-6 rounded-[15px] flex items-center justify-between">
              <div className=" flex items-center space-x-3">
                <span className=" w-12 md:w-16 h-12 md:h-16 bg-[#E6F2FF] rounded-full flex items-center justify-center">
                  <img src={Bank.src} className=" w-5 md:w-auto" alt="" />
                </span>
                <div className="">
                  <div className=" flex items-center space-x-2">
                    <p className=" text-body14SemiBold md:text-body16SemiBold font-Manrope text-[#000]">
                      Patrick James
                    </p>

                    <p className=" text-body14SemiBold md:text-body16SemiBold font-Manrope text-[#000]">
                      Access Bank
                    </p>
                  </div>
                  <p className="text-body12Regular mt-3 font-Manrope text-[#666666]">
                    ********6790
                  </p>
                </div>
              </div>
              <button onClick={showRemoveModal} className="">
                <img src={Trash.src} className=" md:hidden" alt="" />
                <p className=" text-[#F14373] text-body14SemiBold hidden md:block font-Manrope">
                  Remove
                </p>
              </button>
            </div>

            <button
              onClick={showChangeDrawer}
              className=" flex items-center space-x-2 mt-4"
            >
              <img src={PlusCircle.src} alt="" />
              <p className=" text-[#F14373] text-body14SemiBold font-Manrope">
                Change account number
              </p>
            </button>
          </>
        ) : (
          <button
            onClick={showPaymentDrawer}
            className=" flex items-center space-x-2"
          >
            <img src={PlusCircle.src} alt="" />
            <p className=" text-[#F14373] text-body14SemiBold font-Manrope">
              Add account number for Withdrawal
            </p>
          </button>
        )}
      </div>

      <AddPayment
        isVisible={isPaymentDrawerVisible}
        onClose={closePaymentDrawer}
      />
      <ChangeMeth
        isVisible={isChangeDrawerVisible}
        onClose={closeChangeDrawer}
      />
      <RemoveModal isVisible={isRemoveVisible} onClose={closeRemoveModal} />
    </>
  );
}
