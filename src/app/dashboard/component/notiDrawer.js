import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import settings from "./assets/settings.svg";
import bell from "./assets/bell.svg";
import NotiSettings from "./notiSettings";

export default function NotiDrawer({ onClose, isVisible }) {
  const [showSettings, setShowSettings] = useState(false);

  // Function to switch back to the Notifications view
  const goToNotifications = () => {
    setShowSettings(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-[800px] h-full py-8 px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {showSettings ? (
          // Render the NotiSettings component
          <NotiSettings goBack={goToNotifications} />
        ) : (
          // Render the Notification view
          <>
            <img
              src={ArrowRightBlk.src}
              className="cursor-pointer"
              alt=""
              onClick={onClose}
            />

            <div className="w-full flex items-center justify-between mt-9">
              <h3 className="text-h5 font-Manrope font-bold text-[#595A5C]">
                Notification
              </h3>
              <img
                src={settings.src}
                className="cursor-pointer"
                alt="settings"
                onClick={() => setShowSettings(true)} // Switch to Settings view
              />
            </div>

            <div className="w-full mt-16 flex items-center flex-col justify-center">
              <img src={bell.src} alt="" />
              <h6 className="text-center text-body16Regular font-Manrope text-[#666666] mt-6">
                No notifications yet
              </h6>
              <p className="text-body12Regular font-Manrope text-[#666666] mt-2 text-center">
                Your notifications will appear here
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
