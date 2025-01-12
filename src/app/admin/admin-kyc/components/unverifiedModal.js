import Image from "next/image";
import cancel from '../assets/cancel.svg'
import { useState } from "react";

export default function UnverifiedModal({ onClose, user }) {
     const [selectedUser, setSelectedUser] = useState(
        {...user}
      );
    console.log(user)
  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[400px] max-md:h-[500px] md:w-[500px] space-y-5 font-Manrope overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold font-Manrope">'{setSelectedUser.name}'</h2>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Bank Verification Number
          </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={user.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Verification type - Drivers License
          </label>
          <input
            type="email"
            placeholder="Enter Email Address"
            value={setSelectedUser.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-3 items-center px-3">
           <img src={selectedUser.id_front} alt="id picture" width={300}
              height={100}/>
            <img src={selectedUser.id_back} alt="id picture" width={300}
              height={100}/>
        </div>
        <div className="flex justify-between items-center w-full space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-[10px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
          >
            Reject
          </button>
          <button
            // onClick={() => onSave(selectedDay) }
            className="px-3 py-[10px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
