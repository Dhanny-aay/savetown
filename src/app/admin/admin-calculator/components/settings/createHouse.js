"use client";
import { createAdminUser } from "@/app/admin/adminControllers/adminController";
import Image from "next/image";
import { useState } from "react";
import cancel from '../../assets/cancel.svg'

export default function CreateHouseLocationModal({ onClose }) {
  const [houseLocations, setHouseLocations] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setHouseLocations((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index) => {
    setHouseLocations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // const { name, value } = e.target;
    // setInputValue((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const handleAddLocation = async () => {
    // const newAdmin = {
    //   id: createAdmin.length + 1,
    //   ...createAdmin,
    // };
    // console.log(newAdmin);
    // let newNotif = newAdmin;
    // await createAdminUser(
    //   {
    //     first_name: `${newNotif.name}`,
    //     email: `${newNotif.email}`,
    //     password: `${newNotif.password}`,
    //     last_name: "klw",
    //     password_confirmation: `${newNotif.password}`,
    //     is_active: false,
    //     roles: ["gtq"],
    //     permissions: ["ut"]
    //   },
    //   (response) => {
    //     console.log("i am successful", response);
    //   },
    //   (err) => {
    //     console.error("unable to create notification", err);
    //   }
    // );
    alert(`Saved house locations: ${houseLocations.join(", ")}`);
    onClose(false);
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold font-Manrope">Add New House Location</h2>
        <label className="block mb-1 text-sm font-semibold">
          Add available new house location{" "}
        </label>

        <div className="flex flex-wrap items-center gap-2 mb-4 p-2 border rounded-md">
          {houseLocations.map((location, index) => (
            <div
              key={index}
              className="flex items-center bg-[#F2F3F4] text-sm px-3 py-2 rounded-lg"
            >
              <span className="mr-2 text-[#595A5C] text-sm capitalize">{location}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-black hover:text-[#ED1450]"
              >
                <Image
                src={cancel.src}
                priority
                width={12}
                height={12}
                alt="cancel btn"/>
              </button>
            </div>
          ))}
          <textarea
            type="text"
            name="name"
            placeholder="Enter House Locations"
            value={inputValue}
            onKeyDown={handleAddItem}
            onChange={handleChange}
            className="w-full h-32 px-3 py-2 resize-none"
          />
        </div>

        <div className="flex items-center justify-between w-full space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-[13px] w-1/2 border text-sm bg-white border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            onClick={handleAddLocation}
            className="px-3 py-[13px] w-1/2 text-sm bg-[#ED1450] text-white rounded-[32px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
