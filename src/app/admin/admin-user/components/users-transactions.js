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

export default function UserTransactions() {
    const transactions = [
        { id: 1, name: "Chinwe Okonkwo", transactionId: "SCI-20-0102", amount: "$10,000", status: "Successful", savingsPlan: "Savetown Wallet" },
        { id: 2, name: "Aisha Mohammed", transactionId: "SCI-20-0103", amount: "$10,000", status: "Failed", savingsPlan: "Savetown Wallet" },
        { id: 3, name: "Emeka Okafor", transactionId: "SCI-20-0104", amount: "$10,000", status: "Pending", savingsPlan: "Savetown Wallet" },
        { id: 4, name: "Fatima Ibrahim", transactionId: "SCI-20-0105", amount: "$10,000", status: "Successful", savingsPlan: "Savetown Wallet" },
        { id: 5, name: "Jide Adewale", transactionId: "SCI-20-0106", amount: "$10,000", status: "Successful", savingsPlan: "Savetown Wallet" },
        { id: 6, name: "Lara Adeleke", transactionId: "SCI-20-0107", amount: "$10,000", status: "Successful", savingsPlan: "Savetown Wallet" },
        { id: 7, name: "Obinna Eze", transactionId: "SCI-20-0108", amount: "$10,000", status: "Successful", savingsPlan: "Savetown Wallet" },
        { id: 8, name: "Chinonye Nwosu", transactionId: "SCI-20-0109", amount: "$10,000", status: "Successful", savingsPlan: "Savetown Wallet" },
        { id: 9, name: "Yakubu Bello", transactionId: "SCI-20-0110", amount: "$10,000", status: "Successful", savingsPlan: "Savetown Wallet" },
      ];
      
    return (
        <div className="overflow-auto w-full md:h-[100%] "> {/* Adjust the height to fit the screen */}
        <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-4 w-[64px] max-sm:w-[30px] max-sm:p-2 font-semibold">S/N</th>
              <th className="p-4 max-sm:p-2 font-semibold">Name</th>
              <th className="p-4 max-sm:p-2 font-semibold max-[1024px]:hidden">Savings Plan</th>
              <th className="p-4 max-sm:p-2 w-[99px] max-lg:w-[150px] text-right max-lg:text-left font-semibold">Amount</th>
              <th className="p-4 w-[148px] max-sm:p-2 text-right font-semibold max-[1024px]:hidden">Transaction ID</th>
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
               {tx.name}
               <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                 Savetown Wallet
               </span>
             </div>
           </td>

           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-left max-lg:hidden">
             {tx.savingsPlan}
           </td>
         
           <td className="max-sm:p-2 max-sm:text-xs max-lg:text-black max-lg:font-bold p-4 text-[#5F6D7E] text-sm font-medium text-right max-lg:text-left">
             <div className="max-lg:flex max-lg:flex-col">
               {tx.amount}
               <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                 {tx.transactionId}
               </span>
             </div>
           </td>
         
           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-right max-lg:hidden">
             {tx.transactionId}
           </td>
         
           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-center">
             <span
               className={`inline-block w-[90px] px-3 py-2 rounded-full text-sm font-medium ${
                 tx.status === "Successful"
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



