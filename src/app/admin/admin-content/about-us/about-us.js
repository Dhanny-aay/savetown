import { useState } from "react";
import Headline from "./headline";
import OurStats from "./our-stats";
import WhatSetUsApart from "./what-set-us-apart";
import OurTeam from "./our-team";

export default function AboutUs(first) {
  const contentNav = [
    { name: "Headlines", id: "headlines" },
    { name: "Our Stats", id: "our-stats" },
    { name: "What Set us Apart", id: "what-set-us-apart" },
    { name: "Our Team", id: "our-team" },
  ];

  const [secondActiveTab, setSecondActiveTab] = useState("Headlines");

  return (
    <div>
      {/* Content Management Navigation */}
      <div className="flex space-x-6 border-b">
        {contentNav.map((item) => (
          <button
            key={item.id}
            className={`pb-2 text-lg font-semibold ${
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
      <div className="py-4">
        <h3 className="text-xl md:text-xl font-bold text-black">
          {secondActiveTab}
        </h3>
      </div>

      {/* Dynamic Table Section */}
      <div className="overflow-auto">
        <div className="overflow-auto">
          {secondActiveTab === "Headlines" ? (
            <Headline />
          ) : secondActiveTab === "Our Stats" ? (
            <OurStats/>
          ) : secondActiveTab === "What Set us Apart" ? (
            <WhatSetUsApart />
          ) : secondActiveTab === "Our Team" ? (
            <OurTeam />
          ) : null}
        </div>
      </div>
    </div>
  );
}
