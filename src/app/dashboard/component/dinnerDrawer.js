"use client";
import { useEffect, useState } from "react";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import {
  handleBookDinner,
  handleGetDinnerDates,
} from "@/app/userControllers/dinnerController";
import load from "./assets/load.gif";
import { useUserContext } from "../UserContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSnackbar } from "notistack";

export default function DinnerDrawer({ isVisible, onClose }) {
  const { userProfile, loadingProfile, triggerFetchProfile } = useUserContext();
  const [dinnerDates, setDinnerDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBook, setLoadingBook] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [date_time, setDate_time] = useState("");
  const [other_information, setOther_information] = useState("");
  const first_name = userProfile.first_name;
  const last_name = userProfile.last_name;
  const email = userProfile.email;
  const phone = userProfile.phone;
  const { enqueueSnackbar } = useSnackbar();

  // console.log(dinnerDates);

  const handleSelect = (id, dateTime) => {
    setDate_time(dateTime);
    setSelectedId(id);
  };

  const fetchDinnerDates = async () => {
    setLoading(true);
    try {
      const data = await handleGetDinnerDates();
      if (data) {
        setDinnerDates(data.data);
      }
    } catch (error) {
      console.log("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDinnerDates();
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!date_time) newErrors.date_time = "A date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  // Helper function to format the date to a readable format like "15th Nov"
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    // Add suffix to day (e.g., 1st, 2nd, 3rd, 4th)
    const dayWithSuffix = getDayWithSuffix(day);

    return `${dayWithSuffix} ${month}`;
  };

  const getDayWithSuffix = (day) => {
    let suffix = "th";

    if (day < 11 || day > 13) {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
      }
    }

    return `${day}${suffix}`;
  };

  const onSuccess = (response) => {
    setLoadingBook(false);
    triggerFetchProfile();
    // Show success notification
    // enqueueSnackbar("Dinner Booked Successfully", { variant: "success" });
    // Close the drawer
    onClose();
  };

  const onError = () => {
    setLoadingBook(false);
    enqueueSnackbar("Dinner Booking Failed", { variant: "error" });
  };

  const handleSend = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoadingBook(true);
      const userData = {
        first_name,
        last_name,
        phone,
        email,
        date_time,
        other_information,
      };
      handleBookDinner(userData, onSuccess, onError);
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
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-4 md:px-6 plansbg border border-[#D5D7DA] ml-auto"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />
        <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
          Savetown Dinner date
        </h3>
        <div className="mt-9">
          <label>Which Friday is convenient for you?</label>

          {loading ? (
            <div className="mt-2 grid grid-cols-2 gap-4 w-0">
              {Array(4) // Adjust the number based on how many skeleton buttons you want
                .fill(null)
                .map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      height={44} // Adjust height to match button size
                      width={"100%"} // Match button width
                      borderRadius={10000} // Mimic the rounded button style
                    />
                  </div>
                ))}
            </div>
          ) : (
            <>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {dinnerDates.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id, item.date_time)}
                    className={`border rounded-[10000px] w-[250px] py-3 font-Manrope font-semibold text-sm ${
                      selectedId === item.id
                        ? "border-[#6200ee] text-[#8133f1]"
                        : "border-[#C2C4C6] text-[#595A5C]"
                    }`}
                  >
                    {formatDate(item.date_time)}
                  </button>
                ))}
              </div>
              {errors.date_time && (
                <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                  {errors.date_time}
                </span>
              )}
            </>
          )}

          <div className="mt-8">
            <label>Any other information you will like to let us know?</label>
            <textarea
              placeholder="Enter other information"
              rows={6}
              value={other_information}
              onChange={(e) => setOther_information(e.target.value)}
              className="w-full border border-[#D5D7DA] rounded-[8px] mt-2 text-body14Regular font-Manrope px-6 py-4"
            ></textarea>
          </div>

          <button
            onClick={handleSend}
            disabled={loadingBook}
            className="bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
          >
            {loadingBook ? (
              <img src={load.src} className=" w-5" alt="" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
