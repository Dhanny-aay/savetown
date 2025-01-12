import React, { useEffect, useState } from 'react'
import { deleteRoles } from '../../adminControllers/rolesController';
import alert from '../assets/alert.svg'
import Image from 'next/image';

const DeleteRoles =({onClose, user, onRolesChange}) => {
  console.log(user.id)

const id = user.id
  const confirmDeleteSlide = async() => {
    await deleteRoles(
      `${id}`,
      (response)=>{
        console.log(response)
      },
      (err)=>{
        console.error('unable to delete permission', err)
      }
    )
    onRolesChange();
    onClose(false)
  };

 

  return (
    <>
    <div onClick={() => onClose(false)} className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
      <div  onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope ">
         <Image
                                       src={alert.src}
                                       alt="view icon"
                                       width={98}
                                       height={98}
                                       priority
                                     />
                 <h2 className="text-lg font-bold font-Manrope text-center">
                   Delete Section{" "}
                 </h2>
                 <p className="text-center">
                   {" "}
                   Are you sure you want to delete this section?
                 </p>
                 <p className="text-center">
                   {" "}
                   Are you sure you want to proceed? This action is irreversible and will permanently remove the section.
                 </p>
        <div className="flex justify-between items-center gap-4 ">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-[13px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
          >
            No, go back
          </button>
          <button
            onClick={confirmDeleteSlide}
            className="px-3 py-[13px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  </>
  )
}

export default DeleteRoles