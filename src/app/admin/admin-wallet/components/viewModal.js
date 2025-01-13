import { useState } from "react";

export default function ViewModal({ onClose, user }) {
  const [selectedUser, setSelectedUser] = useState({
    ...user,
  });

  return (
    <>
      <div
        className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
        onClick={() => onClose(false)}
      >
        <div
          className="bg-white rounded-2xl p-6 w-[400px] h-[500px] md:w-[500px] space-y-5 font-Manrope overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-4">
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

              {/* Available Balance */}
              <div>
            <label className="block mb-1 text-sm font-semibold">
              Available Balance
            </label>
            <input
              type="text"
              value={selectedUser.available_balance || ""}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>
      
          {/* Locked Balance */}
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Locked Balance
            </label>
            <input
              type="text"
              value={selectedUser.locked_balance || ""}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>

          {/* Rolling Reserve Balance */}
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Rolling Reserve Balance
            </label>
            <input
              type="text"
              value={selectedUser.rolling_reserve_balance || ""}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>
          
             {/* Wallet Number */}
             <div>
            <label className="block mb-1 text-sm font-semibold">
              Wallet Number
            </label>
            <input
              type="text"
              value={selectedUser.wallet_number || ""}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Currency
            </label>
            <input
              type="text"
              value={selectedUser.currency || ""}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Status
            </label>
            <input
              type="text"
              value={selectedUser.status || ""}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>

          {/* Created At */}
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Created At
            </label>
            <input
              type="text"
              value={selectedUser.created_at || ""}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>

          {/* Updated At */}
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Updated At
            </label>
            <input
              type="text"
              value={selectedUser.updated_at || ""}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </>
  );
}
