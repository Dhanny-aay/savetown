"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import key from "./assets/key.svg";
import noti from "./assets/noti.svg";
import support from "./assets/support.svg";
import NotiDrawer from "./notiDrawer";
import Link from "next/link";

export default function Headbar() {
  const [isNotiDrawerVisible, setNotiDrawerVisible] = useState(false);
  const currencies = [
    { name: "USD", flag: "https://flagcdn.com/us.svg" },
    { name: "NGN", flag: "https://flagcdn.com/ng.svg" },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectCurrency = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="relative hidden md:inline-block" ref={dropdownRef}>
            {/* Button displaying only the flag */}
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center p-2 border border-[#C2C4C6] rounded-[100000px] focus:outline-none"
            >
              <span
                style={{
                  backgroundImage: `url(${selectedCurrency.flag})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" w-6 h-6 bg-[#f1f1f1] rounded-full"
              ></span>
              {/* <img
                src={selectedCurrency.flag}
                alt={selectedCurrency.name}
                className="w-6 h-6 rounded-full"
              /> */}
              <span className="ml-2">
                <svg className="w-4 h-4" viewBox="0 0 20 20">
                  <path fill="currentColor" d="M5 7l5 5 5-5H5z" />
                </svg>
              </span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute mt-2 w-40 bg-white border rounded shadow-lg">
                {currencies.map((currency, index) => (
                  <div
                    key={index}
                    onClick={() => selectCurrency(currency)}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                  >
                    <span
                      style={{
                        backgroundImage: `url(${currency.flag})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      className=" mr-2 w-5 h-5 bg-[#f1f1f1] rounded-full"
                    ></span>
                    <span className=" font-Manrope text-body14Regular">
                      {currency.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/dashboard/support">
            <img
              src={support.src}
              className="cursor-pointer md:hidden"
              // onClick={showNotiDrawer}
              alt=""
            />
          </Link>
          <img
            src={noti.src}
            className="cursor-pointer w-4 md:w-auto mt-0.5 md:mt-0"
            onClick={showNotiDrawer}
            alt=""
          />
          <span className="w-12 h-12 rounded-full bg-[#FFF6E6] text-center hidden font-Manrope font-bold text-base md:flex items-center justify-center text-btnPrimary">
            VD
          </span>
          <div className="relative inline-block md:hidden" ref={dropdownRef}>
            {/* Button displaying only the flag */}
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center p-2 border border-[#C2C4C6] rounded-[100000px] focus:outline-none"
            >
              <span
                style={{
                  backgroundImage: `url(${selectedCurrency.flag})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" w-6 h-6 bg-[#f1f1f1] rounded-full"
              ></span>
              {/* <img
                src={selectedCurrency.flag}
                alt={selectedCurrency.name}
                className="w-6 h-6 rounded-full"
              /> */}
              <span className="ml-2">
                <svg className="w-4 h-4" viewBox="0 0 20 20">
                  <path fill="currentColor" d="M5 7l5 5 5-5H5z" />
                </svg>
              </span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute mt-2 w-40 bg-white border rounded shadow-lg">
                {currencies.map((currency, index) => (
                  <div
                    key={index}
                    onClick={() => selectCurrency(currency)}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                  >
                    <span
                      style={{
                        backgroundImage: `url(${currency.flag})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      className=" mr-2 w-5 h-5 bg-[#f1f1f1] rounded-full"
                    ></span>
                    <span className=" font-Manrope text-body14Regular">
                      {currency.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Drawer */}
      <NotiDrawer isVisible={isNotiDrawerVisible} onClose={closeNotiDrawer} />
    </>
  );
}
