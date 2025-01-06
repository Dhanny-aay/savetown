import { useEffect, useState } from "react";
import {
  showSettings,
  updateSettings,
} from "../../adminControllers/settingsController";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);

  const displaySettings = async () => {
    setLoading(true);
    await showSettings(
      (response) => {
        setFormData(response?.data);
        setEditedData(response?.data);
        setLoading(false);
      },
      (err) => {
        console.error("unable to display details", err);
      }
    );
  };

  useEffect(() => {
    displaySettings();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(formData);
  };

  const handleSave = async () => {

    let id = formData.id;
    await updateSettings(
      `${id}`,
      {
        name: `${editedData.name}`,
        email: `${editedData.email}`,
        theme_color: "dtbncptunpd",
        logo: "govjulftzzmbnkkiaek",
        logo_href: "vwhxvrsqphoiaopeduuvekzto",
        currency: "ejwugcnrfteemn",
        phone: `${editedData.phone}`,
        timezone: "America/Bahia_Banderas",
        unsubscription_url:
          "http://www.hartmann.com/soluta-dignissimos-quia-minus-aut",
        privacy_policy_url:
          "https://johnston.com/voluptatem-doloribus-in-occaecati.html",
        help_center_url:
          "https://homenick.com/sapiente-voluptatem-blanditiis-vel-assumenda-libero-blanditiis-qui.html",
        address: "xrdyemelstyvguztcsq",
        description: "Sunt sit ea aperiam voluptas.",
        facebook: "ixah",
        twitter: "zvj",
        instagram: "jrh",
        youtube: "qqmuat",
        linkedin: "xjlzoumkhgmz",
        pinterest: "soezqdfsr",
        whatsapp: "kxkerwdykjgazanpfut",
        google_analytics: "jbysggjax",
        google_tag_manager: "rg",
        google_adsense: "nmhwls",
        google_map: "qfndoswqupgdlo",
        google_map_api_key: "xxmsrpqtahbvdrdxigwtdhot",
      },
      (response) => {
        if(response.status===200){
          console.log('Successfully edited');
        }
      },
      (err) => {
        console.error("unable to save details", err);
      }
    );
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
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
            Update your personal details here.
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
      {loading ? (
        <div>Getting details....</div>
      ) : (
        <form className="space-y-4 pt-3 w-full md:w-[100%] max-w-full">
          {/* First Name */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              {/* First Name */} Full Name
            </label>
            <input
              name="name"
              type="text"
              value={editedData.name || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Enter First Name"
            />
          </div>

          {/* Last Name */}
          {/* <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={editedData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter Last Name"
          />
        </div> */}

          {/* Middle Name */}
          {/* <div className="flex flex-col">
          <label htmlFor="middleName" className="text-sm font-medium text-gray-700 mb-1">
            Middle Name
          </label>
          <input
            id="middleName"
            type="text"
            value={editedData.middleName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter Middle Name"
          />
        </div> */}

          {/* Email Address */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={editedData.email || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#ED1450] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Enter Email Address"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={editedData.phone || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border rounded-[32px] px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ED1450] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Enter Phone Number"
            />
          </div>
        </form>
      )}
    </div>
  );
}
