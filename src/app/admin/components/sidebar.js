"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../assets/sidebar logo.svg";
import homeIcon from "../assets/homeIcon.svg";
import users from "../assets/users.svg";
import usersActv from "../assets/usersActv.svg";
import transactions from "../assets/transactions.svg";
import eventIcon from "../assets/eventIcon.svg";
import pushIcon from "../assets/pushIcon.svg";
import rolesIcon from "../assets/rolesIcon.svg";
import rolesActv from "../assets/rolesActv.svg";
import contentIcon from "../assets/contentIcon.svg";
import interestIcon from "../assets/interestIcon.svg";
import customerIcon from "../assets/customerIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import signOut from "../assets/signOut.svg";
import key from "../assets/key.svg";
import hamburgerMenu from "../assets/hamburgerMenu.svg";
import { usePathname } from "next/navigation";
import transactionsActv from "../assets/transactionsActv.svg";
import eventsActv from "../assets/eventsActv.svg";
import pushActv from "../assets/pushActv.svg";
import contentActv from "../assets/contentActv.svg";
import interestActv from "../assets/interestActv.svg";
import customerActv from "../assets/customerActv.svg";
import settingsActv from "../assets/settingsActv.svg";
import homeActv from "../assets/homeActv.svg";
import signoutActv from "../assets/signoutActv.svg";
import kycIcon from '../assets/kycIcon.svg';
import kycActv from '../assets/kycActv.svg';
import calcIcon from '../assets/calcIcon.svg'
import calcActv from '../assets/calcActv.svg'
import walletIcon from '../assets/walletIcon.svg'
import walletActv from '../assets/walletActv.svg'


