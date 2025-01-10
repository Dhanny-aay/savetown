import React from "react";
import { deleteNotifications } from "../../adminControllers/pushController";


const DeleteNotificationsModal = ({onClose,notifInfo,onPermissionChange }) => {

  const confirmDeleteSlide = async() => {
    console.log(notifInfo)
    await deleteNotifications(
      `${notifInfo}`,
      (response)=>{
        console.log(response)
      },
      (err)=>{
        console.error('unable to delete permission', err)
      }
    )
    onPermissionChange();
    onClose(false)
  };

  return (
    <>
      <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-6 w-[400px] max-md:mx-5 space-y-5 font-Manrope ">
          <h2 className="text-lg font-bold font-Manrope text-center">
            Delete Section{" "}
          </h2>
          <p className="text-center">
            {" "}
            Are you sure you want to delete this section?
          </p>
          <div className="flex justify-between items-center gap-4 ">
            <button
              onClick={() => onClose(false)}
              className="px-3 py-[11px] w-1/2 border bg-white border-gray-300 text-sm rounded-[32px]"
            >
              No, go back
            </button>
            <button
              onClick={confirmDeleteSlide}
              className="px-3 py-[11px] w-1/2 bg-[#ED1450] text-white text-sm rounded-[32px]"
            >
              Yes, delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteNotificationsModal;
