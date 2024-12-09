import infob from "./assets/infob.svg";
import XClose from "./assets/XClose.svg";

export default function LearnModal({ isVisible, onClose }) {
  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto flex items-center p-6 justify-center w-full bg-[#D5D7DA4D]`}
          onClick={onClose}
        >
          <div
            className=" w-full md:w-[600px] h-[270px] bg-white plansbg rounded-2xl border border-[#DAE0E6] flex items-center justify-center flex-col p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <img
              src={XClose.src}
              onClick={onClose}
              className=" absolute top-4 right-4"
              alt=""
            />
            <span className=" flex items-center justify-center w-[72px] h-[72px] bg-[#E6F2FF] rounded-full">
              <img src={infob.src} alt="" />
            </span>

            <div className=" max-w-[380px] text-center mt-6 text-[#595A5C] text-body14Regular font-Manrope">
              Savetown Wallet allows you save for your house before committing
              to any plan and you get 8% interest per annum for saving on this
              wallet.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
