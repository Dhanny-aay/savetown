// import Image from "next/image";
// import id from "../assets/id.svg";
import { useEffect, useState } from "react";
import { showUsers } from "../../adminControllers/usersController";
import FileUploader from "@/app/utils/fileUploader";

export default function CalculatorModal({ onClose, user }) {
  const [selectedUser, setSelectedUser] = useState({
    ...user
  });
  const [rejectModal, setRejectModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // console.log(user)
  // const fetchData = async () => {
  //   await showUsers(
  //     `${user}`,
  //     (response) => {
  //       setSelectedUser(response?.data);
  //       console.log(response?.data)
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-bold font-Manrope">
                  House Model
                </h2>
                <button
                  onClick={() => onClose(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Title
                </label>
                <input
                  placeholder="Enter heading"
                  // value={selectedUser.email}
                  className="w-full px-3 py-2 border text-sm border-gray-300 rounded-[32px]"
                />
              </div>

              <div>
                
                <FileUploader
                  label="Upload Slide Image"
                  accept="image/*"
                  maxSize={5000000}
                  isImage={true}
                  // onFileSelect={(file) =>
                  //   setEditHeadline({ ...editHeadline, image: file })
                  // }
                  />
              </div>
              

              <div className="flex items-center justify-between w-full space-x-2">
              <button
                onClick={()=>onClose(false)}
                className="px-3 py-[10px] w-1/2 border text-sm bg-white border-gray-300 rounded-[32px]"
              >
                Cancel
              </button>
              <button
                // onClick={()=>handleReject()}
                className="px-3 py-[10px] w-1/2 text-sm bg-[#ED1450] text-white rounded-[32px]"
              >
                Save
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-bold font-Manrope">
              {selectedUser.name}
              </h2>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                House Price
              </label>
              <input
                type="text"
                placeholder=""
                value={selectedUser.house_price}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px] text-sm  cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
              Monthly Payment commitment
              </label>
              <input
                type="text"
                placeholder=""
                value={selectedUser.monthly_commitment}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px] text-sm  cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
              Years of savings
              </label>
              <input
                type="text"
                placeholder=""
                value={selectedUser.saving_period}
               disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px] text-sm  cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
              Type of house
              </label>
              <input
                type="text"
                placeholder=""
                value={selectedUser.house_type}
               disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px] text-sm  cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
              House location
              </label>
              <input
                type="text"
                placeholder=""
                value={selectedUser.location}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px] text-sm cursor-not-allowed"
              />
            </div>


            <div className="flex items-center justify-between w-full space-x-2">
              <button
                onClick={()=>onClose(false)}
                className="px-3 py-[10px] w-1/2 border text-sm bg-white border-gray-300 rounded-[32px]"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleReject()}
                className="px-3 py-[10px] w-1/2 text-sm bg-[#ED1450] text-white rounded-[32px]"
              >
                Send house model
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
