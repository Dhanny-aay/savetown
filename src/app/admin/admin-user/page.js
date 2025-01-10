"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import search from "../admin-transactions/assets/search.svg";
import edit from "./assets/edit.svg";
import eye from "./assets/eye.svg";
import trash from "./assets/trash.svg";
import { fetchUsers } from "../adminControllers/usersController";
import EditUserModal from "./components/editUserModal";
import DeleteUserModal from "./components/deleteUserModal";
import { useRouter } from "next/navigation";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Fetch users on component mount
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await fetchUsers(
        { page: 1, limit: 10 },
        (response) => {
          setUsers(response?.data || []);
          setFilteredUsers(response?.data || []);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching users:", err);
          setError("Failed to load users. Please try again.");
          setLoading(false);
        }
      );
    };

    fetchData();
  }, []);

  // Handle search query update
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users); // Reset to full data when search query is empty
    } else {
      setFilteredUsers(
        users.filter((user) =>
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  // Trigger search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const showUserInfo = (userId) => {
    router.push(`/admin/admin-user/user-profile?userid=${userId}`);
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      {/* Edit Modal */}
      {showEditModal && (
        <EditUserModal user={selectedUser} onClose={() => setShowEditModal(false)} />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteUserModal user={selectedUser} onClose={() => setShowDeleteModal(false)} />
      )}

      <div className="flex flex-col px-3 h-full space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 font-Manrope">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => router.back()}
              className="text-[#ED1450] hover:underline text-base font-normal"
            >
              &lt; Back
            </button>
            <h3 className="text-xl md:text-2xl font-bold text-black">
              User Management
            </h3>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-full font-Manrope">
              <input
                type="text"
                placeholder="Search by User Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-6 py-2 pl-10 border border-gray-300 rounded-full"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Image
                  src={search.src}
                  alt="search icon"
                  width={16}
                  height={16}
                  priority
                />
              </span>
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-[#ED1450] text-white rounded-full font-Manrope"
            >
              Search
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-auto w-full md:h-[100%]">
          <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4 w-[64px] font-semibold">S/N</th>
                <th className="p-4 font-semibold">Names</th>
                <th className="p-4 font-semibold max-lg:hidden">Email Address</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center hidden lg:visible">
                  Date Joined
                </th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-t">
                  <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                    {index + 1}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                    <div className="max-lg:flex max-lg:flex-col">
                      {user.first_name} {user.last_name}
                      <span className=" text-[#5F6D7E] text-sm font-medium md:hidden">
                        {user.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-medium max-lg:hidden">
                    {user.email}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                    {user.role || "-"}
                  </td>
                  <td className="p-4 text-center">
                    <div className="max-lg:flex max-lg:flex-col">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-normal font-Manrope ${
                          user.id_status === "verified"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-[#ED1450]"
                        }`}
                      >
                        {user.id_status}
                      </span>
                      <span className="text-[#5F6D7E] text-sm font-medium lg:hidden">
                        {" "}
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-medium hidden lg:visible">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      <Image
                        src={edit.src}
                        alt="edit icon"
                        width={20}
                        height={20}
                        priority
                      />
                    </button>
                    <button
                      onClick={() => showUserInfo(user.id)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      <Image
                        src={eye.src}
                        alt="eye icon"
                        width={20}
                        height={20}
                        priority
                      />
                    </button>
                    <button
                      onClick={() => openDeleteModal(user)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      <Image
                        src={trash.src}
                        alt="trash icon"
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
        </div>
      </div>
    </>
  );
}
