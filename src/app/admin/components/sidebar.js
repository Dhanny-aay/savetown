"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../assets/sidebar logo.svg";
import homeIcon from "../assets/homeIcon.svg";
import users from "../assets/users.svg";
import transactions from "../assets/transactions.svg";
import eventIcon from "../assets/eventIcon.svg";
import pushIcon from "../assets/pushIcon.svg";
import rolesIcon from "../assets/rolesIcon.svg";
import contentIcon from "../assets/contentIcon.svg";
import interestIcon from "../assets/interestIcon.svg";
import customerIcon from "../assets/customerIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import signOut from "../assets/signOut.svg";
import key from '../assets/key.svg'
import hamburgerMenu from '../assets/hamburgerMenu.svg'

export default function Sidebar() {
  const [active, setActive] = useState("Home");
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: homeIcon },
    { name: "User", icon: users },
    { name: "Transactions", icon: transactions },
    { name: "Events", icon: eventIcon },
    { name: "Push Notification", icon: pushIcon },
    { name: "Roles & Permissions", icon: rolesIcon },
    { name: "Content Management", icon: contentIcon },
    { name: "Interest Rate", icon: interestIcon },
    { name: "Customer Complaint", icon: customerIcon },
    { name: "Settings", icon: settingsIcon },
    { name: "Sign Out", icon: signOut },
  ];

  const visibleItems = menuItems.slice(0, 3); // First 4 items
  const hiddenItems = menuItems.slice(4); // Remaining items

  return (
    <>
      {/* Full Sidebar for medium and larger screens */}
      <div className="hidden md:flex flex-col bg-pink-50 h-[100%] lg:h-[100vh] w-20 lg:w-64">
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
              className='mx-auto lg:hidden '
          />
          </Link>
        </div>

        <ul className="space-y-4 mt-6">
          {menuItems.map((item) => (
            <li
              key={item.name}
  className={`flex flex-col lg:flex-row items-center lg:items-start gap-3 p-4 cursor-pointer transition-colors  ${
                active === item.name
                  ? "bg-white text-[#ED1450] border-l-4 border-[#ED1450]"
                  : "hover:text-[#ED1450]"
              }`}
              onClick={() => setActive(item.name)}
            >
              <Image
                src={item.icon}
                alt={`${item.name} icon`}
                width={24}
                height={24}
                className=""
              />
              <span className="hidden lg:inline">{item.name}</span>
            </li>
          ))}
        </ul>

      </div>

         {/* Bottom Menu */}

      {/* Bottom Navbar for small screens */}
      <div className="fixed bottom-0 left-0 w-full bg-pink-50 border-t md:hidden">
        <div className="flex justify-between items-center p-3">
          {visibleItems.map((item) => (
            <button
              key={item.name}
              className={`flex flex-col items-center flex-1 ${
                active === item.name ? "text-[#ED1450]" : "text-gray-500"
              }`}
              onClick={() => setActive(item.name)}
            >
              <Image
                src={item.icon}
                alt={`${item.name} icon`}
                width={24}
                height={24}
                className="mb-1"
              />
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
          {/* More Button */}
          <button
            className="flex flex-col items-center flex-1 text-gray-500"
            onClick={() => setIsMoreOpen(true)}
          >
            <Image
              src={hamburgerMenu.src} // Replace with a "More" icon or similar
              alt="More"
              width={24}
              height={24}
              className="mb-1"
            />
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>

      {/* Popup for hidden items */}
      {isMoreOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsMoreOpen(false)} // Close popup when clicking anywhere
        >
          <div
            className="bg-white rounded-lg w-3/4 max-w-xs p-6 space-y-4 relative"
            onClick={(e) => e.stopPropagation()} // Prevent click events inside the popup from closing it
          >
            <button
              className="absolute top-3 right-4 text-2xl font-bold"
              onClick={() => setIsMoreOpen(false)}
            >
              &times;
            </button>
            <ul>
              {hiddenItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-200 rounded-lg"
                  onClick={() => {
                    setActive(item.name);
                    setIsMoreOpen(false); // Close popup after selecting an item
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name} icon`}
                    width={24}
                    height={24}
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

// return (
//   <div className="flex flex-col h-screen">
//     {/* Sidebar for larger screens */}
//     <div className="hidden lg:flex flex-col w-64 bg-gray-800 text-white">
//       <div className="flex items-center justify-center h-20 bg-gray-900">
//         <h2 className="text-xl font-semibold">App Logo</h2>
//       </div>
//       <div className="flex flex-col p-4">
//         <a href="#" className="flex items-center p-3 mb-4 text-white hover:bg-gray-700 rounded">
//           <i className="fas fa-home mr-3"></i>
//           <span className="hidden lg:inline">Home</span>
//         </a>
//         <a href="#" className="flex items-center p-3 mb-4 text-white hover:bg-gray-700 rounded">
//           <i className="fas fa-user mr-3"></i>
//           <span className="hidden lg:inline">Profile</span>
//         </a>
//         <a href="#" className="flex items-center p-3 mb-4 text-white hover:bg-gray-700 rounded">
//           <i className="fas fa-cog mr-3"></i>
//           <span className="hidden lg:inline">Settings</span>
//         </a>
//       </div>
//     </div>

//     {/* Bottom Navbar for Mobile */}
//     <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white">
//       <div className="flex justify-around items-center py-2">
//         <a href="#" className="flex flex-col items-center text-white hover:bg-gray-700 p-3 rounded">
//           <i className="fas fa-home"></i>
//           <span className="text-xs">Home</span>
//         </a>
//         <a href="#" className="flex flex-col items-center text-white hover:bg-gray-700 p-3 rounded">
//           <i className="fas fa-user"></i>
//           <span className="text-xs">Profile</span>
//         </a>
//         <a href="#" className="flex flex-col items-center text-white hover:bg-gray-700 p-3 rounded">
//           <i className="fas fa-cog"></i>
//           <span className="text-xs">Settings</span>
//         </a>
//       </div>
//     </div>
//   </div>
// );

      //   {/* <div>
      //   <ul className="space-y-2">
      //     <li
      //       className={`flex items-center gap-3 p-4 cursor-pointer font-Manrope font-medium transition-colors ${
      //         active === "Settings"
      //           ? "bg-white text-[#ED1450] border-l-4 border-[#ED1450]"
      //           : " hover:border-l-4 hover:text-[#ED1450]"
      //       }`}
      //       onClick={() => setActive("Settings")}
      //     >
      //       <Image
      //           src={settingsIcon}
      //           alt={'settings icon'}
      //           width={20}
      //           height={20}
      //           className={`transition-all ${
      //             active === 'Settings' ? "fill-[#ED1450]" : "fill-gray-600"
      //           }`}
      //         />
      //       {/* Settings */}
      //       <span className="hidden lg:inline">Settings</span>
      //     </li>
      //     <li
      //       className={`flex items-center gap-3 p-4 cursor-pointer font-Manrope font-medium transition-colors  ${
      //         active === "signOut"
      //           ? "bg-white text-[#ED1450] border-l-4 border-[#ED1450]"
      //           : " hover:border-l-4 hover:text-[#ED1450]"
      //       }`}
      //       onClick={() => setActive("signOut")}
      //     >
      //       <Image
      //           src={signOut}
      //           alt={'sign out icon'}
      //           width={20}
      //           height={20}
      //           className={`transition-all ${
      //             active ===  "signOut" ? "fill-[#ED1450]" : "fill-gray-600"
      //           }`}
      //         />
      //       {/* Sign Out */}
      //       <span className="hidden lg:inline">Sign Out</span>
      //     </li>
      //   </ul>
      // </div> */}