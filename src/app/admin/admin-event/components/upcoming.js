import Image from 'next/image';
import edit from '../assets/edit.svg'

export default function Upcoming(second) {
  const events = [
    {
      id: 1,
      name: "Esther Howard",
      email: "estherhoward@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 2,
      name: "Brooklyn Simmons",
      email: "brooklynsimmons@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 3,
      name: "Arlene McCoy",
      email: "arlenemccoy@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 4,
      name: "Albert Flores",
      email: "albertflores@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 5,
      name: "Eleanor Pena",
      email: "eleanorpena@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 6,
      name: "Annette Black",
      email: "annetteblack@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 7,
      name: "Kristin Watson",
      email: "kristinwatson@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 8,
      name: "Kristin Watson",
      email: "kristinwatson@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 9,
      name: "Kristin Watson",
      email: "kristinwatson@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 10,
      name: "Kristin Watson",
      email: "kristinwatson@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
    {
      id: 11,
      name: "Kristin Watson",
      email: "kristinwatson@gmail.com",
      location: "Lagos",
      date: "October 25, 2024",
      action: "Remind",
    },
  ];

  return (
    <div className="overflow-auto max-h-[100%] h-screen md:h-[55vh]">
      {/* Table Section with Fixed Height */}{" "}
      <div className="py-2 flex items-center gap-3">
          <h3 className="text-xl md:text-xl font-bold text-black">
           Every Friday
          </h3>
          <button className="text-gray-500 hover:text-gray-800">
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
            <th className="p-4 w-[64px] font-semibold">S/N</th>
            <th className="p-4 font-semibold">Name</th>
            <th className="p-4 w-[250px] font-semibold">Email</th>
            <th className="p-4 w-[120px] font-semibold">Location</th>
            <th className="p-4 w-[148px] text-center font-semibold">Date</th>
            <th className="p-4 w-[100px] text-center font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t ">
              <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                {event.id.toString().padStart(2, "0")}
              </td>
              <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                {event.name}
              </td>
              <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                {event.email}
              </td>
              <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium">
                {event.location}
              </td>
              <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium text-center">
                {event.date}
              </td>
              <td className="p-4 text-[#5F6D7E] text-sm font-Manrope font-medium text-center">
                <span
                  className="cursor-pointer text-[#ED1450] hover:text-[#ED1450]"
                  onClick={() => alert(`Reminder sent to ${event.name}`)}
                >
                  {event.action}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
