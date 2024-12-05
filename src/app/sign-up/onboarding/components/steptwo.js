import ArrowRight from "./assets/ArrowRight.svg";
import stepper1 from "./assets/stepper1.svg";
import PhoneNumberInput from "@/app/utils/phoneInput";

export default function StepTwo({ formData, updateFormData, handleBack }) {
  const handlePhoneNumberChange = (phoneNumber) => {
    console.log("Selected Phone Number:", phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <>
      <img src={stepper1.src} className=" mt-4" alt="" />
      <img onClick={handleBack} src={ArrowRight.src} className=" mt-4" alt="" />
      <h2 className=" text-h3 font-Yeseva mt-5">Add Phone Number</h2>
      <p className=" m text-body14Regular mt-1  text-[#737373]">
        This should match the date on your ID
      </p>

      <div className=" mt-6">
        <PhoneNumberInput onPhoneNumberChange={handlePhoneNumberChange} />

        <div className=" flex flex-col w-full mt-3">
          <label htmlFor="DOB">Date of birth</label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            className=" mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
          />
        </div>

        <div className=" flex flex-col w-full mt-3">
          <label htmlFor="DOB">Date of birth</label>
          <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] mt-2 w-full">
            <select
              name="gender"
              value={formData.gender}
              className="z-10 w-full bg-transparent"
            >
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </span>
        </div>
      </div>
    </>
  );
}
