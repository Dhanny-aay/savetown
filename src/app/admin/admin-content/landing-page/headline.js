import { useState } from "react";
import edit from "../assets/edit.svg";
import Image from "next/image";

export default function Headline() {
  const [headlines, setHeadlines] = useState([
    {
      id: 1,
      heading: "Message from our CEO",
      subheading:
        "Kicking Off Success: Innovative Strategies for Football Coaching",
      type: "CEO's Message",
    },
    {
      id: 2,
      heading: "Our Partner's",
      subheading: "Game Changers: A Comprehensive Guide to Football Tactics",
      type: "Our Partners",
    },
    {
      id: 3,
      heading: "Why Savetown",
      subheading:
        "Creating Thrilling Match Experiences: Tips for Football Events",
      type: "Why Savetown",
    },
    {
      id: 4,
      heading: "Our Features",
      subheading: "Engaging Fans: Creative Ways to Boost Football Attendance",
      type: "Our Features",
    },
    {
      id: 5,
      heading: "How it Works",
      subheading: "Roadmap to Victory: Insights from Elite Football Coaches",
      type: "How it Works",
    },
  ]);

  const [editHeadline, setEditHeadline] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = (user) => {
    setEditHeadline(user);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editHeadline) {
      const updatedHeadlines = headlines.map((headline) =>
        headline.id === editHeadline.id ? editHeadline : headline
      );
      setHeadlines(updatedHeadlines);
      setShowEditModal(false);
    }
  };

  return (
    <>
      <table className="w-full text-left border rounded-lg font-Manrope shadow">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4">Heading</th>
            <th className="p-4">Subheading</th>
            <th className="p-4">Type</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {headlines.map((row, index) => (
            <tr key={row.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 text-gray-500">{row.heading}</td>
              <td className="p-4">{row.subheading}</td>
              <td className="p-4 text-gray-500">{row.type}</td>
              <td className="p-4">
                <button
                  onClick={() => handleShowEditModal(row)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div
          className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold font-Manrope">Edit Headline</h2>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Heading
              </label>
              <input
                type="text"
                placeholder="Enter Heading"
                value={editHeadline?.heading || ""}
                onChange={(e) =>
                  setEditHeadline({ ...editHeadline, heading: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Sub Heading
              </label>
              <textarea
                placeholder="Enter sub heading"
                value={editHeadline?.subheading || ""}
                onChange={(e) =>
                  setEditHeadline({
                    ...editHeadline,
                    subheading: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px] h-32 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Type</label>
              <input
                type="text"
                placeholder="Enter type"
                value={editHeadline?.type || ""}
                onChange={(e) =>
                  setEditHeadline({ ...editHeadline, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
              />
            </div>
            <div className="flex justify-between items-center w-full space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-[18px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-[18px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
