"use client";
import bgImg from "./assets/bgimage.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { handleSendOTPToMail } from "../userControllers/authController";
import load from "./assets/load.gif";
import ReferralHandler from "../utils/referralHandler";

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

  useEffect(() => {
    // Get the item from localStorage
    const storedItem = localStorage.getItem("savetown_token");
    if (storedItem) {
      console.log(storedItem);
      router.push("/dashboard"); // Navigate to the admin dashboard
      enqueueSnackbar("Logged in Successfully", { variant: "success" });
    }
  }, []);

  // For handleLogin
  const onSuccess = (response) => {
    setLoading(false);
    // Save the email to localStorage
    localStorage.setItem("savetown_signup_email", email);
    router.push("/sign-up/verify-code");
    // Show success notification
    //  enqueueSnackbar("Logged in Successfully", { variant: "success" });
  };

  const onError = () => {
    setLoading(false);
  };

  const handleVerify = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoading(true);
      const userData = { email };
      handleSendOTPToMail(userData, onSuccess, onError);
    }
  };

  return (
    <>
      <ReferralHandler />
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
            <div className=" bg-white sign-shadow  md:p-8 w-full rounded-2xl">
              <Link href="/">
                <img src={ArrowRight.src} className="" alt="" />
              </Link>
              <h2 className=" text-h5 md:text-h3 font-Yeseva mt-5">
                Welcome to Savetown!
              </h2>
              <p className="  text-body12Regular md:text-body14Regular mt-1  text-[#737373]">
                Let’s get you started to savings for your dream house
              </p>

              <div className=" mt-8">
                <div className=" flex flex-col w-full">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-2 bg-white rounded-[32px] border w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] ${
                      errors.email ? "border-[#DC3545]" : "border-[#D5D7DA]"
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                      {errors.email}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-6 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
                >
                  {loading ? (
                    <img src={load.src} className=" w-5" alt="" />
                  ) : (
                    "Continue"
                  )}
                </button>

                <span className=" block mt-4 text-center px-8 text-body14Regular font-Manrope text-[#595959] ">
                  By Signing up, you are agreeing to our{" "}
                  <Link href="" className=" text-[#8133F1]">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="" className=" text-[#8133F1]">
                    Terms of Use
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
