"use client";
import { useEffect, useState } from "react";
import ArrowRight from "./assets/ArrowRight.svg";
import stepper1 from "./assets/stepper1.svg";
import PhoneNumberInput from "@/app/utils/phoneInput";

export default function StepTwo({ formData, updateFormData, handleBack }) {
  // Initialize states with values from formData
  const [day, setDay] = useState(
    formData.dob ? formData.dob.split("-")[2] : ""
  );
  const [month, setMonth] = useState(
    formData.dob ? formData.dob.split("-")[1] : ""
  );
  const [year, setYear] = useState(
    formData.dob ? formData.dob.split("-")[0] : ""
  );
  const [gender, setGender] = useState(formData.gender || "");

  // Combine day, month, and year into dob
  useEffect(() => {
    if (day && month && year) {
      const dob = `${year}-${month}-${day}`;
      updateFormData({ dob });
    }
  }, [day, month, year]);

  // const handlePhoneNumberChange = (phoneNumber) => {
  //   updateFormData({ phone: phoneNumber });
  // };
  const handlePhoneNumberChange = ({ phone, nationality_code }) => {
    updateFormData({
      phone: `${nationality_code}${phone}`,
      nationality_code,
    });
  };

  const handleGenderChange = (e) => {
    const newGender = e.target.value;
    setGender(newGender);
    updateFormData({ gender: newGender });
  };

  return (
    <>
      <img src={stepper1.src} className="mt-4" alt="" />
      <img onClick={handleBack} src={ArrowRight.src} className="mt-4" alt="" />
      <h2 className="text-h5 md:text-h3 font-Yeseva mt-5">Add Phone Number</h2>
      <p className="text-body12Regular md:text-body14Regular mt-1 text-[#737373]">
        This should match the date on your ID
      </p>

      <div className="mt-6">
        <PhoneNumberInput onPhoneNumberChange={handlePhoneNumberChange} />

        <div className="mt-3 w-full">
          <label htmlFor="dob">Date of birth</label>
          <div className="flex space-x-4 mt-2">
            <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] mt-2 w-full">
              <select
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full bg-transparent"
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </span>

            <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] mt-2 w-full">
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-transparent"
              >
                <option value="">Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </span>

            <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] mt-2 w-full">
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-transparent"
              >
                <option value="">Year</option>
                {Array.from(
                  { length: 100 },
                  (_, i) => new Date().getFullYear() - i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full mt-3">
          <label htmlFor="gender">Gender</label>
          <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] mt-2 w-full">
            <select
              name="gender"
              value={gender}
              onChange={handleGenderChange}
              className="z-10 w-full bg-transparent"
            >
              <option value="">Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </span>
        </div>
      </div>
    </>
  );
}
