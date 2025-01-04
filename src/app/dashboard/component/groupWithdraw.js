import { useState } from "react";
import { handleInitiateTransfer } from "@/app/userControllers/transactionController";
import { useUserContext } from "../UserContext";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import wallet from "./assets/wallet.svg";
import load from "./assets/load.gif";

export default function GroupWithdraw({ onClose, isVisible, selectedID }) {
  const { userStats, triggerFetchDashboard } = useUserContext();
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);

  const resetStates = () => {
    setAmount(""); // Reset the amount field
    setErrors({}); // Clear any errors
    setShowWithdrawForm(false);
  };

  const validateFields = () => {
    const newErrors = {};
    const balance = userStats?.group_savings_balance;

    if (!amount || amount <= 0) {
      newErrors.amount = "Valid amount is required";
    } else if (parseFloat(amount) > balance) {
      newErrors.amount = "Insufficient balance";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (validateFields()) {
      e.preventDefault();
      setLoadingTransfer(true);
      const userData = {
        amount,
        action: "group_savings_to_personal_savings",
        group_saving_id: selectedID,
      };
      handleInitiateTransfer(userData, onSuccessTransfer, onErrorTransfer);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value ? parseInt(value, 10) : ""); // Convert to integer if there's a value
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
          alt="Back"
          onClick={onClose}
        />

        <h3 className="text-h6 md:text-h55 font-Manrope font-bold text-[#595A5C] mt-9">
          Withdraw from your group balance to your personal balance
        </h3>

        {/* Conditional rendering based on showWithdrawForm state */}
        {!showWithdrawForm ? (
          // Display this section initially
          <div
            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100 mt-8"
            onClick={() => setShowWithdrawForm(true)}
          >
            <div className="flex items-center">
              <div className="bg-[#EFE6FD] p-4 md:p-6 rounded-full">
                <img src={wallet.src} className="w-6 md:w-auto" alt="Wallet" />
              </div>
              <div className="ml-4">
                <p className="font-Manrope text-body16Regular text-[#000000] md:text-h55">
                  Group savings Wallet
                </p>
                <p className="mt-3 text-[#595A5C] text-body14Regular">
                  {` ${userStats?.currency === "NGN" ? "₦" : "$"}${
                    userStats?.group_savings_balance
                  }` ?? "0.00"}
                </p>
              </div>
            </div>
            <img
              src={ArrowRightBlk.src}
              alt="Arrow"
              className="w-4 h-4 rotate-180"
            />
          </div>
        ) : (
          // Display this section after clicking the wallet
          <div className="mt-8 w-full">
            <div>
              <label htmlFor="withdrawAmount">Amount to withdraw($)</label>
              <input
                id="withdrawAmount"
                className={`w-full border rounded-[32px] mt-1 text-body14Regular ${
                  errors.amount ? "border-[#DC3545]" : "border-[#D5D7DA]"
                } font-Manrope px-6 py-3`}
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
              />
              {errors.amount && (
                <span className="text-[#DC3545] text-xs text-left font-Manrope mt-2">
                  {errors.amount}
                </span>
              )}
            </div>

            <div className=" mt-5 w-full grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowWithdrawForm(false)}
                className="border border-[#878787] py-3 w-full rounded-[50px] font-semibold font-Manrope text-[#878787] text-xs 2xl:text-lg flex items-center justify-center"
              >
                Back
              </button>
              <button
                onClick={handleTransfer}
                disabled={loadingTransfer}
                className="bg-btnPrimary py-3 w-full rounded-[50px] font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
              >
                {loadingTransfer ? (
                  <img src={load.src} className="w-5" alt="Loading" />
                ) : (
                  "Transfer"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
