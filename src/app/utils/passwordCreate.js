export default function PasswordCreate() {
  return (
    <>
      <div className=" flex flex-col w-full mt-3">
        <label htmlFor="password">Create Password</label>
        <input
          type="password"
          name="password"
          className=" mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
          placeholder="Enter Password"
        />

        <ul className="w-full mt-2 space-y-2 text-[#5C5C5C] text-body12Regular list-inside ">
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            8 or more characters
          </li>
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            At least one number
          </li>
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-[#A1A1A1] text-body12Regular  flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            At least one special character, e.g., ! @ # ?
          </li>
        </ul>
      </div>
      <div className=" flex flex-col w-full mt-4">
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          name="password"
          className=" mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
          placeholder="Confirm Password"
        />
      </div>
    </>
  );
}
