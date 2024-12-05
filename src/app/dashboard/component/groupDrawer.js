import ArrowRightBlk from "./assets/ArrowRightBlk.svg";

export default function GroupDrawer({ isVisible, onClose }) {
  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-[800px] h-full py-8 px-12 plansbg border border-[#D5D7DA] ml-auto"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />

        <h3 className="text-h5 font-Manrope font-bold text-[#000] mt-9">
          Create Group Savings
        </h3>

        <div className="mt-9">
          <label>What will you like to call it?</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter Group Name"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>

          <div className="mt-8">
            <label>Send your friends an email to join the group?</label>
            <textarea
              placeholder="Enter other information"
              rows={6}
              className="w-full border border-[#D5D7DA] rounded-[8px] mt-2 text-body14Regular font-Manrope px-6 py-4"
            ></textarea>
          </div>

          <button className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
