import React from "react";
import { deleteNotifications } from "../../adminControllers/pushController";
import Image from "next/image";
import alert from '../assets/alert.svg'
import { useState } from "react";

const DeleteNotificationsModal = ({onClose,notifInfo,onPermissionChange }) => {

  const [loading, setLoading] = useState(false)
  const confirmDeleteSlide = async() => {
    setLoading(true)
    console.log(notifInfo)
    await deleteNotifications(
      `${notifInfo}`,
      (response)=>{
        // console.log(response)
        setLoading(false)
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
        <div className="bg-white rounded-2xl p-6 w-[400px] max-md:mx-5 space-y-5 font-Manrope flex flex-col items-center">
          <Image
                                        src={alert.src}
                                        alt="view icon"
                                        width={98}
                                        height={98}
                                        priority
                                        className='text-center'
                                      />
                  <h2 className="text-lg font-bold text-center font-Manrope">
                    Delete Section{" "}
                  </h2>
                  <p className="text-center">
                    {" "}
                    Are you sure you want to proceed? This action is irreversible and will permanently remove the section.
                  </p>
          <div className="flex items-center justify-between w-full gap-4">
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
               {loading ? (
      <div className="flex items-center justify-center">
        {/* Spinner for the loading state */}
        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
      </div>) : 'Yes, delete'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteNotificationsModal;
