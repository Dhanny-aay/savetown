"use client";
import openwhite from "./assets/openwhite.svg";
import infop from "./assets/infop.svg";
import depo from "./assets/depo.svg";
import withdraw from "./assets/withdraw.svg";
import forward from "./assets/forward.svg";
import receipt from "./assets/receipt.svg";
import pattern from "./assets/pattern.svg";
import { useEffect, useState } from "react";
import LearnModal from "../../component/learnModal";
import WithdrawDrawer from "../../component/withdrawDrawer";
import WalletDepositDrawer from "../../component/walletDepositDrawer";
import { useUserContext } from "../../UserContext";
import VerifyDrawer from "../../component/verifyDrawer";
import {
  handleGetTransactionsWithParam,
  handleGetUserTransactions,
} from "@/app/userControllers/transactionController";
import SkeletonTable from "@/app/utils/loadingTable";
import TableFilter from "./dateFilter";

export default function SaveWallet() {
  const [isLearnVisible, setLearnVisible] = useState(false);
  const [isWithdrawDrawerVisible, setWithdrawDrawerVisible] = useState(false);
  const [isDepositDrawerVisible, setDepositDrawerVisible] = useState(false);
  const [isVerifyDrawerVisible, setVerifyDrawerVisible] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const fetchTransactions = async () => {
    const params = {
      category: "personal_savings",
    };
    try {
      const data = await handleGetTransactionsWithParam(params);
      if (data) {
        setTransactions(data.data);
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

  const {
    userProfile,
    loadingProfile,
    userStats,
    loading,
    toggleVisibility,
    isVisible,
  } = useUserContext();

  // withdraw drawer
  const showWithdrawDrawer = () => setWithdrawDrawerVisible(true);
  const closeWithdrawDrawer = () => setWithdrawDrawerVisible(false);

  // deposit drawer
  const showDepositDrawer = () => setDepositDrawerVisible(true);
  const closeDepositDrawer = () => setDepositDrawerVisible(false);

  // learn modal
  const showLearnModal = () => setLearnVisible(true);
  const closeLearnModal = () => setLearnVisible(false);

  // verification drawer
  const showVerifyDrawer = () => setVerifyDrawerVisible(true);
  const closeVerifyDrawer = () => setVerifyDrawerVisible(false);

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

  const handleFilterChange = (filtered) => {
    setFilteredTransactions(filtered);
  };

  return (
    <>
      <h2 className=" text-h5 font-bold text-[#262626] font-Manrope">
        Savetown Wallet
      </h2>

      <div className="bg-[#9654F4] relative rounded-[24px] md:h-[180px] p-6 mt-6 md:mt-8">
        <img src={pattern.src} className=" absolute top-0 right-0" alt="" />
        <div className=" flex w-full justify-between items-start">
          <div>
            <div className=" flex items-center space-x-3">
              <p className=" text-body14Medium md:text-body16Medium font-Manrope text-[#FFFFFF]">
                Savetown Wallet Balance
              </p>
              <img
                src={openwhite.src}
                className=" w-4 md:w-5 cursor-pointer"
                alt="Toggle wallet balance visibility"
                onClick={toggleVisibility}
              />
            </div>
            <h2 className=" text-2xl md:text-[32px] font-Manrope font-bold text-white mt-[6px]">
              {isVisible
                ? `${userStats?.currency === "NGN" ? "₦" : "$"}${
                    formatWithCommas(userStats?.wallet_balance) ?? "0.00"
                  }`
                : "****"}
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
            onClick={() => {
              if (userProfile?.id_status === "pending") {
                showVerifyDrawer();
              } else if (userProfile?.id_status === "verified") {
                showDepositDrawer();
              }
            }}
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
        className=" border border-[#C2C4C6] cursor-pointer rounded-[15px] px-4 md:px-6 py-3 w-full md:w-1/2 mt-8 flex items-center justify-between"
      >
        <div className=" flex items-center space-x-4">
          <span className=" w-10 md:w-16 h-10 md:h-16 rounded-full flex items-center justify-center bg-[#E6F2FF]">
            <img src={infop.src} className=" w-5 md:w-auto ml-1" alt="" />
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
        <img src={forward.src} className=" h-3 md:h-auto" alt="" />
      </div>

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
          <div className=" w-full mt-6 md:mt-8">
            <div className=" flex flex-col space-y-6 md:space-y-0 md:flex-row items-start md:items-center w-full justify-between">
              <h2 className="text-h55 md:text-h5 font-bold text-[#262626] font-Manrope">
                Recent Transactions
              </h2>

              {/* Filter Section */}
              <div className="flex items-center space-x-4">
                <TableFilter
                  transactions={transactions}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
          {/* Table Section with Fixed Height */}
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

      {/* learn modal */}
      <LearnModal isVisible={isLearnVisible} onClose={closeLearnModal} />

      {/* deposit */}
      <WalletDepositDrawer
        isVisible={isDepositDrawerVisible}
        onClose={closeDepositDrawer}
      />
      {/* withdraw */}
      <WithdrawDrawer
        isVisible={isWithdrawDrawerVisible}
        onClose={closeWithdrawDrawer}
      />

      {/* verify */}
      <VerifyDrawer
        isVisible={isVerifyDrawerVisible}
        onClose={closeVerifyDrawer}
      />
    </>
  );
}
