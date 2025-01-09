import { useState } from "react";
import { Pricing } from "./pricing";
import HouseLocation from "./houseLocation";
import HouseType from "./houseType";
import HouseValue from "./houseValue";

export default function Settings(first) {
  const contentNav = [
    { name: "Pricing", id: "pricing" },
    { name: "House Type", id: "house-type" },
    { name: "House Value", id: "house-value" },
    { name: "House Location", id: "house-location" },
  ];

  const [secondActiveTab, setSecondActiveTab] = useState("Pricing");

  return (
    <div>
      {/* Content Management Navigation */}
      <div className="flex mt-3 space-x-6 border-b">
        {contentNav.map((item) => (
          <button
            key={item.id}
            className={`pb-2 text-sm md:text-base font-semibold ${
              secondActiveTab === item.name
                ? "border-b-4 border-[#ED1450] text-[#ED1450]"
                : "text-gray-500"
            }`}
            onClick={() => setSecondActiveTab(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Dynamic Second Header */}
      <div className="py-4 ">
        <h3 className="text-xl font-bold text-black md:text-xl">
          {secondActiveTab}
        </h3>
      </div>

      {/* Dynamic Table Section */}
      <div className="w-full">
          {secondActiveTab === "Pricing" ? (
            <Pricing />
          ) : secondActiveTab === "House Type" ? (
            <HouseType/>
          ) : secondActiveTab === "House Location" ? (
            <HouseLocation />
          ) : secondActiveTab === "House Value" ? (
            <HouseValue />
           ) : null}
        </div>
    </div>
  );
}
