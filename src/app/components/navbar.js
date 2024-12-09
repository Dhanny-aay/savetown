"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "./assets/logo.svg";
import right from "./assets/right.svg";
import { useEffect, useState } from "react";

export default function Navbar() {
  function overlay() {
    //check classlist
    const overlayDiv = document.getElementById("overlay");
    if (overlayDiv.classList.contains("-translate-y-[600px]")) {
      overlayDiv.classList.remove("-translate-y-[600px]");
    } else if (!overlayDiv.classList.contains("-translate-y-[600px]")) {
      overlayDiv.classList.add("-translate-y-[600px]");
    }
  }

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to toggle dropdowns
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        id="overlay"
        className=" w-full bg-[#000000a2] backdrop-blur-xl h-[460px] p-6 flex justify-center items-center -translate-y-[600px] shadow transition-all duration-700 top-0 fixed z-[99]"
      >
        <div className="w-full flex flex-col justify-center items-center space-y-5">
          <Link
            href="/"
            className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
          >
            Home
          </Link>

          <Link
            href="/career"
            className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
          >
            Career
          </Link>
          <Link
            href="/media"
            className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
          >
            Media
          </Link>
          <Link
            href="/about"
            className=" text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
          >
            About us
          </Link>
          <Link
            href="/blog"
            className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
          >
            Our Blogs
          </Link>
          <Link
            href="/faq"
            className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
          >
            Our Faqs
          </Link>

          <div className=" flex md:hidden space-x-3 z-50 items-center  mt-6">
            <Link
              href="/sign-up"
              className="  font-Manrope px-6 py-3 font-semibold text-sm xl:text-lg 2xl:text-xl text-white"
            >
              Sign Up
            </Link>
            <Link
              href="/sign-in"
              className=" px-6 py-3 bg-btnPrimary rounded-[50px] font-Manrope font-semibold text-sm xl:text-lg 2xl:text-xl leading-[1] text-white"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
      <header>
        <nav className=" py-5 px-4 md:px-14  w-full flex items-center justify-between absolute top-0 left-0 z-[999]">
          <Link href="/">
            <Image
              src={logo.src}
              alt="Savetown logo"
              width={132}
              height={44}
              priority
            />
          </Link>
          <div className=" hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className=" text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
            >
              Home
            </Link>

            {/* Company dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => toggleDropdown("company")}
                className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl relative flex items-center space-x-1"
              >
                <p>Company</p>
                <img
                  src={right.src}
                  className={`transition-transform duration-300 ${
                    activeDropdown === "company" ? "-rotate-45" : "rotate-0"
                  }`}
                  alt="arrow"
                />
              </button>
              {activeDropdown === "company" && (
                <div className="w-[250px] py-4 px-6 bg-[#000000b4] rounded-xl swing-in-top-fwd absolute top-12 -left-4 flex flex-col text-left space-y-4">
                  <Link
                    href="/career"
                    className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
                  >
                    Career
                  </Link>
                  <Link
                    href="/media"
                    className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
                  >
                    Media
                  </Link>
                  <Link
                    href="/about"
                    className=" text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
                  >
                    About us
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/"
              className=" text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
            >
              Calculators
            </Link>
            {/* Learning Center Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => toggleDropdown("learning")}
                className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl relative flex items-center space-x-1"
              >
                <p>Learning Center</p>
                <img
                  src={right.src}
                  className={`transition-transform duration-300 ${
                    activeDropdown === "learning" ? "-rotate-45" : "rotate-0"
                  }`}
                  alt="arrow"
                />
              </button>
              {activeDropdown === "learning" && (
                <div className="w-[250px] py-4 px-6 bg-[#000000b4] rounded-xl swing-i 2xl:text-xl swing-in-top-fwd absolute top-12 -left-4 flex flex-col text-left space-y-4">
                  <Link
                    href="/blog"
                    className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
                  >
                    Our Blogs
                  </Link>
                  <Link
                    href="/faq"
                    className="text-white font-Manrope font-medium text-sm xl:text-lg 2xl:text-xl"
                  >
                    Our Faqs
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className=" flex items-center space-x-5">
            <div className=" hidden md:flex items-center space-x-3">
              <Link
                href="/sign-up"
                className="  font-Manrope px-6 py-3 font-semibold text-sm xl:text-lg 2xl:text-xl text-white"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className=" px-6 py-3 bg-btnPrimary rounded-[50px] font-Manrope font-semibold text-sm xl:text-lg 2xl:text-xl leading-[1] text-white"
              >
                Log In
              </Link>
            </div>
            <div
              onClick={overlay}
              className="menu-icon md:block lg:hidden bg-btnPrimary rounded-full "
            >
              <input className="menu-icon__cheeckbox" type="checkbox" />
              <div>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
