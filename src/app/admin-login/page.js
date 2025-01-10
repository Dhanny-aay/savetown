"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react"; // Import useState for state management
import logo from "./assets/logo.svg";
import eye from "./assets/eye.svg";
import { useRouter } from "next/navigation";
import { handleAdminLogin } from "./../admin/adminControllers/authController";
import { saveToken } from "../utils/authAdminUtils";
import load from './assets/load.gif'

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const router = useRouter(); // Router hook for redirection

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const userData = {
    email,
    password
  };

  const validateFields = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    // console.log(newErrors.email)
    // setErrorMessage(newErrors.email);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  
  
  // Handle form submission
  const handleSubmit = (e) => {
    // if (validateFields()){
      e.preventDefault();
      setLoading(true)
      handleAdminLogin(
        userData,
        (response) => {
          // On successful login, redirect to the dashboard
          if(response.access_token){
            saveToken(response.token)
          }
          if (response.data.name === 'Admin') {
            setLoading(false)
            router.push("/admin"); 
          }
        },
        (error) => {
          setLoading(false)
          setErrorMessage("Invalid email or password.");
        }
      );
    // }

  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-3 bg-white">
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
          Log In To The Admin Portal
        </h1>
        <p className="text-base font-normal font-Manrope text-[#475467] text-center mt-1">
          Welcome back! Please enter your details.
        </p>

        {/* Login form */}
        <form className="mt-6" onSubmit={handleSubmit}>

          {/* Error Message */}
          {errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}
          {/* Email Input */}
          <h5 className="mb-4">
            <label
              htmlFor="email"
              className="block text-base font-normal text-black font-Yeseva md:text-xl"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              className="mt-1 block w-full px-6 py-[20px] rounded-[32px] border font-Manrope border-[#D5D7DA] focus:outline-none focus:border-[#ED1450] sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </h5>

          {/* Password Input */}
          <h5 className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-base font-normal text-black font-Yeseva md:text-xl"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                placeholder="Enter Password"
                className="block w-full px-6 py-[20px] rounded-[32px] border font-Manrope border-[#D5D7DA] focus:outline-none focus:border-[#ED1450] sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 flex items-center justify-center text-gray-500 right-4 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
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
            <Link
                  href="/forgot-password"
                  className=" text-body14Bold text-[#ED1450] font-Manrope "
                >
                  Forgot Password?
                </Link>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-[#ED1450] text-white font-bold text-xl font-Manrope rounded-full"
            >
               {loading ? (
                  <img src={load.src} className=" w-5" alt="" />
                ) : (
                  "Log In"
                )}
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
