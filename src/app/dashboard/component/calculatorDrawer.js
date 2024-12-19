"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import InputInfo from "./calculatorSubComs/inputInfo";
import EditInfo from "./calculatorSubComs/editInfo";
import ResultInfo from "./calculatorSubComs/resultInfo";
import { useUserContext } from "../UserContext";
import { handleCalculatorRequest } from "@/app/userControllers/calculatorController";
import load from "./assets/load.gif";

export default function CalculatorDrawer({ isVisible, onClose }) {
  const [currentStep, setCurrentStep] = useState(0); // Track the active step
  const { userProfile, loadingProfile } = useUserContext();
  const email = userProfile.email;
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    house_price: "",
    email: email,
    monthly_commitment: "",
    house_type: "",
    location: "",
    saving_period: "",
  }); // Form data collected from steps
  const [loading, setLoading] = useState("");

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

  const onSuccess = (response) => {
    setLoading(false);

    if (response && response.data) {
      setResult(response.data);
    }

    handleNext();
  };

  const onError = () => {
    setLoading(false);
    //  enqueueSnackbar("Dinner Booking Failed", { variant: "error" });
  };

  const handleSend = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = formData;
    handleCalculatorRequest(userData, onSuccess, onError);
  };

  const steps = [
    {
      id: 0,
      component: (
        <InputInfo
          formData={formData}
          updateFormData={updateFormData}
          onClose={onClose}
        />
      ),
    },
    {
      id: 1,
      component: (
        <EditInfo
          formData={formData}
          updateFormData={updateFormData}
          handleBack={handleBack}
        />
      ),
    },
    {
      id: 2,
      component: (
        <ResultInfo
          formData={formData}
          result={result}
          updateFormData={updateFormData}
          handleBack={handleBack}
        />
      ),
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-4 md:px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto h-full pb-16">
          {CurrentStepComponent}
        </div>

        {/* Fixed Navigation Buttons */}
        <div className="absolute bottom-0 left-0 w-full bg-white py-4 px-6 border-t border-gray-200">
          {currentStep === 1 ? (
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-btnPrimary py-3 w-full rounded-[50px] font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
            >
              {loading ? (
                <img src={load.src} className="w-5" alt="" />
              ) : (
                "Calculate"
              )}
            </button>
          ) : currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-btnPrimary py-3 w-full rounded-[50px] font-semibold font-Manrope text-white text-xs 2xl:text-lg"
            >
              Proceed
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-btnPrimary py-3 w-full rounded-[50px] font-semibold font-Manrope text-white text-xs 2xl:text-lg"
            >
              Back to home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
