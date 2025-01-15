import EditDayModal from "./editDayModal";
import { useEffect, useState } from "react";
import { showAvailableAttendees } from "./../../adminControllers/eventsController";
import Pagination from "../../components/pagination";

export default function Recents() {
  const [attendees, setAttendees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = attendees.slice(startIndex, lastIndex);
  const totalPages = Math.ceil(attendees.length / recordsPerPage);

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
  };

  // const handleEditModal = () => {
  //   setModalOpen(true);
  // };

  const displayAvailableAttendees = async () => {
    setLoading(true);
    try {
      const response = await showAvailableAttendees({});
      const attending = response?.data || [];
      const filteredAttendees = attending.filter((attend) => attend.attended);
      // console.log("Filtered attendees:", filteredAttendees);
      setAttendees(filteredAttendees);
      setLoading(false)
    } catch (error) {
      console.error("error displaying dates", error);
    }
  };


  useEffect(() => {
    displayAvailableAttendees();
  }, []);

  return (
    <>
      {loading ? (
        <div> Loading users.....</div>
      ) : !attendees ||
        attendees.length === 0 
        ? (
        <div className="text-center text-gray-500">
          No attendees available to display.
        </div>
      ) : (
        <div className="overflow-auto w-full md:h-[100%] ">
          {modalOpen ? <EditDayModal onClose={setModalOpen} /> : null}

          {/* Adjust the height to fit the screen */}
          <table className="w-full mt-4 bg-white rounded shadow ">
            <thead>
              <tr className="text-left bg-gray-50 font-Manrope">
                <th className="p-4 w-[64px] font-semibold">S/N</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 w-[250px] font-semibold">Email</th>
                {/* <th className="p-4 w-[120px] font-semibold">Location</th> */}
                <th className="p-4 w-[148px] text-center font-semibold">
                  Date
                </th>
                <th className="p-4 w-[100px] text-center font-semibold">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attend, index) => (
                <tr key={attend.id} className="border-t ">
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                    {index + 1}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                    {attend.first_name} {attend.last_name}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                    {attend.email}
                  </td>
                  {/* <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                    {attend.location}
                  </td> */}
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium text-center">
                    {formatDateTime(attend.date_time)}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium text-center">
                    <span
                      className="cursor-pointer text-[#ED1450] hover:text-[#ED1450]"
                      // onClick={() => alert(`Reminder sent to ${attend.name}`)}
                    >
                     {attend.time}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </>
  );
}
