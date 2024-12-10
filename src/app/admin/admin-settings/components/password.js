export default function Password(second) {
  return (
    <div>
      {/* Description */}
      <div className="flex flex-row items-center justify-between border-b pb-4">
        <div className="space-y-3 ">
          <h3 className="text-[18px] md:text-[18px] font-bold text-black">
            Password
          </h3>
          <p className="text-gray-600 text-sm md:text-sm">
            Update your password here.
          </p>
        </div>
        {/* Buttons */}
        {/* <div className="flex justify-end space-x-3 mt-6"></div> */}
        <div className="space-x-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 px-[30px] py-[10px] text-sm font-medium border border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#ED1450] text-white px-[30px] py-[10px] text-sm font-medium rounded-[32px] hover:bg-[#d01245] focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
          >
            Save
          </button>
        </div>
      </div>

      {/* Password Form */}
      <form className="space-y-4 w-full pt-3 md:w-[100%] max-w-full">
        {/* Old Password */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="old-password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Enter Old Password
          </label>
          <input
            id="old-password"
            type="password"
            className="w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
            placeholder="Enter Old Password"
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label
            htmlFor="new-password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Enter New Password
          </label>
          <input
            id="new-password"
            type="password"
            className="w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
            placeholder="Enter New Password"
          />
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col">
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
            placeholder="Enter New Password"
          />
        </div>
      </form>
    </div>
  );
}
