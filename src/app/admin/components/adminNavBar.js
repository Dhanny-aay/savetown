"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import bell from "../assets/bell.svg";
import key from "../assets/key.svg";
import { useState, useEffect } from "react";
import { adminDisplay } from "../adminControllers/adminController";
import NotifDrawer from "./notifDrawer";

export default function AdminNavBar() {
  const [adminName, setAdminName] = useState('')
  const [showNotif, setShowNotif] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname(); 


  const fetchAdmin = async() => {
    const response = await adminDisplay({})
    const data = response?.data[0]
    // console.log(data)
    setAdminName(data)
   }

   const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "VD";
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  };

  // Once loaded, show initials
  const initials = getInitials(adminName.first_name, adminName.last_name);

// console.log(initials)
 
   useEffect(()=>{
     fetchAdmin()
   },[])

  const getPageTitle = () => {
    switch (pathname) {
      case "/admin":
        return `Welcome Back, ${adminName.first_name || ''}!`;
      case "/admin/admin-user":
        return "User";
      case "/admin/admin-user/user-profile":
        return "User";
      case "/admin/admin-kyc":
        return "KYC Verification";
        case "/admin/admin-calculator":
          return "Calculator";
      case "/admin/admin-transactions":
        return "Transactions";
      case "/admin/admin-event":
        return "Events";
      case "/admin/admin-push":
        return "Push Notification";
        case "/admin/admin-wallet":
        return "Fincra Wallet";
      case "/admin/admin-roles":
        return "Roles";
        case "/admin/admin-permission":
        return "Permissions";
      case "/admin/admin-content":
        return "Content Management";
      case "/admin/admin-interest":
        return "Interest Rate";
      case "/admin/admin-customer":
        return "Customer Complaint";
      case "/admin/admin":
        return "Admin";
      case "/admin/admin-settings":
        return "Settings";
      case "/admin/admin-signout":
        return "Sign Out";
      default:
        return null;
    }
  };

  const handleNotif = () => {
    setShowNotif(true)
    setIsVisible(true)
  }

  return (
    <div className="flex fixed w-full z-[99] md:left-[10.2%] md:w-[90%] lg:w-[80%] lg:left-[18%] top-0 justify-between items-center bg-white py-4 px-8 border-b border-b-[#EAEBF0] md:px-8 md:py-4">
      {/* Left-side content */}
      <div>
        <h1 className="hidden text-xl font-bold text-black font-Manrope md:block">
          {getPageTitle()}
        </h1>

        <Image
          src={key.src}
          alt="Bell icon"
          width={23}
          height={23}
          priority
          className="block md:hidden"
        />
      </div>
      {/* Right-side content */}
      <div className="flex items-center gap-4 md:justify-end">
          <Image onClick={()=>{handleNotif()}}
           src={bell.src} alt="Bell icon" width={24} height={24} priority 
           className='cursor-pointer' />
        <span className="w-12 h-12 rounded-full bg-[#FFF6E6] text-center font-Manrope font-bold text-base flex items-center justify-center text-btnPrimary">
         {initials}
        </span>
      </div>
     
     {showNotif ? (<NotifDrawer onClose = {setShowNotif} isVisible={setIsVisible}/>) : null}
    </div>
  );
}
