import edit from "./assets/edit.svg";
import Image from "next/image";
import trash from "./assets/trash.svg";
import search from "./assets/search.svg";
import { useEffect, useState } from "react";
import { fetchBlog } from "../adminControllers/blogController";

export default function Careers(first) {
 const [jobList, setJobList] = useState({});
  const [loading, setLoading] = useState(false);

   const loadCareers = async () => {
       setLoading(true);
       await fetchBlog(
         { page: 1, 
           type: "Careers", 
           // category: "Partners", 
           page: "Careers" },
         (response) => {
           // console.log(response);
           setJobList(response?.data || []);
           setLoading(false);
         },
         (err) => {
           console.error("unable to load careers", err);
         }
       );
     };
   
     useEffect(() => {
       loadCareers();
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
              {"\u002B"} Add new Job
            </button>
          </div>
        </div>
      </div>

      <div>
        {/* Table Section */}
        {loading ? (
        <div>Loading careers....</div>
      ) : (
        <table className="w-full text-left border rounded-lg font-Manrope shadow">
          <thead className="bg-white text-[13px]">
            <tr>
              <th className="p-4 text-gray-500">S/N</th>
              <th className="p-4">Job Title</th>
              <th className="p-4">Employment Type</th>
              <th className="p-4">Date Posted</th>
              {/* <th className="p-4">Applications Received</th> */}
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobList && jobList.map && jobList.map((job) => (
              <tr key={job.id} className="border-t text-sm">
                <td className="p-4 text-gray-500">
                  {job.id.toString().padStart(2, "0")}
                </td>
                <td className="p-4">{job.title}</td>
                <td className="p-4 text-gray-500">{job.excerpt}</td>
                <td className="p-4 text-gray-500">{job.time === null ? 'N/A' : job.time}</td>
                {/* <td className="p-4 text-center text-gray-500">{job.applications}</td> */}
                <td className="p-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600" 
                    }`}
                  >
                    {job.status === null ? 'N/A' : job.status }
                  </span>
                </td>
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
        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4">
          <button className="px-4 py-2 text-gray-600 rounded font-Manrope hover:underline">
            &larr; Prev
          </button>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-gray-600 rounded hover:underline">
              1
            </button>
            <button className="px-3 py-1 text-gray-600 rounded hover:underline">
              2
            </button>
            <span className="text-gray-500">...</span>
            <button className="px-3 py-1 text-gray-600 rounded hover:underline">
              5
            </button>
            <button className="px-3 py-1 text-gray-600 rounded hover:underline">
              6
            </button>
          </div>
          <button className="px-4 py-2 text-gray-600 rounded font-Manrope hover:underline">
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
