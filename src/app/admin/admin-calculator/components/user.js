import { useEffect, useState } from "react";
import search from "../assets/search.svg";
import Image from "next/image";
import CalculatorModal from "./calculatorModal";
import { calculatorDisplay } from "../../adminControllers/calculatorController";

export default function User() {
  const [calcData, setCalcData] = useState([]);
  const [showCModal, setShowCModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = () => {
    // setFilteredUsers(
    //   users.filter((user) =>
    //     `${user.first_name} ${user.last_name}`
    //       .toLowerCase()
    //       .includes(searchQuery.toLowerCase())
    //   )
    // );
  };

  const handleView = (userStatus) => {
    // let userid = userStatus.id;
        setShowCModal(true);
        setSelectedUser(userStatus);
  };

  const fetchData = async () => {
   let response = await calculatorDisplay({});
   let calcUser = response.data
    setCalcData(calcUser);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-full font-Manrope">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Adjust the height to fit the screen */}
      <table className="w-full mt-4 bg-white rounded shadow ">
        <thead>
          <tr className="text-left font-Manrope">
            <th className="p-4 w-[64px] font-semibold text-sm md:text-lg">
              S/N
            </th>
            <th className="p-4 text-sm font-semibold md:text-lg">Names</th>
            <th className="p-4 text-sm font-semibold md:text-lg max-lg:hidden">
              Email Address
            </th>
            {/* <th className="p-4 w-[130px] font-semibold text-sm md:text-lg">
              Device Type
            </th> */}
            {/* <th className="p-4 w-[148px] text-center font-semibold text-sm md:text-lg">
              Status
            </th> */}
            <th className="p-4 w-[100px] text-center font-semibold text-sm md:text-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {calcData &&
            calcData.map &&
            calcData.map((user, index) => (
              <tr key={user.id} className="border-t ">
                <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                  {index + 1}
                </td>
                <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                  <div className="max-lg:flex max-lg:flex-col">
                  {user.name}
                    {/* {user.first_name} {user.last_name} */}
                    <span className="lg:hidden max-sm:text-xs max-lg:text-black max-lg:font-medium">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-[#5F6D7E] max-lg:hidden text-xs md:text-sm font-Manrope font-medium">
                  {user.email}
                </td>
                {/* <td className="p-4 text-[#5F6D7E] text-xs md:text-sm font-Manrope font-medium">
                  <div>
                    {user.device}
                    <span
                      className={`lg:hidden inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        user.id_status === "verified"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-[#ED1450]"
                      }`}
                    >
                      {user.id_status}
                    </span>
                  </div>
                </td> */}
                {/* <td className="p-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-normal capitalize ${
                      user.id_status === "verified"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-[#ED1450]"
                    }`}
                  >
                    {user.id_status}
                  </span>
                </td> */}
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


      {showCModal ? (
        <CalculatorModal onClose={setShowCModal} user={selectedUser} />
      ) : null}
    </div>
  );
}