import { useCallback, useEffect, useRef, useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import copy from "./assets/copy.svg";
import load from "./assets/load.gif";
import {
  handleGetExchangAmount,
  handleInitiateDeposit,
  handleVerifyDepo,
} from "@/app/userControllers/transactionController";
import { useUserContext } from "../UserContext";

export default function WalletDepositDrawer({ onClose, isVisible }) {
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingExchange, setLoadingExchange] = useState(false);
  const [loadingInitiate, setLoadingInitiate] = useState(false);
  const [loadingPaid, setLoadingPaid] = useState(false);
  const [errors, setErrors] = useState({});
  const [conversion, setConversion] = useState(null);
  const [details, setDetails] = useState([]);
  const [savingdetails, setSavingDetails] = useState([]);
  const [initiateSuccess, setInitiateSuccess] = useState(false); // Track initiation success
  const [isCopied, setIsCopied] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const { triggerFetchDashboard } = useUserContext();

  const resetState = () => {
    setAmount(null);
    setLoading(false);
    setLoadingInitiate(false);
    setLoadingPaid(false);
    setErrors({});
    setConversion(null);
    setDetails([]);
    setSavingDetails([]);
    setInitiateSuccess(false);
    setIsCopied(false);
    setSelectedID("");
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

  // console.log(amount);

  const onSuccessInitiate = (response) => {
    setLoadingInitiate(false);
    setDetails(response.data);
    setSelectedID(response.data.identifier);
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
      category: "personal_savings",
    };
    handleInitiateDeposit(userData, onSuccessInitiate, onErrorInitiate);
  };

  const handleVerifyPay = async () => {
    setLoadingPaid(true);
    try {
      const data = await handleVerifyDepo(selectedID);
      if (data) {
        setSavingDetails(data.data);
        triggerFetchDashboard();
        onClose();
        resetState(); // Reset all state values
      }
    } catch (error) {
      console.error("Error fetching personal saving details:", error);
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

  const handleBack = () => {
    setInitiateSuccess(false);
  };

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

        {initiateSuccess ? (
          // Transfer Payment Section
          <div className="w-full mt-9">
            <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
              Transfer Payment
            </h3>
            <div className="mt-9">
              <div>
                <p className="text-[#878787] font-Manrope text-body14Regular">
                  House Tax
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
                  onClick={handleBack}
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
        ) : (
          // Deposit Funds Section
          <div>
            <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
              Deposit Funds
            </h3>
            <label className="mt-9">How much will you like to deposit?</label>
            <div className="mt-2 flex flex-col items-start">
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
