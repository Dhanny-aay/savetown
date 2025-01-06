import { useState } from "react";

const Pagination = () => {
    const [activePage, setActivePage] = useState(1);
  
    const handlePageClick = (page) => {
      setActivePage(page);
    };
  
    return (
      <div className="flex justify-between items-center mt-4 px-4">
        {/* Previous Button */}
        <button
          onClick={() => activePage > 1 && setActivePage(activePage - 1)}
          className={`flex items-center text-sm ${
            activePage === 1 ? "text-gray-500" : "text-[#5F6D7E] hover:text-[#ED1450]"
          }`}
        >
          <span className="mr-2">&larr;</span>Prev
        </button>
  
        {/* Page Numbers */}
        <div className="flex items-center space-x-2">
          {[1, 2, "...", 5, 6].map((page, index) =>
            typeof page === "number" ? (
              <span
                key={index}
                onClick={() => handlePageClick(page)}
                className={`text-sm cursor-pointer ${
                  activePage === page
                    ? "text-[#ED1450] font-bold"
                    : "text-[#5F6D7E] hover:text-[#ED1450]"
                }`}
              >
                {page}
              </span>
            ) : (
              <span key={index} className="text-sm text-[#5F6D7E]">
                {page}
              </span>
            )
          )}
        </div>
  
        {/* Next Button */}
        <button
          onClick={() => activePage < 6 && setActivePage(activePage + 1)}
          className={`flex items-center text-sm ${
            activePage === 6 ? "text-gray-500" : "text-[#5F6D7E] hover:text-[#ED1450]"
          }`}
        >
          Next<span className="ml-2">&rarr;</span>
        </button>
      </div>
    );
  };
  
;

export default function OngoingPlans() {
    const transactions = [
        { id: 1, planName: "Dream Home Fund", startDate: "Feb 01, 2024", targetAmount: "$100,000", totalSaved: "$15,000", nextPaymentDate: "Mar 01, 2024", status: "Active" },
        { id: 2, planName: "Mortgage Deposit", startDate: "Feb 01, 2024", targetAmount: "$100,000", totalSaved: "$20,000", nextPaymentDate: "Mar 01, 2024", status: "Stopped" },
        { id: 3, planName: "Dream Home Fund", startDate: "Feb 01, 2024", targetAmount: "$100,000", totalSaved: "$10,000", nextPaymentDate: "Mar 01, 2024", status: "Pause" },
        { id: 4, planName: "Mortgage Deposit", startDate: "Feb 01, 2024", targetAmount: "$100,000", totalSaved: "$10,000", nextPaymentDate: "Mar 01, 2024", status: "Active" },
        { id: 5, planName: "Dream Home Fund", startDate: "Feb 01, 2024", targetAmount: "$100,000", totalSaved: "$10,000", nextPaymentDate: "Mar 01, 2024", status: "Active" },
        { id: 6, planName: "Mortgage Deposit", startDate: "Feb 01, 2024", targetAmount: "$100,000", totalSaved: "$10,000", nextPaymentDate: "Mar 01, 2024", status: "Active" },
        { id: 7, planName: "Dream Home Fund", startDate: "Feb 01, 2024", targetAmount: "$100,000", totalSaved: "$10,000", nextPaymentDate: "Mar 01, 2024", status: "Active" },
    ];
    
      
    return (
        <div className="overflow-auto w-full md:h-[100%] "> {/* Adjust the height to fit the screen */}
        <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-4 w-[64px] max-sm:w-[30px] max-sm:p-2 font-semibold">S/N</th>
              <th className="p-4 max-sm:p-2 font-semibold">Plan Name</th>
              <th className="p-4 max-sm:p-2 font-semibold max-[1024px]:hidden">Start Date</th>
              <th className="p-4 max-sm:p-2 w-[99px] max-lg:w-[150px] text-right max-lg:text-left font-semibold"> Target Amount</th>
              <th className="p-4 w-[148px] max-sm:p-2 text-right font-semibold max-[1024px]:hidden">Total Saved / Paid</th>
              <th className="p-4 max-sm:p-2 font-semibold">Next Payment Date</th>
              <th className="p-4 w-[149px] max-sm:p-2 text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
           <tr key={tx.id} className="border-t">
           <td className="p-4 text-[#5F6D7E] max-sm:p-2 text-sm font-medium">
             {tx.id}
           </td>
         
           <td className="max-sm:p-2 max-sm:text-xs max-lg:text-black max-lg:font-bold p-4 text-[#5F6D7E] text-sm font-medium max-lg:text-left">
             <div className="max-lg:flex max-lg:flex-col">
               {tx.planName}
               <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                {tx.startDate}
               </span>
             </div>
           </td>

           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-left max-lg:hidden">
             {tx.startDate}
           </td>
         
           <td className="max-sm:p-2 max-sm:text-xs max-lg:text-black max-lg:font-bold p-4 text-[#5F6D7E] text-sm font-medium text-right max-lg:text-left">
             <div className="max-lg:flex max-lg:flex-col">
               {tx.targetAmount}
               <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                 {tx.totalSaved}
               </span>
             </div>
           </td>
         
           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-right max-lg:hidden">
             {tx.totalSaved}
           </td>

           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-left">
             {tx.nextPaymentDate}
           </td>
         
           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-center">
             <span
               className={`inline-block w-[90px] px-3 py-2 rounded-full text-sm font-medium ${
                 tx.status === "Active"
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

          {/* Pagination */}
  <Pagination/>
      </div>
    )
}



