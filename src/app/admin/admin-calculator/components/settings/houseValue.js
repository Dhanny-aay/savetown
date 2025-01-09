import edit from "../../assets/edit.svg";
import Image from "next/image";
import trash from "../../assets/trash.svg";
import search from "../../assets/search.svg";
import { useEffect, useState } from "react";
import { fetchBlog } from "@/app/admin/adminControllers/blogController";

export default function HouseValue() {
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(false);

   const loadMedia = async () => {
       setLoading(true);
       await fetchBlog(
         { page: 1, 
           type: "Media", 
           // category: "Partners", 
           page: "Media" },
         (response) => {
           console.log(response);
           setMedia(response?.data || []);
           setLoading(false);
         },
         (err) => {
           console.error("unable to load media", err);
         }
       );
     };
   
     useEffect(() => {
       loadMedia();
     }, []);

  return (
    <div>
      {/* Search bar and Add new slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center">

          <div className="w-full flex justify-end">
            {/* Add new slide Button */}
            <button onClick={()=>{handleCreateEntry()}}
            className="px-6 py-2 bg-[#ED1450] text-white rounded-full font-Manrope">
              {"\u002B"} Add new entry
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading media....</div>
      ) : (
        <table className="w-full text-left border rounded-lg font-Manrope shadow">
          <thead className="bg-white text-[13px]">
            <tr>
              <th className="p-4 text-gray-500">S/N</th>
              <th className="p-4 w-[200px]">Title</th>
              <th className="p-4">Minimum Value</th>
              <th className="p-4">Maximun Value</th>
              <th className="p-4">Created On</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {media && media.map && media.map((media, index) => (
              <tr key={media.id} className="border-t text-sm">
                <td className="p-4 text-gray-500">{index + 1}</td>
                <td className="p-4 w-[200px] text-gray-500">{media.title}</td>
                <td className="p-4">{media.excerpt}</td>
                <td className="p-4">{media.title}</td>
                <td className="p-4">{media.title}</td>
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
