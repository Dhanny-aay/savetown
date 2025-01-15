"use client";
import { useState, useEffect } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import { useUserContext } from "../UserContext";
import { handleUpdateProfile } from "@/app/userControllers/profileController";
import load from "./assets/load.gif";
import { useSnackbar } from "notistack";

export default function NotiSettings({ goBack }) {
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userProfile, triggerFetchProfile } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  // Initialize states based on userProfile
  useEffect(() => {
    if (userProfile) {
      setIsActive1(userProfile.email_marketing_notifications === 1);
      setIsActive2(userProfile.finance_tips === 1);
    }
  }, [userProfile]);

  // Toggle handlers
  const handleToggle1 = () => {
    setIsActive1(!isActive1);
  };

  const handleToggle2 = () => {
    setIsActive2(!isActive2);
  };

  const onSuccess = () => {
    triggerFetchProfile(); // Refresh profile after update
    setLoading(false);
    enqueueSnackbar("Notification settings updated successfully!", {
      variant: "success",
    });
  };

  const onError = () => {
    setLoading(false);
    enqueueSnackbar(
      "Failed to update notification settings. Please try again.",
      {
        variant: "error",
      }
    );
  };

  // Save changes and send only modified fields
  const handleSave = (e) => {
    e.preventDefault();

    const updatedFields = {};
    if (userProfile.email_marketing_notifications !== (isActive1 ? 1 : 0)) {
      updatedFields.email_marketing_notifications = isActive1 ? 1 : 0;
    }
    if (userProfile.finance_tips !== (isActive2 ? 1 : 0)) {
      updatedFields.finance_tips = isActive2 ? 1 : 0;
    }

    if (Object.keys(updatedFields).length > 0) {
      setLoading(true); // Show loading state
      handleUpdateProfile(updatedFields, onSuccess, onError);
    } else {
      enqueueSnackbar("No changes to save.", { variant: "info" });
    }
  };

  return (
    <>
      <img
        src={ArrowRightBlk.src}
        onClick={goBack}
        className="cursor-pointer"
        alt=""
      />
      <div className="w-full flex items-center justify-between mt-9">
        <h3 className="text-h5 font-Manrope font-bold text-[#595A5C]">
          Notification Settings
        </h3>
      </div>
      <div className="w-full mt-8">
        {/* Email Marketing Notifications */}
        <div className="w-full flex items-center justify-between">
          <div>
            <h6 className="text-base font-Manrope font-semibold text-[#000000]">
              Email marketing notifications
            </h6>
            <p className="mt-2 text-[#595A5C] text-body14Medium">
              Receive offers and news via email
            </p>
          </div>
          <div
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isActive1 ? "bg-[#8133F1]" : "bg-gray-300"
            }`}
            onClick={handleToggle1}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                isActive1 ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>

        {/* Personalized and Recommended */}
        <div className="w-full flex items-center justify-between mt-5">
          <div>
            <h6 className="text-base font-Manrope font-semibold text-[#000000]">
              Personalized and recommended
            </h6>
            <p className="mt-2 text-[#595A5C] text-body14Medium">
              Receive personalized financial tips
            </p>
          </div>
          <div
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isActive2 ? "bg-[#8133F1]" : "bg-gray-300"
            }`}
            onClick={handleToggle2}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                isActive2 ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Save Button or Loading GIF */}

      <button
        onClick={handleSave}
        className="bg-[#8133F1] text-white py-2 px-4 rounded-md text-xs font-Manrope font-normal mt-4 ml-auto flex items-center justify-center"
      >
        {loading ? (
          <img src={load.src} alt="Loading..." className="w-4 h-4" />
        ) : (
          "Save Changes"
        )}
      </button>
    </>
  );
}
