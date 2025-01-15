"use client";
import { useState, useEffect } from "react";
import search from "./assets/search.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import Image from "next/image";
import { adminDisplay, } from "../adminControllers/adminController";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import CreateAdminModal from "./components/createAdminModal";

export default function Admin() {
  const [admin, setAdmin] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editAdmin, setEditAdmin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch admin data on component load

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true); // Start loading
      setErrorMessage(""); // Reset error message
      try {
        const response = await adminDisplay({});
        const admins = response?.data || [];
        setAdmin(admins);
        setFilteredAdmins(admins);
        if (!response?.data || response?.data.length === 0) {
          setError("No admin available.");
        }
      } catch (error) {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchAdminData();
  }, []);

  const handleAddAdmin = async (e) => {
    if (newAdmin.name && newAdmin.email) {
      e.preventDefault();
      const newAdmins = [
        ...admin,
        {
          id: admin.length + 1,
          name: newAdmin.name,
          email: newAdmin.email,
          password: newAdmin.password,
        },
      ];
      createAdmin(
        {
          first_name: "hokz",
          last_name: "lfqpjtjmvwz",
          email: "watsica.penelope@example.net",
          password: "cY+{B8_A)rK]<;U!SLt>",
          password_confirmation: "cY+{B8_A)rK]<;U!SLt>",
          is_active: true,
          roles: ["quis"],
          permissions: ["emfjfnoni"],
        },
        (response) => {
          console.log(response);
          if (response?.status === 200) {
            console.log("admin created successfully");
          }
        },
        (error) => {
          setErrorMessage("Failed to save admin. Please try again.");
        }
      );
      setAdmin(newAdmins);
      setFilteredAdmins(newAdmins);
      setNewAdmin({ name: "", email: "", password: "" });
      setShowModal(false);
    }
  };

  const handleEditAdmin = () => {
    if (editAdmin) {
      const updatedAdmins = admin.map((user) =>
        user.id === editAdmin.id ? editAdmin : user
      );
      setAdmin(updatedAdmins);
      setFilteredAdmins(updatedAdmins);
      setShowEditModal(false);
    }
  };

  const handleDeleteAdmin = (id) => {
    const updatedAdmins = admin.filter((user) => user.id !== id);
    setAdmin(updatedAdmins);
    setFilteredAdmins(updatedAdmins);
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const results = admin.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredAdmins(results);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const openEditModal = (user) => {
    setEditAdmin(user);
    setShowEditModal(true);
  };

  const router = useRouter();

  return (
    <div className="flex flex-col px-3 h-full space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          <button onClick={()=>router.back()} className="text-[#ED1450] hover:underline text-base font-normal">
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">Admin</h3>
        </div>
      </div>

      {/* Search and Add New Admin */}
      <div className="mb-4">
        <div className="flex flex-col md:flex-row w-full">

          <div className="flex items-center space-x-4 md:w-1/2">
            <div className="relative w-full font-Manrope">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-6 py-2 pl-10 border text-sm md:text-base border-gray-300 rounded-full"
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
              className="px-6 py-2 bg-[#ED1450] text-sm md:text-base text-white rounded-full font-Manrope"
            >
              Search
            </button>
          </div>

          <div className="md:w-1/2 flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-[#ED1450] text-white text-sm md:text-base rounded-full font-Manrope"
            >
              {"\u002B"} Add new Admin
            </button>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      {loading ? (
        <div className="text-center text-gray-500">Loading admins...</div>
      ) : errorMessage ? (
        <div className="text-center text-red-500">{errorMessage}</div>
      ) : filteredAdmins.length === 0 ? (
        <div className="text-center text-gray-500">
          No admins available to display.
        </div>
      ) : (
        <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-4 w-[64px] font-semibold text-sm md:text-base">S/N</th>
              <th className="p-4 font-semibold text-sm md:text-base">Names</th>
              <th className="p-4 font-semibold text-sm md:text-base">Email Address</th>
              <th className="p-4 font-semibold text-sm md:text-base text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((user, index) => (
              <tr key={user.id} className="border-t">
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {index + 1}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {user.first_name} {user.last_name}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {user.email}
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
                    onClick={() => handleDeleteAdmin(user.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <Image
                      src={trash.src}
                      alt="delete icon"
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
      )}

      {/* Add Admin Modal */}
      {showModal && ( <CreateAdminModal onClose={setShowModal}/> )}

      {/* Edit Admin Modal */}
      {showEditModal && editAdmin && (
        <div
          className="fixed inset-0 z-[999] top-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold font-Manrope">Edit Admin</h2>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Admin Name
              </label>
              <input
                type="text"
                value={editAdmin.name}
                onChange={(e) =>
                  setEditAdmin({ ...editAdmin, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={editAdmin.email}
                onChange={(e) =>
                  setEditAdmin({ ...editAdmin, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                value={editAdmin.password}
                onChange={(e) =>
                  setEditAdmin({ ...editAdmin, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
              />
            </div>
            <div className="flex justify-between items-center w-full space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-[18px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
              >
                Cancel
              </button>
              <button
                onClick={handleEditAdmin}
                className="px-3 py-[18px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
