import logo from "./assets/logofoot.svg";
import Link from "next/link";
import phone from "./assets/phone.svg";
import email from "./assets/email.svg";
import pin from "./assets/pin.svg";
import fb from "./assets/fb.svg";
import goog from "./assets/goog.svg";
import pple from "./assets/pple.svg";
import ig from "./assets/ig.svg";

export default function Footer() {
  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <div className=" w-full flex flex-col gap-8 lg:gap-0 lg:flex-row items-start justify-between">
        <div className="">
          <img src={logo.src} alt="" />
          <p className=" md:w-[500px] lg:w-[250px] font-Manrope font-normal text-sm text-[#000000B2] mt-4">
            We lead with the values of Integrity, Innovation, Prosperity, and
            Success to ensure that all Africans have a chance to wisely invest
            in their futures.
          </p>
        </div>

        <div className="">
          <h3 className=" text-black font-bold text-base mb-6">
            Learning Center
          </h3>
          <div className=" space-y-3 flex flex-col">
            <Link
              href=""
              className=" font-Manrope font-medium text-base text-[#000000B2]"
            >
              Our FAQ’s
            </Link>
            <Link
              href=""
              className=" font-Manrope font-medium text-base text-[#000000B2]"
            >
              Media
            </Link>
            <Link
              href=""
              className=" font-Manrope font-medium text-base text-[#000000B2]"
            >
              Our Blogs
            </Link>
          </div>
        </div>
        <div className="">
          <h3 className=" text-black font-bold text-base mb-6">Company</h3>
          <div className=" space-y-3 flex flex-col">
            <Link
              href=""
              className=" font-Manrope font-medium text-base text-[#000000B2]"
            >
              About us
            </Link>
            <Link
              href=""
              className=" font-Manrope font-medium text-base text-[#000000B2]"
            >
              Calculator
            </Link>
            <Link
              href=""
              className=" font-Manrope font-medium text-base text-[#000000B2]"
            >
              Career
            </Link>
          </div>
        </div>
        <div className=" space-y-3 lg:max-w-[280px]">
          <div className=" flex items-start space-x-2">
            <img src={phone.src} alt="" />
            <p className=" font-Manrope font-medium text-sm text-[#000000B2]">
              +234-01-330-0108
            </p>
          </div>
          <div className=" flex items-start space-x-2">
            <img src={email.src} alt="" />
            <p className=" font-Manrope font-medium text-sm text-[#000000B2]">
              info@savetown.com
            </p>
          </div>
          <div className=" flex items-start space-x-2 pb-6 lg:pb-0">
            <img src={pin.src} alt="" />
            <p className=" font-Manrope font-medium text-sm text-[#000000B2]">
              8-10 meadow Hall way, Km 13 Lekki Expwy, Lagos
            </p>
          </div>
          <div className=" flex items-center space-x-4 ">
            <img src={fb.src} alt="" />
            <img src={goog.src} alt="" />
            <img src={pple.src} alt="" />
            <img src={ig.src} alt="" />
          </div>
        </div>
      </div>
      <div className=" w-full mt-12 border-t border-[#EAEBF0] pt-8 flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between">
        <h3 className="text-[#000000B2]">
          © 2024 Savetown. All Rights Reserved.
        </h3>
        <div className=" flex items-center space-x-12">
          <Link
            href=""
            className="font-Manrope font-medium text-base text-[#000000B2]"
          >
            Privacy Policy
          </Link>
          <Link
            href=""
            className="font-Manrope font-medium text-base text-[#000000B2]"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
