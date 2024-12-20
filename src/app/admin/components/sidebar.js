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
import key from "../assets/key.svg";
import hamburgerMenu from "../assets/hamburgerMenu.svg";

export default function Sidebar() {
  const [active, setActive] = useState("Home");
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: homeIcon, href: "/admin" },
    { name: "User", icon: users, href: "/admin/admin-user" },
    {
      name: "Transactions",
      icon: transactions,
      href: "/admin/admin-transactions",
    },
    { name: "Events", icon: eventIcon, href: "/admin/admin-event" },
    { name: "Push Notification", icon: pushIcon, href: "/admin/admin-push" },
    {
      name: "Roles & Permissions",
      icon: rolesIcon,
      href: "/admin/admin-roles",
    },
    {
      name: "Content Management",
      icon: contentIcon,
      href: "/admin/admin-content",
    },
    {
      name: "Interest Rate",
      icon: interestIcon,
      href: "/admin/admin-interest",
    },
    {
      name: "Customer Complaint",
      icon: customerIcon,
      href: "/admin/admin-customer",
    },
    { name: "Admin", icon: rolesIcon, href: "/admin/admin" },
    { name: "Settings", icon: settingsIcon, href: "/admin/admin-settings" },
    { name: "Sign Out", icon: signOut, href: "/sign-out" },
  ];

  const visibleItems = menuItems.slice(0, 3); // First 4 items
  const hiddenItems = menuItems.slice(4); // Remaining items

  return (
    <>
      {/* Full Sidebar for medium and larger screens */}
      <div className="hidden fixed md:flex flex-col bg-pink-50 h-[100%] lg:h-[100vh] w-20 lg:w-[18%] z-50">
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

        <ul className="space-y-4 mt-6">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              onClick={() => setActive(item.name)}
            >
              <li
                key={item.name}
                className={`flex flex-col text-sm font-Manrope max-[768px]:gap-0 max-[768px]:p-3 lg:flex-row items-center lg:text-xs lg:items-start gap-3 p-4 cursor-pointer transition-colors  ${
                  active === item.name
                    ? "bg-white text-[#ED1450] border-l-4 border-[#ED1450]"
                    : "hover:text-[#ED1450]"
                }`}
              >
                <Image
                  src={item.icon}
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
              <Link href={item.href}>
                <span className="text-xs">{item.name}</span>
              </Link>
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
                  <Link href={item.href}>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
