"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import piggyBank from "../assets/piggyBank.svg";
import Users from "../assets/usersPink.svg";
import UsersPlus from "../assets/userPlus.svg";
import { statDisplay } from "../adminControllers/statController";

export default function Card() {
  const [cardsData, setCardsData] = useState([]);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchStat = async () => {
    const response = await statDisplay({});
    const stat = response?.data.message;
    // console.log(stat.total_deposits)
    setCardsData(stat);
  };

  useEffect(() => {
    fetchStat();
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.offsetWidth * 0.7; // 70% width of the card
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="">
      {/* Analysis Header */}
      <h3 className="text-2xl font-bold text-[#262626] mb-4">Analysis</h3>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="relative max-sm:overflow-x-auto max-sm:flex max-sm:gap-4
        grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <div
          className="
            flex max-sm:w-[70%] max-sm:flex-shrink-0 justify-between gap-4 bg-white rounded-[10px] py-4 px-5 border border-[#EAEBF0]"
        >
          <div className="font-Manrope text-left flex flex-col gap-4">
            <h4 className="text-[#262626] text-base font-medium">
              Total Deposits
            </h4>
            <h2 className="text-[28px] text-[#262626] font-bold font-Manrope">
              {cardsData.total_deposits}
            </h2>
            <p className="font-medium text-[#262626] text-sm">All Stats</p>
          </div>
          <div>
            <Image
              src={piggyBank.src}
              alt=" "
              width={48}
              height={48}
              priority
            />
          </div>
        </div>

        <div
          className="
flex max-sm:w-[70%] max-sm:flex-shrink-0 justify-between gap-4 bg-white rounded-[10px] py-4 px-5 border border-[#EAEBF0]"
        >
          <div className="font-Manrope text-left flex flex-col gap-4">
            <h4 className="text-[#262626] text-base font-medium">
              Active Users
            </h4>
            <h2 className="text-[28px] text-[#262626] font-bold font-Manrope">
              {cardsData.active_users}
            </h2>
            <p className="font-medium text-[#262626] text-sm">All Stats</p>
          </div>
          <div>
            <Image
              src={Users.src}
              alt="Savetown logo"
              width={48}
              height={48}
              priority
            />
          </div>
        </div>

        <div
          className="
flex max-sm:w-[70%] max-sm:flex-shrink-0 justify-between gap-4 bg-white rounded-[10px] py-4 px-5 border border-[#EAEBF0]"
        >
          <div className="font-Manrope text-left flex flex-col gap-4">
            <h4 className="text-[#262626] text-base font-medium">
              Inactive Users
            </h4>
            <h2 className="text-[28px] text-[#262626] font-bold font-Manrope">
              {cardsData.inactive_users}
            </h2>
            <p className="font-medium text-[#262626] text-sm">All Stats</p>
          </div>
          <div>
            <Image
              src={Users.src}
              alt="Savetown logo"
              width={48}
              height={48}
              priority
            />
          </div>
        </div>

        <div
          className="
flex max-sm:w-[70%] max-sm:flex-shrink-0 justify-between gap-4 bg-white rounded-[10px] py-4 px-5 border border-[#EAEBF0]"
        >
          <div className="font-Manrope text-left flex flex-col gap-4">
            <h4 className="text-[#262626] text-base font-medium">New Users</h4>
            <h2 className="text-[28px] text-[#262626] font-bold font-Manrope">
              {cardsData.new_users}
            </h2>
            <p className="font-medium text-[#262626] text-sm">Weekly Stats</p>
          </div>
          <div>
            <Image
              src={UsersPlus.src}
              alt="Savetown logo"
              width={48}
              height={48}
              priority
            />
          </div>
        </div>
      </div>

      {/* Pagination Dots */}

   <div className="absolute left-[35%] flex justify-center items-center p-2 bg-[#FF0044] rounded-full w-fit mt-4 max-sm:flex md:hidden">
  {Array.from({ length: 4 }).map((_, index) => (
    <span
      key={index}
      className={`relative h-2 mx-[2px] rounded-full bg-white transition-all duration-300 ${
        activeIndex === index ? "w-6" : "w-2"
      }`}
    ></span>
  ))}
</div>
    </div>
  );
}
