import { useEffect, useState } from "react";
import edit from "../assets/edit.svg";
import Image from "next/image";
import { fetchBlog } from "../../adminControllers/blogController";

export default function OurHome() {
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(false);

 const loadTeams = async () => {
     setLoading(true);
     await fetchBlog(
       { page: 1, 
         type: "Team", 
         // category: "Partners", 
         page: "About Us" },
       (response) => {
         // console.log(response);
         setTeams(response?.data || []);
         setLoading(false);
       },
       (err) => {
         console.error("unable to load teams", err);
       }
     );
   };
 
   useEffect(() => {
     loadTeams();
   }, []);
   return (
     <>
       {loading ? (
         <div>Loading information......</div>
       ) : !teams || teams.length === 0 ? (
         <div className="text-center text-gray-500">
           No information available to display.
         </div>
       ) : (
    <div>
      <table className="w-full text-left border rounded-lg font-Manrope shadow">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4 w-[400px]">Heading</th>
            <th className="p-4">Sub heading</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {teams && teams.map && teams.map((team, index) => (
            <tr key={team.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 w-[400px] text-gray-500">{team.title}</td>
              <td className="p-4">{team.excerpt}</td>
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
