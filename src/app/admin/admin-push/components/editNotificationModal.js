import React, { useState } from "react";
import { editNotifications } from "../../adminControllers/pushController";

const EditNotificationModal = ({ onClose, notifInfo }) => {
  const [editNotification, setEditNotification] = useState({
    ...notifInfo
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditNotification((prevState) => ({
      ...prevState, 
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined date
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSaveNotification = async () => {
    setLoading(true)
    const newNotif = {
      ...editNotification,
    };
    // console.log(newNotif);
    let id = newNotif.id;
    await editNotifications(
      `${id}`,
      {
        body: `${newNotif.body}`,
        name: `${newNotif.title}`,
        permissions: [
          'yjpmploygzyxi'
        ],
      },
      (response) => {
        setLoading(false)
        // console.log("I am successful", response);
      },
      (err) => {
        console.error("Unable to create notification", err);
      }
    );
    onClose(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveNotification(); // Trigger save when Enter is pressed
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[600px] max-md:mx-5 space-y-5 font-Manrope"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold font-Manrope">
          Edit Notification
        </h2>

        {/* Title Input */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={editNotification.title}
            onChange={handleChange}
            onKeyPress={handleKeyPress} // Trigger save on Enter
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Body Input */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Body</label>
          <textarea
            placeholder="Enter Body"
            name="body"
            value={editNotification.body}
            onChange={handleChange}
            onKeyPress={handleKeyPress} // Trigger save on Enter
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Date</label>
          <input
            type="date"
            name="scheduled_date"
            value={formatDate(notifInfo.scheduled_date)}
            onChange={handleChange}
            onKeyPress={handleKeyPress} // Trigger save on Enter
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between w-full space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-2 w-1/2 border bg-white border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveNotification}
            className="px-3 py-2 w-1/2 bg-[#ED1450] text-white rounded-[32px]"
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

export default EditNotificationModal;
