import React, { useState } from "react";
import countryCodes from "country-codes-list";

const PhoneNumberInput = ({ onPhoneNumberChange }) => {
  const [selectedCode, setSelectedCode] = useState("+234"); // Initial country code
  const [phoneNumber, setPhoneNumber] = useState("");

  // Extract a list of country codes from the package
  const countryCodeList = countryCodes.all().map((country) => ({
    code: country.countryCallingCode,
    name: country.countryCode,
  }));

  // Handle changes in country code
  const handleCodeChange = (code) => {
    setSelectedCode(code);
    notifyChange(code, phoneNumber); // Notify with updated code and current phone number
  };

  // Handle changes in phone number
  const handleNumberChange = (e) => {
    const number = e.target.value;
    setPhoneNumber(number);
    notifyChange(selectedCode, number); // Notify with current country code and updated phone number
  };

  // Notify parent component about changes
  const notifyChange = (code, number) => {
    if (onPhoneNumberChange) {
      onPhoneNumberChange({
        phone: number,
        nationality_code: code,
      });
    }
  };

  return (
    <>
      <label htmlFor="Phone Number">Phone Number</label>
      <div className="flex gap-3 items-center w-full mt-2">
        <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-1/4">
          <select
            value={selectedCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="z-10 w-full bg-transparent"
          >
            {countryCodeList.map(({ code, name }, index) => (
              <option key={index} value={`+${code}`}>
                (+{code}) {name}
              </option>
            ))}
          </select>
        </span>

        {/* Phone number input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handleNumberChange}
          placeholder="Enter phone number"
          className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-3/4"
        />
      </div>
    </>
  );
};

export default PhoneNumberInput;
