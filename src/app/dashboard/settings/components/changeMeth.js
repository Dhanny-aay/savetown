import ArrowRightBlk from "./assets/ArrowRightBlk.svg";

export default function ChangeMeth({ onClose, isVisible }) {
  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[800px] h-full py-8 px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
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
          <div className="">
            <label>Account Name</label>
            <div className="mt-2 flex items-center ">
              <input
                type="text"
                placeholder="Enter Account Name"
                name=""
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
            </div>
          </div>
          <div className=" mt-4">
            <label>Account Number</label>
            <div className="mt-2 flex items-center ">
              <input
                type="text"
                placeholder="Enter Account Number"
                name=""
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
            </div>
          </div>
          <div className=" mt-4">
            <label>Name of bank</label>
            <div className="mt-2 flex items-center ">
              <span
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              >
                <select name="" className=" w-full bg-transparent" id="">
                  <option value="">Choose Bank</option>
                </select>
              </span>
            </div>
          </div>

          <button className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
            Save & Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
