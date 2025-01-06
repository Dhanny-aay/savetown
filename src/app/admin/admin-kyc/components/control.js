import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([
    { id: 1, name: "NIN", status: "active" },
    { id: 2, name: "Voter's Card", status: "inactive" },
    { id: 3, name: "VIN", status: "inactive" },
    { id: 4, name: "CAC", status: "active" },
    { id: 5, name: "NIN Phone", status: "active" },
    { id: 6, name: "Virtual NIN", status: "active" },
    { id: 7, name: "BVN (Basic and Premium)", status: "active" },
    { id: 8, name: "Liveness", status: "active" },
    { id: 9, name: "Driver's License", status: "active" },
    { id: 10, name: "Face Verification", status: "inactive" },
  ]);

  const toggleStatus = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "active" ? "inactive" : "active" }
          : item
      )
    );
  };

  return (
    <div>
<table className="w-full mt-4 bg-white rounded shadow ">
        <thead>
          <tr  className="text-left  font-Manrope">
            <th className="p-4 w-[64px] font-semibold text-sm md:text-lg">S/N</th>
            <th className="p-4 font-semibold text-sm md:text-lg">Names</th>
            <th className="p-4 w-[64px] font-semibold text-sm md:text-lg">Status</th>
            <th className="p-4 w-[64px] font-semibold text-sm md:text-lg">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
             className="border-t "
            >
              <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">{index + 1}</td>
              <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">{item.name}</td>
              <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-light ${
                    item.status === "active"
                      ? "bg-green-100 text-green-400"
                      : "bg-red-100 text-[#ED1450]"

                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </td>
              <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                {/* Toggle Switch */}
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.status === "active"}
                    onChange={() => toggleStatus(item.id)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#ED1450] rounded-full peer dark:bg-[#DEDEE7] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#DEDEE7] peer-checked:bg-[#ED1450]"></div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
