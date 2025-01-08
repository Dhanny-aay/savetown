"use client";
import phone from "./assets/phone.svg";
import mail from "./assets/mail.svg";
import forward from "./assets/forward.svg";
import { useUserContext } from "../UserContext";
import { useState } from "react";
import load from "./assets/load.gif";
import { handleSupportRequest } from "@/app/userControllers/profileController";

export default function Page() {
  const { userProfile, loadingProfile } = useUserContext();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const email = userProfile?.email;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!subject) newErrors.subject = "Title is required";
    if (!body) newErrors.body = "Body is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  const onSuccess = (response) => {
    setLoading(false);
    setBody("");
    setSubject("");
    // Show success notification
    // enqueueSnackbar("Dinner Booked Successfully", { variant: "success" });
  };

  const onError = () => {
    setLoading(false);
    //  enqueueSnackbar("Dinner Booking Failed", { variant: "error" });
  };

  const handleSend = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoading(true);
      const userData = {
        email,
        subject,
        body,
      };
      handleSupportRequest(userData, onSuccess, onError);
    }
  };

  return (
    <>
      <h3 className=" text-h55 md:text-h5 font-Manrope font-bold text-[#000]">
        You can contact us via Email or Call Us
      </h3>
      <div className=" mt-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className=" border border-[#C2C4C6] rounded-[15px] px-6 py-3 flex items-center justify-between">
          <div className=" flex items-center space-x-4">
            <span className=" w-12 h-12 rounded-full flex items-center justify-center bg-[#F2F3F4]">
              <img src={phone.src} alt="" />
            </span>
            <div className="">
              <h6 className=" text-body14Medium font-Manrope text-black">
                Phone Number
              </h6>
              <p className=" font-Manrope text-body12Regular text-[#666666] mt-2 leading-none">
                O8116789053
              </p>
            </div>
          </div>
          <img src={forward.src} alt="" />
        </div>
        <div className=" border border-[#C2C4C6] rounded-[15px] px-6 py-3 flex items-center justify-between">
          <div className=" flex items-center space-x-4">
            <span className=" w-12 h-12 rounded-full flex items-center justify-center bg-[#F2F3F4]">
              <img src={mail.src} alt="" />
            </span>
            <div className="">
              <h6 className=" text-body14Medium font-Manrope text-black">
                Email Address
              </h6>
              <p className=" font-Manrope text-body12Regular text-[#666666] mt-2 leading-none">
                Savetownsupport@gmail.com
              </p>
            </div>
          </div>
          <img src={forward.src} alt="" />
        </div>
      </div>

      <h3 className=" text-h55 md:text-h5 font-Manrope font-bold text-[#000] mt-6">
        Or drop a Body and our support team will respond in 2 minutes
      </h3>

      <div className="mt-6">
        {/* <label>Full Name</label>
        <div className="mt-2 flex items-center ">
          <input
            type="text"
            placeholder="Enter full name"
            name=""
            className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
            id=""
          />
        </div> */}
        <label className=" mt- 4 block">Title of Complaint</label>
        <div className="mt-2 flex items-center ">
          <input
            type="text"
            placeholder="Enter Title"
            name=""
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
            id=""
          />
          {errors.subject && (
            <span className="text-red-500 text-xs font-Manrope mt-2">
              {errors.subject}
            </span>
          )}
        </div>

        <div className="mt-4">
          <label>Description</label>
          <textarea
            placeholder="Enter a detailed reason for contacting support"
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-[#D5D7DA] rounded-[8px] mt-2 text-body14Regular font-Manrope px-6 py-4"
          ></textarea>
          {errors.body && (
            <span className="text-red-500 text-xs font-Manrope mt-2">
              {errors.body}
            </span>
          )}
        </div>

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
        >
          {loading ? <img src={load.src} className="w-5" alt="" /> : "Submit"}
        </button>
      </div>
    </>
  );
}
