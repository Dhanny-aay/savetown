"use client";
import { useEffect, useState } from "react";
import { handleGetBankList } from "../userControllers/bankController";

const BankSelector = ({ setBank_id }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State to handle search term
  const [showSuggestions, setShowSuggestions] = useState(false); // To toggle suggestions

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await handleGetBankList();
        if (data) {
          setBanks(data.data);
        }
      } catch (error) {
        console.error("Error fetching banks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  // Filter banks based on search term
  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle suggestion click
  const handleSuggestionClick = (bankName, bankID) => {
    setSearchTerm(bankName); // Update input with selected bank name
    setBank_id(bankID); // Pass bank ID to the parent component
    setShowSuggestions(false); // Hide suggestions after selection
  };

  if (loading)
    return (
      <label
        htmlFor="bankName"
        className="flex flex-col w-full font-Manrope text-sm font-medium mt-4"
      >
        Bank Name
        <input
          value="Loading Banks..."
          className="w-full border border-[#D5D7DA] rounded-[32px] mt-2 text-body14Regular font-Manrope px-6 py-3"
          readOnly
        />
      </label>
    );

  return (
    <div className="relative flex flex-col w-full font-Manrope text-sm font-medium mt-4">
      <label htmlFor="bankName">Bank Name</label>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Bank"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true); // Show suggestions as user types
        }}
        className="w-full border border-[#D5D7DA] rounded-[32px] mt-2 text-body14Regular font-Manrope px-6 py-3"
      />

      {/* Show dropdown suggestions */}
      {showSuggestions && searchTerm && (
        <ul className="absolute z-10 w-full bg-white border font-Manrope text-body14Medium border-[#EAEBF0] max-h-60 overflow-auto mt-1 rounded-lg shadow-lg">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(item.name, item.id)}
                className="p-2 hover:bg-gray-100 cursor-pointer font-Manrope text-body12Medium  text-[#676767]"
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="p-2">No banks found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BankSelector;
