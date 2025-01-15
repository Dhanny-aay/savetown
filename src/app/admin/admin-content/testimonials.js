"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import search from "./assets/search.svg";
import FileUploader from "@/app/utils/fileUploader";
import { createBlog, deleteBlog, fetchBlog, updateBlog } from "../adminControllers/blogController";
import alert from './assets/alert.svg'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState({
    id: "",
    title: "",
    excerpt: "",
    type: "",
  });
  const [editTestimonials, setEditTestimonials] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditTestimony = (headline) => {
    setEditTestimonials(headline);
    setShowEditModal(true);
  };

  const handleDeleteTestimony = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDeleteTestimony = async() => {

    await deleteBlog(
      `${deleteId}`,
      (response)=>{
        console.log(response)
      },
      (err)=>{
        console.error('unable to delete permission', err)
      }
    )
    setShowDeletePopup(false);
    setDeleteId(null);
    loadtestimonials()
  };

  const handleAddNewTestimonial = () => {
    setEditTestimonials({ id: null, title: "", excerpt: "", image: "" });
    setShowEditModal(true);
  };

  const handleSaveTestimony = async () => {
    if (editTestimonials.id) {
      const updatedTestimonials = testimonials.map((headline) =>
        headline.id === editTestimonials.id ? editTestimonials : headline
      );
      console.log("edit", updatedTestimonials);
      await updateBlog(
        `${editTestimonials.id}`,
        {
          title: `${updatedTestimonials.title}`,
          type: "Reason",
          link: `${updatedTestimonials.image}`,
          category: `${updatedTestimonials.category}`,
          location: "pariatur",
          date: "2025-01-08T14:57:42",
          time: "accusamus",
          author: "debitis",
          excerpt: "itaque",
          description: `${updatedTestimonials.description}`,
        },
        (response) => {
          console.log(response);
        },
        (err) => {
          console.error("unable to edit slider", err);
        }
      );
    } else {
      const newSlide = {
        id: Date.now(),
        ...editTestimonials,
      };
      console.log(newSlide);
      await createBlog(
        {
          title: `${newSlide.title}`,
          excerpt: "autem",
          type: "Slider",
          link: `${newSlide.image}`,
          location: "qui",
          date: "2025-01-08T14:57:42",
          time: "sunt",
          conclusion:
            "http://www.tillman.com/sint-debitis-laudantium-tempora-ullam-nisi-beatae-vel-doloremque.html",
          status: "a",
          author: "vel",
          description: `${newSlide.description}`,
        },
        (response) => {
          console.log(response);
        },
        (err) => {
          console.err("unable to create testimonials", err);
        }
      );
    }
    setShowEditModal(false);
    loadtestimonials();
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setEditTestimonials({ ...editTestimonials, [name]: value });
  };

  const loadtestimonials = async () => {
    setLoading(true);
    await fetchBlog(
      {
        page: 1,
        type: "Testimonials",
        page: "landing",
      },
      (response) => {
        // console.log(response);
        setTestimonials(response?.data || []);
        setEditTestimonials(response?.data || []);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load blogs", err);
      }
    );
  };

  useEffect(() => {
    loadtestimonials();
  }, []);

  const handleEnter = (e)=>{
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); 
        handleSaveTestimony(); 
      }
  }

  return (
    <>
      {loading ? (
        <div>Loading testimonials......</div>
      ) : !testimonials || testimonials.length === 0 ? (
        <div className="text-center text-gray-500">
          No information available to display.
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              {/* Search bar */}
              <div className="flex items-center w-1/2 space-x-4">
                <div className="relative w-full font-Manrope">
                  <input
                    type="text"
                    placeholder="Search testimony..."
                    className="w-full px-6 py-2 pl-10 border border-gray-300 rounded-full"
                  />
                  <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
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
                onClick={handleAddNewTestimonial}
                className="px-6 py-2 bg-[#ED1450] text-sm text-white rounded-full font-Manrope"
              >
                + Add new testimonial
              </button>
            </div>
          </div>

          <table className="w-full text-left border rounded-lg font-Manrope">
            <thead className="bg-white text-[13px]">
              <tr>
                <th className="p-4 text-gray-500">S/N</th>
                <th className="p-4">Heading</th>
                <th className="p-4">Testimony</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {testimonials &&
                testimonials.map &&
                testimonials.map((row, index) => (
                  <tr key={row.id} className="text-sm border-t">
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 text-gray-500">{row.title}</td>
                    <td className="p-4">{row.description}</td>
                    <td className="flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => handleEditTestimony(row)}
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
                        onClick={() => handleDeleteTestimony(row.id)}
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
                className="bg-white rounded-2xl p-6 w-[400px] h-[500px] md:mx-5 overflow-auto space-y-5 font-Manrope"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold font-Manrope">
                  {editTestimonials.id ? "Edit Testimonial" : "Add New Testimonial"}
                </h2>
                <div>
                  <label className="block mb-1 text-sm font-semibold">
                    Heading
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Name"
                    value={editTestimonials.title || ""}
                    onChange={handleNewChange}
                    onKeyDown={handleEnter}
                    className="w-full px-3 py-2 border border-gray-300 text-sm rounded-[30px]"
                  />
                </div>
                <div>
                  {editTestimonials.image ? (
                    <div className="relative">
                      {/* Display Image */}
                      <img
                        src={editTestimonials.image}
                        alt="Uploaded Feature"
                        width={300}
                        height={200}
                        className="rounded-lg"
                      />
                      {/* Cancel Button */}
                      <button
                        onClick={() =>
                          setEditTestimonials({ ...editTestimonials, image: null })
                        }
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
                        setEditTestimonials({
                          ...editTestimonials,
                          image: URL.createObjectURL(file),
                        })
                      }
                    />
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold">
                    Location
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter testimony"
                    value={editTestimonials.description || ""}
                    onChange={handleNewChange}
                    onKeyDown={handleEnter}
                    className="w-full h-32 px-3 py-2 text-sm border border-gray-300 resize-none rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between w-full space-x-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-3 py-[11px] text-sm w-1/2 border bg-white border-gray-300 rounded-[30px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTestimony}
                    className="px-3 py-[11px] text-sm w-1/2 bg-[#ED1450] text-white rounded-[32px]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDeletePopup && (
            <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope flex flex-col items-center">
               <Image
                                              src={alert.src}
                                              alt="view icon"
                                              width={98}
                                              height={98}
                                              priority
                                              className = 'text-center'
                                            />
                        <h2 className="text-lg font-bold text-center font-Manrope">
                          Delete Section{" "}
                        </h2>
                        <p className="text-center">
                          {" "}
                          Are you sure you want to proceed? This action is irreversible and will permanently remove the section.
                        </p>
                <div className="flex items-center justify-between w-full gap-4">
                  <button
                    onClick={() => setShowDeletePopup(false)}
                    className="px-3 py-[13px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
                  >
                    No, go back
                  </button>
                  <button
                    onClick={()=>confirmDeleteTestimony(testimonials.id)}
                    className="px-3 py-[13px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
                  >
                   {loading ? (
      <div className="flex items-center justify-center">
        {/* Spinner for the loading state */}
        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
      </div>) : 'Yes, delete'}
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
