import edit from "./assets/edit.svg";
import Image from "next/image";
import trash from "./assets/trash.svg";
import search from "./assets/search.svg";
import { useEffect, useState } from "react";
import { fetchBlog } from "../adminControllers/blogController";

export default function Faq() {
  const [faqs, setFaqs] = useState({});
  const [loading, setLoading] = useState(false);

   const loadFaqs = async () => {
       setLoading(true);
       await fetchBlog(
         { page: 1, 
           type: "FAQ", 
           // category: "Partners", 
           page: "landing" },
         (response) => {
           // console.log(response);
           setFaqs(response?.data || []);
           setLoading(false);
         },
         (err) => {
           console.error("unable to load faqs", err);
         }
       );
     };
   
     useEffect(() => {
       loadFaqs();
     }, []);

  return (
    <div>
      {/* Search bar and Add new slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 w-1/2">
            {/* Search Bar */}
            <div className="relative w-full font-Manrope">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-6 py-2 pl-10 border border-gray-300 rounded-full"
              />
              {/* Search Icon */}
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
            {/* Search Button */}
            <button className="px-6 py-2 bg-[#ED1450] text-white rounded-full font-Manrope">
              Search
            </button>
          </div>
          <div className="w-1/2 flex justify-end">
            {/* Add new slide Button */}
            <button className="px-6 py-2 bg-[#ED1450] text-white rounded-full font-Manrope">
              {"\u002B"} Add new Team
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading faqs....</div>
      ) : (
        <table className="w-full text-left border rounded-lg font-Manrope shadow">
          <thead className="bg-white text-[13px]">
            <tr>
              <th className="p-4 text-gray-500">S/N</th>
              <th className="p-4 w-[200px]">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs && faqs.map && faqs.map((faq, index) => (
              <tr key={faq.id} className="border-t text-sm">
                <td className="p-4 text-gray-500">{index + 1}</td>
                <td className="p-4 w-[200px] text-gray-500">{faq.title}</td>
                <td className="p-4">{faq.excerpt}</td>
                <td className="p-4 flex items-center justify-center gap-2">
                  <button className="text-gray-500 hover:text-gray-800">
                    <Image
                      src={edit.src}
                      alt="edit icon"
                      width={20}
                      height={20}
                      priority
                    />
                  </button>
                  <button className="text-gray-500 hover:text-gray-800">
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
      )}
    </div>
  );
}
