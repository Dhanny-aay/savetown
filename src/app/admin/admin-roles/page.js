"use client";
import edit from './assets/edit.svg';
import trash from './assets/trash.svg';
import Image from "next/image"; // Ensure Image component is imported properly

export default function AdminRoles() {
  const roleList = [
    { id: 1, name: "Users", profiles: 300 },
    { id: 2, name: "Group Leader", profiles: 20 },
    { id: 3, name: "Admin", profiles: 3 },
    { id: 4, name: "Super Admin", profiles: 1 },
  ];

  return (
    <div className="flex flex-col px-3 h-full space-y-4">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button className="text-[#ED1450] hover:underline text-base font-normal">
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            Roles & Permissions
          </h3>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left border rounded-lg font-Manrope shadow">
        <thead className="bg-white text-[13px]">
          <tr>
            <th className="p-4 text-gray-500">S/N</th>
            <th className="p-4">Names</th>
            <th className="p-4">Number of Profiles</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {roleList.map((role) => (
            <tr key={role.id} className="border-t text-sm">
              <td className="p-4 text-gray-500">
                {role.id.toString().padStart(2, "0")}
              </td>
              <td className="p-4">{role.name}</td>
              <td className="p-4 text-gray-500">{role.profiles}</td>
              <td className="p-4 flex items-center gap-2">
                {/* Edit Button */}
                <button className="text-gray-500 hover:text-gray-800">
                  <Image
                    src={edit.src} 
                    alt="Edit Icon"
                    width={20}
                    height={20}
                    priority
                  />
                </button>
                {/* Delete Button */}
                <button className="text-gray-500 hover:text-gray-800">
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
    </div>
  );
}

