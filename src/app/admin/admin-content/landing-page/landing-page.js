import { useState } from "react";
import Headline from "./headline";
import HeroSection from "./hero-section";
import AdminWhySavetown from "./why-savetown";
import Features from "./features";
import HowItWorks from "./how-it-works";

export default function LandingPage(first) {
  const contentNav = [
    { name: "Headlines", id: "headlines" },
    { name: "Hero Section", id: "hero-section" },
    { name: "Why Savetown", id: "why-savetown" },
    { name: "Features", id: "features" },
    { name: "How it Works", id: "how-it-works" },
  ];

  const [secondActiveTab, setSecondActiveTab] = useState("Headlines");

  return (
    <div>
      {/* Content Management Navigation */}
      <div className="flex space-x-6 border-b">
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
      <div className="py-4">
        <h3 className="text-xl md:text-xl font-bold text-black">
          {secondActiveTab}
        </h3>
      </div>

      {/* Dynamic Table Section */}
      <div className="w-full">
          {secondActiveTab === "Headlines" ? (
            <Headline />
          ) : secondActiveTab === "Hero Section" ? (
            <HeroSection />
          ) : secondActiveTab === "Why Savetown" ? (
            <AdminWhySavetown />
          ) : secondActiveTab === "Features" ? (
            <Features />
          ) : secondActiveTab === "How it Works" ? (
            <HowItWorks />
          ) : null}
        </div>
    </div>
  );
}
