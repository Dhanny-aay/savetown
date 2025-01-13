"use client";
import { useState, useEffect } from "react";
import { createRoles } from "../../adminControllers/rolesController";
import { permissionsDisplay } from "../../adminControllers/permissionController";

export default function CreateRolesModal({ onClose, onRolesChange }) {
  const [createRole, setCreateRole] = useState({
    name: "",
    permissions: [],
  });
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateRole((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddRoles = async () => {
    const newRole = {
      name: createRole.name,
      permissions: createRole.permissions,
    };
    // console.log("Sending role data:", newRole);
    setLoading(true)
    await createRoles(
      {name: newRole.name,
        permissions: newRole.permissions
      },
      (response) => {
        console.log("Role created successfully");
        setLoading(false)
      },
      (err) => {
        console.error("Error creating role", err);
      }
    );
onRolesChange();
    onClose(false);
  };

  const handleCheckboxChange = (permissionId) => {
    setCreateRole((prevState) => ({
      ...prevState,
      permissions: prevState.permissions.includes(permissionId)
        ? prevState.permissions.filter((id) => id !== permissionId)
        : [...prevState.permissions, permissionId],
    }));
  };

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

  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold font-Manrope">Add New Roles</h2>

        <div>
          <label className="block mb-1 text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Role Name"
            value={createRole.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
          />
        </div>

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
                    checked={createRole.permissions.includes(permission.id)}
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
}
