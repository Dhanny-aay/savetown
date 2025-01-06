"use client";
import Image from "next/image";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";
import { useEffect, useState } from "react";
import CreateNotificationModal from "./createNotificationModal";
import { pushNotificationsDisplay } from "./../../adminControllers/pushController";
import EditNotificationModal from "./editNotificationModal";

export default function Pending() {
  const [notificationList, setNotificationList] = useState({
    id: null,
    title: "",
    body: "",
    scheduled_date: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refresh,setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  

  if (loading) return <div>Loading notifications...</div>; // Loading state

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>} {/* Error message */}
      {showCreateModal ? (
        <CreateNotificationModal
          onClose={setShowCreateModal}
          onPermissionChange={() => setRefresh(!refresh)}
        />
      ) : null}
      {showEditModal ? (
        <EditNotificationModal notifInfo={selectedUser} onClose={setShowEditModal} />
      ) : null}
      {/* Button container */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-2 bg-[#ED1450] text-white rounded-full font-Manrope"
        >
          {"\u002B"} Add new Notification
        </button>
      </div>
      <table className="verflow-auto w-full md:h-[100%] text-left font-Manrope">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4">Title</th>
            <th className="p-4">Body</th>
            <th className="p-4">Date</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {notificationList.length > 0 ? (
            notificationList.map((notifs, index) => (
              <tr key={notifs.id || index} className="border-t text-sm">
                <td className="p-4 text-gray-500">{index + 1}</td>
                <td className="p-4">{notifs.title}</td>
                <td className="p-4 text-gray-500">{notifs.body}</td>
                <td className="p-4 text-gray-500">{formatDateTime(notifs.scheduled_date)}</td>
                <td className="p-4 flex items-center justify-center gap-2">
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
                  <button className="text-gray-500 hover:text-gray-800">
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
    </div>
  );
}
