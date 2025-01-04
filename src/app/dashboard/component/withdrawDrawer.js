"use client";
import { useCallback, useState, useEffect, useRef } from "react";
// import PaymentDetail from "../settings/components/paymentDetail";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import { useUserContext } from "../UserContext";
import load from "./assets/load.gif";
import {
  handleGetExchangAmount,
  handleInitiateWithdrawal,
} from "@/app/userControllers/transactionController";
import { useSnackbar } from "notistack";
import PlusCircle from "./assets/PlusCircle.svg";
import Bank from "./assets/Bank.svg";
import blckload from "./assets/blckload.gif";
import Trash from "./assets/Trash.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { handleGetUserBanks } from "@/app/userControllers/bankController";
import AddPayment from "../settings/components/addPayment";
import ChangeMeth from "../settings/components/changeMeth";
import RemoveModal from "../settings/components/removeModal";

export default function WithdrawDrawer({ onClose, isVisible }) {
  const [loading, setLoading] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [amount, setAmount] = useState(null);
  const { triggerFetchDashboard } = useUserContext();
  const [errors, setErrors] = useState({});
  const [conversion, setConversion] = useState(null);
  const isWithdrawal = true;
  const { enqueueSnackbar } = useSnackbar();

  // states for addinging and changing payment method
  const [isPaymentDrawerVisible, setPaymentDrawerVisible] = useState(false);
  const [isChangeDrawerVisible, setChangeDrawerVisible] = useState(false);
  const [isMethodAdded, setMethodAdded] = useState(false);
  const [isRemoveVisible, setRemoveVisible] = useState(false);
  const [userBanks, setUserBanks] = useState([]);
  const [loadingMethod, setLoadingMethod] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [loadingExchange, setLoadingExchange] = useState(false);

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  // Remove modal
  const showRemoveModal = () => setRemoveVisible(true);
  const closeRemoveModal = () => setRemoveVisible(false);

  // payment meth drawer
  const showPaymentDrawer = () => setPaymentDrawerVisible(true);
  const closePaymentDrawer = () => setPaymentDrawerVisible(false);

  // change drawer
  const showChangeDrawer = () => setChangeDrawerVisible(true);
  const closeChangeDrawer = () => setChangeDrawerVisible(false);

  const fetchUserBanks = async () => {
    setLoadingMethod(true);
    try {
      const data = await handleGetUserBanks();
      if (data) {
        setUserBanks(data.data);
        setMethodAdded(data.data.length > 0);
      }
    } catch (error) {
      console.log("Error fetching bank details:", error);
    } finally {
      setLoadingMethod(false);
    }
  };

  useEffect(() => {
    fetchUserBanks();
  }, [trigger]);

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "";
    return accountNumber.replace(/\d(?=\d{4})/g, "*");
  };

  const showRemove = (id) => {
    setSelectedID(id); // Set the selectedID to the passed item.id
    showRemoveModal(); // Show the remove modal
  };
  const showChange = (id) => {
    setSelectedID(id); // Set the selectedID to the passed item.id
    showChangeDrawer();
  };

  const resetStates = () => {
    setAmount(null); // Reset the amount input
    setConversion(null); // Clear the conversion data
    setErrors({}); // Clear any errors
  };

  // const handleAmountChange = (e) => {
  //   const rawValue = e.target.value.replace(/[^0-9]/g, "");
  //   const intValue = rawValue ? parseInt(rawValue, 10) : "";
  //   setAmount(intValue);
  // };

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
        setErrors({ amount: "Valid amount is required" });
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

  const onSuccessWithdraw = (response) => {
    setLoadingWithdraw(false);
    triggerFetchDashboard();
    // enqueueSnackbar("Withdrawal Successfully", { variant: "success" });
    onClose();
    resetStates(); // Reset the states after a successful verify pay
  };

  const onErrorWithdraw = () => {
    setLoadingWithdraw(false);
    // enqueueSnackbar("Withdrawal Failed, please try again", {
    //   variant: "error",
    // });
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    setLoadingWithdraw(true);
    const userData = {
      amount: conversion?.amountToReceive,
    };
    handleInitiateWithdrawal(userData, onSuccessWithdraw, onErrorWithdraw);
  };

  return (
    <>
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
              <label>Amount(₦)</label>
              <div className="mt-2 flex flex-col items-start ">
                <input
                  placeholder="₦0.00"
                  type="text"
                  value={formatWithCommas(amount)}
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
                    You will be withdrawing a total of (₦
                    {formatWithCommas(conversion?.sourceAmount)} = $
                    {conversion?.amountToReceive})
                  </p>
                  <p className="text-[#8133F1] mt-1 text-body12Regular font-Manrope">
                    At the rate of (₦1.00 = ${conversion?.rate})
                  </p>
                </>
              )}
            </div>
            {/* payment Detail */}
            <>
              {loading ? (
                // Skeleton loader while loading is true
                <div className="w-full border border-[#EAEBF0] p-6 rounded-[15px] mt-6">
                  <div className="flex items-center space-x-3">
                    <Skeleton circle width={48} height={48} />
                    <div className="w-full">
                      <Skeleton width="60%" height={20} />
                      <Skeleton width="40%" height={20} className="mt-2" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" mt-6">
                  {isMethodAdded ? (
                    <>
                      {isWithdrawal && (
                        <label className=" mb-3 block">
                          Your funds will be paid to the following account
                        </label>
                      )}
                      <div className=" w-full flex flex-col space-y-3">
                        {userBanks.map((item, index) => (
                          <div className=" w-full" key={index}>
                            <div className=" w-full border border-[#EAEBF0] p-6 rounded-[15px] flex items-center justify-between">
                              <div className=" flex items-center space-x-3">
                                <span className=" w-12 md:w-16 h-12 md:h-16 bg-[#E6F2FF] rounded-full flex items-center justify-center">
                                  <img
                                    src={Bank.src}
                                    className=" w-5 md:w-auto"
                                    alt=""
                                  />
                                </span>
                                <div className="">
                                  <div className=" flex items-center space-x-2">
                                    <p className=" text-body14SemiBold md:text-body16SemiBold font-Manrope text-[#000]">
                                      {item.bank_account_name}
                                    </p>

                                    <p className=" text-body14SemiBold md:text-body16SemiBold font-Manrope text-[#000]">
                                      {item.bank_name}
                                    </p>
                                  </div>
                                  <p className="text-body12Regular mt-3 font-Manrope text-[#666666]">
                                    {maskAccountNumber(
                                      item.bank_account_number
                                    )}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => showRemove(item.id)}
                                className=""
                              >
                                <img
                                  src={Trash.src}
                                  className=" md:hidden"
                                  alt=""
                                />
                                <p className=" text-[#F14373] text-body14SemiBold hidden md:block font-Manrope">
                                  Remove
                                </p>
                              </button>
                            </div>
                            <button
                              onClick={() => showChange(item.id)}
                              className=" flex items-center space-x-2 mt-4"
                            >
                              <img src={PlusCircle.src} alt="" />
                              <p className=" text-[#F14373] text-body14SemiBold font-Manrope">
                                Change account number
                              </p>
                            </button>
                          </div>
                        ))}
                      </div>
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
              )}
            </>

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
                onClick={handleWithdraw}
                disabled={loadingExchange || !conversion || loadingWithdraw} // Disable if loading or no conversion
                className={`bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center ${
                  loadingExchange || !conversion || loadingWithdraw
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
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

      <AddPayment
        isVisible={isPaymentDrawerVisible}
        onClose={closePaymentDrawer}
        triggerFetch={triggerFetch}
      />
      <ChangeMeth
        isVisible={isChangeDrawerVisible}
        onClose={closeChangeDrawer}
        triggerFetch={triggerFetch}
        selectedID={selectedID}
      />
      <RemoveModal
        selectedID={selectedID}
        isVisible={isRemoveVisible}
        onClose={closeRemoveModal}
        triggerFetch={triggerFetch}
      />
    </>
  );
}
