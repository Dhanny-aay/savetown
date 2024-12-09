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

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0); // Track the active step
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  }); // Form data collected from steps

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
          <div className="bg-white sign-shadow p-5 md:p-8 w-full rounded-2xl">
            {/* Render current step */}
            {CurrentStepComponent}

            {/* Navigation buttons */}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleNext}
                className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg"
              >
                Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
