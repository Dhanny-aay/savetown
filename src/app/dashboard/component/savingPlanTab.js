"use client";
import openwhite from "./assets/openwhite.svg";
import infop from "./assets/infop.svg";
import info from "./assets/info.svg";
import pattern from "./assets/pattern.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import LearnModal from "./learnModal";
import GroupDrawer from "./groupDrawer";

export default function SavingPlanTab() {
  const [isLearnVisible, setLearnVisible] = useState(false);
  const [isGroupDrawerVisible, setGroupDrawerVisible] = useState(false);

  // learn modal
  const showLearnModal = () => setLearnVisible(true);
  const closeLearnModal = () => setLearnVisible(false);

  // group drawer
  const showGroupDrawer = () => setGroupDrawerVisible(true);
  const closeGroupDrawer = () => setGroupDrawerVisible(false);

  return (
    <>
      <div className=" mt-6 hidden lg:grid grid-cols-2 gap-6">
        <div className="bg-[#D598EA] relative rounded-[24px] h-[180px] p-6">
          <img src={pattern.src} className=" absolute top-0 right-0" alt="" />
          <div className=" flex w-full justify-between items-start">
            <div>
              <div className=" flex items-center space-x-3">
                <p className=" text-body16Medium font-Manrope text-[#FFFFFF]">
                  Savetown Wallet Balance
                </p>
                <img src={openwhite.src} className=" w-5" alt="" />
              </div>
              <h2 className=" text-[32px] font-Manrope font-bold text-white mt-1">
                $ 0.00
              </h2>
            </div>
            <button
              onClick={showLearnModal}
              className=" bg-[#EFE6FD] px-3 py-2 rounded-[40px] flex items-center space-x-1 z-10"
            >
              <img src={infop.src} className="" alt="" />
              <p className=" text-[#5900D9] font-Manrope text-body14Regular">
                Learn more
              </p>
            </button>
          </div>
        </div>
        <div className="bg-[#FEB333] relative rounded-[24px] h-[180px] p-6">
          <img src={pattern.src} className=" absolute top-0 right-0" alt="" />

          <div className=" flex w-full justify-between items-start">
            <div>
              <div className=" flex items-center space-x-3">
                <p className=" text-body16Medium font-Manrope text-[#FFFFFF]">
                  Group Savings Balance
                </p>
                <img src={openwhite.src} className=" w-5" alt="" />
              </div>
              <h2 className=" text-[32px] font-Manrope font-bold text-white mt-1">
                $ 0.00
              </h2>
            </div>
            <button
              onClick={showLearnModal}
              className=" bg-[#EFE6FD] px-3 py-2 rounded-[40px] flex items-center space-x-1 z-10"
            >
              <img src={info.src} className="" alt="" />
              <p className=" text-[#8C5800] font-Manrope text-body14Regular">
                Learn more
              </p>
            </button>
          </div>

          <div className=" absolute bottom-6 right-6 flex items-center space-x-2">
            <button
              onClick={showGroupDrawer}
              className="text-[#6B4300] text-body14Bold font-Manrope"
            >
              Create Group
            </button>
            <img src={ArrowRight.src} className="" alt="" />
          </div>
        </div>
      </div>

      <div className=" block lg:hidden">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mt-6 w-full"
        >
          <SwiperSlide>
            <div className="bg-[#D598EA] relative rounded-[24px] h-[180px] p-6">
              <img
                src={pattern.src}
                className=" absolute top-0 right-0"
                alt=""
              />
              <div className=" flex w-full justify-between items-start">
                <div>
                  <div className=" flex items-center space-x-3">
                    <p className=" text-body16Medium font-Manrope text-[#FFFFFF]">
                      Savetown Wallet Balance
                    </p>
                    <img src={openwhite.src} className=" w-5" alt="" />
                  </div>
                  <h2 className=" text-[32px] font-Manrope font-bold text-white mt-1">
                    $ 0.00
                  </h2>
                </div>
                <button
                  onClick={showLearnModal}
                  className=" bg-[#EFE6FD] px-3 py-2 rounded-[40px] flex items-center space-x-1"
                >
                  <img src={infop.src} className="" alt="" />
                  <p className=" text-[#5900D9] font-Manrope text-body14Regular">
                    Learn more
                  </p>
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#FEB333] relative rounded-[24px] h-[180px] p-6">
              <img
                src={pattern.src}
                className=" absolute top-0 right-0"
                alt=""
              />

              <div className=" flex w-full justify-between items-start">
                <div>
                  <div className=" flex items-center space-x-3">
                    <p className=" text-body16Medium font-Manrope text-[#FFFFFF]">
                      Group Savings Balance
                    </p>
                    <img src={openwhite.src} className=" w-5" alt="" />
                  </div>
                  <h2 className=" text-[32px] font-Manrope font-bold text-white mt-1">
                    $ 0.00
                  </h2>
                </div>
                <button
                  onClick={showLearnModal}
                  className=" bg-[#EFE6FD] px-3 py-2 rounded-[40px] flex items-center space-x-1"
                >
                  <img src={info.src} className="" alt="" />
                  <p className=" text-[#8C5800] font-Manrope text-body14Regular">
                    Learn more
                  </p>
                </button>
              </div>

              <div className=" absolute bottom-6 right-6 flex items-center space-x-2">
                <button
                  onClick={showGroupDrawer}
                  className="text-[#6B4300] text-body14Bold font-Manrope"
                >
                  Create Group
                </button>
                <img src={ArrowRight.src} className="" alt="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* learn modal */}
      <LearnModal isVisible={isLearnVisible} onClose={closeLearnModal} />

      {/* groups */}
      <GroupDrawer
        isVisible={isGroupDrawerVisible}
        onClose={closeGroupDrawer}
      />
    </>
  );
}