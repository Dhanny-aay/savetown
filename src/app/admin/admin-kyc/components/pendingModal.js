import Image from "next/image";
import id from "../assets/id.svg";
import { useEffect, useState } from "react";
import { showUsers } from "../../adminControllers/usersController";

export default function PendingModal({ onClose, user }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [rejectModal, setRejectModal] = useState(false);

  const fetchData = async () => {
    await showUsers(
      `${user}`,
      (response) => {
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

  const handleReject = () => {
    setRejectModal(true);
  };

  return (
    <>
      {rejectModal ? (
        <div>
          <div
            className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => onClose(false)}
          >
            <div
              className="bg-white rounded-2xl p-6 w-[400px] md:w-[500px] space-y-5 font-Manrope overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-[20px] font-bold font-Manrope">
                  Reject KYC Information
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
                  Reason for Rejection
                </label>
                <textarea
                  placeholder="Enter reason for rejection"
                  // value={selectedUser.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 resize-none"
                />
              </div>

              <div className=" w-full space-x-2">
                <button
                  // onClick={handleAccept}
                  className="px-3 py-[10px] w-full text-sm bg-[#ED1450] text-white rounded-[32px]"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => onClose(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[400px] h-[500px] md:w-[650px] space-y-5 font-Manrope overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
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
                Verification type - Drivers License
              </label>
              <input
                type="email"
                placeholder=""
                // value={selectedUser.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Uploaded Images - Front and Back
              </label>
              <div className="flex flex-col md:flex-row justify-center gap-3 items-center px-3">
                <Image
                  // src={selectedUser.id_back}
                  src={id.src}
                  alt="id picture"
                  width={300}
                  height={100}
                  priority
                />
                <Image
                  src={id.src}
                  alt="id picture"
                  width={300}
                  height={100}
                  priority
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Facial Integration - Selfie
              </label>
              <div className="flex flex-col md:flex-row justify-center gap-3 items-center px-3">
                <Image
                  // src={selectedUser.id_back}
                  src={id.src}
                  alt="id picture"
                  width={300}
                  height={100}
                  priority
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full space-x-2">
              <button
                onClick={() => handleReject()}
                className="px-3 py-[10px] w-1/2 border text-sm bg-white border-gray-300 rounded-[32px]"
              >
                Reject
              </button>
              <button
                // onClick={handleAccept}
                className="px-3 py-[10px] w-1/2 text-sm bg-[#ED1450] text-white rounded-[32px]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}