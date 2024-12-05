"use client";
import { useState } from "react";
import burg from "./assets/burg.svg";
import noti from "./assets/noti.svg";
import NotiDrawer from "./notiDrawer";

export default function Headbar() {
  const [isNotiDrawerVisible, setNotiDrawerVisible] = useState(false);

  // noti drawer
  const showNotiDrawer = () => setNotiDrawerVisible(true);
  const closeNotiDrawer = () => setNotiDrawerVisible(false);

  return (
    <>
      <div className="  w-full lg:w-[80%] fixed top-0 lg:left-[20%] h-[72px] px-6 md:px-8 py-3 z-[99] border-b bg-[#fff] border-[#EAEBF0] flex flex-row justify-between items-center">
        <div className=" flex items-center space-x-4 md:space-x-0">
          <img src={burg.svg} className=" w-6 z-[9999] md:hidden" alt="" />

          <p className="text-[#262626] font-bold text-base md:text-xl leading-none font-Manrope">
            Welcome Back, Veek!
          </p>
        </div>
        <div className=" flex items-center space-x-3">
          <img
            src={noti.src}
            className=" cursor-pointer"
            onClick={showNotiDrawer}
            alt=""
          />
          <span className=" w-12 h-12 rounded-full bg-[#FFF6E6] text-center font-Manrope font-bold text-base flex items-center justify-center text-btnPrimary">
            VD
          </span>
        </div>
      </div>
      {/* deposit */}
      <NotiDrawer isVisible={isNotiDrawerVisible} onClose={closeNotiDrawer} />
    </>
  );
}
