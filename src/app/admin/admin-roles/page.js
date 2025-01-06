"use client";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import Image from "next/image";
import { rolesDisplay } from "./../adminControllers/rolesController";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateRolesModal from "./components/createRolesModal";

export default function AdminRoles() {
  const [roleList, setRolesList] = useState({ id: "", name: "", profiles: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const displayRoles = async () => {
    setLoading(true);
    const response = await rolesDisplay({});
    console.log(response?.data);
    setRolesList(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    displayRoles();
  }, []);

  const router = useRouter();


  return (
    <>
      { loading ? (
        <div> Loading roles</div>
      ) :  (
        <div className="flex flex-col px-3 h-full space-y-4">
          {/* Header with Back Button */}
          <div className="flex justify-between items-center mb-4 font-Manrope">
            <div className="flex items-center space-x-2">
              {/* Back Button */}
              <button onClick={()=>router.back()} className="text-[#ED1450] hover:underline text-base font-normal">
                &lt; Back
              </button>
              <h3 className="text-xl md:text-2xl font-bold text-black">
                Roles
              </h3>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-[#ED1450] text-white text-sm md:text-base rounded-full font-Manrope"
            >
              {"\u002B"} Add new Role
            </button>
          </div>

          {/* Table */}
          <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4 max-sm:p-2 font-semibold">S/N</th>
                <th className="p-4 max-sm:p-2 font-semibold">Names</th>
                <th className="p-4 max-sm:p-2 font-semibold">Number of Profiles</th>
                <th className="p-4 max-sm:p-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {!roleList || roleList.length === 0 ? (
        <div className="text-center text-[#5F6D7E]">
          No roles available to display.
        </div>
      ) : null }
              {roleList &&
                roleList.map &&
                roleList.map((role) => (
                  <tr key={role.id} className="border-t text-sm">
                    <td className="p-4 max-sm:p-2 font-semibold text-[#5F6D7E]">{role.id}</td>
                    <td className="p-4 max-sm:p-2 font-semibold">{role.name}</td>
                    <td className="p-4 max-sm:p-2 font-semibold text-[#5F6D7E]">{role.profiles}</td>
                    <td className="p-4 max-sm:p-2 font-semibold flex items-center gap-2">
                      {/* Edit Button */}
                      <button className="text-[#5F6D7E] hover:text-gray-800">
                        <Image
                          src={edit.src}
                          alt="Edit Icon"
                          width={20}
                          height={20}
                          priority
                        />
                      </button>
                      {/* Delete Button */}
                      <button className="text-[#5F6D7E] hover:text-gray-800">
                        <Image
                          src={trash.src}
                          alt="Delete Icon"
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

           {showModal && ( <CreateRolesModal onClose={setShowModal}/> )}
        </div>
      )}
    </>
  );
}
