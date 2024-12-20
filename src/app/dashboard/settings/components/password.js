"use client";
import load from "./assets/load.gif";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { handleUpdatePassword } from "@/app/userControllers/profileController";

export default function Password() {
  const [loading, setLoading] = useState(false);
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!current_password)
      newErrors.current_password = "Current password is required";

    if (!password) {
      newErrors.password = "New password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  const onSuccess = (response) => {
    setLoading(false);
    // enqueueSnackbar("Password changed successfully", {
    //   variant: "success",
    // });
    // Reset states after successful password change
    setCurrent_password("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const onError = () => {
    setLoading(false);
    // enqueueSnackbar("Failed to change password", { variant: "error" });
  };

  const handleSend = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoading(true);
      const userData = {
        current_password,
        password,
      };
      handleUpdatePassword(userData, onSuccess, onError);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between pb-5 border-b border-[#E4E7EC]">
        <div>
          <h3 className="text-body16Bold font-Manrope text-[#595A5C]">
            Password
          </h3>
          <p className="text-body12Regular font-Manrope text-[#475467] mt-1">
            Update your password here.
          </p>
        </div>
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 px-6 flex items-center justify-center text-body14SemiBold font-Manrope text-white"
        >
          {loading ? <img src={load.src} className="w-4" alt="" /> : "Save"}
        </button>
      </div>

      <div className="w-full mt-6">
        <div className="w-full">
          <label>Current Password</label>
          <div className="mt-2 flex flex-col">
            <input
              type="password"
              placeholder="Enter Current Password"
              value={current_password}
              onChange={(e) => setCurrent_password(e.target.value)}
              className={`w-full border rounded-[32px] px-6 py-3 text-body14Regular font-Manrope ${
                errors.current_password
                  ? "border-[#DC3545]"
                  : "border-[#D5D7DA]"
              }`}
            />
            {errors.current_password && (
              <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                {errors.current_password}
              </span>
            )}
          </div>
        </div>

        <div className="w-full mt-4">
          <label>New Password</label>
          <div className="mt-2 flex flex-col">
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-[32px] px-6 py-3 text-body14Regular font-Manrope ${
                errors.password ? "border-[#DC3545]" : "border-[#D5D7DA]"
              }`}
            />
            {errors.password && (
              <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                {errors.password}
              </span>
            )}
          </div>
        </div>

        <div className="w-full mt-4">
          <label>Confirm New Password</label>
          <div className="mt-2 flex flex-col">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full border rounded-[32px] px-6 py-3 text-body14Regular font-Manrope ${
                errors.confirmPassword ? "border-[#DC3545]" : "border-[#D5D7DA]"
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                {errors.confirmPassword}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
