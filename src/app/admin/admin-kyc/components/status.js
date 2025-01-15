import { useEffect, useState } from "react";
import search from "../assets/search.svg";
import Image from "next/image";
import VerifiedModal from "./verifiedModal";
import UnverifiedModal from "./unverifiedModal";
import { fetchUsers } from "../../adminControllers/usersController";
import PendingModal from "./pendingModal";
import Pagination from "../../components/pagination";

export default function Status() {
  const [verificationData, setVerificationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showVModal, setShowVModal] = useState(false);
  const [showUvModal, setShowUvModal] = useState(false);
  const [showPModal, setShowPModal] = useState(false);
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
    const query = searchQuery.toLowerCase();
    if (query) {
      const filtered = verificationData.filter(
        (user) =>
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(verificationData); // Restore full data
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleView = (userStatus) => {
    let userid = userStatus.id;

    switch (userStatus.id_status) {
      case "verified":
        setShowVModal(true);
        setSelectedUser(userid);
        break;

      case "unverified":
        setSelectedUser(userid);
        setShowUvModal(true);
        break;

      case "pending":
        setShowPModal(true);
        setSelectedUser(userid);
        break;

      default:
        return null;
    }
  };

  const fetchData = async () => {
    setLoading(true)
    await fetchUsers(
      { page: 1, limit: 10 },
      (response) => {
        setVerificationData(response?.data);
        setFilteredData(response?.data); 
setLoading(false)
      },
      (err) => {
        console.error("Unable to display users", err);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(verificationData); // Restore data when searchQuery is cleared
    }
  }, [searchQuery, verificationData]);

  

  return (
    <div>
     { loading ? (
      <div className="flex items-center justify-center h-[50vh]">
        {/* Spinner for the loading state */}
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : ( 
      <>
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-full font-Manrope">
            <input
              type="text"
              placeholder="Search ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-6 py-2 pl-10 border border-gray-300 rounded-full"
            />
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
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-[#ED1450] text-white rounded-full font-Manrope"
          >
            Search
          </button>
        </div>
      </div>

      <table className="w-full mt-4 bg-white rounded">
        <thead>
          <tr className="text-left font-Manrope">
            <th className="p-4 w-[64px] font-semibold text-sm md:text-lg">
              S/N
            </th>
            <th className="p-4 font-semibold text-sm md:text-lg">Names</th>
            <th className="p-4 w-[150px] font-semibold text-sm md:text-lg max-lg:hidden">
              Email Address
            </th>
            <th className="p-4 w-[148px] text-center font-semibold text-sm md:text-lg">
              Status
            </th>
            <th className="p-4 w-[100px] max-lg:hidden text-center font-semibold text-sm md:text-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                {index + 1}
              </td>
              <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                <div className="max-lg:flex max-lg:flex-col">
                  {user.first_name} {user.last_name}
                  <span className="lg:hidden max-sm:text-xs max-lg:text-black max-lg:font-medium">
                    {user.email}
                  </span>
                </div>
              </td>
              <td className="p-4 text-[#5F6D7E] max-lg:hidden text-xs md:text-sm font-Manrope font-medium">
                {user.email}
              </td>
              <td className="p-4 text-center">
                <div className="flex flex-col justify-center items-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-normal capitalize ${
                      user.id_status === "verified"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-[#ED1450]"
                    }`}
                  >
                    {user.id_status}
                  </span>
                  <button
                    onClick={() => handleView(user)}
                    className="cursor-pointer lg:hidden text-[#ED1450] hover:text-[#ED1450] text-xs md:text-sm font-Manrope font-medium"
                  >
                    View
                  </button>
                </div>
              </td>
              <td className="p-4 max-lg:hidden text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium text-center">
                <button
                  onClick={() => handleView(user)}
                  className="cursor-pointer max-lg:hidden text-[#ED1450] hover:text-[#ED1450]"
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

      {showVModal ? (
        <VerifiedModal onClose={setShowVModal} user={selectedUser} />
      ) : null}
      {showUvModal ? (
        <UnverifiedModal onClose={setShowUvModal} user={selectedUser} />
      ) : null}
      {showPModal ? (
        <PendingModal onClose={setShowPModal} user={selectedUser} />
      ) : null}
      </>
    )}
    </div>
  );
}
