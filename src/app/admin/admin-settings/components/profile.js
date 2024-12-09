import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Saved Data:", formData); // Logs data to the console
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-row items-center justify-between sapce-x-4 gap-4 border-b pb-4">
        <div className="space-y-3">
          <h3 className="text-[18px] md:text-[18px] font-bold text-black">
            Personal info
          </h3>
          <p className="text-gray-600 text-sm md:text-sm">
            Update your photo and personal details here.
          </p>
        </div>
        {/* Buttons */}
        <div className="space-x-4">
          {isEditing ? (
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={handleCancel}
                className="bg-white text-gray-800 px-[20px] py-[8px] text-sm font-medium rounded-[32px] hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#ED1450] text-white px-[30px] py-[10px] text-sm font-medium rounded-[32px] hover:bg-[#d01245] focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-[#ED1450] text-white px-[30px] py-[10px] text-sm font-medium rounded-[32px] hover:bg-[#d01245] focus:outline-none focus:ring-2 focus:ring-[#ED1450]"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4 pt-3 w-full md:w-[100%] max-w-full">
        {/* First Name */}
        <div className="flex flex-col w-full">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter First Name"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter Last Name"
          />
        </div>

        {/* Middle Name */}
        <div className="flex flex-col">
          <label htmlFor="middleName" className="text-sm font-medium text-gray-700 mb-1">
            Middle Name
          </label>
          <input
            id="middleName"
            type="text"
            value={formData.middleName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter Middle Name"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter Email Address"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter Phone Number"
          />
        </div>
      </form>
    </div>
  );
}
