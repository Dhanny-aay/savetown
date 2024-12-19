"use client";

import bgImg from "./assets/bgimage.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import Link from "next/link";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { handleSendResetPasswordOTP } from "../userControllers/authController";
import load from "./assets/load.gif";

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  // For handleLogin
  const onSuccess = (response) => {
    setLoading(false);
    // Save the email to localStorage
    localStorage.setItem("savetown_reset_email", email);
    router.push("/new-password");
    // Show success notification
    //  enqueueSnackbar("Logged in Successfully", { variant: "success" });
  };

  const onError = () => {
    setLoading(false);
  };

  const handleSend = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoading(true);
      const userData = { email };
      handleSendResetPasswordOTP(userData, onSuccess, onError);
    }
  };

  return (
    <div className="  w-full h-svh flex justify-center items-center bg-[#f1f1f1] text-[#000]">
      <div className="w-full max-w-[1280px] lg:max-h-[650px] bg-[rgb(255,255,255)] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
        <div
          style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="  bg-bgSecondary w-[50%] h-full relative lg:flex flex-col hidden justify-center"
        ></div>
        <div className=" w-full lg:w-[50%] h-full flex flex-col justify-center items-center px-4 md:px-12">
          <div className=" bg-white sign-shadow md:p-8 w-full rounded-2xl">
            <Link href="/sign-in">
              <img src={ArrowRight.src} className="" alt="" />
            </Link>
            <h2 className=" text-h5 md:text-h3 font-Yeseva mt-5">
              Reset Password
            </h2>
            <p className="  text-body12Regular md:text-body14Regular mt-1  text-[#737373]">
              Enter your email address and we will send you a link to reset your
              password
            </p>

            <div className=" mt-6">
              <div className=" flex flex-col w-full">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-2 bg-white rounded-[32px] border w-full py-3 px-6 font-medium font-Manrope ${
                    errors.email ? "border-[#DC3545]" : "border-[#D5D7DA]"
                  } text-xs 2xl:text-lg placeholder:text-[#000000B2`}
                  placeholder="Enter email address"
                />

                {errors.email && (
                  <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                    {errors.email}
                  </span>
                )}
              </div>

              <button
                onClick={handleSend}
                disabled={loading}
                className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex justify-center items-center"
              >
                {loading ? (
                  <img src={load.src} className=" w-5" alt="" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
