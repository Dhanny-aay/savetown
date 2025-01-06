import { useEffect, useState } from "react";
import { fetchTransactions } from "../adminControllers/transactionControl";

export default function Table(second) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const showTransactions = async () => {
    setLoading(true);
    await fetchTransactions(
      { page: 1, limit: 10 },
      (response) => {
        setTransactions(response?.data);
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

  return (
    <>
      <div className="overflow-auto w-full md:h-[100%] ">
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
                <th className="p-4 w-[148px] max-sm:p-2 text-right font-semibold max-[768px]:hidden">
                  Transaction ID
                </th>
                <th className="p-4 w-[149px] max-sm:p-2 text-center font-semibold">
                  Status
                </th>
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
                      {tx.description}
                      <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                        Savetown Wallet
                      </span>
                    </div>
                  </td>

                  <td className="max-sm:p-2 max-sm:text-xs max-lg:text-black max-lg:font-bold p-4 text-[#5F6D7E] text-sm font-medium text-left max-lg:text-left">
                    <div className="max-lg:flex max-lg:flex-col">
                      {tx.currency === 'USD' ? '$' : '₦'} {tx.amount}
                      <span className="lg:hidden max-sm:text-xs max-lg:text-[#5F6D7E] max-lg:font-medium">
                        {tx.identifier}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-[#5F6D7E] max-sm:text-xs max-sm:p-2 text-sm font-medium text-center max-lg:hidden">
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
    </>
  );
}