export default function Sidebar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const currentPath = usePathname(); 

  const menuItems = [
    {
      name: "Home",
      icon: homeIcon,
      url: "/admin",
      page: "/admin",
      activImg: homeActv,
    },
    {
      name: "User",
      icon: users,
      url: "/admin/admin-user",
      page: "/admin/admin-user",
      activImg: usersActv,
    },
    {
      name: "KYC Verification",
      icon: kycIcon,
      url: "/admin/admin-kyc",
      page: "/admin/admin-kyc",
      activImg: kycActv,
    },
    {
      name: "Calculator",
      icon: calcIcon,
      url: "/admin/admin-calculator",
      page: "/admin/admin-calculator",
      activImg: calcActv,
    },
    {
      name: "Transactions",
      icon: transactions,
      url: "/admin/admin-transactions",
      page: "/admin/admin-transactions",
      activImg: transactionsActv,
    },
    {
      name: "Events",
      icon: eventIcon,
      url: "/admin/admin-event",
      page: "/admin/admin-event",
      activImg: eventsActv,
    },
    {
      name: "Push Notification",
      icon: pushIcon,
      url: "/admin/admin-push",
      page: "/admin/admin-push",
      activImg: pushActv,
    },
    {
      name: "Fincra Wallet",
      icon: walletIcon,
      url: "/admin/admin-wallet",
      page: "/admin/admin-wallet",
      activImg: walletActv,
    },
    {
      name: "Roles ",
      icon: rolesIcon,
      url: "/admin/admin-roles",
      page: "/admin/admin-roles",
      activImg: rolesActv,
    },
    {
      name: "Permissions",
      icon: rolesIcon,
      url: "/admin/admin-permission",
      page: "/admin/admin-permission",
      activImg: rolesActv,
    },
    {
      name: "Content Management",
      icon: contentIcon,
      url: "/admin/admin-content",
      page: "/admin/admin-content",
      activImg: contentActv,
    },
    {
      name: "Interest Rate",
      icon: interestIcon,
      url: "/admin/admin-interest",
      page: "/admin/admin-interest",
      activImg: interestActv,
    },
    {
      name: "Customer Complaint",
      icon: customerIcon,
      url: "/admin/admin-customer",
      page: "/admin/admin-customer",
      activImg: customerActv,
    },
    {
      name: "Admin",
      icon: rolesIcon,
      url: "/admin/admin",
      page: "/admin/admin",
      activImg: rolesActv,
    },
    {
      name: "Settings",
      icon: settingsIcon,
      url: "/admin/admin-settings",
      page: "/admin/admin-settings",
      activImg: settingsActv,
    },
    {
      name: "Sign Out",
      icon: signOut,
      url: "/admin/admin-signout",
      page: "/admin/admin-signout",
      activImg: signoutActv,
    },
  ];

  const visibleItems = menuItems.slice(0, 3); 
  const hiddenItems = menuItems.slice(3); 

  return (
    <>
      {/* Full Sidebar for medium and larger screens */}
      <div className="hidden fixed md:flex flex-col bg-pink-50 h-[100%] top-0 overflow-y-auto lg:h-[100vh] w-20 lg:w-[18%] z-50 transition-transform">
        <div className="p-4">
          <Link href="/">
            <Image
              src={logo.src}
              alt="Logo"
              width={80}
              height={44}
              className="mx-auto md:hidden lg:block lg:w-40"
            />
            <Image
              src={key.src}
              alt="key logo"
              width={23}
              height={23}
              priority
              className="mx-auto lg:hidden"
            />
          </Link>
        </div>

        <ul className="mt-6 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              href={item.url}
              key={index}
            >
              <li
                key={item.name}
                className={`flex flex-col hover:bg-white text-sm font-Manrope max-[768px]:gap-0 max-[768px]:p-3 lg:flex-row items-center lg:text-xs lg:items-start gap-3 p-4 cursor-pointer transition-colors  ${
                  currentPath === item.page
                    ? "bg-white text-[#ED1450] border-l-4 border-[#ED1450]"
                    : "hover:text-[#ED1450]"
                }`}
              >
                <Image
                  src={currentPath === item.page ? item.activImg : item.icon}
                  alt={`${item.name} icon`}
                  width={16}
                  height={16}
                />
                <span className="hidden lg:inline">{item.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      . {/* Bottom Navbar for small screens */}
      <div className="fixed bottom-0 left-0 w-full z-[99] bg-pink-50 border-t md:hidden">
        <div className="flex items-center justify-between p-2">
          {visibleItems.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={`flex flex-col items-center flex-1 ${
                currentPath === item.page ? "text-[#ED1450]" : "text-gray-500"
              }`}
              // onClick={()=>isMoreOpen(false)}
            >
              <Image
                src={currentPath === item.page ? item.activImg : item.icon}
                alt={`${item.name} icon`}
                width={16}
                height={16}
                className="mb-1"
              />
              <Link href={item.url}>
                <span className="text-xs">{item.name}</span>
              </Link>
            </Link>
          ))}
          {/* More Button */}
          <button
            className="flex flex-col items-center flex-1 text-gray-500"
            onClick={() => setIsMoreOpen(true)}
          >
            <Image
              src={hamburgerMenu.src} // Replace with a "More" icon or similar
              alt="More"
              width={16}
              height={16}
              className="mb-1"
            />
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>
      {/* Popup for hidden items */}
      {isMoreOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-opacity-50 md:hidden font-Manrope"
          onClick={() => setIsMoreOpen(false)} // Close popup when clicking anywhere
        >
          <div
            className="bg-white relative rounded-lg overflow-auto max-w-xs p-3 space-y-4 shadow-lg h-[247px] w-[240px] bottom-[-21%]"
            onClick={(e) => e.stopPropagation()} // Prevent click events inside the popup from closing it
          >
            <button
              className="absolute text-2xl font-bold top-3 right-4"
              onClick={() => setIsMoreOpen(false)}
            >
              &times;
            </button>
            <ul>
              {hiddenItems.map((item, index) => (
                <Link href={item.url} key={index} >
                  <li
                    key={index}
                    className="flex items-center text-[#5F6D7E] text-xs gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-lg"
                    onClick={() => {
                      setIsMoreOpen(false); // Close popup after selecting an item
                    }}
                  >
                    <Image
                      src={
                        currentPath === item.page ? item.activImg : item.icon
                      }
                      alt={`${item.name} icon`}
                      width={16}
                      height={16}
                    />
                    <Link href={item.url} className={ currentPath === item.page ? "text-[#ED1450]" : "text-gray-500"}>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
