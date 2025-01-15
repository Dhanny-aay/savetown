import { useEffect, useState } from "react";
import { showUsersTransactions } from "../../adminControllers/usersController";
import Pagination from "../../components/pagination";

export default function UserTransactions({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = transactions.slice(startIndex, lastIndex);
  const totalPages = Math.ceil(transactions.length / recordsPerPage);
  const userid = user.id;

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
      {loading ? (
        <div>loading transactions..</div>
      ) : transactions.length === 0 ? (
        <div className="mt-5 text-[#5F6D7E] text-sm">No transactions available to display</div>
      ) : (
        <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-4 w-[64px] max-sm:w-[30px] max-sm:p-2 font-semibold">
                S/N
              </th>
              <th className="p-4 max-sm:p-2 font-semibold">Name</th>
              <th className="p-4 max-sm:p-2 font-semibold max-[1024px]:hidden">
                Savings Plan
              </th>
              <th className="p-4 max-sm:p-2 w-[99px] max-lg:w-[150px] text-right max-lg:text-left font-semibold">
                Amount
              </th>
              <th className="p-4 w-[148px] max-sm:p-2 text-right font-semibold max-[1024px]:hidden">
                Transaction ID
              </th>
              <th className="p-4 w-[149px] max-sm:p-2 text-center font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((tx, index) => (
              <tr key={tx.id} className="border-t">
                <td className="p-4 text-[#5F6D7E] max-sm:p-2 text-sm font-medium">
                  {index + 1}
                </td>

                <td className="max-sm:p-2 max-sm:text-xs max-lg:text-black max-lg:font-bold p-4 text-[#5F6D7E] text-sm font-medium max-lg:text-left">
                  <div className="max-lg:flex max-lg:flex-col">
                    {tx.user.first_name} {tx.user.last_name}
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
                    {tx.currency === "USD" ? "$" : "₦"} {tx.amount}
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
                      tx.status === "Successful" || "approved"
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
