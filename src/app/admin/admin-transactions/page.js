"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import search from "./assets/search.svg";
import { fetchTransactions } from "../adminControllers/transactionControl";

export default function AdminTransactions() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const showTransactions = async () => {
    setLoading(true);
    await fetchTransactions(
      { page: 1, limit: 10 },
      (response) => {
        setTransactions(response?.data);
        setFilteredUsers(response?.data);
        setLoading(false);
      },
      (err) => {
        console.error("unable to load transactions", err);
      }
    );
  };

  useEffect(() => {
    showTransactions();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(transactions); // Reset data when search is cleared
    } else {
      setFilteredUsers(
        transactions.filter(
          (transaction) =>
            `${transaction.user.first_name} ${transaction.user.last_name}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            `${transaction.status}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, transactions]); 

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
    }
  };

  return (
    <div className="flex flex-col px-3 h-full space-y-4">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="text-[#ED1450] hover:underline text-base font-normal"
          >
            &lt; Back
          </button>
          <h3 className="text-base md:text-2xl font-bold text-black">
            Transactions
          </h3>
        </div>
      </div>

      {/* Search Bar and Table Section */}
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative w-full font-Manrope">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-2 text-sm md:text-base pl-10 border border-gray-300 rounded-full"
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
          <button
            onClick={() => {} /* Optional: Keep for UI consistency */}
            className="px-6 text-sm md:text-base py-2 bg-[#ED1450] text-white rounded-full font-Manrope"
          >
            Search
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <h3 className="text-sm md:text-2xl font-bold text-black">
          All Transactions
        </h3>
      </div>

      {/* Table Section with Fixed Height */}
      <div className="overflow-auto w-full md:h-[100%]">
        {loading ? (
          <div>Loading transactions...</div>
        ) : (
          <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4 w-[64px] max-sm:w-[30px] max-sm:p-2 font-semibold">
                  S/N
                </th>
                <th className="p-4 max-sm:p-2 font-semibold">Name</th>
                <th className="p-4 max-sm:p-2 w-[103px] max-lg:w-[155px] text-left max-lg:text-left font-semibold">
                  Amount
                </th>
                <th className="p-4 w-[148px] max-sm:p-2 text-right font-semibold hidden md:block">
                  Transaction ID
                </th>
                <th className="p-4 w-[149px] max-sm:p-2 text-center font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((tx, index) => (
                <tr key={tx.id} className="border-t">
                  <td className="p-4 text-[#5F6D7E] max-sm:p-2 text-sm font-medium">
                    {index + 1}
                  </td>

                  <td className="max-sm:p-2 max-sm:text-xs p-4 text-[#5F6D7E] text-sm font-medium max-lg:text-left">
                    <div className="max-lg:flex max-lg:flex-col">
                      {tx.user.first_name} {tx.user.last_name}
                    </div>
                  </td>

                  <td className="max-sm:p-2 max-sm:text-xs max-md:text-black max-md:font-bold p-4 text-[#5F6D7E] text-sm font-medium text-left max-lg:text-left">
                    <div className="max-lg:flex max-lg:flex-col">
                      {tx.currency === "USD" ? "$" : "₦"} {tx.amount}
                      <span className="md:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                        {tx.identifier}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-center max-md:hidden">
                    {tx.identifier}
                  </td>

                  <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-center">
                    <span
                      className={`inline-block w-[90px] px-3 py-2 rounded-full text-sm font-medium capitalize ${
                        tx.status === "successful"
                          ? "bg-green-100 text-green-600"
                          : tx.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-[#ED1450]"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
