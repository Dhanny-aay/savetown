"use client";
import { useState } from "react";
import Pending from "./components/pending";
import Sent from "./components/sent";
import { useRouter } from "next/navigation";

export default function PushNotifications(second) {
  const notification = [
    { name: "Pending Notification", id: "pending" },
    { name: "Sent Notification", id: "sent" },
  ];
const router = useRouter();
  const [activeTab, setActiveTab] = useState("Pending Notification");

  return (
    <div className="flex flex-col px-3 h-full space-y-4">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button
            onClick={() => router.back()} // Navigates to the previous page
            className="text-[#ED1450] hover:underline text-base font-normal"
          >
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            Notification
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between border-b font-Manrope">
        <div className="flex space-x-6">
          {notification.map((item) => (
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
      </div>

      {activeTab === "Pending Notification" ? (
        <Pending />
      ) : activeTab === "Sent Notification" ? (
        <Sent />
      ) : null}
    </div>
  );
}
