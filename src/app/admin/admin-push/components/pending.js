import Image from 'next/image';
import edit from '../assets/edit.svg'
import trash from '../assets/trash.svg'

export default function Pending() {

  const jobList = [
    {
      id: 1,
      title: "Esther Howard",
      location: "You've got a new message waiting for you!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 2,
      title: "Brooklyn Simmons",
      location: "Check out your latest updates!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 3,
      title: "Arlene McCoy",
      location: "Don't miss out on what's happening!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 4,
      title: "Albert Flores",
      location: "New notifications are here for you!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 5,
      title: "Eleanor Pena",
      location: "You have new alerts to review!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 6,
      title: "Annette Black",
      location: "Take a look at your recent messages!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 7,
      title: "Kristin Watson",
      location: "There's something new for you to see!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 8,
      title: "Kristin Watson",
      location: "Updates are waiting for your attention!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 9,
      title: "Kristin Watson",
      location: "New activity has been recorded!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 10,
      title: "Kristin Watson",
      location: "Your inbox has new notifications!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
    {
      id: 11,
      title: "Kristin Watson",
      location: "You have new messages to check out!",
      datePosted: "October 25, 2024, 12:00 PM",
    },
  ];

  return (
    <table className="w-full text-left border rounded-lg font-Manrope shadow">
      <thead className="bg-white text-[13px]">
        <tr>
          <th className="p-4 text-gray-500">S/N</th>
          <th className="p-4">Title</th>
          <th className="p-4">Body</th>
          <th className="p-4">Date</th>
          <th className="p-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {jobList.map((job) => (
          <tr key={job.id} className="border-t text-sm">
            <td className="p-4 text-gray-500">
              {job.id.toString().padStart(2, "0")}
            </td>
            <td className="p-4">{job.title}</td>
            <td className="p-4 text-gray-500">{job.location}</td>
            <td className="p-4 text-gray-500">{job.datePosted}</td>
            <td className="p-4 flex items-center justify-center gap-2">
              <button className="text-gray-500 hover:text-gray-800">
                <Image
                  src={edit.src} // Replace with your actual edit icon source
                  alt="edit icon"
                  width={20}
                  height={20}
                  priority
                />
              </button>
              <button className="text-gray-500 hover:text-gray-800">
                <Image
                  src={trash.src} // Replace with your actual delete icon source
                  alt="delete icon"
                  width={20}
                  height={20}
                  priority
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
