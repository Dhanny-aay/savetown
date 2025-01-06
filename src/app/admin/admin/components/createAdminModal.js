"use client";
import { useState } from "react";
import { createAdminUser } from "../../adminControllers/adminController";

export default function CreateAdminModal({ onClose }) {
  const [createAdmin, setCreateAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddAdmin = async () => {
    const newAdmin = {
      id: createAdmin.length + 1,
      ...createAdmin,
    };
    console.log(newAdmin);
    let newNotif = newAdmin;
    await createAdminUser(
      {
        first_name: `${newNotif.name}`,
        email: `${newNotif.email}`,
        password: `${newNotif.password}`,
        last_name: "klw",
        password_confirmation: `${newNotif.password}`,
        is_active: false,
        roles: ["gtq"],
        permissions: ["ut"]
      },
      (response) => {
        console.log("i am successful", response);
        // onSave(newNotification);
      },
      (err) => {
        console.error("unable to create notification", err);
      }
    );
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
        <h2 className="text-lg font-bold font-Manrope">Add New Admin</h2>
        <div>
          <label className="block text-sm font-semibold mb-1">Admin Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={createAdmin.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={createAdmin.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={createAdmin.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
          />
        </div>
        <div className="flex justify-between items-center w-full space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-[13px] w-1/2 border text-sm bg-white border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            onClick={handleAddAdmin}
            className="px-3 py-[13px] w-1/2 text-sm bg-[#ED1450] text-white rounded-[32px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
