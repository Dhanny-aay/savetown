import Image from "next/image";
import id from '../assets/id.svg'
import { useEffect, useState } from "react";
import { showUsers } from "../../adminControllers/usersController";

export default function VerifiedModal({ onClose, user }) {
     const [selectedUser, setSelectedUser] = useState('');

     const fetchData = async () => {
        await showUsers(
          `${user}`,
          (response) => {
            console.log(response?.data)
            setSelectedUser(response?.data);
          },
          (err) => {
            console.error("Error fetching user info:", err);
          }
        );
      };
    
      useEffect(() => {
        if (user) {
          fetchData();
        }
      }, [user]);

  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[400px] h-[500px] md:w-[650px] space-y-5 font-Manrope overflow-auto"
        onClick={(e) => e.stopPropagation()}>
         {/* Modal Header */}
         <div className="mb-4 flex justify-between items-center">
          <h2 className="text-[20px] font-bold font-Manrope">
            {selectedUser.first_name} {selectedUser.last_name}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Verification type - {selectedUser.id_type === null ? 'N/A' : selectedUser.id_type}
          </label>
          <input
            type="text"
            placeholder=""
            disabled
            value={selectedUser.id_number || ""}
            className="w-full px-3 py-2 cursor-not-allowed border border-gray-300 rounded-[32px]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Uploaded Images - Front and Back
          </label>
          <div className="flex flex-col md:flex-row justify-center gap-3 items-center px-3">
           <img src={selectedUser.id_front} alt="id picture"  width={300}
              height={100}/>
            {/* <Image
              // src={selectedUser.id_front}
              src={id.src}
              alt="id picture"
              width={300}
              height={100}
              priority
            /> */}
            <Image
              src={id.src}
              // src={selectedUser.id_back}
              alt="id picture"
              width={300}
              height={100}
              priority
              placeholder='empty'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
