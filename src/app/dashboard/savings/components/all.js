"use client";
import { useEffect, useState } from "react";
import SavingPlanTab from "../../component/savingPlanTab";
import { useUserContext } from "../../UserContext";
import open from "./assets/open.svg";
import receipt from "./assets/receipt.svg";
import { handleGetTransactionsWithParam } from "@/app/userControllers/transactionController";
import SkeletonTable from "@/app/utils/loadingTable";
import TableFilter from "./dateFilter";

export default function All() {
  const isDashboard = false;
  const { userStats, loading, toggleVisibility, isVisible } = useUserContext();
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const fetchTransactions = async () => {
    const params = {};
    try {
      const data = await handleGetTransactionsWithParam(params);
      if (data) {
        setTransactions(data.data);
        setFilteredTransactions(data.data); // Initialize filtered transactions with all transactions
      }
    } catch (error) {
      console.log("Error fetching transactions:", error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const day = date.getDate();
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    const formattedDate = date
      .toLocaleDateString("en-US", dateOptions)
      .replace(/\d+/, day + daySuffix);

    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return `${formattedDate} at ${formattedTime}`;
  };

  const handleFilterChange = (filtered) => {
    setFilteredTransactions(filtered);
  };

  return (
    <>
      <div className="shadowDB w-full bg-white rounded-[32px] p-8 flex items-center justify-between">
        <div className="w-full">
          <div className="flex items-center space-x-3">
            <p className="text-body14Bold md:text-body16Bold font-Manrope text-[#595A5C]">
              Total Balance
            </p>
            <img
              src={open.src}
              className="w-4 md:w-5 cursor-pointer"
              alt="Toggle visibility"
              onClick={toggleVisibility}
            />
          </div>
          <h2 className="text-h3 md:text-h1 font-Manrope font-bold mt-1 text-[#666666]">
            {isVisible
              ? `${userStats?.currency === "NGN" ? "₦" : "$"}${
                  formatWithCommas(userStats?.total_balance) ?? 0
                }`
              : "****"}
          </h2>
        </div>
      </div>

      <h2 className="text-h55 md:text-h5 font-bold text-[#262626] mt-8 font-Manrope">
        My Savings Plan
      </h2>
      <SavingPlanTab isDashboard={isDashboard} />

      {loadingTransactions ? (
        <SkeletonTable />
      ) : transactions.length === 0 ? (
        <div className="w-full mt-8 flex flex-col items-center justify-center">
          <img
            src={receipt.src}
            className="w-[45px] md:w-auto"
            alt="No transactions"
          />
          <h6 className="text-center text-body16Bold font-Manrope text-[#666666] mt-6">
            Transaction History
          </h6>
          <p className="text-body14Regular font-Manrope text-[#595A5C] mt-2 text-center">
            Recent transactions and transaction history will show here.
          </p>
        </div>
      ) : (
        <>
          <div className="w-full mt-6 md:mt-8">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row items-start md:items-center w-full justify-between">
              <h2 className="text-h55 md:text-h5 font-bold text-[#262626] font-Manrope">
                Recent Transactions
              </h2>
              <TableFilter
                transactions={transactions}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="overflow-auto mt-6 max-h-[100%] h-screen md:h-[55vh] border border-[#c2c4c686] rounded-[8px]">
            {filteredTransactions.length > 0 ? (
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
                  {filteredTransactions
                    .slice()
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
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
                          {tx.currency === "NGN" ? "₦" : "$"}
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
            ) : (
              <div className="p-4 text-center text-[#5F6D7E] text-sm w-full h-full justify-center items-center flex">
                No transactions within this period.
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
