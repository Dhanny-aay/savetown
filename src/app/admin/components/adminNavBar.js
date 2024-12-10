'use client'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import bell from '../assets/bell.svg';
import key from '../assets/key.svg';

export default function AdminNavBar () {
    const pathname = usePathname(); // Get the current URL path

    return (
      <div className="flex fixed w-full z-[99] md:left-[10.2%] md:w-[90%] lg:w-[80%] lg:left-[18%] top-0 justify-between items-center bg-white py-4 px-8 border-b border-b-[#EAEBF0] md:px-8 md:py-4">
        {/* Left-side content */}
        <div>
          {pathname === '/admin' && (
            <h1 className="text-xl font-bold text-black font-Manrope hidden md:block">
              Welcome back Admin!
            </h1>
          )}
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
        <div className="flex items-center md:justify-end gap-4">
          <Image
            src={bell.src}
            alt="Bell icon"
            width={24}
            height={24}
            priority
          />
          <span className="w-12 h-12 rounded-full bg-[#FFF6E6] text-center font-Manrope font-bold text-base flex items-center justify-center text-btnPrimary">
            VD
          </span>
        </div>
      </div>
    );
};
