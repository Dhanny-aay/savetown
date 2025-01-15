import React from "react";
import close from "./assets/close.svg";
import Xclose from "./assets/clos.svg";

export default function FailureModal({ isVisible, onClose }) {
  return (
    <>
      {isVisible && (
        <div
          onClick={onClose}
          className="fixed top-0 right-0 z-[999] h-screen overflow-y-auto flex items-center p-6 justify-center w-full bg-[#D5D7DA4D]"
        >
          <div
            className="bg-white w-[400px] rounded-[12px] border border-[#DAE0E6] p-8 relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            {/* Close Button */}
            <img
              src={Xclose.src}
              alt=""
              onClick={onClose}
              className=" absolute right-2 top-2"
            />

            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className=" w-14 md:w-16 h-14 md:h-16  bg-[#FCEBEC] rounded-full flex items-center justify-center">
                <img src={close.src} className=" w-8" alt="" />
              </div>
            </div>

            {/* Error Message */}
            <div className="text-center">
              <p className="text-[#595A5C] font-Manrope text-body14Regular mb-2">
                Payment deposit wasn’t received, could be a network failure.
              </p>
              <p className="text-[#595A5C] font-Manrope text-body14Regular">
                Try again in a few minutes.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
