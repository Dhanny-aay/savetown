'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";
import search from "../assets/search.svg";
import  FileUploader  from "@/app/utils/fileUploader";
import { fetchBlog } from "../../adminControllers/blogController";

export default function HeroSection() {
  const [hero, setHero] = useState({
    id: "",
    heading: "",
    subheading: "",
    type: "",
  });
  const [editHeadline, setEditHeadline] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditSlide = (headline) => {
    setEditHeadline(headline);
    setShowEditModal(true);
  };

  const handleDeleteSlide = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDeleteSlide = () => {
    const filteredhero = hero.filter(
      (headline) => headline.id !== deleteId
    );
    setHero(filteredhero);
    setShowDeletePopup(false);
    setDeleteId(null);
  };

  const handleAddNewSlide = () => {
    setEditHeadline({ id: null, heading: "", subheading: "", image: "" });
    setShowEditModal(true);
  };

  const handleSaveSlide = () => {
    if (editHeadline.id) {
      // Update existing headline
      const updatedhero = hero.map((headline) =>
        headline.id === editHeadline.id ? editHeadline : headline
      );
      setHero(updatedhero);
    } else {
      // Add new headline
      setHero([
        ...hero,
        { ...editHeadline, id: Date.now() }, // Assign a unique ID
      ]);
    }
    setShowEditModal(false);
  };

   const loadHero = async () => {
     setLoading(true);
     await fetchBlog(
       { page: 1, 
         type: "Sliders", 
         // category: "Partners", 
         page: "Home" },
       (response) => {
         // console.log(response);
         setHero(response?.data || []);
         setLoading(false);
       },
       (err) => {
         console.error("unable to load blogs", err);
       }
     );
   };
 
   useEffect(() => {
     loadHero();
   }, []);
   return (
     <>
       {loading ? (
         <div>Loading hero......</div>
       ) : !hero || hero.length === 0 ? (
         <div className="text-center text-gray-500">
           No information available to display.
         </div>
       ) : (
    <div>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          {/* Search bar */}
          <div className="flex items-center space-x-4 w-1/2">
            <div className="relative w-full font-Manrope">
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full px-6 py-2 pl-10 border border-gray-300 rounded-full"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Image
                  src={search.src}
                  alt="search icon"
                  width={16}
                  height={16}
                  priority
                />
              </span>
            </div>
            <button className="px-6 py-2 bg-[#ED1450] text-white rounded-full font-Manrope">
              Search
            </button>
          </div>
          {/* Add New Slide */}
          <button
            onClick={handleAddNewSlide}
            className="px-6 py-2 bg-[#ED1450] text-sm text-white rounded-full font-Manrope"
          >
            + Add new Hero Slide
          </button>
        </div>
      </div>

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
          {hero && hero.map && hero.map((row, index) => (
            <tr key={row.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 w-[400px] text-gray-500">{row.title}</td>
              <td className="p-4">{row.excerpt}</td>
              <td className="p-4 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEditSlide(row)}
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
                <button
                  onClick={() => handleDeleteSlide(row.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Image
                    src={trash.src}
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

      {showDeletePopup && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope ">
            <h2 className="text-lg font-bold font-Manrope text-center">Delete Section </h2>
            <p className="text-center"> Are you sure you want to delete this section?</p>
            <div className="flex justify-between items-center gap-4 ">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-3 py-[13px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
              >
                No, go back
              </button>
              <button
                onClick={confirmDeleteSlide}
            className="px-3 py-[13px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
              >
                Yes, delete
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
