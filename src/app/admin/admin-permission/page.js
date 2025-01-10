"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { permissionsDisplay } from "../adminControllers/permissionController";
import Image from "next/image";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import CreatePermissionsModal from "./components/createPermission";
// import DeletePermissionsModal from "../admin-push/components/deletePermission";
import EditPermissionsModal from "./components/editPermissions";
import DeletePermissionsModal from "./components/deletePermissions";

export default function AdminPermissions() {
  const [loading, setLoading] = useState(false);
  const [permissionList, setPermissionList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const displayPermissions = async () => {
    setLoading(true);
    const response = await permissionsDisplay({});
    setPermissionList(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    displayPermissions();
  }, [refresh]);

  const router = useRouter();

  const handleDeleteModal = (userId) => {
    setShowDeleteModal(true);
    setSelectedUser(userId);
  };

  const openEditModal = (permission) => {
    setShowEditModal(true);
    setSelectedUser(permission);
  };

  return (
    <>
      {loading ? (
        <div> Loading permissions....</div>
      ) : (
        <div className="flex flex-col px-3 h-full space-y-4">
          {/* Header with Back Button */}

          <div className="flex justify-between items-center mb-4 font-Manrope">
            <div className="flex items-center space-x-2">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="text-[#ED1450] hover:underline text-base font-normal"
              >
                &lt; Back
              </button>
              <h3 className="text-xl md:text-2xl font-bold text-black">
                Permissions
              </h3>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-[#ED1450] text-white text-sm md:text-base rounded-full font-Manrope"
            >
              {"\u002B"} Add new Permission
            </button>
          </div>

          {/* Table */}
          <table className="w-full mt-4 bg-white rounded font-Manrope">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4 font-semibold">S/N</th>
                <th className="p-4 font-semibold">Names</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {!permissionList || permissionList.length === 0 ? (
                <div className="text-center text-[#5F6D7E]">
                  No permissions available to display.
                </div>
              ) : null}
              {permissionList &&
                permissionList.map &&
                permissionList.map((permission) => (
                  <tr key={permission.id} className="border-t text-sm">
                    <td className="p-4 font-semibold text-[#5F6D7E]">
                      {permission.id}
                    </td>
                    <td className="p-4  font-semibold">
                      {permission.name}
                    </td>
                    <td className="p-4 font-semibold flex items-center gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(permission)}
                        className="text-[#5F6D7E] hover:text-gray-800"
                      >
                        <Image
                          src={edit.src}
                          alt="Edit Icon"
                          width={20}
                          height={20}
                          priority
                        />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteModal(permission.id)}
                        className="text-[#5F6D7E] hover:text-gray-800"
                      >
                        <Image
                          src={trash.src}
                          alt="Delete Icon"
                          width={20}
                          height={20}
                          priority
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {showModal && (
            <CreatePermissionsModal
              onClose={setShowModal}
              onPermissionChange={() => setRefresh(!refresh)}
            />
          )}
          {showEditModal && (
            <EditPermissionsModal
              onClose={setShowEditModal}
              permission={selectedUser}
              onPermissionChange={() => setRefresh(!refresh)}
            />
          )}
          {showDeleteModal && (
            <DeletePermissionsModal
              onClose={setShowDeleteModal}
              setUser={selectedUser}
              onPermissionChange={() => setRefresh(!refresh)}
            />
          )}
        </div>
      )}
    </>
  );
}
