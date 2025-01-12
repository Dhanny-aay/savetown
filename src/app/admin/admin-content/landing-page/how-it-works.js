'use client'
import FileUploader from "@/app/utils/fileUploader";
import edit from "../assets/edit.svg";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchBlog, updateBlog } from "../../adminControllers/blogController";

export default function HowItWorks(first) {
  const [works, setWorks] = useState({
    id: "",
    title: "",
    excerpt: "",
    type: "",
  });
    const [editWorks, setEditWorks] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false)

  const handleEditSlide = (headline) => {
    setEditWorks(headline);
    setShowEditModal(true);
  };

  const handleSaveWorks = async() => {
    const updatedHeadlines = {
      ...editWorks,
    };
    let id = updatedHeadlines.id;
    // console.log(updatedHeadlines);
    await updateBlog(
      `${id}`,
      {
        title: `${updatedHeadlines.title}`,
        type: "Slider",
        link: "http://langosh.com/",
        category: `${updatedHeadlines.category}`,
        location: "pariatur",
        date: "2025-01-08T14:57:42",
        time: "accusamus",
        author: "debitis",
        excerpt: `${updatedHeadlines.excerpt}`,
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
    loadworks()
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditWorks({
      ...editWorks, 
      [name]:value
    })
  }

    const loadworks = async () => {
      setLoading(true);
      await fetchBlog(
        { page: 1, 
          type: "HowItWorks", 
          page: "Home" },
        (response) => {
          setWorks(response?.data || []);
          setLoading(false);
        },
        (err) => {
          console.error("unable to load blogs", err);
        }
      );
    };
  
    useEffect(() => {
      loadworks();
    }, []);

    return (
      <>
        {loading ? (
          <div>Loading works......</div>
        ) : !works || works.length === 0 ? (
          <div className="text-center text-gray-500">
            No information available to display.
          </div>
        ) : (
    <div>
      <table className="w-full text-left border rounded-lg font-Manrope shadow">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4 ">Heading</th>
            <th className="p-4">Subheading</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {works&& works.map&& works.map((row, index) => (
            <tr key={row.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4  text-gray-500">{row.title}</td>
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
            Edit How It Works Section
            </h2>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Heading
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter Heading"
                value={editWorks.title || ""}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveWorks();
                }}
                className="w-full px-3 py-2 border text-sm border-gray-300 rounded-[30px]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Sub Heading
              </label>
              <textarea
                placeholder="Enter Text"
                name="excerpt"
                value={editWorks.excerpt || ""}
                onChange={handleChange
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveSlide();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm h-32 resize-none"
              />
            </div>
           
            <div className="flex justify-between items-center w-full space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-[11px] w-1/2 border bg-white border-gray-300 text-sm rounded-[32px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWorks}
                className="px-3 py-[11px] w-1/2 bg-[#ED1450] text-white text-sm rounded-[32px]"
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
