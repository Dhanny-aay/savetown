import { useEffect, useState } from "react";
import edit from "../assets/edit.svg";
import Image from "next/image";
import { fetchBlog } from "../../adminControllers/blogController";

export default function OurStats() {
  const [stats, setStats] =  useState({});
  const [loading, setLoading] = useState(false);

  const loadstats = async () => {
    setLoading(true);
    await fetchBlog(
      { page: 1, 
        type: "Stats", 
        // category: "Partners", 
        page: "About" },
      (response) => {
        // console.log(response);
        setStats(response?.data || []);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load stats", err);
      }
    );
  };

  useEffect(() => {
    loadstats();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading information......</div>
      ) : !stats || stats.length === 0 ? (
        <div className="text-center text-gray-500">
          No information available to display.
        </div>
      ) : (
    <div>
      <table className="w-full text-left border rounded-lg font-Manrope shadow">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4 ">Stat Title</th>
            <th className="p-4 ">Stat</th>
            <th className="p-4">Sub heading</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {stats && stats.map && stats.map((stat, index) => (
            <tr key={stat.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 text-gray-500">{stat.title}</td>
              <td className="p-4 text-gray-500">{stat.excerpt}</td>
              <td className="p-4">{stat.description}</td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}
    </>
  );
}
