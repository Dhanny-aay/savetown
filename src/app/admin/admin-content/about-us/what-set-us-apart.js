import { useState, useEffect } from "react";
import edit from "../assets/edit.svg";
import Image from "next/image";
import { fetchBlog, updateBlog } from "../../adminControllers/blogController";
import FileUploader from "@/app/utils/fileUploader";

export default function WhatSetUsApart() {
  const [apart, setApart] = useState({
    id: "",
    title: "",
    excerpt: "",
    type: "",
  });
  const [editApart, setEditApart] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowEditModal = (user) => {
    setEditApart(user);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {

    const updatedapart = {
      ...editApart,
    };
    let id = updatedapart.id;
    // console.log(updatedapart);
    await updateBlog(
      `${id}`,
      {
        title: `${updatedapart.title}`,
        type: "Slider",
        link: "http://langosh.com/",
        category: `${updatedapart.category}`,
        location: "pariatur",
        date: "2025-01-08T14:57:42",
        time: "accusamus",
        author: "debitis",
        excerpt: `${updatedapart.excerpt}`,
        description: "Nisi vero dolorem ut.",
      },
      (response) => {
        console.log(response);
      },
      (err) => {
        console.error("unable to edit headline", err);
      }
    );
    setShowEditModal(false);
    loadapart();
  };

  const loadapart = async () => {
    setLoading(true);
    await fetchBlog(
      { page: 1, type: "PageTitle", category: "AboutUsFirst", page: "About" },
      (response) => {
        // console.log(response);
        setApart(response?.data || []);
        setEditApart(response?.data || []);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load blogs", err);
      }
    );
  };

  useEffect(() => {
    loadapart();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditApart({ ...editApart, [name]: value });
  };
  
  return (
    <>
      {loading ? (
        <div>Loading apart......</div>
      ) : !apart || apart.length === 0 ? (
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
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {apart &&
                apart.map &&
                apart.map((headline, index) => (
                  <tr key={headline.id} className="border-t text-sm">
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 text-gray-500">{headline.title}</td>
                    <td className="p-4">{headline.excerpt}</td>
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
            <h2 className="text-xl font-bold font-Manrope">Edit What Sets Us Apart</h2>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Heading
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter Heading"
                value={editApart?.title || ""}
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
                name="excerpt"
                placeholder="Enter Text"
                value={editApart?.excerpt || ""}
                onChange={handleEditChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-[#919BA7] text-sm h-32 resize-none"
              />
            </div>
            <div>
        {editApart.image ? (
          <div className="relative">
            {/* Display Image */}
            <img
              src={editApart.image}
              alt="Uploaded image"
              width={300}
              height={200}
              className="rounded-lg"
            />
            {/* Cancel Button */}
            <button
              onClick={() => setEditApart({ ...editApart, image: null })}
              className="absolute top-1 left-[80%] bg-black text-white rounded-full w-6 h-6 flex justify-center items-center text-xs"
            >
              X
            </button>
          </div>
        ) : (
          // File Uploader
          <FileUploader
            label="Slide Image"
            accept="image/*"
            maxSize={5000000}
            isImage={true}
            onFileSelect={(file) =>
              setEditApart({ ...editApart, image: URL.createObjectURL(file) })
            }
          />
        )}
      </div>

            <div className="flex justify-between items-center w-full space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-[11px] w-1/2 border text-sm  bg-white border-gray-300 rounded-[32px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-[11px] w-1/2 bg-[#ED1450] text-sm text-white rounded-[32px]"
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
