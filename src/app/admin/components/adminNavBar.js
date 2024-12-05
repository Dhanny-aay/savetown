'use client'
import Image from 'next/image';
import bell from '../assets/bell.svg'
import key from '../assets/key.svg'

export default function AdminNavBar () {
    return (
      <div className="flex justify-between items-center bg-white py-4 px-8 border-b border-b-[#EAEBF0] md:relative md:px-8 md:py-4 md:">
        <h1 className="text-xl font-bold text-black font-Manrope hidden md:block">Welcome back Admin!</h1> {/* Hidden on mobile */}
        <Image
              src={key.src}
              alt="Bell icon"
              width={23}
              height={23}
              priority
              className='block md:hidden'
          />
        <div className="flex items-center md:justify-end gap-4">
        <Image
              src={bell.src}
              alt="Bell icon"
              width={25}
              height={25}
              priority
          />
          <div className="p-2 bg-pink-800 rounded-full text-pink-600 font-bold">
            VD
          </div>
        </div>
      </div>
    );
};
