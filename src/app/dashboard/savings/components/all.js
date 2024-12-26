"use client";
import { useEffect, useState } from "react";
import SavingPlanTab from "../../component/savingPlanTab";
import { useUserContext } from "../../UserContext";
import open from "./assets/open.svg";
import receipt from "./assets/receipt.svg";
import { handleGetTransactionsWithParam } from "@/app/userControllers/transactionController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonTable from "@/app/utils/loadingTable";

export default function All() {
  const isDashboard = false;
  const { userStats, loading, toggleVisibility, isVisible } = useUserContext();
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const params = {
      // type: "PageTitle",
      // page: "Home",
    };
    try {
      const data = await handleGetTransactionsWithParam(params);
      if (data) {
        setTransactions(data.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00"; // Handle 0, null, and undefined
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Date options
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };

    // Get the day and determine the appropriate suffix
    const day = date.getDate();
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    // Format the date with the suffix
    const formattedDate = date
      .toLocaleDateString("en-US", dateOptions)
      .replace(/\d+/, day + daySuffix);

    // Time options
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    // Combine date and time
    return `${formattedDate} at ${formattedTime}`;
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

      {loadingTransactions ? (
        <SkeletonTable />
      ) : transactions.length === 0 ? (
        <div className=" w-full mt-8 flex flex-col items-center justify-center">
          <img src={receipt.src} className=" w-[45px]  md:w-auto" alt="" />
          <h6 className="text-center text-body16Bold font-Manrope text-[#666666] mt-6">
            Transcation History
          </h6>
          <p className="text-body14Regular font-Manrope text-[#595A5C] mt-2 text-center">
            Recent transactions and transactions history will show here
          </p>
        </div>
      ) : (
        <>
          <h2 className=" text-h55 md:text-h5 font-bold text-[#262626] mt-8 font-Manrope">
            Recent Transactions
          </h2>
          {/* Table Section with Fixed Height */}
          <div className="overflow-auto mt-6 max-h-[100%] h-screen md:h-[55vh] border border-[#c2c4c686] rounded-[8px]">
            {/* Adjust the height to fit the screen */}

            <table className="w-full bg-white shadow font-Manrope relative">
              <thead className="sticky top-0 left-0 bg-white">
                <tr className="text-left">
                  <th className="p-4 w-[64px] font-medium text-sm">S/N</th>
                  <th className="p-4 font-medium text-sm">Name</th>
                  <th className="p-4 w-[148px] text-left font-medium text-sm">
                    Payment ID
                  </th>
                  <th className="p-4 w-[99px] text-left font-medium text-sm">
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
                {transactions
                  .slice() // Create a copy to avoid mutating the original array
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  ) // Sort by most recent date
                  .map((tx, index) => (
                    <tr key={tx.id} className="border-t">
                      <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                        {index + 1}
                      </td>
                      <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                        {tx.description}
                      </td>
                      <td className="p-4 text-[#5F6D7E] text-sm font-medium text-left">
                        {tx.identifier}
                      </td>
                      <td className="p-4 text-[#5F6D7E] text-sm font-medium text-left">
                        {tx.amount}
                      </td>
                      <td className="p-4 text-[#5F6D7E] text-sm capitalize font-medium text-center">
                        {tx.type}
                      </td>
                      <td className="p-4 text-[#5F6D7E] text-sm font-medium text-center">
                        {formatDateTime(tx.created_at)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
