"use client";
import { useEffect, useState } from "react";
import { fetchWallet } from "../adminControllers/walletController";
import ViewModal from "./components/viewModal";
import { useRouter } from "next/navigation";

export default function AdminWallet() {
  const [blog, setBlog] = useState([
    {
      id: "",
      heading: "",
      subheading: "",
      type: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadWallets = async () => {
    setLoading(true);
    const response = await fetchWallet({});
    setBlog(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    loadWallets();
  }, []);

  const handleView = (blog) => {
    setShowModal(true);
    setSelectedUser(blog);
  };

  const router = useRouter();

  return (
    <>
      {loading ? (
        <div>Loading wallet......</div>
      ) : !blog || blog.length === 0 ? (
        <div className="text-center text-gray-500">
          No information available to display.
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4 font-Manrope">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => router.back()}
                className="text-[#ED1450] hover:underline text-base font-normal"
              >
                &lt; Back
              </button>
              <h3 className="text-lg md:text-2xl font-bold text-black">
                Fincra Wallet Balance
              </h3>
            </div>
          </div>
          <table className="w-full text-left border rounded-lg font-Manrope">
            <thead className="bg-white text-sm">
              <tr>
                <th className="p-4 text-gray-500">S/N</th>
                <th className="p-4">ID</th>
                <th className="p-4">Business</th>
                <th className="p-4 hidden md:table-cell">Business ID</th>
                <th className="p-4 hidden md:table-cell">Ledger Balalance</th>
                <th className="p-4 hidden md:table-cell">Available Balance</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {blog &&
                blog.map &&
                blog.map((blog, index) => (
                  <tr key={blog.id} className="border-t text-sm">
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 text-gray-500">{blog.identifier}</td>
                    <td className="p-4">{blog.business}</td>
                    <td className="p-4 text-gray-500 hidden md:table-cell">
                      {blog.business_id}
                    </td>
                    <td className="p-4 text-gray-500 hidden md:table-cell">
                      {blog.ledger_balance}
                    </td>
                    <td className="p-4 text-gray-500 hidden md:table-cell">
                      {blog.locked_balance}
                    </td>
                    <td className="p-4 text-[#ED1450] text-sm ">
                      <button onClick={()=>handleView(blog)}>View More</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {showModal && (<ViewModal onClose={setShowModal} user={selectedUser}/>)}
        </div>
      )}
    </>
  );
}
