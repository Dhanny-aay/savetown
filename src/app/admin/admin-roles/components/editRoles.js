import React, { useState, useEffect } from "react";
import { permissionsDisplay } from "../../adminControllers/permissionController";
import { editRoles } from "../../adminControllers/rolesController";

const EditRoles = ({ onClose, user, onRolesChange }) => {
  const [editRole, setEditRole] = useState({
    id: user.id, // Include the role's ID
    name: user.name || "",
    permissions: user.permissions.map((perm) => perm.id) || [],
  });
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch permissions from API
  const displayPermissions = async () => {
    setLoading(true);
    try {
      const response = await permissionsDisplay({});
      const permissionData = response?.data || [];
      setPermissions(permissionData);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    displayPermissions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRole((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (permissionId) => {
    setEditRole((prevState) => ({
      ...prevState,
      permissions: prevState.permissions.includes(permissionId)
        ? prevState.permissions.filter((id) => id !== permissionId)
        : [...prevState.permissions, permissionId],
    }));
  };

  const handleAddRoles = async () => {
    // console.log("Edited Role Data:", editRole.permissions);
    setLoading(true)
    await editRoles(

      `${editRole.id}`,
      {
        name: `${editRole.name}`, 
        permissions: editRole.permissions, 
      },
      (response) => {
        // console.log("Response:", response);
        setLoading(false)
      },
      (err) => {
        console.error("Unable to edit roles", err);
      }
    );
    onRolesChange();
    onClose(false);
  };
  

  // Save on Enter key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleAddRoles();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editRole]);

  const unselectedPermissions = permissions.filter(
    (perm) => !editRole.permissions.includes(perm.id)
  );

  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold font-Manrope">Edit Roles</h2>

        {/* Role Name */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Role Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Role Name"
            value={editRole.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
          />
        </div>

        {/* Selected Permissions */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Permissions</label>
          {loading ? (
            <div>Loading permissions...</div>
          ) : (
            <ul className="w-full mb-6 space-y-3">
              {permissions.map((permission) => (
                <li key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`permission-${permission.id}`}
                    checked={editRole.permissions.includes(permission.id)}
                    onChange={() => handleCheckboxChange(permission.id)}
                    className="w-4 h-4 text-[#ED1450] accent-[#ED1450] cursor-pointer"
                  />
                  <label
                    htmlFor={`permission-${permission.id}`}
                    className="ml-3 text-[14px] font-normal text-[#272D37] cursor-pointer"
                  >
                    {permission.name}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex items-center justify-between w-full space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-[13px] w-1/2 border text-sm bg-white border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            onClick={handleAddRoles}
            className="px-3 py-[13px] w-1/2 text-sm bg-[#ED1450] text-white rounded-[32px]"
          >
             {loading ? (
      <div className="flex items-center justify-center">
        {/* Spinner for the loading state */}
        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
      </div>) : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoles;
