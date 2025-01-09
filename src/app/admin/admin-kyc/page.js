"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Status from "./components/status";
import Control from "./components/control";

export default function AdminKyc() {
  const eventNav = [
    { name: "User Verification Status", id: "verification" },
    { name: "Verification Control Centre", id: "control" },
  ];

  const [activeTab, setActiveTab] = useState("User Verification Status");
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
          <h3 className="text-xl font-bold text-black md:text-2xl">KYC Verification</h3>
        </div>
      </div>

      <div className="flex space-x-6 border-b font-Manrope">
        {eventNav.map((item) => (
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
      

      { activeTab === 'User Verification Status' ? <Status/> :
      activeTab === "Verification Control Centre" ? <Control /> :
       null}
    </div>
  );
}
