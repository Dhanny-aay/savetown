import EditDayModal from "./editDayModal";
import { useEffect, useState } from "react";
import { showAvailableAttendees } from "./../../adminControllers/eventsController";

export default function Upcoming() {

  const [attendees, setAttendees] = useState([
    {
      id: "",
      date: "",
      email: "",
      // location: "",
      first_name: "",
      last_name: "",
      updated_at: "",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // const handleEditModal = () => {
  //   setModalOpen(true);
  // };

  const displayAvailableAttendees = async () => {
    setLoading(true);
    try {
      const response = await showAvailableAttendees({});
      const attending = response?.data || [];
      setAttendees(attending);
      setLoading(false);
    } catch (error) {
      console.error("error displaying dates", error);
    }
  };
  useEffect(() => {
    displayAvailableAttendees();
  }, []);

  const onSave = () => {
    // console.log(selectedDay)
  };

  return (
    <>
      {loading ? (
        <div> Loading users.....</div>
      ) : !attendees || attendees.length === 0 ? (
        <div className="text-center text-gray-500">
          No attendees available to display.
        </div>
      ) : (
        <div className="overflow-auto w-full md:h-[100%] ">
          {modalOpen ? (
            <EditDayModal
              onClose={setModalOpen}
            />
          ) : null}
        
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attend) => (
                <tr key={attend.id} className="border-t ">
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                    {attend.id}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                    {attend.first_name}  {attend.last_name}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                    {attend.email}
                  </td>
                  {/* <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                    {attend.location}
                  </td> */}
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium text-center">
                    {formatDateTime(attend.date)}
                  </td>
                  <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium text-center">
                    <span
                      className="cursor-pointer text-[#ED1450] hover:text-[#ED1450]"
                      onClick={() => alert(`Reminder sent to ${attend.name}`)}
                    >
                      {formatDateTime(attend.updated_at)}
                    </span>
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
