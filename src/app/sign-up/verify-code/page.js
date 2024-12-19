"use client";
import bgImg from "./assets/bgimage.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import Link from "next/link";
import { useState } from "react";
import CodeInputForm from "../component/codeInputForm";
import {
  handleSendOTPToMail,
  handleVerifyMail,
} from "@/app/userControllers/authController";
import blckLoad from "./assets/blckLoad.gif";
import load from "./assets/load.gif";
import { useRouter } from "next/navigation";

export default function Page() {
  const [code, setCode] = useState(Array(6).fill("")); // Initialize with six empty strings

const savedEmail = typeof window !== "undefined" ? localStorage.getItem("savetown_signup_email") : null;

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [error, setError] = useState(""); // State to manage validation error

  const maskEmail = (email) => {
    if (!email || !email.includes("@")) return "";

    const [name, domain] = email.split("@");
    const length = name.length;

    // Calculate how many characters to reveal (round up for odd lengths)
    const revealCount = Math.ceil(length / 2);
    const maskCount = length - revealCount;

    // Create the masked part
    const visiblePart = name.slice(0, revealCount);
    const maskedName = `${visiblePart}${"*".repeat(maskCount)}`;

    return `${maskedName}@${domain}`;
  };

  const maskedEmail = maskEmail(savedEmail);

  const handleCodeChange = (updatedCode) => {
    setCode(updatedCode);
    setError(""); // Clear any previous errors when the user updates the code
  };

  // Validation function to check if the code is fully entered
  const validateFields = () => {
    if (code.some((digit) => digit.trim() === "")) {
      setError("Please enter all six digits.");
      return false;
    }
    if (!code.every((digit) => /^\d$/.test(digit))) {
      setError("Please enter only numbers.");
      return false;
    }
    return true;
  };

  // For resend
  const onSuccess = (response) => {
    setLoading(false);
    // Show success notification
    //  enqueueSnackbar("Logged in Successfully", { variant: "success" });
  };

  const onError = () => {
    setLoading(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { email: savedEmail };
    handleSendOTPToMail(userData, onSuccess, onError);
  };

  // For verification
  const onSuccessVerify = (response) => {
    setLoadingVerify(false);
    router.push("/sign-up/onboarding");
    // Show success notification
    //  enqueueSnackbar("Logged in Successfully", { variant: "success" });
  };

  const onErrorVerify = () => {
    setLoadingVerify(false);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setLoadingVerify(true);
      const userData = { email: savedEmail, otp: code.join("") }; // Join code array into a string
      handleVerifyMail(userData, onSuccessVerify, onErrorVerify);
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
          <div className=" bg-white sign-shadow  md:p-8 w-full rounded-2xl">
            <Link href="/sign-up">
              <img src={ArrowRight.src} className="" alt="" />
            </Link>
            <h2 className=" text-h5 md:text-h3 font-Yeseva mt-5">
              Enter verification code
            </h2>
            <p className="  text-body12Regular md:text-body14Regular mt-1  text-[#737373]">
              We sent a verification code to {maskedEmail}
            </p>

            <CodeInputForm code={code} onCodeChange={handleCodeChange} />
            {error && (
              <p className="text-[#DC3545] font-Manrope text-xs mt-2">
                {error}
              </p>
            )}
            <button
              disabled={loadingVerify}
              onClick={handleVerify}
              className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
            >
              {loadingVerify ? (
                <img src={load.src} className=" w-5" alt="" />
              ) : (
                "Verify"
              )}
            </button>
            <p className=" flex items-center justify-center mt-4 px-8 text-body14Regular font-Manrope text-[#595959] text-center">
              Didn’t receive the code?{" "}
              <button
                disabled={loading}
                onClick={handleSend}
                className=" text-[#8133F1]"
              >
                {loading ? (
                  <img src={blckLoad.src} className=" w-5 ml-2" alt="" />
                ) : (
                  " Send again"
                )}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
