import ArrowRight from "./assets/ArrowRight.svg";
import stepper2 from "./assets/stepper2.svg";
import countryCodes from "country-codes-list";

export default function StepThree({ formData, updateFormData, handleBack }) {
  // Extract a list of countries from the package
  const countryCodeList = countryCodes.all().map((country) => ({
    name: country.countryNameEn,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <>
      <img src={stepper2.src} className=" mt-4" alt="" />
      <img onClick={handleBack} src={ArrowRight.src} className=" mt-4" alt="" />
      <h2 className=" text-h3 font-Yeseva mt-5">Almost There</h2>
      <p className=" m text-body14Regular mt-1  text-[#737373]">
        Let’s know where you’re from
      </p>

      <div className=" mt-6">
        <label htmlFor="Nationality">Phone Number</label>
        <span className="rounded-[32px] border border-[#D5D7DA] block py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-full mt-2">
          <select
            // value={selectedCode}
            // onChange={(e) => handleCodeChange(e.target.value)}
            className="z-10 w-full bg-transparent"
          >
            <option value="">Choose Country</option>
            {countryCodeList.map(({ code, name }, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </span>

        <div className=" flex flex-col w-full mt-3">
          <label htmlFor="rfrcode">Referral Code (if any)</label>
          <input
            type="text"
            name="rfrcode"
            value={formData.rfrcode}
            className=" mt-2 bg-white rounded-[32px] border border-[#D5D7DA] w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]"
            placeholder="Enter Middle Name"
          />
        </div>
      </div>
    </>
  );
}
