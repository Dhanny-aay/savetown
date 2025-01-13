import { useEffect, useState } from "react";
import search from "./assets/search.svg";
import Image from "next/image";
import CalculatorModal from "./components/calculatorModal";
import { calculatorDisplay } from "../adminControllers/calculatorController";
import Pagination from './../components/pagination';

export default function User() {
  const [calcData, setCalcData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showCModal, setShowCModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(startIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = calcData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(calcData);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setFilteredData(calcData); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleView = (userStatus) => {
    setShowCModal(true);
    setSelectedUser(userStatus);
  };

  const fetchData = async () => {
    setLoading(true)
    const response = await calculatorDisplay({});
    const calcUser = response.data;
    setCalcData(calcUser);
    setFilteredData(calcUser); 
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        {/* Spinner for the loading state */}
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-full font-Manrope">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="w-full px-6 py-2 pl-10 border border-gray-300 rounded-full"
            />
            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
              <Image
                src={search.src}
                alt="search icon"
                width={16}
                height={16}
                priority
              />
            </span>
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-[#ED1450] text-white rounded-full text-sm lg:text-base font-Manrope"
          >
            Search
          </button>
        </div>
      </div>

      <table className="w-full mt-4 bg-white rounded font-Manrope">
        <thead>
          <tr className="text-left font-Manrope">
            <th className="p-4 w-[64px] font-semibold text-sm md:text-lg">
              S/N
            </th>
            <th className="p-4 text-sm font-semibold md:text-lg">Names</th>
            <th className="p-4 text-sm font-semibold md:text-lg max-lg:hidden">
              Email Address
            </th>
            <th className="p-4 w-[100px] text-center font-semibold text-sm md:text-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map &&
            records.map((user, index) => (
              <tr key={user.id} className="border-t">
                <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                  {index + 1}
                </td>
                <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                  <div className="max-lg:flex max-lg:flex-col">
                    {user.name}
                    <span className="lg:hidden max-sm:text-xs max-lg:text-black max-lg:font-medium">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-[#5F6D7E] max-lg:hidden text-xs md:text-sm font-Manrope font-medium">
                  {user.email}
                </td>
                <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium text-center">
                  <button
                    onClick={() => handleView(user)}
                    className="cursor-pointer text-[#ED1450] hover:text-[#ED1450]"
                  >
                    View
                  </button>
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

      {showCModal ? (
        <CalculatorModal onClose={setShowCModal} user={selectedUser} />
      ) : null}
    </div>
  );
}
