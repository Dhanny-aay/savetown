import ArrowRightBlk from "./assets/ArrowRightBlk.svg";

export default function DepositDrawer({ onClose, isVisible }) {
  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[800px] h-full py-8 px-4 md:px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <h3 className=" text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
          Deposit Funds
        </h3>

        <div className="mt-9">
          <label>How much will you like to deposit?</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="₦0.00"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
          <p className=" text-[#8133F1] mt-3 text-body12Regular font-Manrope">
            You will be depositing a total of (₦500,000.00 = $ 1,651.500)
          </p>
          <p className=" text-[#8133F1] mt-1 text-body12Regular font-Manrope">
            At the rate of ($ 1.00 = ₦1,651.500)
          </p>

          <button className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
