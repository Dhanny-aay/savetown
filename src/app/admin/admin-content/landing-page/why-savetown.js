'use client'
import FileUploader from "@/app/utils/fileUploader";
import edit from "../assets/edit.svg";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchBlog } from "../../adminControllers/blogController";

export default function AdminWhySavetown(first) {
  const [why, setWhy] = useState({
    id: "",
    heading: "",
    subheading: "",
    type: "",
  });
    const [editHeadline, setEditHeadline] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false)

  const handleEditSlide = (headline) => {
    setEditHeadline(headline);
    setShowEditModal(true);
  };

  const handleSaveSlide = () => {
    if (editHeadline.id) {
      // Update existing headline
      const updatedWhy = why.map((headline) =>
        headline.id === editHeadline.id ? editHeadline : headline
      );
      setWhy(updatedWhy);
    } else {
      // Add new headline
      setWhy([
        ...why,
        { ...editHeadline, id: Date.now() }, // Assign a unique ID
      ]);
    }
    setShowEditModal(false);
  };

    const loadwhy = async () => {
      setLoading(true);
      await fetchBlog(
        { page: 1, 
          type: "PageTitle", 
          category: "WhySavetown", 
          page: "Home" },
        (response) => {
          // console.log(response);
          setWhy(response?.data || []);
          setLoading(false);
        },
        (err) => {
          console.error("unable to load blogs", err);
        }
      );
    };
  
    useEffect(() => {
      loadwhy();
    }, []);
    return (
      <>
        {loading ? (
          <div>Loading why......</div>
        ) : !why || why.length === 0 ? (
          <div className="text-center text-gray-500">
            No information available to display.
          </div>
        ) : (
    <div>
      <table className="w-full text-left border rounded-lg font-Manrope shadow">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4 w-[400px]">Heading</th>
            <th className="p-4">Subheading</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {why&& why.map&& why.map((row, index) => (
            <tr key={row.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 w-[400px] text-gray-500">{row.title}</td>
              <td className="p-4">{row.excerpt}</td>
              <td className="p-4 flex items-center justify-center gap-2">
                <button  onClick={() => handleEditSlide(row)}
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

      {showEditModal && (
        <div
          className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold font-Manrope">
              {editHeadline.id ? "Edit Headline" : "Add New Slide"}
            </h2>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Heading
              </label>
              <input
                type="text"
                placeholder="Enter Heading"
                value={editHeadline.heading || ""}
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
                value={editHeadline.subheading || ""}
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
              {/* <label className="block text-sm font-semibold mb-1">
                Slide Image
              </label> */}
              <FileUploader
                label="Upload Slide Image"
                accept="image/*"
                maxSize={5000000}
                isImage={true}
                onFileSelect={(file) =>
                  setEditHeadline({ ...editHeadline, image: file })
                }
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
                onClick={handleSaveSlide}
                className="px-3 py-[18px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        )}
    </>
  );
}
