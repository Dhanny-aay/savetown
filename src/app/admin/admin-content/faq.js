"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import search from "./assets/search.svg";
import alert from "./assets/alert.svg";
import FileUploader from "@/app/utils/fileUploader";
import { createBlog, deleteBlog, fetchBlog, updateBlog } from "../adminControllers/blogController";


export default function Faq() {
  const [faqs, setFaqs] = useState({
    id: "",
    title: "",
    excerpt: "",
    type: "",
  });
  const [editFaqs, setEditFaqs] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditFaq = (headline) => {
    setEditFaqs(headline);
    setShowEditModal(true);
  };

  const handleDeleteFaq = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDeleteFaq = async() => {
setLoading(true)
    await deleteBlog(
      `${deleteId}`,
      (response)=>{
        setLoading(false)
        // console.log(response)
      },
      (err)=>{
        console.error('unable to delete permission', err)
      }
    )
    setShowDeletePopup(false);
    setDeleteId(null);
    loadfaqs()
  };

  const handleAddNewFaq = () => {
    setEditFaqs({ id: null, title: "", excerpt: "", image: "" });
    setShowEditModal(true);
  };

  const handleSaveFaq = async () => {
    if (editFaqs.id) {
      const updatedfaqs = faqs.map((headline) =>
        headline.id === editFaqs.id ? editFaqs : headline
      );
      // console.log("edit", updatedfaqs);
      // setLoading(true)
      await updateBlog(
        `${editFaqs.id}`,
        {
          title: `${updatedfaqs.title}`,
          type: "Reason",
          link: `${updatedfaqs.image}`,
          category: `${updatedfaqs.category}`,
          location: "pariatur",
          date: "2025-01-08T14:57:42",
          time: "accusamus",
          author: "debitis",
          excerpt: `${updatedfaqs.excerpt}`,
          description:"Impedit minus aliquid aperiam ut alias.",
        },
        (response) => {
          setLoading(false)
          // console.log(response);
        },
        (err) => {
          console.error("unable to edit slider", err);
        }
      );
    } else {
      const newSlide = {
        id: Date.now(),
        ...editFaqs,
      };
      // console.log(newSlide);
      // setLoading(true)
      await createBlog(
        {
          title: `${newSlide.title}`,
          excerpt: `${newSlide.excerpt}`,
          type: "Slider",
          link: "http:\/\/www.schiller.com\/molestias-omnis-laboriosam-molestias-labore-ea-libero.html",
          location: "qui",
          date: "2025-01-08T14:57:42",
          time: "sunt",
          conclusion:
            "http://www.tillman.com/sint-debitis-laudantium-tempora-ullam-nisi-beatae-vel-doloremque.html",
          status: "a",
          author: "vel",
          description:"Quas est quia ea dolorem in ut molestiae.",
        },
        (response) => {
          setLoading(false)
          // console.log(response);
        },
        (err) => {
          console.err("unable to create faqs", err);
        }
      );
    }
    loadfaqs();
    setShowEditModal(false);
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setEditFaqs({ ...editFaqs, [name]: value });
  };

  const loadfaqs = async () => {
    setLoading(true);
    await fetchBlog(
      {
        page: 1,
        type: "FAQ",
        page: "landing",
      },
      (response) => {
        // console.log(response);
        setFaqs(response?.data || []);
        setEditFaqs(response?.data || []);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load faqs", err);
      }
    );
  };

  useEffect(() => {
    loadfaqs();
  }, []);

  const handleEnter = (e)=>{
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); 
        handleSaveFaq(); 
      }
  }

  // const isDisabled = !(
  //   faqs.title &&
  //   faqs.body &&
  //   faqs.scheduled_date
  // );

  return (
    <>
      {loading ? (
        <div>Loading faqs......</div>
      ) : !faqs || faqs.length === 0 ? (
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
                    placeholder="Search Faq..."
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
                onClick={handleAddNewFaq}
                className="px-6 py-2 bg-[#ED1450] text-sm text-white rounded-full font-Manrope"
              >
                + Add new Faq
              </button>
            </div>
          </div>

          <table className="w-full text-left border rounded-lg font-Manrope">
            <thead className="bg-white text-[13px]">
              <tr>
                <th className="p-4 text-gray-500">S/N</th>
                <th className="p-4">Faq</th>
                <th className="p-4">Description</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {faqs &&
                faqs.map &&
                faqs.map((row, index) => (
                  <tr key={row.id} className="text-sm border-t">
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 text-gray-500">{row.title}</td>
                    <td className="p-4">{row.excerpt}</td>
                    <td className="flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => handleEditFaq(row)}
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
                        onClick={() => handleDeleteFaq(row.id)}
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
                className="bg-white rounded-2xl p-6 w-[400px] md:mx-5 overflow-auto space-y-5 font-Manrope"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold font-Manrope">
                  {editFaqs.id ? "Edit Faq" : "Add New Faq"}
                </h2>
                <div>
                  <label className="block mb-1 text-sm font-semibold">
                    Faq
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Faq"
                    value={editFaqs.title || ""}
                    onChange={handleNewChange}
                    onKeyDown={handleEnter}
                    className="w-full px-3 py-2 border border-gray-300 text-sm rounded-[30px]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold">
                    Description
                  </label>
                  <textarea
                    name="excerpt"
                    placeholder="Enter description"
                    value={editFaqs.excerpt || ""}
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
                    onClick={handleSaveFaq}
                    className='px-3 py-2 w-1/2 rounded-[32px] text-white bg-[#ED1450]'
                  >
                      {loading ? (
      <div className="flex items-center justify-center">
        {/* Spinner for the loading state */}
        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
      </div>) : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDeletePopup && (
            <div  onClick={()=>setShowDeletePopup(false)} className=" fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
              <div  onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope flex flex-col items-center">
               <Image
                                              src={alert.src}
                                              alt="view icon"
                                              width={98}
                                              height={98}
                                              priority
                                              className="text-center"
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
                    onClick={()=>confirmDeleteFaq(faqs.id)}
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

