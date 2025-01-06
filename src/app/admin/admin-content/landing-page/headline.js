import { useState, useEffect } from "react";
import edit from "../assets/edit.svg";
import Image from "next/image";
import { fetchBlog } from "../../adminControllers/blogController";

export default function Headline() {
  const [headlines, setHeadlines] = useState({
    id: "",
    heading: "",
    subheading: "",
    type: "",
  });
  const [editHeadline, setEditHeadline] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const loadHeadlines = async () => {
    setLoading(true);
    await fetchBlog(
      { page: 1, 
        type: "PageTitle", 
        // category: "Partners", 
        page: "Home" },
      (response) => {
        // console.log(response);
        setHeadlines(response?.data || []);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load blogs", err);
      }
    );
  };

  useEffect(() => {
    loadHeadlines();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading headlines......</div>
      ) : !headlines || headlines.length === 0 ? (
        <div className="text-center text-gray-500">
          No information available to display.
        </div>
      ) : (
    <div className="overflow-auto w-full md:h-[100%]">
      <table className="w-full text-left border rounded-lg font-Manrope shadow">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4">Heading</th>
            <th className="p-4">Subheading</th>
            {/* <th className="p-4">Type</th> */}
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {headlines &&
                headlines.map &&headlines.map((headline, index) => (
            <tr key={headline.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 text-gray-500">{headline.title}</td>
              <td className="p-4">{headline.excerpt}</td>
              {/* <td className="p-4 text-gray-500">{headline.type}</td> */}
              <td className="p-4">
                <button
                  onClick={() => handleShowEditModal(headline)}
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
