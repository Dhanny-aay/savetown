import { useCallback, useEffect, useRef, useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import copy from "./assets/copy.svg";
import bank from "./assets/Bank.svg";
import wallet from "./assets/wallet.svg";
import load from "./assets/load.gif";
import blackload from "./assets/blackload.gif";
import {
  handleGetExchangAmount,
  handleInitiateDeposit,
  handleInitiateTransfer,
  handleVerifyDepo,
} from "@/app/userControllers/transactionController";
import { useUserContext } from "../UserContext";

export default function GroupDepositDrawer({ onClose, isVisible, selectedID }) {
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitiate, setLoadingInitiate] = useState(false);
  const [loadingPaid, setLoadingPaid] = useState(false);
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [errors, setErrors] = useState({});
  const [conversion, setConversion] = useState(null);
  const [details, setDetails] = useState([]);
  const [savingdetails, setSavingDetails] = useState([]);
  const [initiateSuccess, setInitiateSuccess] = useState(false); // Track initiation success
  const [isCopied, setIsCopied] = useState(false);
  const [selectedIdentifier, setSelectedIdentifier] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const { userStats, triggerFetchDashboard, userProfile } = useUserContext();
  const [amountToReceive, setAmountToReceive] = useState("");
  const [loadingExchange, setLoadingExchange] = useState(false);

  // console.log(selectedID);

  const resetStates = () => {
    setAmount(null);
    setLoading(false);
    setLoadingInitiate(false);
    setLoadingPaid(false);
    setLoadingTransfer(false);
    setErrors({});
    setConversion(null);
    setDetails([]);
    setSavingDetails([]);
    setInitiateSuccess(false);
    setIsCopied(false);
    setSelectedIdentifier("");
    setSelectedOption(null);
    setAmountToReceive("");
  };

  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00"; // Handle 0, null, and undefined
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // const validateFields = () => {
  //   const newErrors = {};
  //   if (!amount || amount <= 0) newErrors.amount = "Valid amount is required";
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const onSuccess = (response) => {
  //   setLoading(false);
  //   setConversion(response.data);
  //   setAmountToReceive(response.data.amountToReceive);
  // };

  // const onError = () => {
  //   setLoading(false);
  // };

  const amountRef = useRef(amount);

  // Update ref whenever state changes
  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  const handleSend = () => {
    setLoadingExchange(true); // Show loading
    const userData = {
      amount: amountRef.current,
      source_currency: "NGN",
      destination_currency: "USD",
    }; // Use latest amount value
    handleGetExchangAmount(
      userData,
      (response) => {
        setLoadingExchange(false); // Clear loading state
        setErrors({ amount: "" });
        setConversion(response.data); // Update conversion result
        setAmountToReceive(response.data.amountToReceive);
      },
      () => {
        setLoadingExchange(false); // Clear loading on error
        setErrors({ amount: "An error occurred" });
      }
    );
  };
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleSend = useCallback(debounce(handleSend, 500), []);

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const intValue = rawValue ? parseInt(rawValue, 10) : "";
    if (!isNaN(intValue)) {
      setAmount(intValue); // Update the state
      setConversion(null); // Clear previous conversion while typing
      debouncedHandleSend(); // Trigger debounced API call
    }
  };

  const onSuccessInitiate = (response) => {
    setLoadingInitiate(false);
    setDetails(response.data);
    setSelectedIdentifier(response.data.identifier);
    setInitiateSuccess(true); // Mark initiation as successful
  };

  const onErrorInitiate = () => {
    setLoadingInitiate(false);
  };

  const handleInitiate = (e) => {
    e.preventDefault();
    setLoadingInitiate(true);
    const userData = {
      amount: conversion?.sourceAmount,
      group_saving_id: selectedID,
      category: "group_savings",
    };
    handleInitiateDeposit(userData, onSuccessInitiate, onErrorInitiate);
  };

  const onSuccessTransfer = (response) => {
    setLoadingTransfer(false);
    triggerFetchDashboard();
    onClose();
    resetStates(); // Reset the states after a successful verify pay
  };

  const onErrorTransfer = () => {
    setLoadingTransfer(false);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    setLoadingTransfer(true);
    const userData = {
      amount: amountToReceive,
      action: "personal_savings_to_group_savings",
      group_saving_id: selectedID,
    };
    handleInitiateTransfer(userData, onSuccessTransfer, onErrorTransfer);
  };

  const handleVerifyPay = async () => {
    setLoadingPaid(true);
    try {
      const data = await handleVerifyDepo(selectedIdentifier);
      if (data) {
        setSavingDetails(data.data);
        triggerFetchDashboard();
        onClose();
        resetStates(); // Reset the states after a successful verify pay
      }
    } catch (error) {
      console.log("Error fetching personal saving details:", error);
    } finally {
      setLoadingPaid(false);
    }
  };

  const handleCopy = () => {
    if (details?.virtual_account_number) {
      navigator.clipboard.writeText(details.virtual_account_number);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Reset after 2 seconds
    }
  };
  // Handle user selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Reset selection and details
  const handleBacktoOpt = () => {
    setSelectedOption(null);
    // setInitiateSuccess(false);
  };
  const handleBack = () => {
    // setSelectedOption(null);
    setInitiateSuccess(false);
  };

  // console.log(amountToReceive);

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-4 md:px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />

        {/* Check if initiation is successful */}
        {initiateSuccess && !selectedOption ? (
          // Selection Menu
          <div className="w-full mt-9">
            <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
              Choose Payment Method
            </h3>
            <div className="mt-6 space-y-4">
              <div
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionSelect("bankTransfer")}
              >
                <div className="flex items-center">
                  <div className="bg-[#E6F2FF] p-4 md:p-6 rounded-full">
                    <img src={bank.src} className=" w-6 md:w-auto" alt="" />
                  </div>
                  <div className="ml-4">
                    <p className=" font-Manrope text-body16Regular text-[#000000] md:text-h55">
                      Bank Transfer
                    </p>
                    <p className=" mt-3 text-[#595A5C] text-body14Regular">
                      Fund Wallet via bank transfer
                    </p>
                  </div>
                </div>
                <img
                  src={ArrowRightBlk.src}
                  alt="Arrow"
                  className="w-4 h-4 rotate-180"
                />
              </div>

              <div
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={handleTransfer}
              >
                <div className="flex items-center">
                  <div className="bg-[#EFE6FD] p-4 md:p-6 rounded-full">
                    <img src={wallet.src} className=" w-6 md:w-auto" alt="" />
                  </div>
                  <div className="ml-4">
                    <p className=" font-Manrope text-body16Regular text-[#000000] md:text-h55">
                      Savetown Wallet
                    </p>
                    <p className=" mt-3 text-[#595A5C] text-body14Regular">
                      ${userStats?.wallet_balance ?? "0.00"}
                    </p>
                  </div>
                </div>
                {loadingTransfer ? (
                  <img src={blackload.src} className="w-4" alt="" />
                ) : (
                  <img
                    src={ArrowRightBlk.src}
                    alt="Arrow"
                    className="w-4 h-4 rotate-180"
                  />
                )}
              </div>

              <button
                onClick={handleBack}
                className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-8 font-semibold font-Manrope text-[#fff] text-xs 2xl:text-lg flex items-center justify-center"
              >
                Back
              </button>
            </div>
          </div>
        ) : initiateSuccess && selectedOption === "bankTransfer" ? (
          // Transfer Payment Section
          <div className="w-full mt-9">
            <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
              Transfer Payment
            </h3>
            <div className="mt-9">
              <div>
                <p className="text-[#878787] font-Manrope text-body14Regular">
                  Amount
                </p>
                <span className="font-Manrope text-h55 md:text-h5 font-semibold block text-black mt-4">
                  ₦ {details?.amount?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="mt-6">
                <p className="text-[#878787] font-Manrope text-body14Regular">
                  Bank
                </p>
                <span className="font-Manrope text-h55 md:text-h5 font-semibold block text-black mt-4">
                  {details?.virtual_account_bank}
                </span>
              </div>
              <div className="mt-6">
                <p className="text-[#878787] font-Manrope text-body14Regular">
                  Account Name
                </p>
                <span className="font-Manrope text-h55 md:text-h5 font-semibold block text-black mt-4">
                  {details?.virtual_account_name}
                </span>
              </div>
              <div className="mt-6">
                <p className="text-[#878787] font-Manrope text-body14Regular">
                  Account Number
                </p>
                <span className="font-Manrope text-h55 md:text-h5 font-semibold text-black mt-4 flex items-center space-x-2">
                  <p> {details?.virtual_account_number}</p>
                  <span
                    className="block text-[#878787] font-Manrope text-body12Regular cursor-pointer"
                    onClick={handleCopy}
                  >
                    {isCopied ? (
                      <p className="">Copied</p>
                    ) : (
                      <img src={copy.src} className="w-4" alt="Copy" />
                    )}
                  </span>
                </span>
              </div>

              <div className=" w-full grid grid-cols-2 gap-4">
                <button
                  onClick={handleBacktoOpt}
                  className="border border-[#878787] py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-[#878787] text-xs 2xl:text-lg flex items-center justify-center"
                >
                  Back
                </button>
                <button
                  onClick={handleVerifyPay}
                  disabled={loadingPaid}
                  className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
                >
                  {loadingPaid ? (
                    <img src={load.src} className="w-5" alt="" />
                  ) : (
                    "I have paid"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : initiateSuccess && selectedOption === "savetownWallet" ? (
          // Savetown Wallet Component
          <div className="w-full mt-9">
            <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
              Pay via Savetown Wallet
            </h3>
            {/* Savetown wallet details can be shown here */}
            <button onClick={handleBacktoOpt} className="mt-5 text-blue-500">
              Back to Selection
            </button>
          </div>
        ) : (
          // Deposit Funds Section
          <div>
            <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
              Deposit Funds to Group
            </h3>
            <label className="mt-9 block ">
              How much will you like to deposit?
            </label>
            <div className="mt-2 flex flex-col">
              <input
                placeholder="₦0.00"
                value={formatWithCommas(amount)}
                type="text"
                onChange={handleAmountChange}
                onKeyUp={debouncedHandleSend} // Use the debounced version
                className={`w-full border rounded-[32px] mt-1 text-body14Regular ${
                  errors.amount ? "border-[#DC3545]" : "border-[#D5D7DA]"
                } font-Manrope px-6 py-3`}
              />
              {errors.amount && (
                <span className="text-[#DC3545] text-xs text-left font-Manrope mt-2">
                  {errors.amount}
                </span>
              )}
            </div>
            {conversion && (
              <>
                <p className="text-[#8133F1] mt-3 text-body12Regular font-Manrope">
                  You will be depositing a total of (₦
                  {formatWithCommas(conversion?.sourceAmount)} = $
                  {conversion?.amountToReceive})
                </p>
                <p className="text-[#8133F1] mt-1 text-body12Regular font-Manrope">
                  At the rate of (₦1.00 = ${conversion?.rate})
                </p>
              </>
            )}
            {/* <button
              onClick={handleSend}
              disabled={loading || conversion}
              className={`bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center ${
                conversion ? "hidden" : ""
              }`}
            >
              {loading ? (
                <img src={load.src} className="w-5" alt="" />
              ) : (
                "Proceed"
              )}
            </button> */}
            {conversion && (
              <button
                onClick={handleInitiate}
                disabled={loadingExchange || !conversion || loadingInitiate} // Disable if loading or no conversion
                className={`bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center ${
                  loadingExchange || !conversion || loadingInitiate
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loadingInitiate ? (
                  <img src={load.src} className="w-5" alt="" />
                ) : (
                  "Continue"
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
