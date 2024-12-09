"use client";
import openwhite from "./assets/openwhite.svg";
import infop from "./assets/infop.svg";
import depo from "./assets/depo.svg";
import withdraw from "./assets/withdraw.svg";
import forward from "./assets/forward.svg";
import receipt from "./assets/receipt.svg";
import pattern from "./assets/pattern.svg";
import { useState } from "react";
import LearnModal from "../../component/learnModal";
import DepositDrawer from "../../component/depositDrawer";
import WithdrawDrawer from "../../component/withdrawDrawer";

export default function SaveWallet() {
  const [isLearnVisible, setLearnVisible] = useState(false);
  const [isWithdrawDrawerVisible, setWithdrawDrawerVisible] = useState(false);
  const [isDepositDrawerVisible, setDepositDrawerVisible] = useState(false);

  // withdraw drawer
  const showWithdrawDrawer = () => setWithdrawDrawerVisible(true);
  const closeWithdrawDrawer = () => setWithdrawDrawerVisible(false);

  // deposit drawer
  const showDepositDrawer = () => setDepositDrawerVisible(true);
  const closeDepositDrawer = () => setDepositDrawerVisible(false);

  // learn modal
  const showLearnModal = () => setLearnVisible(true);
  const closeLearnModal = () => setLearnVisible(false);

  const transactions = [
    {
      id: 1,
      name: "Transfer from Olamide Shittu Chinwe Okonkwo",
      transactionId: "SCI-20-0102",
      amount: "$10,000",
      status: "Credit",
      date: "20-10-24, 11:16 AM",
    },
    {
      id: 2,
      name: "Transfer from Olamide Shittu Aisha Mohammed",
      transactionId: "SCI-20-0103",
      amount: "$10,000",
      status: "Credit",
      date: "20-10-24, 11:16 AM",
    },
    {
      id: 3,
      name: "Transfer from Olamide Shittu Emeka Okafor",
      transactionId: "SCI-20-0104",
      amount: "$10,000",
      status: "Debit",

      date: "20-10-24, 11:16 AM",
    },
    {
      id: 4,
      name: "Transfer from Olamide Shittu Fatima Ibrahim",
      transactionId: "SCI-20-0105",
      amount: "$10,000",
      status: "Credit",
      date: "20-10-24, 11:16 AM",
    },
    {
      id: 5,
      name: "Transfer from Olamide Shittu Jide Adewale",
      transactionId: "SCI-20-0106",
      amount: "$10,000",
      status: "Credit",
      date: "20-10-24, 11:16 AM",
    },
  ];

  return (
    <>
      <h2 className=" text-h5 font-bold text-[#262626] font-Manrope">
        Savetown Wallet
      </h2>

      <div className="bg-[#9654F4] relative rounded-[24px] lg:h-[180px] p-6 mt-6 md:mt-8">
        <img src={pattern.src} className=" absolute top-0 right-0" alt="" />
        <div className=" flex w-full justify-between items-start">
          <div>
            <div className=" flex items-center space-x-3">
              <p className=" text-body14Medium md:text-body16Medium font-Manrope text-[#FFFFFF]">
                Savetown Wallet Balance
              </p>
              <img src={openwhite.src} className=" w-4 md:w-5" alt="" />
            </div>
            <h2 className=" text-2xl md:text-[32px] font-Manrope font-bold text-white mt-[6px]">
              $ 0.00
            </h2>
          </div>
          {/* <button
            onClick={showLearnModal}
            className=" bg-[#EFE6FD] px-3 py-2 rounded-[40px] flex items-center space-x-1 z-10"
          >
            <img src={infop.src} className="" alt="" />
            <p className=" text-[#5900D9] font-Manrope text-body14Regular">
              Learn more
            </p>
          </button> */}
        </div>

        <div className=" md:absolute mt-8 md:mt-0 w-full md:w-auto justify-center items-center bottom-6 right-6 flex space-x-3">
          <button
            onClick={showDepositDrawer}
            className=" bg-[#fff] rounded-[40px] py-3 px-6 w-1/2 md:w-auto flex items-center justify-center space-x-2"
          >
            <img src={depo.src} className=" w-4 md:w-5" alt="" />
            <p className=" text-body12SemiBold md:text-body14Bold font-Manrope text-black">
              Deposit
            </p>
          </button>
          <button
            onClick={showWithdrawDrawer}
            className="border border-[#fff] rounded-[40px] py-3 px-6 w-1/2 md:w-auto flex items-center justify-center space-x-2"
          >
            <img src={withdraw.src} className=" rotate-90 w-4 md:w-5" alt="" />
            <p className=" text-body12SemiBold md:text-body14Bold font-Manrope text-white">
              Withdraw
            </p>
          </button>
        </div>
      </div>

      <div
        onClick={showLearnModal}
        className=" border border-[#C2C4C6] cursor-pointer rounded-[15px] px-6 py-3 w-full md:w-1/2 mt-8 flex items-center justify-between"
      >
        <div className=" flex items-center space-x-4">
          <span className=" w-16 h-16 rounded-full flex items-center justify-center bg-[#E6F2FF]">
            <img src={infop.src} className=" ml-1" alt="" />
          </span>
          <div className="">
            <h6 className=" text-body14Bold font-Manrope text-[#262626]">
              About Savetown Wallet
            </h6>
            <p className=" font-Manrope text-body12Regular text-[#595A5C] mt-2 leading-none">
              Learn more about the plan
            </p>
          </div>
        </div>
        <img src={forward.src} alt="" />
      </div>

      <div className=" w-full mt-8 flex flex-col items-center justify-center">
        <img src={receipt.src} className="" alt="" />
        <h6 className="text-center text-body16Bold font-Manrope text-[#666666] mt-6">
          Transcation History
        </h6>
        <p className="text-body14Regular font-Manrope text-[#595A5C] mt-2 text-center">
          Recent tarnsctions and transctions history will show here
        </p>
      </div>

      {/* <h2 className=" text-h5 font-bold text-[#262626] mt-8 font-Manrope">
        Recent Transactions
      </h2>

       Table Section with Fixed Height 
      <div className="overflow-auto max-h-[100%] h-screen md:h-[55vh] mt-4">
        {" "}
         Adjust the height to fit the screen
        <table className="w-full mt-4 bg-white rounded shadow font-Manrope relative">
          <thead className=" sticky top-0 left-0">
            <tr className="text-left bg-gray-50">
              <th className="p-4 w-[64px] font-medium text-sm">S/N</th>
              <th className="p-4 font-medium text-sm">Name</th>
              <th className="p-4 w-[148px] text-right font-medium text-sm">
                Payment ID
              </th>
              <th className="p-4 w-[99px] text-right font-medium text-sm">
                Amount
              </th>
              <th className="p-4 w-[149px] text-center font-medium text-sm">
                Payment Type
              </th>
              <th className="p-4 w-[149px] text-center font-medium text-sm">
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {tx.id.toString().padStart(2, "0")}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {tx.name}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium text-right">
                  {tx.transactionId}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium text-right">
                  {tx.amount}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium text-center">
                  {tx.status}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium text-center">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* learn modal */}
      <LearnModal isVisible={isLearnVisible} onClose={closeLearnModal} />

      {/* deposit */}
      <DepositDrawer
        isVisible={isDepositDrawerVisible}
        onClose={closeDepositDrawer}
      />
      {/* withdraw */}
      <WithdrawDrawer
        isVisible={isWithdrawDrawerVisible}
        onClose={closeWithdrawDrawer}
      />
    </>
  );
}
