import Image from "next/image";
import edit from "../assets/edit.svg";
import EditDayModal from "./editDayModal";
import { useEffect, useState } from "react";
import { showAvailableDates } from "./../../adminControllers/eventsController";

export default function Available() {

  const [available, setAvailable] = useState([
    {
      id: '',
      day: "",
      time: "",
      date_time: '',
      created_at: "",
      updated_at: "",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState("");

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23", // 24-hour clock
    });
  }

  const handleEditModal = () => {
    setModalOpen(true);
  };

  const displayAvailablDate = async () => {
    setLoading(true);
    try {
      const response = await showAvailableDates({});
      const attending = response.map(item => item) || [];
      setAvailable(attending);
      setDay(response[0]?.day || "");
      setLoading(false);
    } catch (error) {
      console.error("error displaying dates", error);
    }
  };

  useEffect(() => {
    displayAvailablDate();
  }, [day]);


  return (
    <>
      {loading ? (
        <div> Loading available dates.....</div>
      ) : !available || available.length === 0 ? (
        <div className="text-center text-gray-500">
          No available dates to display.
        </div>
      ) : (
        <div className="overflow-auto w-full md:h-[100%] ">
          {modalOpen ? (
            <EditDayModal
              onClose={setModalOpen}
              day = {setDay}
            />
          ) : null}
          {/* Table Section with Fixed Height */}{" "}
          <div className="py-2 flex items-center gap-3">
            <h3 className="text-base md:text-xl font-bold text-black">
              Every {day}
            </h3>
            <button
              onClick={handleEditModal}
              className="text-gray-500 hover:text-gray-800"
            >
              <Image
                src={edit.src}
                alt="edit icon"
                width={20}
                height={20}
                priority
              />
            </button>
          </div>
          {/* Adjust the height to fit the screen */}
          <table className="w-full mt-4 bg-white rounded shadow ">
            <thead>
              <tr className="text-left bg-gray-50 font-Manrope">
                <th className="p-4 w-[64px] font-semibold text-sm md:text-lg">S/N</th>
                <th className="p-4 font-semibold text-sm md:text-lg">Day</th>
                <th className="p-4 w-[150px] font-semibold text-sm md:text-lg max-lg:hidden">Time</th>
                <th className="p-4 w-[120px] font-semibold text-sm md:text-lg">Date Time</th>
              </tr>
            </thead>
            <tbody>
              {available && available.map && available.map((availables) => (
                <tr key={availables.id} className="border-t ">
                  <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                    {availables.id}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                  <div className="max-lg:flex max-lg:flex-col">
                    {availables.day}
                    <span  className="lg:hidden max-sm:text-xs max-lg:text-black max-lg:font-medium">
                    {availables.time}
                    </span>
                    </div>
                  </td>
                  <td className="p-4 text-[#5F6D7E] max-lg:hidden text-xs md:text-sm font-Manrope font-medium">
                    {availables.time}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                  {formatDateTime(availables.date_time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}