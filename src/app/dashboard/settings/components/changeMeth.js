"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import { handleUpdateMethodById } from "@/app/userControllers/bankController";
import { useSnackbar } from "notistack";
import BankSelector from "@/app/utils/bankSelector";
import load from "./assets/load.gif";

export default function ChangeMeth({
  onClose,
  isVisible,
  selectedID,
  triggerFetch,
}) {
  const [bank_id, setBank_id] = useState("");
  const [bank_account_number, setBank_account_number] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bank_account_name, setBank_account_name] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const validateFields = () => {
    const newErrors = {};
    if (!bank_account_number)
      newErrors.bank_account_number = "Account number is required";
    if (!bank_id) newErrors.bank_id = "Bank is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  const onSuccess = (response) => {
    setLoading(false);
    // Show success notification
    // enqueueSnackbar("Dinner Booked Successfully", { variant: "success" });
    setBank_account_name(response.data.bank_account_name);
    enqueueSnackbar("Payment method changed Successfully", {
      variant: "success",
    });
    triggerFetch();
  };

  const onError = () => {
    setLoading(false);
    enqueueSnackbar("Failed to add Payment method", { variant: "error" });
  };

  const handleUpdate = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoading(true);
      const userData = {
        bank_id: `${bank_id}`,
        bank_account_number,
      };
      handleUpdateMethodById(selectedID, userData, onSuccess, onError);
    }
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
          Change Account Number
        </h3>

        <div className=" mt-9 w-full">
          <div className=" ">
            <label>Account Number</label>
            <div className="mt-2 flex flex-col items-start ">
              <input
                type="number"
                placeholder="Enter Account Number"
                value={bank_account_number}
                onChange={(e) => setBank_account_number(e.target.value)}
                name=""
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
              {errors.bank_account_number && (
                <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                  {errors.bank_account_number}
                </span>
              )}
            </div>
          </div>
          <BankSelector setBank_id={setBank_id} />
          {errors.bank_id && (
            <span className="text-[#DC3545] text-xs font-Manrope mt-2">
              {errors.bank_id}
            </span>
          )}

          <div className="mt-4">
            <label>Account Name</label>
            <div className="mt-2 flex items-center ">
              <input
                type="text"
                value={bank_account_name}
                disabled
                placeholder="Enter Account Name"
                name=""
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
          >
            {loading ? <img src={load.src} className=" w-5" alt="" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
