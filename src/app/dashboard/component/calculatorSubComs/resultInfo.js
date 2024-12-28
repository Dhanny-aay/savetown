// "use client";
// import { useState } from "react";
// import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
// import stepper from "./assets/stepper2.svg";

// export default function ResultInfo({
//   formData,
//   handleBack,
//   updateFormData,
//   result,
// }) {
//   console.log(result);
//   return (
//     <div>
//       <img src={stepper.src} className=" w-full" alt="" />
//       <img
//         src={ArrowRightBlk.src}
//         className=" mt-8 w-auto"
//         alt="back"
//         onClick={handleBack}
//       />
//       <h3 className=" text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9 ">
//         Calculator result
//       </h3>

//       <div className=" mt-8">
//         <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
//           Monthly Payment Breakdown
//         </h4>
//         <p className=" font-Manrope text-h3 font-bold text-black mt-3 ">
//           ₦ 100,000.00
//         </p>

//         <div className="flex mt-4 mb-6  w-full">
//           <div className="bg-[#EE9D1A] rounded-l-[4px] w-[22%] h-4"></div>
//           <div className="bg-[#3FC8E4] w-[40%] h-4"></div>
//           <div className="bg-[#5654D4] rounded-r-[4px] w-[38%] h-4"></div>
//         </div>

//         <div className=" space-y-6">
//           <div className="">
//             <div className=" flex items-center space-x-2">
//               <span className=" w-3 h-3 bg-[#EE9D1A] rounded-[4px]"></span>
//               <p className="text-[#878787] font-Manrope text-body14Regular">
//                 House Tax
//               </p>
//             </div>
//             <div className="font-Manrope text-h4 mt-2 font-bold text-black">
//               ₦ 50,000
//             </div>
//           </div>
//           <div className="">
//             <div className=" flex items-center space-x-2">
//               <span className=" w-3 h-3 bg-[#3FC8E4] rounded-[4px]"></span>
//               <p className="text-[#878787] font-Manrope text-body14Regular">
//                 Principal & Interest
//               </p>
//             </div>
//             <div className="font-Manrope text-h4 mt-2 font-bold text-black">
//               ₦ 40,000
//             </div>
//           </div>
//           <div className="">
//             <div className=" flex items-center space-x-2">
//               <span className=" w-3 h-3 bg-[#5654D4] rounded-[4px]"></span>
//               <p className="text-[#878787] font-Manrope text-body14Regular">
//                 Homeowner Insurance
//               </p>
//             </div>
//             <div className="font-Manrope text-h4 mt-2 font-bold text-black">
//               ₦ 10,000
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import stepper from "./assets/stepper2.svg";

export default function ResultInfo({
  formData,
  handleBack,
  updateFormData,
  result,
}) {
  // console.log(result);

  // Destructure breakdown and monthly_payment from result
  const { breakdown, monthly_payment } = result || {};
  const { homeowner_insurance, house_tax, principal_interest } =
    breakdown || {};

  // Ensure monthly_payment is a valid number to avoid division by zero
  const total = monthly_payment || 1;

  // Calculate percentage widths for each segment
  const houseTaxWidth = ((house_tax || 0) / total) * 100;
  const principalInterestWidth = ((principal_interest || 0) / total) * 100;
  const homeownerInsuranceWidth = ((homeowner_insurance || 0) / total) * 100;

  return (
    <div>
      <img src={stepper.src} className="w-full" alt="" />
      <img
        src={ArrowRightBlk.src}
        className="mt-8 w-auto cursor-pointer"
        alt="back"
        onClick={handleBack}
      />
      <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-6">
        Calculator result
      </h3>

      <div className="mt-8">
        <h4 className="text-[#595A5C] font-Manrope text-body14Regular">
          Monthly Payment Breakdown
        </h4>
        <p className="font-Manrope text-h5 md:text-h3 font-bold text-black mt-3">
          ₦ {result?.monthly_payment?.toLocaleString() || "0.00"}
        </p>

        {/* Functional Progress Bar */}
        <div className="flex mt-4 mb-6 w-full">
          <div
            className="bg-[#EE9D1A] rounded-l-[4px] h-4"
            style={{ width: `${houseTaxWidth}%` }}
          ></div>
          <div
            className="bg-[#3FC8E4] h-4"
            style={{ width: `${principalInterestWidth}%` }}
          ></div>
          <div
            className="bg-[#5654D4] rounded-r-[4px] h-4"
            style={{ width: `${homeownerInsuranceWidth}%` }}
          ></div>
        </div>

        <div className=" space-y-4 md:space-y-6">
          {/* House Tax */}
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-[#EE9D1A] rounded-[4px]"></span>
              <p className="text-[#878787] font-Manrope text-body14Regular">
                House Tax
              </p>
            </div>
            <div className="font-Manrope text-h5 md:text-h4 mt-2 font-bold text-black">
              ₦ {result?.breakdown?.house_tax?.toLocaleString() || "0"}
            </div>
          </div>

          {/* Principal & Interest */}
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-[#3FC8E4] rounded-[4px]"></span>
              <p className="text-[#878787] font-Manrope text-body14Regular">
                Principal & Interest
              </p>
            </div>
            <div className="font-Manrope text-h5 md:text-h4 mt-2 font-bold text-black">
              ₦ {result?.breakdown?.principal_interest?.toLocaleString() || "0"}
            </div>
          </div>

          {/* Homeowner Insurance */}
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-[#5654D4] rounded-[4px]"></span>
              <p className="text-[#878787] font-Manrope text-body14Regular">
                Homeowner Insurance
              </p>
            </div>
            <div className="font-Manrope text-h5 md:text-h4 mt-2 font-bold text-black">
              ₦{" "}
              {result?.breakdown?.homeowner_insurance?.toLocaleString() || "0"}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Message */}
      {result?.message && (
        <div className="mt-6">
          <p className="font-Manrope text-body14Medium text-[#878787]">
            {result.message}
          </p>
        </div>
      )}
    </div>
  );
}
