export default function Calculator() {
  return (
    <>
      <h2 className=" font-Yeseva font-normal text-[28px] 2xl:text-4xl text-black leading-[24px]">
        Saving Calculator
      </h2>
      <div className=" w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" flex flex-col w-full">
          <label htmlFor="Full-Name">Full Name</label>
          <input
            type="text"
            name="Full-Name"
            className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter full name"
          />
        </div>
        <div className=" flex flex-col w-full">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="Email"
            className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter email address"
          />
        </div>
      </div>
      <div className=" w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" flex flex-col w-full">
          <label htmlFor="targetPrice">How much is the house?</label>
          <input
            type="number"
            name="targetPrice"
            className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="₦ 0.00"
          />
        </div>
        <div className=" flex flex-col w-full">
          <label htmlFor="commit">What can you pay monthly?</label>
          <input
            type="number"
            name="commit"
            className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="₦ 0.00"
          />
        </div>
      </div>
      <div className=" w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" flex flex-col w-full">
          <label htmlFor="duration">How long will you save?</label>
          <input
            type="number"
            name="duration"
            className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="1 Year"
          />
        </div>
        <div className=" flex flex-col w-full">
          <label htmlFor="location">Where is the location?</label>
          <span className=" mt-2 bg-white rounded-[10000px] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]">
            <select name="location" className=" w-full bg-transparent" id="">
              <option value="">Choose house location</option>
            </select>
          </span>
        </div>
      </div>
      <div className=" flex flex-col w-full mt-4">
        <label htmlFor="type">What type of house are you looking for?</label>
        <div className=" mt-3">
          <div className=" flex flex-wrap gap-2">
            <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
              1 Bed room
            </button>
            <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
              2 Bed room
            </button>
            <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
              3 Bed room
            </button>
            <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
              4 Bed room
            </button>
            <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
              5 Bed room
            </button>
            <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
              Studio
            </button>
            <button className="border border-[#595A5C] rounded-[10000px] py-2 px-3 text-xs 2xl:text-lg text-[#595A5C] font-medium font-Manrope">
              Penthouse
            </button>
          </div>
        </div>
      </div>

      <button className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
        Calculate
      </button>
    </>
  );
}
