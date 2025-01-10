"use client";
import { useState, useEffect } from "react";
import { createRoles } from "../../adminControllers/rolesController";
import { permissionsDisplay } from "../../adminControllers/permissionController";

export default function CreateRolesModal({ onClose }) {
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
      ...createRole,
    };
    console.log(newRole.permissions);

    await createRoles(
      {
        name: `iyoxxrq`,
        permissions: [`${createRole.permissions}`],
      },
      (response) => {
        console.log("Role created successfully", response);
      },
      (err) => {
        console.error("Error creating role", err);
      }
    );
    onClose(false);
  };

  const handleCheckboxChange = (permission) => {
    setCreateRole((prevState) => ({
      ...prevState,
      permissions: prevState.permissions.includes(permission)
        ? prevState.permissions.filter((perm) => perm !== permission)
        : [...prevState.permissions, permission],
    }));
  };

  // const handleDropdownChange = (e) => {
  //   const selected = e.target.value;

  //   // Add the new permission to the list if it's not already there
  //   if (!permissions.includes(selected)) {
  //     setPermissions((prevPermissions) => [...prevPermissions, selected]);
  //   }

  //   // Add the selected permission to the createRole permissions array
  //   if (!createRole.permissions.includes(selected)) {
  //     setCreateRole((prevState) => ({
  //       ...prevState,
  //       permissions: [...prevState.permissions, selected],
  //       // permissions: prevState.permissions
  //       // ? `${prevState.permissions}, ${selected}`
  //       // : selected,
  //     }));
  //   }

  //   // Reset the dropdown selection
  //   setSelectedPermission("");
  // };

  const displayPermissions = async () => {
    setLoading(true);
    const response = await permissionsDisplay({});
    const permissionNames = response?.data?.map((perm) => perm.name);
    setPermissions(permissionNames || []);
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
          <label className="block text-sm font-semibold mb-1">Name</label>
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
          <label className="block text-sm font-semibold mb-1">
            Permissions
          </label>
          {loading ? (
            <div>loading permissions..</div>
          ) : (
            <ul className="space-y-3 mb-6 w-full">
              {permissions &&
                permissions.map &&
                permissions.map((permission, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={permission}
                      checked={createRole.permissions.includes(permission)}
                      onChange={() => handleCheckboxChange(permission)}
                      className="w-4 h-4 text-[#ED1450] accent-[#ED1450] cursor-pointer"
                    />
                    <label
                      htmlFor={permission}
                      className="ml-3 text-[14px] font-normal text-[#272D37] cursor-pointer"
                    >
                      {permission}
                    </label>
                  </li>
                ))}
            </ul>
          )}

          {/* <label className="block text-sm font-semibold mb-1">
            Add New Permissions
          </label>
          <select
            id="permissions"
            value={selectedPermission}
            onChange={handleDropdownChange}
            className="bg-white border border-gray-300 rounded-[32px] text-sm focus:ring-[#ED1450] focus:border-[#ED1450] block w-full p-2.5"
          >
            <option value="" disabled>
              Choose Permission
            </option>
            {permissions.map((permission, index) => (
              <option key={index} value={permission}>
                {permission}
              </option>
            ))}
            <option value="Custom Permission">Custom Permission</option>
          </select> */}
        </div>

        <div className="flex justify-between items-center w-full space-x-2">
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
