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
import Pagination from "../components/pagination";

export default function AdminPermissions() {
  const [loading, setLoading] = useState(false);
  const [permissionList, setPermissionList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = permissionList.slice(startIndex, lastIndex);
  const totalPages = Math.ceil(permissionList.length / recordsPerPage);

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
         <div className="flex items-center justify-center h-[50vh]">
         {/* Spinner for the loading state */}
         <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
       </div>
      ) : (
        <div className="flex flex-col h-full px-3 space-y-4">
          {/* Header with Back Button */}

          <div className="flex items-center justify-between mb-4 font-Manrope">
            <div className="flex items-center space-x-2">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="text-[#ED1450] hover:underline text-base font-normal"
              >
                &lt; Back
              </button>
              <h3 className="text-xl font-bold text-black md:text-2xl">
                Permissions
              </h3>
            </div>
          </div>

          <div className="flex justify-end w-full">
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
              {records &&
                records.map &&
                records.map((permission, index) => (
                  <tr key={index} className="text-sm border-t">
                    <td className="p-4 font-semibold text-[#5F6D7E]">
                      {index + 1}
                    </td>
                    <td className="p-4 font-semibold">
                      {permission.name}
                    </td>
                    <td className="flex items-center gap-2 p-4 font-semibold">
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

          <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

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
