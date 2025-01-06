import React, { useState } from "react";
import { updateUsers } from "../../adminControllers/usersController";

const EditUserModal = ({ user, onClose }) => {
  const [selectedUser, setSelectedUser] = useState(
    {...user}
  );

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleEditUser = async(e) => {
    e.preventDefault();
    const {first_name, email, phone, gender, address, role } = selectedUser;
    let userId = selectedUser.id;
    console.log("user", first_name);
    await updateUsers(
      `${userId}`,
        {
          first_name,
          email,
          phone,
          gender,
          address,
          role,
          is_verify: true,
          is_active: false,
          id_verification_message: "rerum",
        },
      (response) => {
        console.log("iam succesful", response);
      },
      (err) => {
        console.error("unable to update user", err);
      }
    );
    onClose(false)
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)} // Close modal on overlay click
    >
      <div
        className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner clicks
      >
        {/* Modal Header */}
        <h2 className="text-xl font-bold font-Manrope">Edit User Profile</h2>

        {/* Form Inputs */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="first_name"
              value={selectedUser.first_name || ""}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={selectedUser.email || ""}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone Number & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={selectedUser.phone || ""}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Gender</label>
              <select
                value={selectedUser.gender || ""}
                name="gender"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
              >
                <option value="">Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Address & Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Address
              </label>
              <input
                type="text"
                value={selectedUser.address || ""}
                name="address"
                onChange={handleChange}
                placeholder="Enter Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Role</label>
              <select
                value={selectedUser.role || ""}
                name="role"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
              >
                <option value="">Assign Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center w-full space-x-2">
            <button
              onClick={() => onClose(false)}
              className="px-3 py-[12px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
            >
              Cancel
            </button>
            <button
              onClick={handleEditUser}
              className="px-3 py-[12px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
