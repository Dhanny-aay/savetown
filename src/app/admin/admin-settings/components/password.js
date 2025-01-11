import { changePassword } from "../../adminControllers/settingsController";
import { useState } from "react";

export default function Password() {
  const [passwordData, setPasswordData] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) {
      errors.length = "Password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = "Password must contain at least one lowercase letter.";
    }
    if (!/[\W_]/.test(password)) {
      errors.symbol = "Password must contain at least one symbol.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));

    if (name === "new") {
      const newErrors = validatePassword(value);
      setErrors(newErrors);
      setIsSaveEnabled(
        Object.keys(newErrors).length === 0 && value === passwordData.confirm
      );
    }

    if (name === "confirm") {
      setIsSaveEnabled(
        Object.keys(errors).length === 0 && value === passwordData.new
      );
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("You have successfully changed your password", passwordData);

    await changePassword(
      {
        current_password: passwordData.old,
        password: passwordData.new,
      },
      (response) => {
        console.log(response);
        alert("You have successfully changed your password");
      },
      (err) => {
        console.error("Unable to change password", err);
      }
    );

    setPasswordData({ old: "", new: "", confirm: "" });
    setIsSaveEnabled(false);
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isSaveEnabled) {
      handleSave(e);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between border-b pb-4">
        <div className="space-y-3 ">
          <h3 className="text-[18px] md:text-[18px] font-bold text-black">
            Password
          </h3>
          <p className="text-gray-600 text-sm md:text-sm">
            Update your password here.
          </p>
        </div>
        <div className="space-x-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 px-[30px] py-[10px] text-sm font-medium border border-gray-300 rounded-[32px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSave}
            disabled={!isSaveEnabled}
            className={`${
              isSaveEnabled ? "bg-[#ED1450] hover:bg-[#d01245]" : "bg-gray-400"
            } text-white px-[30px] py-[10px] text-sm font-medium rounded-[32px] focus:outline-none focus:ring-2`}
          >
            Save
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        onKeyDown={handleKeyDown}
        className="space-y-4 w-full pt-3 md:w-[100%] max-w-full"
      >
        <div className="flex flex-col w-full">
          <label
            htmlFor="old-password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Enter Old Password
          </label>
          <input
            name="old"
            id="old-password"
            type="password"
            value={passwordData.old}
            onChange={handleChange}
            className="w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
            placeholder="Enter Old Password"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="new-password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Enter New Password
          </label>
          <input
            name="new"
            id="new-password"
            type="password"
            value={passwordData.new}
            onChange={handleChange}
            className="w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
            placeholder="Enter New Password"
          />
          {Object.values(errors).map((error, index) => (
            <div key={index} className="text-red-600 text-sm">
              {error}
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <input
            name="confirm"
            id="confirm-password"
            type="password"
            value={passwordData.confirm}
            onChange={handleChange}
            className="w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
            placeholder="Confirm New Password"
          />
          {passwordData.new !== passwordData.confirm && (
            <div className="text-red-600 text-sm">Passwords do not match</div>
          )}
        </div>
      </form>
    </div>
  );
}
