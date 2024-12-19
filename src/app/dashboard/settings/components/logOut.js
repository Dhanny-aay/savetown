"use client";
import { useState } from "react";
import XClose from "./assets/XClose.svg";
import { useRouter } from "next/navigation";

export default function Logout() {
  const [isVisible, setVisible] = useState(true);
  const router = useRouter();

  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    // Clear the localStorage
    localStorage.clear();
    // navigate("/sign-in");
    router.push("/sign-in");
  };
  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto flex items-center p-6 justify-center w-full bg-[#D5D7DA4D]`}
          onClick={onClose}
        >
          <div
            className=" w-full md:w-[600px] lg:h-[270px] bg-white plansbg rounded-2xl border border-[#DAE0E6] flex items-center justify-center flex-col p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={XClose.src}
              onClick={onClose}
              className=" absolute top-4 right-4"
              alt=""
            />
            <h5 className=" mt-5 text-h55 md:text-h5 font-semibold font-Manrope text-black">
              Are you sure you want to delete?
            </h5>
            <div className=" grid grid-cols-1 mt-6 w-full md:grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className=" border py-4 w-full rounded-[1000000px] border-[#C2C4C6] text-[#595A5C] font-Manrope text-body14SemiBold md:text-body16SemiBold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className=" py-4 w-full rounded-[1000000px] bg-btnPrimary text-body14SemiBold text-[#fff] md:text-body16SemiBold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
