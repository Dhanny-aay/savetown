import { useEffect, useState } from "react";
import edit from "../assets/edit.svg";
import Image from "next/image";
import { fetchBlog } from "../../adminControllers/blogController";

export default function Headline() {
  const [headlines, setHeadlines] = useState({})
  const [loading, setLoading] = useState(false);

  const loadHeadlines = async () => {
    setLoading(true);
    await fetchBlog(
      { page: 1, 
        type: "PageTitle", 
        // category: "Partners", 
        page: "About" },
      (response) => {
        // console.log(response);
        setHeadlines(response?.data || []);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load headlines", err);
      }
    );
  };

  useEffect(() => {
    loadHeadlines();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading information......</div>
      ) : !headlines || headlines.length === 0 ? (
        <div className="text-center text-gray-500">
          No information available to display.
        </div>
      ) : (
    <div>
    <table className="w-full text-left border rounded-lg font-Manrope shadow">
      <thead className="bg-white text-[13px]">
        <tr>
          <th className="p-4 text-gray-500">S/N</th>
          <th className="p-4">Heading</th>
          <th className="p-4">Subheading</th>
          {/* <th className="p-4">Type</th> */}
          <th className="p-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {headlines && headlines.map && headlines.map((headline, index) => (
          <tr key={headline.id} className="border-t text-sm">
            <td className="p-4 text-gray-500">{index + 1}</td>
            <td className="p-4 text-gray-500">{headline.title}</td>
            <td className="p-4">{headline.excerpt}</td>
            {/* <td className="p-4 text-gray-500">{headline.type}</td> */}
            <td className="p-4">
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
