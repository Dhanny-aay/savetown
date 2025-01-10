import { useEffect, useState } from "react";
import { showUsersTransactions } from "../../adminControllers/usersController";

export default function UserTransactions({user}) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false)
  const userid = user.id

      const fetchTransaction = async () => {
        setLoading(true);
        await showUsersTransactions(
          `${userid}`,
          (response) => {
            setTransactions(response.data);
            setLoading(false);
          },
          (err) => {
            console.error("Error fetching user info:", err);
          }
        );
      };
    
      useEffect(() => {
          fetchTransaction();
      }, [userid]);
    
      if (!transactions) {
        return <p>Loading user transaction...</p>;
      }
      
    return (
        <div className="overflow-auto w-full md:h-[100%] ">
          {loading ? (<div>loading transactions..</div>) : ( 
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
            {transactions.map((tx, index) => (
           <tr key={tx.id} className="border-t">
           <td className="p-4 text-[#5F6D7E] max-sm:p-2 text-sm font-medium">
             {index + 1}
           </td>
         
           <td className="max-sm:p-2 max-sm:text-xs max-lg:text-black max-lg:font-bold p-4 text-[#5F6D7E] text-sm font-medium max-lg:text-left">
             <div className="max-lg:flex max-lg:flex-col">
               {tx.user.first_name}  {tx.user.last_name}
               <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                 Savetown Wallet
               </span>
             </div>
           </td>

           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-left max-lg:hidden">
             {tx.description}
           </td>
         
           <td className="max-sm:p-2 max-sm:text-xs max-lg:text-black max-lg:font-bold p-4 text-[#5F6D7E] text-sm font-medium text-right max-lg:text-left">
             <div className="max-lg:flex max-lg:flex-col">
               {tx.currency === 'USD' ? '$' : '₦'} {tx.amount}
               <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                 {tx.identifier}
               </span>
             </div>
           </td>
         
           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-right max-lg:hidden">
             {tx.identifier}
           </td>
         
           <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-center">
             <span
               className={`capitalize inline-block w-[90px] px-3 py-2 rounded-full text-sm font-medium ${
                 tx.status === "Successful" || 'approved'
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
          {/* Pagination */}
  <Pagination/>
      </div>
    )
}

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


