import React from "react";

export default function Password() {
  return (
    <>
      <div className=" w-full flex items-center justify-between pb-5 border-b border-[#E4E7EC]">
        <div>
          <h3 className="text-body16Bold font-Manrope text-[#595A5C]">
            Password
          </h3>
          <p className=" text-body12Regular font-Manrope text-[#475467] mt-1">
            Update your password here.
          </p>
        </div>
        <button className=" bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 px-6 flex items-center">
          <p className="text-body14SemiBold font-Manrope text-white">Save</p>
        </button>
      </div>

      <div className=" w-full mt-6">
        <div className=" w-full">
          <label>Current Password</label>
          <div className="mt-2 flex items-center ">
            <input
              type="password"
              placeholder="Enter Current Password"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
        <div className=" w-full mt-4">
          <label>New Password</label>
          <div className="mt-2 flex items-center ">
            <input
              type="password"
              placeholder="Enter New Password"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
        <div className=" w-full mt-4">
          <label>Confirm New Password</label>
          <div className="mt-2 flex items-center ">
            <input
              type="password"
              placeholder="Confirm New Password"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
