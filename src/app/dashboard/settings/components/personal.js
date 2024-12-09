import countryCodes from "country-codes-list";

export default function Personal() {
  // Extract a list of countries from the package
  const countryCodeList = countryCodes.all().map((country) => ({
    name: country.countryNameEn,
  }));

  return (
    <>
      <div className=" w-full flex items-center justify-between pb-5 border-b border-[#E4E7EC]">
        <div>
          <h3 className="text-body16Bold font-Manrope text-[#595A5C]">
            Personal info
          </h3>
          <p className=" text-body12Regular font-Manrope text-[#475467] mt-1">
            Update your photo and personal details here.
          </p>
        </div>
        <button className=" hidden bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 px-6 md:flex items-center">
          <p className="text-body14SemiBold font-Manrope text-white">Save</p>
        </button>
      </div>

      <div className=" mt-6 grid grid-cols-1 md:grid-cols-3 w-full gap-4 md:gap-5">
        <div className=" w-full">
          <label>First Name</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter First Name"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
        <div className=" w-full">
          <label>Last Name</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter Last Name"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
        <div className=" w-full">
          <label>Middle Name</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter Middle Name"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
      </div>
      <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-5">
        <div className=" w-full">
          <label>Email Address</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter Email Address"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
        <div className=" w-full">
          <label>Phone Number</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter Phone Number"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
      </div>
      <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-5">
        <div className=" flex flex-col w-full">
          <label htmlFor="DOB">Date of birth</label>
          <input
            type="date"
            name="DOB"
            className=" mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
          />
        </div>

        <div className=" flex flex-col w-full">
          <label htmlFor="gender">Gender</label>
          <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] mt-2 w-full">
            <select name="gender" className="z-10 w-full bg-transparent">
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </span>
        </div>
      </div>

      <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-5">
        <div>
          <label htmlFor="Nationality">Nationality</label>
          <span className="rounded-[32px] border border-[#D5D7DA] block py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-full mt-2">
            <select
              // value={selectedCode}
              // onChange={(e) => handleCodeChange(e.target.value)}
              className="z-10 w-full bg-transparent"
            >
              <option value="">Choose Country</option>
              {countryCodeList.map(({ code, name }, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </span>
        </div>

        <div className=" w-full">
          <label>House Address</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter House Address"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
      </div>
      <div className=" w-full mt-6">
        <label>Occupation</label>
        <div className="mt-2 flex items-center ">
          <input
            type="text"
            placeholder="Enter Occupation"
            name=""
            className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
            id=""
          />
        </div>
      </div>
      <button className=" mt-6 bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 w-full px-6 flex md:hidden items-center">
        <p className="text-body14SemiBold font-Manrope text-center w-full text-white">
          Save
        </p>
      </button>
    </>
  );
}
