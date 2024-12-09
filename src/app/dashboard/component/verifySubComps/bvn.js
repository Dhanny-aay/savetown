import ArrowRightBlk from "./assets/ArrowRightBlk.svg";

export default function Bvn({ goBack }) {
  return (
    <div className="">
      <img
        src={ArrowRightBlk.src}
        onClick={goBack}
        className=" cursor-pointer"
        alt=""
      />
      <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
        Bank verification number(BVN)
      </h3>
      <div className=" mt-6">
        <div>
          <label>Bank verification number(BVN)</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter ID Number"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
          <p className=" text-[#535862] font-Manrope text-body12Regular mt-1">
            Dial <span className=" font-medium text-[#8133F1]">*565*0#</span> on
            your registered number to get your BVN
          </p>
        </div>
        <div className=" mt-4">
          <label>House Address</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter House Address"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
        <button className="bg-btnPrimary py-3 w-full rounded-[50px] mt-4 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
          Submit
        </button>
      </div>
    </div>
  );
}
