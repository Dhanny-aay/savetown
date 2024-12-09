// import { useRouter } from 'next/router';
import Image from "next/image";
import search from './assets/search.svg';
import Table from './../components/table';

export default function AdminTransactions() {
  // const router = useRouter();

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
                Transactions
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
                  placeholder="Search transactions..."
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
          <Table />
        </div>
  );
}
