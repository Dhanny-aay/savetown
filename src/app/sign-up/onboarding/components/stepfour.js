import PasswordCreate from "@/app/utils/passwordCreate";
import ArrowRight from "./assets/ArrowRight.svg";
import stepper3 from "./assets/stepper3.svg";

export default function StepFour({ formData, updateFormData, handleBack }) {
  return (
    <>
      <img src={stepper3.src} className=" mt-4" alt="" />
      <img onClick={handleBack} src={ArrowRight.src} className=" mt-4" alt="" />
      <h2 className=" text-h3 font-Yeseva mt-5">Create Password</h2>
      <p className=" m text-body14Regular mt-1  text-[#737373]">
        Enter a password to your savetown account
      </p>

      <div className=" mt-6">
        <PasswordCreate />
      </div>
    </>
  );
}
