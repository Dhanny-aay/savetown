"use client";
import { useState } from "react";
import PaymentDetail from "../settings/components/paymentDetail";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import { useUserContext } from "../UserContext";
import load from "./assets/load.gif";
import {
  handleGetExchangAmount,
  handleInitiateWithdrawal,
} from "@/app/userControllers/transactionController";
import { useSnackbar } from "notistack";

export default function WithdrawDrawer({ onClose, isVisible }) {
  const [loading, setLoading] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [amount, setAmount] = useState(null);
  const { triggerFetchDashboard } = useUserContext();
  const [errors, setErrors] = useState({});
  const [conversion, setConversion] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const intValue = rawValue ? parseInt(rawValue, 10) : "";
    setAmount(intValue);
  };

  const formatWithCommas = (value) => {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  };

  const validateFields = () => {
    const newErrors = {};
    if (!amount || amount <= 0) newErrors.amount = "Valid amount is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    setConversion(response.data);
  };

  const onError = () => {
    setLoading(false);
  };

  const handleSend = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoading(true);
      const userData = { amount };
      handleGetExchangAmount(userData, onSuccess, onError);
    }
  };

  const onSuccessWithdraw = (response) => {
    setLoadingWithdraw(false);
    triggerFetchDashboard();
    enqueueSnackbar("Withdrawal Successfully", { variant: "success" });
    onClose();
  };

  const onErrorWithdraw = () => {
    setLoadingWithdraw(false);
    enqueueSnackbar("Withdrawal Failed, please try again", {
      variant: "error",
    });
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    setLoadingWithdraw(true);
    const userData = {
      amount: conversion?.amountToCharge,
    };
    handleInitiateWithdrawal(userData, onSuccessWithdraw, onErrorWithdraw);
  };

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <h3 className="text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
          Withdrawal
        </h3>

        <div className=" mt-9 w-full">
          <div className="">
            <label>Amount</label>
            <div className="mt-2 flex items-center ">
              <input
                placeholder="₦0.00"
                value={formatWithCommas(amount)}
                type="text"
                onChange={handleAmountChange}
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
                  You will be withdrawing a total of (₦
                  {formatWithCommas(conversion?.sourceAmount)} = $
                  {conversion?.destinationAmount})
                </p>
                <p className="text-[#8133F1] mt-1 text-body12Regular font-Manrope">
                  At the rate of (₦1.00 = ${conversion?.rate})
                </p>
              </>
            )}
          </div>

          <PaymentDetail isWithdrawal={true} />

          <button
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
          </button>
          {conversion && (
            <button
              onClick={handleWithdraw}
              disabled={loadingWithdraw}
              className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
            >
              {loadingWithdraw ? (
                <img src={load.src} className="w-5" alt="" />
              ) : (
                "Withdraw"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
