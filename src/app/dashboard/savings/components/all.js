"use client";
import { useState } from "react";
import SavingPlanTab from "../../component/savingPlanTab";
import { useUserContext } from "../../UserContext";
import open from "./assets/open.svg";
import receipt from "./assets/receipt.svg";

export default function All() {
  const isDashboard = false;
  const { userStats, loading, toggleVisibility, isVisible } = useUserContext();

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

  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00"; // Handle 0, null, and undefined
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div className=" shadowDB w-full bg-white rounded-[32px] p-8 flex items-center justify-between">
        <div className=" w-full ">
          <div className=" flex items-center space-x-3">
            <p className=" text-body14Bold md:text-body16Bold font-Manrope text-[#595A5C]">
              Total Balance
            </p>

            <img
              src={open.src}
              className="w-4 md:w-5 cursor-pointer"
              alt="Toggle visibility"
              onClick={toggleVisibility}
            />
          </div>
          <h2 className=" text-h3 md:text-h1 font-Manrope font-bold mt-1 text-[#666666]">
            {isVisible
              ? `$${formatWithCommas(userStats?.total_balance) ?? 0}`
              : "****"}
          </h2>
        </div>
      </div>
      <h2 className=" text-h55 md:text-h5 font-bold text-[#262626] mt-8 font-Manrope">
        My Savings Plan
      </h2>
      <SavingPlanTab isDashboard={isDashboard} />
      <div className=" w-full mt-8 flex flex-col items-center justify-center">
        <img src={receipt.src} className=" w-[45px]  md:w-auto" alt="" />
        <h6 className="text-center text-body16Bold font-Manrope text-[#666666] mt-6">
          Transcation History
        </h6>
        <p className="text-body14Regular font-Manrope text-[#595A5C] mt-2 text-center">
          Recent transactions and transactions history will show here
        </p>
      </div>
      {/* <h2 className=" text-h55 md:text-h5 font-bold text-[#262626] mt-8 font-Manrope">
        Recent Transactions
      </h2>
      Table Section with Fixed Height
      <div className="overflow-auto max-h-[100%] h-screen md:h-[55vh]">
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
    </>
  );
}
