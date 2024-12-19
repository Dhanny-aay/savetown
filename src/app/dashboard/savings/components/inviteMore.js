"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import load from "./assets/load.gif";
import { handleUpdateGroups } from "@/app/userControllers/groupController";
import { useSnackbar } from "notistack";

export default function InviteMore({
  onClose,
  isVisible,
  selectedID,
  triggerFetch,
}) {
  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  // Regex for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle input key press (e.g., Enter key to add email)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (emailRegex.test(inputValue.trim())) {
        setEmails([...emails, inputValue.trim()]);
        setInputValue(""); // Clear the input field
      }
    }
  };

  // Remove an email by index
  const removeEmail = (indexToRemove) => {
    setEmails(emails.filter((_, index) => index !== indexToRemove));
  };

  const validateFields = () => {
    const newErrors = {};
    if (emails.length === 0)
      newErrors.emails = "At least one email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    triggerFetch();
    enqueueSnackbar("Group updated successfully!", { variant: "success" });
    onClose();
  };

  const onError = (error) => {
    setLoading(false);
    enqueueSnackbar("Group update failed. Please try again.", {
      variant: "error",
    });
  };

  const handleSave = () => {
    if (validateFields()) {
      setLoading(true);
      const userData = { members: emails };
      handleUpdateGroups(selectedID, userData, onSuccess, onError);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <h3 className="text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
          Invite more friends
        </h3>
        <div className="mt-6">
          <label>Send your friends an email to join the group?</label>
          {/* <textarea
              placeholder="Enter other information"
              rows={6}
              className="w-full border border-[#D5D7DA] rounded-[8px] mt-2 text-body14Regular font-Manrope px-6 py-4"
            ></textarea> */}
          <div className="w-full border border-[#D5D7DA] rounded-[8px] mt-2 text-body14Regular font-Manrope px-6 py-4 ">
            <div className=" w-full">
              <div className="flex flex-wrap gap-2">
                {emails.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#F2F3F4] p-3 rounded-[6px]"
                  >
                    <span className="mr-2 text-[#595A5C] font-Manrope text-body14SemiBold">
                      {email}
                    </span>
                    <button
                      className="text-[#595A5C] font-bold text-xs"
                      onClick={() => removeEmail(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type email and press Enter or use a comma as a seperator..."
                className="block w-full mt-5 outline-none"
              />
            </div>
          </div>
          {errors.emails && (
            <span className="text-[#DC3545] text-xs font-Manrope mt-2">
              {errors.emails}
            </span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
        >
          {loading ? <img src={load.src} className="w-5" alt="" /> : "Send"}
        </button>
      </div>
    </div>
  );
}
