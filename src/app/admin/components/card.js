'use client'
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import piggyBank from "../assets/piggyBank.svg";
import Users from "../assets/usersPink.svg";
import UsersPlus from "../assets/userPlus.svg";

const cardsData = [
  { title: "Total Deposits", value: "₦70,000.00", icon: piggyBank, subtext: "All Stats" },
  { title: "Active Users", value: "700", icon: Users, subtext: "All Stats" },
  { title: "Inactive Users", value: "700", icon: Users, subtext: "All Stats" },
  { title: "New Users", value: "700", icon: UsersPlus, subtext: "Weekly Stats" },
];

export default function Card() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div className=''>
      {/* Analysis Header */}
      <h3 className="text-2xl font-bold text-[#262626] mb-4">Analysis</h3>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="relative max-sm:overflow-x-auto max-sm:flex max-sm:gap-4
        grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {cardsData.map(({ title, value, icon, subtext }, index) => (
          <div
            key={index}
            className="
            flex max-sm:w-[70%] max-sm:flex-shrink-0 justify-between gap-4 bg-white rounded-[10px] py-4 px-5 border border-[#EAEBF0]"
          >
            <div className="font-Manrope text-left flex flex-col gap-4">
              <h4 className="text-[#262626] text-base font-medium">{title}</h4>
              <h2 className="text-[28px] text-[#262626] font-bold font-Manrope">{value}</h2>
              <p className="font-medium text-[#262626] text-sm">{subtext}</p>
            </div>
            <div>
              <Image
                src={icon}
                alt="Savetown logo"
                width={48}
                height={48}
                priority
              />
            </div>
          </div>
        ))}
      </div>

     {/* Pagination Dots */}
     
<div className="absolute left-[35%] flex justify-center items-center p-2 bg-[#FF0044] rounded-full w-fit mt-4 max-sm:flex md:hidden">
  {cardsData.map((_, index) => (
    <span
      key={index}
      className={`relative h-2 mx-[3px] rounded-full bg-white transition-all duration-300 ${
        activeIndex === index ? "w-8" : "w-2"
      }`}
    ></span>
  ))}
</div>

    </div>
  );
}
