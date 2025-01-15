"use client";
import { useEffect, useState } from "react";
import { fetchWallet } from "../adminControllers/walletController";
import ViewModal from "./components/viewModal";
import { useRouter } from "next/navigation";
import Pagination from "../components/pagination";

export default function AdminWallet() {
  const [wallet, setWallet] = useState([
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
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = wallet.slice(startIndex, lastIndex);
  const totalPages = Math.ceil(wallet.length / recordsPerPage);

  const loadWallets = async () => {
    setLoading(true);
    const response = await fetchWallet({});
    setWallet(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    loadWallets();
  }, []);

  const handleView = (wallet) => {
    setShowModal(true);
    setSelectedUser(wallet);
  };

  const router = useRouter();

  return (
    <>
      {loading ? (
           <div className="flex items-center justify-center h-[50vh]">
           {/* Spinner for the loading state */}
           <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
         </div>
      ) : !wallet || wallet.length === 0 ? (
        <div className="text-center text-gray-500">
          No information available to display.
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4 font-Manrope">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => router.back()}
                className="text-[#ED1450] hover:underline text-base font-normal"
              >
                &lt; Back
              </button>
              <h3 className="text-lg font-bold text-black md:text-2xl">
                Fincra Wallet Balance
              </h3>
            </div>
          </div>
          <table className="w-full text-left border rounded-lg font-Manrope">
            <thead className="text-sm bg-white">
              <tr>
                <th className="p-4 text-gray-500">S/N</th>
                <th className="p-4">ID</th>
                <th className="p-4">Business</th>
                <th className="hidden p-4 md:table-cell">Business ID</th>
                <th className="hidden p-4 md:table-cell">Ledger Balalance</th>
                <th className="hidden p-4 md:table-cell">Available Balance</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {records &&
                records.map &&
                records.map((wallet, index) => (
                  <tr key={wallet.id} className="text-sm border-t">
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 text-gray-500">{wallet.identifier}</td>
                    <td className="p-4">{wallet.business}</td>
                    <td className="hidden p-4 text-gray-500 md:table-cell">
                      {wallet.business_id}
                    </td>
                    <td className="hidden p-4 text-gray-500 md:table-cell">
                      {wallet.ledger_balance}
                    </td>
                    <td className="hidden p-4 text-gray-500 md:table-cell">
                      {wallet.locked_balance}
                    </td>
                    <td className="p-4 text-[#ED1450] text-sm ">
                      <button onClick={()=>handleView(wallet)}>View More</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
          {showModal && (<ViewModal onClose={setShowModal} user={selectedUser}/>)}
        </div>
      )}
    </>
  );
}
