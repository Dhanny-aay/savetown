"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import User from "./components/user";
import Settings from "./components/settings/settings";

export default function AdminCalculator() {
  const calculator = [
    { name: "Calculator Users", id: "users" },
    { name: "Calculator Settings", id: "settings" },
  ];

  const [activeTab, setActiveTab] = useState("Calculator Users");
  const router = useRouter();

  return (
    <div className="flex flex-col h-full px-3 space-y-4">
      {/* Header with Back Button */}

      <div className="flex items-center justify-between mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button
            onClick={() => router.back()} // Navigates to the previous page
            className="text-[#ED1450] hover:underline text-base font-normal"
          >
            &lt; Back
          </button>
          <h3 className="text-xl font-bold text-black md:text-2xl">Calculator</h3>
        </div>
      </div>

      <div className="flex space-x-6 border-b font-Manrope">
        {calculator.map((item) => (
          <button
            key={item.id}
            className={`pb-2 text-sm font-semibold md:text-lg ${
              activeTab === item.name
                ? "border-b-4 border-[#ED1450] text-[#ED1450]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
      

      { activeTab === "Calculator Users" ? <User/> :
      activeTab === "Calculator Settings" ? <Settings /> :
       null}
    </div>
  );
}
