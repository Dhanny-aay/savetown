import React, { useState } from "react";
import { pushNotificationsCreate } from "../../adminControllers/pushController";

const CreateNotificationModal = ({ onClose,onPermissionChange}) => {
  const [createNotification, setCreateNotification] = useState({
    title: "",
    body: "",
    scheduled_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateNotification((prevState) => ({
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
    const newNotification = {
      id: createNotification.length + 1,
      ...createNotification,
    };
    let newNotif = newNotification;
    await pushNotificationsCreate(
      {  title: `${newNotif.title}`,
        body: `${newNotif.body}`,
        deep_link: "est",
        scheduled_time: "et",
        scheduled_date: `${newNotif.scheduled_date}`,
        timezone: "Antarctica/Mawson",
        active: false, },
      (response) => {
        console.log("i am successful", response);
      },
      (err) => {
        console.error("unable to create notification", err);
      }
    );
    onClose(false);
    onPermissionChange();
  };
  
  return (
    <div
      className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold font-Manrope">
          Add New Notification
        </h2>

        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={createNotification.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Body Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Body</label>
          <textarea
            placeholder="Enter Body"
            name="body"
            value={createNotification.body || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32 resize-none"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input
            type="date"
            name="scheduled_date"
            value={formatDate(createNotification.scheduled_date) || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center w-full space-x-2">
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNotificationModal;
