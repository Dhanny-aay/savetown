"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import InputInfo from "./calculatorSubComs/inputInfo";
import EditInfo from "./calculatorSubComs/editInfo";
import ResultInfo from "./calculatorSubComs/resultInfo";

export default function CalculatorDrawer({ isVisible, onClose }) {
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
        <InputInfo formData={formData} updateFormData={updateFormData} />
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
        className="bg-white w-[800px] h-full py-8 px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto h-full px-6 pb-16">
          {CurrentStepComponent}
        </div>

        {/* Fixed Navigation Buttons */}
        <div className="absolute bottom-0 left-0 w-full bg-white py-4 px-6 border-t border-gray-200">
          {currentStep < steps.length - 1 ? (
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
