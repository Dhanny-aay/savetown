"use client";
import { useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import load from "./assets/load.gif";
import { handleCreateGroup } from "@/app/userControllers/groupController";
import { useSnackbar } from "notistack";
import { useUserContext } from "../UserContext";

export default function GroupDrawer({ isVisible, onClose, triggerFetch }) {
  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target_amount, setTarget_amount] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { triggerFetchProfile } = useUserContext();

  // Regex for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle input key press (e.g., Enter key, comma, or space to add email)
  const handleKeyDown = (e) => {
    if (["Enter", ",", " "].includes(e.key)) {
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

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const intValue = rawValue ? parseInt(rawValue, 10) : "";
    setTarget_amount(intValue);
  };

  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00"; // Handle 0, null, and undefined
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const validateFields = () => {
    const newErrors = {};
    if (!target_amount || target_amount <= 0)
      newErrors.target_amount = "Valid target amount is required";
    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // console.log(emails);

  const onSuccess = (response) => {
    setLoadingCreate(false);
    triggerFetch();
    triggerFetchProfile();
    enqueueSnackbar("Group Created", {
      variant: "success",
    });
    onClose();
    //  setConversion(response.data);
  };

  const onError = () => {
    setLoadingCreate(false);
    enqueueSnackbar("Failed to create group", {
      variant: "error",
    });
  };

  const handleCreate = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoadingCreate(true);
      const userData = { name, description, target_amount, members: emails };
      handleCreateGroup(userData, onSuccess, onError);
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
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-4 md:px-6 plansbg border ml-auto overflow-auto border-[#D5D7DA] relative "
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <div className=" w-full overflow-y-auto pb-20 h-full px-3">
          <img
            src={ArrowRightBlk.src}
            className="cursor-pointer"
            alt=""
            onClick={onClose}
          />

          <h3 className=" text-h55 md:text-h5 font-Manrope font-bold text-[#000] mt-9">
            Create Group Savings
          </h3>

          <div className="mt-9">
            <label>What will you like to call it?</label>
            <div className="mt-2 flex items-center ">
              <input
                type="text"
                placeholder="Enter Group Name"
                name=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
            </div>
            {errors.name && (
              <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                {errors.name}
              </span>
            )}
          </div>
          <div className=" mt-4">
            <label>Group description</label>
            <div className="mt-2 flex items-center ">
              <input
                type="text"
                placeholder="Enter Group description"
                name=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
            </div>
            {errors.description && (
              <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                {errors.description}
              </span>
            )}
          </div>
          <div className=" mt-4">
            <label>What is your target amount?</label>
            <div className="mt-2 flex items-center ">
              <input
                placeholder="Enter target amount"
                name=""
                value={formatWithCommas(target_amount)}
                type="text"
                onChange={handleAmountChange}
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
            </div>
            {errors.target_amount && (
              <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                {errors.target_amount}
              </span>
            )}
          </div>

          <div className="mt-4">
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
          </div>
        </div>

        {/* Fixed Navigation Buttons */}
        <div className="absolute bottom-0 left-0 w-full bg-white py-4 px-6 border-t border-gray-200">
          <button
            onClick={handleCreate}
            disabled={loadingCreate}
            className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
          >
            {loadingCreate ? (
              <img src={load.src} className="w-5" alt="" />
            ) : (
              "Create group"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
