"use client";
import { useState } from "react";
import bgImg from "./assets/bgimage.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import Link from "next/link";
import StepFour from "./components/stepfour";
import StepOne from "./components/stepone";
import StepTwo from "./components/steptwo";
import StepThree from "./components/stepthree";
import VerifyStep2 from "./components/verifyStep2";
import load from "./assets/load.gif";
import {
  handleRegisterUser,
  handleSendOTPToPhone,
  handleVerifyPhone,
} from "@/app/userControllers/authController";
import blckLoad from "./assets/blckLoad.gif";
import { useRouter } from "next/navigation";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0); // Track the active step

const savedEmail = typeof window !== "undefined" ? localStorage.getItem("savetown_signup_email") : null;

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [code, setCode] = useState(Array(6).fill(""));
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: savedEmail || "",
    phone: "",
    dob: "",
    gender: "",
    referral_code: "",
    nationality: "",
    nationality_code: "",
    password: "",
    registration_mode: "Web",
  });

  // Go to the next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to the previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Update the parent state from child components
  const updateFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  console.log(formData);

  // For handlesendOtp
  const onSuccessSend = (response) => {
    setLoadingSend(false);
    handleNext(); // Move to the next step after a successful OTP request

    // Show success notification (uncomment if needed)
    // enqueueSnackbar("OTP sent successfully", { variant: "success" });
  };

  const onErrorSend = () => {
    setLoadingSend(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setLoadingSend(true);
    const userData = { email: savedEmail, phone: formData.phone };
    handleSendOTPToPhone(userData, onSuccessSend, onErrorSend);
  };

  // For handleVerifyOtp
  const onSuccessVerify = (response) => {
    setLoadingVerify(false);
    handleNext(); // Move to the next step after a successful OTP request

    // Show success notification (uncomment if needed)
    // enqueueSnackbar("OTP sent successfully", { variant: "success" });
  };

  const onErrorVerify = () => {
    setLoadingVerify(false);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setLoadingVerify(true);
    const userData = {
      email: savedEmail,
      phone: formData.phone,
      otp: code.join(""),
    };
    handleVerifyPhone(userData, onSuccessVerify, onErrorVerify);
  };

  // For handleRegister
  const onSuccessRegister = (response) => {
    setLoadingRegister(false);
    router.push("/dashboard");
    // Show success notification (uncomment if needed)
    // enqueueSnackbar("OTP sent successfully", { variant: "success" });
  };

  const onErrorRegister = () => {
    setLoadingRegister(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoadingRegister(true);
    const userData = formData;
    handleRegisterUser(userData, onSuccessRegister, onErrorRegister);
  };

  const steps = [
    {
      id: 0,
      component: (
        <StepOne
          formData={formData}
          updateFormData={updateFormData}
          handleBack={handleBack}
        />
      ),
    },
    {
      id: 1,
      component: (
        <StepTwo
          formData={formData}
          updateFormData={updateFormData}
          handleBack={handleBack}
        />
      ),
    },
    {
      id: 2,
      component: (
        <VerifyStep2
          formData={formData}
          updateFormData={updateFormData}
          handleBack={handleBack}
          code={code}
          setCode={setCode}
        />
      ),
    },
    {
      id: 3,
      component: (
        <StepThree
          formData={formData}
          updateFormData={updateFormData}
          handleBack={handleBack}
        />
      ),
    },
    {
      id: 4,
      component: (
        <StepFour
          formData={formData}
          updateFormData={updateFormData}
          handleBack={handleBack}
        />
      ),
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f1f1f1] text-[#000]">
      <div className="w-full max-w-[1280px] lg:max-h-[650px] bg-white h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
        {/* Background Image Section */}
        <div
          style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="bg-bgSecondary w-[50%] h-full relative lg:flex flex-col hidden justify-center"
        ></div>

        {/* Form Content Section */}
        <div className="w-full lg:w-[50%] h-full flex flex-col justify-center items-center px-6 md:px-12">
          <div className="bg-white sign-shadow md:p-8 w-full rounded-2xl">
            {/* Render current step */}
            {CurrentStepComponent}

            {/* Navigation buttons */}
            {currentStep === 1 ? (
              <button
                onClick={handleSend} // Call handleSend for Step Two
                className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex justify-center items-center"
                disabled={loadingSend} // Disable button when loading
              >
                {loadingSend ? (
                  <img src={load.src} className=" w-5" alt="" />
                ) : (
                  "Send OTP"
                )}
              </button>
            ) : currentStep === 2 ? (
              <>
                <button
                  onClick={handleVerify} // Call handleVerify verify step 2
                  className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex justify-center items-center"
                  disabled={loadingVerify} // Disable button when loading
                >
                  {loadingVerify ? (
                    <img src={load.src} className=" w-5" alt="" />
                  ) : (
                    "Verify"
                  )}
                </button>

                <p className=" block mt-8 px-8 text-body14Regular font-Manrope text-[#595959] text-center">
                  Didn’t receive the code?
                  <button
                    // onClick={handleSend}
                    className=" text-[#8133F1]"
                  >
                    {loadingSend ? (
                      <img src={blckLoad.src} className=" w-5 ml-2" alt="" />
                    ) : (
                      " Send again"
                    )}
                  </button>
                </p>
              </>
            ) : currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={loadingRegister}
                className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
              >
                {loadingRegister ? (
                  <img src={load.src} className=" w-5" alt="" />
                ) : (
                  " Sign up"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
