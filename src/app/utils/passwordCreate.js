"use client";
import { useState, useEffect } from "react";

export default function PasswordCreate({ onPasswordValid }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  // Conditions for the password
  const conditions = {
    hasMinLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Check if all conditions are met
  const allConditionsMet =
    conditions.hasMinLength &&
    conditions.hasNumber &&
    conditions.hasSpecialChar;

  // Check if passwords match
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value && value !== password) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  // Notify parent when all conditions are met and passwords match
  useEffect(() => {
    if (allConditionsMet && confirmPassword && confirmPassword === password) {
      onPasswordValid(password);
    }
  }, [password, confirmPassword, allConditionsMet]);

  return (
    <>
      <div className="flex flex-col w-full mt-3">
        <label htmlFor="password">Create Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
          placeholder="Enter Password"
        />

        <ul className="w-full mt-2 space-y-2 text-[#5C5C5C] text-body12Regular list-inside">
          <li className="flex items-center">
            <svg
              className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                conditions.hasMinLength ? "text-green-400" : "text-[#A1A1A1]"
              }`}
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
              className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                conditions.hasNumber ? "text-green-400" : "text-[#A1A1A1]"
              }`}
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
              className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                conditions.hasSpecialChar ? "text-green-400" : "text-[#A1A1A1]"
              }`}
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

      <div className="flex flex-col w-full mt-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
          placeholder="Confirm Password"
        />
        {passwordMatchError && (
          <p className="text-red-500 text-xs mt-2">{passwordMatchError}</p>
        )}
      </div>
    </>
  );
}
