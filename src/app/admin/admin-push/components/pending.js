"use client";
import Image from "next/image";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";
import { useEffect, useState } from "react";
import CreateNotificationModal from "./createNotificationModal";
import { pushNotificationsDisplay } from "./../../adminControllers/pushController";
import EditNotificationModal from "./editNotificationModal";
import DeleteNotificationsModal from "./deleteNotifications";
import Pagination from "../../components/pagination";

export default function Pending() {
  const [notificationList, setNotificationList] = useState([{
    id: null,
    title: "",
    body: "",
    scheduled_date: "",
  }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [refresh,setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = notificationList.slice(startIndex, lastIndex);
  const totalPages = Math.ceil(notificationList.length / recordsPerPage);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await pushNotificationsDisplay({});
      setNotificationList(response?.data || []);
      if (!response?.data || response?.data.length === 0) {
        setError("No notifications available.");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [refresh]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23", // 24-hour clock
    });
  }

  const openEditModal = (notif) =>{
    setShowEditModal(true)
    setSelectedUser(notif);
  }

  const openDeleteModal = (notif) =>{
    setShowDeleteModal(true)
    setSelectedUser(notif);
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        {/* Spinner for the loading state */}
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  } 

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>} 
      {showCreateModal ? (
        <CreateNotificationModal
          onClose={setShowCreateModal}
          onPermissionChange={() => setRefresh(!refresh)}
        />
      ) : null}
      {showEditModal ? (
        <EditNotificationModal notifInfo={selectedUser} onClose={setShowEditModal} />
      ) : null}
        {showDeleteModal ? (
        <DeleteNotificationsModal notifInfo={selectedUser} onClose={setShowDeleteModal}  onPermissionChange={() => setRefresh(!refresh)} />
      ) : null}
      {/* Button container */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-2 bg-[#ED1450] text-sm text-white rounded-full font-Manrope"
        >
          {"\u002B"} Add new Notification
        </button>
      </div>
      <table className="verflow-auto w-full md:h-[100%] text-left font-Manrope">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4">Title</th>
            <th className="hidden p-4 md:block">Body</th>
            <th className="p-4">Date</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {notificationList.length > 0 ? (
            records.map((notifs, index) => (
              <tr key={notifs.id || index} className="text-sm border-t">
                <td className="p-4 text-gray-500">{index + 1}</td>
                <td className="p-4">
                  <div className="flex flex-col justify-center">
                  {notifs.title}
                  <span className="text-gray-500 md:hidden">
                  {notifs.body}
                  </span>
                  </div>
                  </td>
                <td className="hidden p-4 text-gray-500 md:block">
                  {notifs.body}
                  </td>
                <td className="p-4 text-gray-500">{formatDateTime(notifs.scheduled_date)}</td>
                <td className="flex items-center justify-center gap-2 p-4">
                  <button onClick={() => openEditModal(notifs)}
                   className="text-gray-500 hover:text-gray-800">
                    <Image
                      src={edit.src}
                      alt="edit icon"
                      width={20}
                      height={20}
                      priority
                    />
                  </button>
                  <button onClick={() => openDeleteModal(notifs.id)}
                  className="text-gray-500 hover:text-gray-800">
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
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No notifications available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
        {/* ============pagination=============== */}
  <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
