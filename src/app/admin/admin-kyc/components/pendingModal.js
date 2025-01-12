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
              Verification type - {selectedUser.id_type === null ? 'N/A' : selectedUser.id_type}
              </label>
              <input
                type="text"
                placeholder=""
                disabled
                value={selectedUser.id_number === null ? 'N/A' : selectedUser.id_number || ""}
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
                  src={selectedUser.id_back}
                  // src={id.src}
                  alt="id picture"
                  width={300}
                  height={100}
                  priority
                /> */}
                <img src={selectedUser.id_back} alt="id picture"  width={300}
              height={100}/>
                {/* <Image
                  src={selectedUser.id_front}
                  // src={id.src}
                  alt="id picture"
                  width={300}
                  height={100}
                  priority
                /> */}
              </div>
            </div>
            {/* <div>
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
            </div> */}
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

{/* <tr key={tx.id} className="border-t"> */}
{/* <td className="p-4 text-[#5F6D7E] max-sm:p-2 text-sm font-medium">
  {index + 1}
</td> */}

{/* <td className="max-sm:p-2 max-sm:text-xs p-4 text-[#5F6D7E] text-sm font-medium max-lg:text-left">
  <div className="max-lg:flex max-lg:flex-col">
    {tx.user.first_name} {tx.user.last_name} */}
    {/* <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
      Savetown Wallet
    </span> */}
  {/* </div>
</td> */}

{/* <td className="max-sm:p-2 max-sm:text-xs max-md:text-black max-md:font-bold p-4 text-[#5F6D7E] text-sm font-medium text-left max-lg:text-left">
  <div className="max-lg:flex max-lg:flex-col">
    {tx.currency === "USD" ? "$" : "₦"} {tx.amount}
    <span className="md:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
      {tx.identifier}
    </span>
  </div>
</td> */}

{/* <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-center max-md:hidden">
  {tx.identifier}
</td> */}

{/* <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-center">
  <span
    className={`inline-block w-[90px] px-3 py-2 rounded-full text-sm font-medium capitalize ${
      tx.status === "successful"
        ? "bg-green-100 text-green-600"
        : tx.status === "approved"
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-[#ED1450]"
    }`}
  >
    {tx.status}
  </span>
</td> */}
// </tr>
