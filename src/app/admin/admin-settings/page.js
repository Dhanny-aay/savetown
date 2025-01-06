"use client";
import React, { useState } from "react";
import Password from "./components/password";
import Profile from "./components/profile";
import { useRouter } from "next/navigation";

const Settings = () => {
  const eventNav = [
    { name: "My Profile", id: "my profile" },
    { name: "Password", id: "password" },
  ];
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("My Profile");
  return (
    <div className="flex flex-col px-3 h-full space-y-4 font-Manrope">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button onClick={()=>router.back()} className="text-[#ED1450] hover:underline text-base font-normal">
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">Settings</h3>
        </div>
      </div>

      <div className="flex space-x-6 border-b font-Manrope">
        {eventNav.map((item) => (
          <button
            key={item.id}
            className={`pb-2 text-lg font-semibold ${
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

      {activeTab === "My Profile" ? (
        <Profile />
      ) : activeTab === "Password" ? (
        <Password />
      ) : null}
    </div>
  );
};

export default Settings;
