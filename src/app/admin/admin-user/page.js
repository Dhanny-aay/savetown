// import { useRouter } from 'next/router';
import Image from "next/image";
import search from "../admin-transactions/assets/search.svg";
import edit from './assets/edit.svg';
import trash from './assets/trash.svg'
import eye from './assets/eye.svg';


export default function AdminUser() {
  // const router = useRouter();
  const users = [
    {
      id: 1,
      name: "Esther Howard",
      email: "estherhoward@gmail.com",
      role: "-",
      status: "Verified",
      dateJoined: "May 30th, 2024",
    },
    {
      id: 2,
      name: "Brooklyn Simmons",
      email: "brooklynsimmons@gmail.com",
      role: "-",
      status: "Unverified",
      dateJoined: "May 30th, 2024",
    },
    {
      id: 3,
      name: "Arlene McCoy",
      email: "arlenemccoy@gmail.com",
      role: "Group Leader",
      status: "Pending",
      dateJoined: "May 30th, 2024",
    },
    {
      id: 4,
      name: "Albert Flores",
      email: "albertflores@gmail.com",
      role: "-",
      status: "Verified",
      dateJoined: "May 30th, 2024",
    },
    {
      id: 5,
      name: "Eleanor Pena",
      email: "eleanorpena@gmail.com",
      role: "-",
      status: "Verified",
      dateJoined: "May 30th, 2024",
    },
    {
      id: 6,
      name: "Annette Black",
      email: "annetteblack@gmail.com",
      role: "Group Leader",
      status: "Verified",
      dateJoined: "May 30th, 2024",
    },
  ];

  return (
    <div className="flex flex-col px-3 h-full space-y-4">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button
            // onClick={() => router.back()} // Navigates to the previous page
            className="text-[#ED1450] hover:underline text-base font-normal"
          >
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            User Management
          </h3>
        </div>
      </div>

      {/* Search Bar and Table Section */}
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative w-full font-Manrope ">
            <input
              type="text"
              placeholder="Search by User Name..."
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
      </div>

      {/* Table Section with Fixed Height */}
      <div className="overflow-auto max-h-[100%] h-screen md:h-[55vh]">
        <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-4 w-[64px] font-semibold">S/N</th>
              <th className="p-4 font-semibold">Names</th>
              <th className="p-4 font-semibold">Email Address</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold">Date Joined</th>
              <th className="p-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-t">
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {index + 1}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {user.name}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {user.email}
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {user.role}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === "Verified"
                        ? "bg-green-100 text-green-600"
                        : user.status === "Unverified"
                        ? "bg-red-100 text-red-600"
                        : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                  {user.dateJoined}
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
                      src={eye.src}
                      alt="eye icon"
                      width={20}
                      height={20}
                      priority
                    />
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
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
      </div>
    </div>
  );
}
