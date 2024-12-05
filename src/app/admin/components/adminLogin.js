"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react"; // Import useState for state management
import logo from "../assets/logo.svg";
import eye from "../assets/eye.svg";

export default function AdminLogin() {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Card container */}
      <div className="w-full max-w-md p-3 bg-white ">
        {/* Logo or Title */}
        <div className="flex items-center justify-center">
          <Link href="/">
            <Image
              src={logo.src}
              alt="Savetown logo"
              width={132}
              height={44}
              priority
            />
          </Link>
        </div>
        <h1 className="text-2xl font-normal text-[#101828] text-center md:text-3xl">
          Log in to the Admin Portal
        </h1>
        <p className="text-base font-normal font-Manrope text-[#475467] text-center mt-1">
          Welcome back! Please enter your details.
        </p>

        {/* Login form */}
        <form className="mt-6">
          {/* Email Input */}
          <h5 className="mb-4">
            <label
              htmlFor="email"
              className="block text-base  font-normal font-Yeseva text-black md:text-xl"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              className="mt-1 block w-full px-6 py-[20px] rounded-[32px] border font-Manrope border-[#D5D7DA] focus:outline-none focus:border-[#ED1450] sm:text-sm"
              required
            />
          </h5>

          {/* Password Input */}
          <h5 className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-base font-normal font-Yeseva text-black md:text-xl"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                placeholder="Enter Password"
                className="block w-full px-6 py-[20px] rounded-[32px] border font-Manrope border-[#D5D7DA] focus:outline-none focus:border-[#ED1450] sm:text-sm"
                required
              />
              {/* Show Password Icon */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3a7 7 0 015.83 10.9l1.48 1.48a1 1 0 01-1.42 1.42l-1.48-1.48A7 7 0 113 10a7 7 0 017-7zm0 2a5 5 0 00-4.58 7.18l1.5-1.5A3 3 0 0110 7a3 3 0 013 3c0 .39-.09.76-.24 1.1l1.5 1.5A5 5 0 0010 5zm0 2a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                ) : (
                  <Image
                    src={eye.src}
                    alt="Show password"
                    width={22.5}
                    height={15}
                    priority
                  />
                )}
              </button>
            </div>
          </h5>

          {/* Remember me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#ED1450] focus:ring-[#ED1450] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-[#475467] md:text-sm">
                Remember for 30 days
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-[#ED1450] font-bold font-Manrope hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#ED1450] text-white font-bold text-xl font-Manrope rounded-full"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
