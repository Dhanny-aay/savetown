import ArrowRightBlk from "./assets/ArrowRightBlk.svg";

export default function DinnerDrawer({ isVisible, onClose }) {
  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[800px] h-full py-8 px-4 md:px-6 plansbg border border-[#D5D7DA] ml-auto"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
          Savetown Dinner date
        </h3>
        <div className="mt-9">
          <label>Which Friday is convenient for you?</label>
          <div className="mt-2 flex items-center space-x-4">
            <button className="border border-[#C2C4C6] rounded-[10000px] w-[250px] py-3 text-[#595A5C] font-Manrope font-semibold text-sm">
              15th Nov
            </button>
            <button className="border border-[#C2C4C6] rounded-[10000px] w-[250px] py-3 text-[#595A5C] font-Manrope font-semibold text-sm">
              24th Nov
            </button>
          </div>

          <div className="mt-8">
            <label>Any other information you will like to let us know?</label>
            <textarea
              placeholder="Enter other information"
              rows={6}
              className="w-full border border-[#D5D7DA] rounded-[8px] mt-2 text-body14Regular font-Manrope px-6 py-4"
            ></textarea>
          </div>

          <button className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
