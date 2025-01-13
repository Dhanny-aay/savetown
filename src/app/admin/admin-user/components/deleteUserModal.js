import Image from 'next/image'
import React, { useState } from 'react'
import alert from '../assets/alert.svg'

const DeleteUserModal = ({user, onClose}) => {
  
  // console.log('handle edit',user)
  const handleDeleteUser = () => {
    // const filteredHeadlines = user.filter(
    //   (headline) => headline.id !== deleteId
    // );
    // setHeadlines(filteredHeadlines);
    // setDeleteId(null);
    onClose(false)
  }

  return (
    <div
    className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
    onClick={() => onClose(false)}
  >
    <div
      className="bg-white rounded-2xl p-6 w-[500px] space-y-5 font-Manrope flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
    <Image
                                   src={alert.src}
                                   alt="view icon"
                                   width={98}
                                   height={98}
                                   priority
                                   className="text-center"
                                 />
             <h2 className="text-lg font-bold text-center font-Manrope">
               Delete Section{" "}
             </h2>
             <p className="text-center">
               {" "}
               Are you sure you want to proceed? This action is irreversible and will permanently remove the section.
             </p>
      <div className="flex justify-center w-full gap-4">
        <button
          onClick={() => onClose(false)}
          className="px-3 py-[13px] w-1/3 border bg-white border-gray-300 rounded-[32px]"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteUser}
          className="px-3 py-[13px] w-1/3 bg-[#ED1450] text-white rounded-[32px]"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteUserModal