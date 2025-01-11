import { useEffect, useState } from "react";
import edit from "../assets/edit.svg";
import Image from "next/image";
import { fetchBlog, updateBlog } from "../../adminControllers/blogController";

export default function OurStats() {
  const [stats, setStats] =  useState({});
  const [editStats, setEditStats] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowEditModal = (user) => {
    setEditStats(user);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {

    const updatedStats = {
      ...editStats,
    };
    let id = updatedStats.id;
    // console.log(updatedStats);
    await updateBlog(
      `${id}`,
      {
        title: `${updatedStats.title}`,
        type: "Slider",
        link: "http://langosh.com/",
        category: `${updatedStats.category}`,
        location: "pariatur",
        date: "2025-01-08T14:57:42",
        time: "accusamus",
        author: "debitis",
        excerpt: "itaque",
        description: `${updatedStats.description}`,
      },
      (response) => {
        console.log(response);
      },
      (err) => {
        console.error("unable to edit headline", err);
      }
    );
    setShowEditModal(false);
    loadstats()
  };

  const loadstats = async () => {
    setLoading(true);
    await fetchBlog(
      { page: 1, 
        type: "Stats", 
        page: "About" },
      (response) => {
        // console.log(response);
        setStats(response?.data || []);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load stats", err);
      }
    );
  };

  useEffect(() => {
    loadstats();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStats({ ...editStats, [name]: value });
  };

  return (
    <>
      {loading ? (
        <div>Loading information......</div>
      ) : !stats || stats.length === 0 ? (
        <div className="text-center text-gray-500">
          No information available to display.
        </div>
      ) : (
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
          {stats && stats.map && stats.map((stat, index) => (
            <tr key={stat.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 text-gray-500">{stat.title}</td>
              <td className="p-4 text-gray-500">{stat.excerpt}</td>
              <td className="p-4">{stat.description}</td>
              <td className="p-4 flex items-center justify-center gap-2">
                <button onClick={() => handleShowEditModal(stat)}
                className="text-gray-500 hover:text-gray-800">
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
      )}

{showEditModal && (
        <div
          className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold font-Manrope">Edit Stats</h2>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Heading
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter Heading"
                value={editStats?.title || ""}
                onChange={handleEditChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-[30px]  text-sm text-[#919BA7] "
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Sub Heading
              </label>
              <textarea
              type="text"
                name="description"
                placeholder="Enter Text"
                value={editStats?.description || ""}
                onChange={handleEditChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-[#919BA7] text-sm h-32 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Type</label>
              <input
                type="text"
                placeholder="Enter type"
                value={editStats?.type || ""}
                readOnly
                className="w-full px-3 py-2 text-[#919BA7] border text-sm border-gray-300 rounded-[30px]"
              />
            </div>
            <div className="flex justify-between items-center w-full space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-[11px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-[11px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
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
