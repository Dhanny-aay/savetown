import edit from "../assets/edit.svg";
import Image from "next/image";

export default function OurStats(first) {
  const headlines = [
    {
      id: 1,
      heading: "Message from our CEO",
      subheading:
        "Kicking Off Success: Innovative Strategies for Football Coaching",
      type: "CEO's Message",
      stat: "Our Stat",
    },
    {
      id: 2,
      heading: "Our Partner's",
      subheading: "Game Changers: A Comprehensive Guide to Football Tactics",
      type: "Our Partners",
      stat: "Our Team",
    },
    {
      id: 3,
      heading: "Why Savetown",
      subheading:
        "Creating Thrilling Match Experiences: Tips for Football Events",
      type: "Why Savetown",
      stat: "Our Mission",
    },
    {
      id: 4,
      heading: "Our Features",
      subheading: "Engaging Fans: Creative Ways to Boost Football Attendance",
      type: "Our Features",
      stat: "What Sets Us Apart",
    },
    {
      id: 5,
      heading: "How it Works",
      subheading: "Roadmap to Victory: Insights from Elite Football Coaches",
      type: "How it Works",
      stat: "Our Achievements",
    },
  ];
  

  return (
    <div>
      <table className="w-full text-left border rounded-lg font-Manrope shadow">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4 ">Stat Title</th>
            <th className="p-4 ">Stat</th>
            <th className="p-4">Sub heading</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {headlines.map((row, index) => (
            <tr key={row.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 text-gray-500">{row.heading}</td>
              <td className="p-4 text-gray-500">{row.stat}</td>
              <td className="p-4">{row.subheading}</td>
              <td className="p-4 flex items-center justify-center gap-2">
                <button className="text-gray-500 hover:text-gray-800">
                  <Image
                    src={edit.src}
                    alt="edit icon"
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
    </div>
  );
}
