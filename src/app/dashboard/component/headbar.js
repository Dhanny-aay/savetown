"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import key from "./assets/key.svg";
import noti from "./assets/noti.svg";
import NotiDrawer from "./notiDrawer";

export default function Headbar() {
  const [isNotiDrawerVisible, setNotiDrawerVisible] = useState(false);

  const showNotiDrawer = () => setNotiDrawerVisible(true);
  const closeNotiDrawer = () => setNotiDrawerVisible(false);

  // Get the current pathname
  const pathname = usePathname();

  // Function to get the page title based on pathname
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard/savings":
        return "My Savings";
      case "/dashboard/settings":
        return "Settings";
      case "/dashboard/support":
        return "Support";
      default:
        return "Welcome Back, Veek!";
    }
  };

  return (
    <>
      <div className="w-full md:w-[calc(100%-5rem)] lg:w-[80%] fixed top-0 md:left-20 lg:left-[20%] h-[72px] px-6 md:px-8 py-3 z-[99] border-b bg-[#fff] border-[#EAEBF0] flex flex-row justify-between items-center">
        <div className="flex items-center space-x-4 md:space-x-0">
          <img src={key.src} className="w-4 z-[9999] md:hidden" alt="" />

          <p className="text-[#262626] hidden md:block font-bold text-base md:text-xl leading-none font-Manrope">
            {getPageTitle()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <img
            src={noti.src}
            className="cursor-pointer"
            onClick={showNotiDrawer}
            alt=""
          />
          <span className="w-12 h-12 rounded-full bg-[#FFF6E6] text-center font-Manrope font-bold text-base flex items-center justify-center text-btnPrimary">
            VD
          </span>
        </div>
      </div>

      {/* Notification Drawer */}
      <NotiDrawer isVisible={isNotiDrawerVisible} onClose={closeNotiDrawer} />
    </>
  );
}
