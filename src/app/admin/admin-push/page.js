"use client";
import { useState } from "react";
import Pending from "./components/pending";
import Sent from "./components/sent";
import { useRouter } from "next/navigation";

export default function PushNotifications(second) {

  const notification = [
    { name: "Pending Notification", id: "pending" },
    // { name: "Sent Notification", id: "sent" },
  ];
  const [activeTab, setActiveTab] = useState("Pending Notification");
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
          <h3 className="text-xl font-bold text-black md:text-2xl">
            Notification
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between border-b font-Manrope">
        <div className="flex space-x-6">
          {notification.map((item) => (
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
      </div>

      {activeTab === "Pending Notification" ? (
        <Pending />
      ) 
      // : activeTab === "Sent Notification" ? (
      //   <Sent />
      // ) 
      : null}
    </div>
  );
}
