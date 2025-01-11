"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import search from "./assets/search.svg";
import FileUploader from "@/app/utils/fileUploader";
import { createBlog, deleteBlog, fetchBlog, updateBlog } from "../adminControllers/blogController";


export default function Partners() {
  const [partners, setPartners] = useState({
    id: "",
    title: "",
    excerpt: "",
    type: "",
  });
  const [editPartners, setEditPartners] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditSlide = (headline) => {
    setEditPartners(headline);
    setShowEditModal(true);
  };

  const handleDeleteSlide = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDeleteTeam = async() => {
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
  };

  const handleAddNewTeam = () => {
    setEditPartners({ id: null, title: "", excerpt: "", image: "" });
    setShowEditModal(true);
  };

  const handleSaveTeam = async () => {
    if (editPartners.id) {
      const updatedpartners = partners.map((headline) =>
        headline.id === editPartners.id ? editPartners : headline
      );
      // setPartners(updatedpartners);
      console.log("edit", updatedpartners);
      await updateBlog(
        `${editPartners.id}`,
        {
          title: `${updatedpartners.title}`,
          type: "Reason",
          link: "http://langosh.com/",
          category: "cumque",
          location: "pariatur",
          content: "autem",
          date: "2025-01-08T14:57:42",
          time: "accusamus",
          author: "debitis",
          excerpt: `${updatedpartners.excerpt}`,
          description: "Nisi vero dolorem ut.",
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
        ...editPartners,
      };
      console.log(newSlide);
      // setPartners([
      //   ...partners,
      //   { ...editPartners, id: Date.now() },
      // ]);
      await createBlog(
        {
          title: `${newSlide.title}`,
          excerpt: `${newSlide.excerpt}`,
          type: "Slider",
          link: `${newSlide.image}`,
          location: "qui",
          date: "2025-01-08T14:57:42",
          time: "sunt",
          conclusion:
            "http://www.tillman.com/sint-debitis-laudantium-tempora-ullam-nisi-beatae-vel-doloremque.html",
          status: "a",
          author: "vel",
          description: "Inventore enim eum maxime cum quia et.",
        },
        (response) => {
          console.log(response);
        },
        (err) => {
          console.err("unable to create partners", err);
        }
      );
    }
    setShowEditModal(false);
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setEditPartners({ ...editPartners, [name]: value });
  };

  const loadpartners = async () => {
    setLoading(true);
    await fetchBlog(
      {
        page: 1,
        type: "Partners",
        page: "landing",
      },
      (response) => {
        // console.log(response);
        setPartners(response?.data || []);
        setEditPartners(response?.data || []);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load blogs", err);
      }
    );
  };

  useEffect(() => {
    loadpartners();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading partners......</div>
      ) : !partners || partners.length === 0 ? (
        <div className="text-center text-gray-500">
          No information available to display.
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex justify-end">
              {/* Add New Slide */}
              <button
                onClick={handleAddNewTeam}
                className="px-6 py-2 bg-[#ED1450] text-sm text-white rounded-full font-Manrope"
              >
                + Add new partners
              </button>
            </div>
          </div>

          <table className="w-full text-left border rounded-lg font-Manrope ">
            <thead className="bg-white text-[13px]">
              <tr>
                <th className="p-4 text-gray-500">S/N</th>
                <th className="p-4">Heading</th>
                {/* <th className="p-4">Subheading</th> */}
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {partners &&
                partners.map &&
                partners.map((row, index) => (
                  <tr key={row.id} className="border-t text-sm">
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4  text-gray-500">{row.title}</td>
                    {/* <td className="p-4">{row.excerpt}</td> */}
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
                  {editPartners.id ? "Edit Partner" : "Add New Partner"}
                </h2>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Full Name"
                    value={editPartners.title || ""}
                    onChange={handleNewChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveSlide();
                    }}
                    className="w-full px-3 py-2 border border-gray-300 text-sm rounded-[30px]"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-semibold mb-1">
                    Sub Heading
                  </label>
                  <textarea
                    name="excerpt"
                    placeholder="Enter sub heading"
                    value={editPartners.excerpt || ""}
                    onChange={handleNewChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveSlide();
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl h-32 resize-none"
                  />
                </div> */}
                <div>
                  {editPartners.image ? (
                    <div className="relative">
                      {/* Display Image */}
                      <img
                        src={editPartners.image}
                        alt="Uploaded Feature"
                        width={300}
                        height={200}
                        className="rounded-lg"
                      />
                      {/* Cancel Button */}
                      <button
                        onClick={() =>
                          setEditPartners({ ...editPartners, image: null })
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
                        setEditPartners({
                          ...editPartners,
                          image: URL.createObjectURL(file),
                        })
                      }
                    />
                  )}
                </div>
                <div className="flex justify-between items-center w-full space-x-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-3 py-[11px] text-sm w-1/2 border bg-white border-gray-300 rounded-[30px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTeam}
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
              <div className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope ">
               <Image
                                              src={alert.src}
                                              alt="view icon"
                                              width={98}
                                              height={98}
                                              priority
                                            />
                        <h2 className="text-lg font-bold font-Manrope text-center">
                          Delete Section{" "}
                        </h2>
                        <p className="text-center">
                          {" "}
                          Are you sure you want to delete this section?
                        </p>
                        <p className="text-center">
                          {" "}
                          Are you sure you want to proceed? This action is irreversible and will permanently remove the section.
                        </p>
                <div className="flex justify-between items-center gap-4 ">
                  <button
                    onClick={() => setShowDeletePopup(false)}
                    className="px-3 py-[13px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
                  >
                    No, go back
                  </button>
                  <button
                    onClick={()=>confirmDeleteTeam(partners.id)}
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
