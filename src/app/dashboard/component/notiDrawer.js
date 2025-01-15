import { useEffect, useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import settings from "./assets/settings.svg";
import bell from "./assets/bell.svg";
import NotiSettings from "./notiSettings";
import { handleGetUserNotification } from "@/app/userControllers/profileController";

export default function NotiDrawer({ onClose, isVisible }) {
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // Filter state: All, Today, This Week, Older

  const fetchNoti = async () => {
    setLoading(true);
    try {
      const data = await handleGetUserNotification();
      if (data) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.log("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoti();
  }, []);

  const goToNotifications = () => {
    setShowSettings(false);
  };

  // Function to filter notifications
  const filterNotifications = (filterType) => {
    setFilter(filterType);

    if (filterType === "All") {
      setFilteredNotifications(notifications);
    } else if (filterType === "Today") {
      const today = new Date().toISOString().split("T")[0];
      setFilteredNotifications(
        notifications.filter((noti) => noti.created_at.startsWith(today))
      );
    } else if (filterType === "This Week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date();
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      setFilteredNotifications(
        notifications.filter((noti) => {
          const notiDate = new Date(noti.created_at);
          return notiDate >= startOfWeek && notiDate <= endOfWeek;
        })
      );
    } else if (filterType === "Older") {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      setFilteredNotifications(
        notifications.filter((noti) => new Date(noti.created_at) < startOfWeek)
      );
    }
  };

  useEffect(() => {
    filterNotifications(filter);
  }, [notifications]);

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-4 md:px-6 border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {showSettings ? (
          <NotiSettings goBack={goToNotifications} />
        ) : (
          <>
            <img
              src={ArrowRightBlk.src}
              className="cursor-pointer"
              alt="Back"
              onClick={onClose}
            />

            <div className="w-full flex items-center justify-between mt-9">
              <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C]">
                Notifications
              </h3>
              <img
                src={settings.src}
                className="cursor-pointer w-5 md:w-auto"
                alt="Settings"
                onClick={() => setShowSettings(true)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-start space-x-4 mt-6">
              {["All", "Today", "This Week", "Older"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => filterNotifications(filterType)}
                  className={`px-4 py-2 rounded-full ${
                    filter === filterType
                      ? "bg-[#FDE8EE] text-[#ED1450] font-bold"
                      : "bg-[#F3F0E9] text-[#000000B2]"
                  } font-Manrope font-medium text-sm`}
                >
                  {filterType}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="w-full mt-16 flex items-center justify-center">
                <p className="text-center text-body16Regular font-Manrope text-[#666666]">
                  Loading notifications...
                </p>
              </div>
            ) : filteredNotifications.length > 0 ? (
              <ul className="mt-8 space-y-4">
                {filteredNotifications.map((noti) => (
                  <li
                    key={noti.id}
                    className="flex items-start justify-between bg-[#F8F9FA] p-4 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="text-body14Regular font-Manrope font-medium text-[#262626]">
                        {noti.data.comment.body}
                      </p>
                      <p className="text-body12Regular font-Manrope text-[#666666] mt-2">
                        {new Date(noti.created_at).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full mt-16 flex items-center flex-col justify-center">
                <img src={bell.src} alt="No notifications" />
                <h6 className="text-center text-body16Regular font-Manrope text-[#666666] mt-6">
                  No notifications yet
                </h6>
                <p className="text-body12Regular font-Manrope text-[#666666] mt-2 text-center">
                  Your notifications will appear here
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
