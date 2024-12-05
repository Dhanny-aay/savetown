import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import memb from "./assets/memb.svg";

export default function GroupMembers({ onClose, isVisible }) {
  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-[800px] h-full py-8 px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <h3 className="text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
          Group members
        </h3>

        <div className="w-full mt-16 flex items-center flex-col justify-center">
          <img src={memb.src} alt="" />
          <h6 className="text-center text-body16Regular font-Manrope text-[#666666] mt-6">
            Group Members
          </h6>
          <p className="text-body12Regular font-Manrope text-[#666666] mt-2 text-center">
            Group members will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
