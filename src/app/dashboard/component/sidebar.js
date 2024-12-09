"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import Savetown from "./assets/Savetown.svg";
import key from "./assets/key.svg";
import house from "./assets/house.svg";
import houseAct from "./assets/houseAct.svg";
import savings from "./assets/savings.svg";
import savingsAct from "./assets/savingsAct.svg";
import setting from "./assets/setting.svg";
import settingAct from "./assets/settingAct.svg";
import support from "./assets/support.svg";
import supportAct from "./assets/supportAct.svg";

export default function Sidebar() {
  const currentPath = usePathname(); // Get the current path

  // Define the sidebar items
  const sidebar = [
    {
      name: "Home",
      img: house,
      activeImg: houseAct,
      page: "/dashboard",
      url: "/dashboard",
    },
    {
      name: "My Savings",
      img: savings,
      activeImg: savingsAct,
      page: "/dashboard/savings",
      url: "/dashboard/savings",
    },
    {
      name: "Settings",
      img: setting,
      activeImg: settingAct,
      page: "/dashboard/settings",
      url: "/dashboard/settings",
    },
    {
      name: "Support",
      img: support,
      activeImg: supportAct,
      page: "/dashboard/support",
      url: "/dashboard/support",
    },
  ];

  return (
    <>
      <div className="hidden md:block fixed top-0 left-0 z-[999] w-[80%] md:w-20 lg:w-[20%] h-[100vh] border-r border-[#E4E7EC] bg-[#F6E9ED] transition-transform">
        <div className="w-full h-full relative">
          <div className="w-full flex md:justify-center lg:justify-start items-center border-b py-3 h-[72px] px-6 border-[#EAEBF0] border-opacity-5">
            <div className="flex items-center">
              <img
                src={Savetown.src}
                alt="logo"
                className="mx-auto md:hidden lg:block"
              />
              <img src={key.src} alt="logo" className="mx-auto lg:hidden" />
            </div>
          </div>

          <div>
            {/* Sidebar content */}
            {sidebar.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className={`text-center py-3 px-6 w-full flex flex-col lg:flex-row items-center hover:bg-white  hover:border-l-[3px] border-btnPrimary lg:items-start space-x-4 ${
                  currentPath === item.page
                    ? "bg-white border-l-[3px] border-btnPrimary"
                    : ""
                }`}
              >
                <img
                  src={
                    currentPath === item.page
                      ? item.activeImg.src
                      : item.img.src
                  }
                  className="w-4 h-4"
                  alt=""
                />
                <p
                  className={`font-Manrope font-normal text-xs hidden lg:inline ${
                    currentPath === item.page
                      ? "text-btnPrimary"
                      : "text-[#00000080]"
                  }`}
                >
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navbar for small screens */}
      <div className="fixed bottom-0 left-0 w-full bg-pink-50 border-t md:hidden z-[99]">
        <div className="flex justify-between items-center p-3">
          {sidebar.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className={`flex flex-col items-center flex-1 ${
                currentPath === item.page ? "text-[#ED1450]" : "text-gray-500"
              }`}
            >
              <img
                src={
                  currentPath === item.page ? item.activeImg.src : item.img.src
                }
                className="w-4 h-4 mb-1"
                alt=""
              />
              <span
                className={`font-Manrope font-normal text-xs ${
                  currentPath === item.page
                    ? "text-btnPrimary"
                    : "text-[#00000080]"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
