"use client";
import { useState } from "react";
import { editPermissions } from "../../adminControllers/permissionController";

export default function EditPermissionsModal({
  onClose,
  permission,
  onPermissionChange,
}) {
  const [editPermission, setEditPermission] = useState({
    ...permission,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPermission((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditPermission = async () => {
    const newPermission = {
      ...editPermission,
    };
    console.log(newPermission);
    let id = newPermission.id;
    let name = newPermission.name;
    await editPermissions(
      `${id}`,
      {
        name: `${name}`,
      },
      (response) => {
        console.log("Role created successfully", response);
      },
      (err) => {
        console.error("Error creating role", err);
      }
    );
    onPermissionChange();
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
        <h2 className="text-lg font-bold font-Manrope">Edit Permissions</h2>
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Permission Name"
            value={editPermission.name}
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
            onClick={handleEditPermission}
            className="px-3 py-[13px] w-1/2 text-sm bg-[#ED1450] text-white rounded-[32px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
