import Image from "next/image";
// import id from "../assets/id.svg";
import { useEffect, useState } from "react";
import { fetchWalletDetails } from "../../adminControllers/walletController";

export default function ViewModal({ onClose, user }) {
  const [selectedUser, setSelectedUser] = useState({
    ...user
  });
  const id = user.id;
  console.log(id)

  // const fetchData = async () => {
  //   await fetchWalletDetails(
  //     `${id}`,
  //     (response) => {
  //       console.log(response?.data.id);
  //       setSelectedUser(response);
  //     },
  //     (err) => {
  //       console.error("Error fetching user info:", err);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   if (user) {
  //     fetchData();
  //   }
  // }, [user]);

  return (
    <>
      <div
        className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
        onClick={() => onClose(false)}
      >
        <div
          className="bg-white rounded-2xl p-6 w-[400px] h-[500px] md:w-[500px] space-y-5 font-Manrope overflow-auto"
          onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-[20px] font-bold font-Manrope">
              Wallet Information
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
              Available Balance
            </label>
            <input
              type="text"
              // placeholder="Enter reason for rejection"
              value={selectedUser.available_balance}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md  text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Locked Balance
            </label>
            <input
            type="text"
              // placeholder="Enter reason for rejection"
              value={selectedUser.locked_balance}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md  text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Rolling Reserve Balance
            </label>
            <input
              type="text"
              // placeholder="Enter reason for rejection"
              value={selectedUser.rolling_reserve_balance}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md  text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Wallet Number
            </label>
            <input
              type="text"
              // placeholder="Enter reason for rejection"
              value={selectedUser.wallet_number}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md  text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Currency</label>
            <input
              type="text"
              // placeholder="Enter reason for rejection"
              value={selectedUser.currency}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md  text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <input
              type="text"
              // placeholder="Enter reason for rejection"
              value={selectedUser.status}
              disabled
              className="w-full capitalize cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md  text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Created At
            </label>
            <input
              type="text"
              // placeholder="Enter reason for rejection"
              value={selectedUser.created_at}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md  text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Updated At
            </label>
            <input
              type="text"
              // placeholder="Enter reason for rejection"
              value={selectedUser.updated_at}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md  text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
}
