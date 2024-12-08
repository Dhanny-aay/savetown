import XClose from "./assets/XClose.svg";

export default function RemoveModal({ isVisible, onClose }) {
  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto flex items-center justify-center w-full bg-[#D5D7DA4D]`}
          onClick={onClose}
        >
          <div
            className=" w-[600px] h-[270px] bg-white plansbg rounded-2xl border border-[#DAE0E6] flex items-center justify-center flex-col p-6 relative"
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
              <button className=" border border-[#DAE0E6] w-full py-3 rounded-[24px] font-Manrope text-body14SemiBold text-[#000000]">
                Cancel
              </button>
              <button className=" bg-btnPrimary w-full py-3 rounded-[24px] font-Manrope text-body14SemiBold text-[#fff]">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
