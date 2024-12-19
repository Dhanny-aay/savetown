"use client";
import { useState } from "react";
import XClose from "./assets/XClose.svg";
import { useSnackbar } from "notistack";
import { handleDeleteDankDeets } from "@/app/userControllers/bankController";
import load from "./assets/load.gif";

export default function RemoveModal({
  isVisible,
  onClose,
  selectedID,
  triggerFetch,
}) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    setLoading(false);
    onClose();
    triggerFetch();
    // enqueueSnackbar("Payment method deleted Successfully", {
    //   variant: "success",
    // });
  };

  const onError = (error) => {
    setLoading(false);
    enqueueSnackbar("Failed to delete Payment method", { variant: "error" });
  };

  const handleDelete = () => {
    setLoading(true);
    handleDeleteDankDeets(selectedID, onSuccess, onError);
  };
  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto flex items-center justify-center w-full bg-[#D5D7DA4D]`}
          onClick={onClose}
        >
          <div
            className=" w-[600px] md:h-[270px] bg-white plansbg rounded-2xl border border-[#DAE0E6] flex items-center justify-center flex-col p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <img
              src={XClose.src}
              onClick={onClose}
              className=" absolute top-4 right-4"
              alt=""
            />

            <h6 className="text-center text-body16Bold font-Manrope text-[#666666] ">
              Remove Account Number
            </h6>
            <p className="text-body14Regular font-Manrope text-[#595A5C] mt-2 text-center">
              Are you sure you want to remove account number?
            </p>
            <div className=" grid grid-cols-2 mt-6 gap-4 w-full">
              <button
                onClick={onClose}
                className=" border border-[#DAE0E6] w-full py-3 rounded-[24px] font-Manrope text-body14SemiBold text-[#000000]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className=" bg-btnPrimary w-full py-3 rounded-[24px] font-Manrope text-body14SemiBold text-[#fff] flex items-center justify-center"
              >
                {loading ? (
                  <img src={load.src} className=" w-5" alt="" />
                ) : (
                  "Remove"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
