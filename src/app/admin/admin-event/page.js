"use client";
import { useState } from "react";
import Upcoming from "./components/upcoming";
import Recents from './components/recents';

export default function AdminEvents(second) {
  const eventNav = [
    { name: "Upcoming", id: "upcoming" },
    { name: "Recents", id: "recents" },
  ];

  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div className="flex flex-col px-3 h-full space-y-4">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button
            // onClick={() => router.back()} // Navigates to the previous page
            className="text-[#ED1450] hover:underline text-base font-normal"
          >
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">Events</h3>
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

      

      {activeTab === "Upcoming" ? <Upcoming /> :
       activeTab === "Recents" ? <Recents /> :null}
    </div>
  );
}
