import { useEffect, useState } from "react";

export default function ViewEntry({ onClose, user }) {
  const [selectedUser, setSelectedUser] = useState({
    ...user
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
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-[20px] font-bold font-Manrope">
              Duration Information
            </h2>
            <button
              onClick={() => onClose(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Duration
            </label>
            <input
              type="text"
              value={selectedUser.value}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Minimum House Price */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Minimum House Price
            </label>
            <input
              type="text"
              value={selectedUser.min_house_price}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Maximum House Price */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Maximum House Price
            </label>
            <input
              type="text"
              value={selectedUser.max_house_price}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Minimum Saving Period */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Minimum Saving Period
            </label>
            <input
              type="text"
              value={selectedUser.min_saving_period}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Maximum Saving Period */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Maximum Saving Period
            </label>
            <input
              type="text"
              value={selectedUser.max_saving_period}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Minimum Monthly Commitment */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Minimum Monthly Commitment
            </label>
            <input
              type="text"
              value={selectedUser.min_monthly_commitment}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Maximum Monthly Commitment */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Maximum Monthly Commitment
            </label>
            <input
              type="text"
              value={selectedUser.max_monthly_commitment}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Created At */}
          <div>
            <label className="block text-sm font-semibold mb-1">Created At</label>
            <input
              type="text"
              value={selectedUser.created_at}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Updated At */}
          <div>
            <label className="block text-sm font-semibold mb-1">Updated At</label>
            <input
              type="text"
              value={selectedUser.updated_at}
              disabled
              className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
}
