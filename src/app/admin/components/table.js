export default function Table(second) {
    const transactions = [
        { id: 1, name: "Chinwe Okonkwo", transactionId: "SCI-20-0102", amount: "$10,000", status: "Successful" },
        { id: 2, name: "Aisha Mohammed", transactionId: "SCI-20-0103", amount: "$10,000", status: "Failed" },
        { id: 3, name: "Emeka Okafor", transactionId: "SCI-20-0104", amount: "$10,000", status: "Pending" },
        { id: 4, name: "Fatima Ibrahim", transactionId: "SCI-20-0105", amount: "$10,000", status: "Successful" },
        { id: 5, name: "Jide Adewale", transactionId: "SCI-20-0106", amount: "$10,000", status: "Successful" },
        { id: 6, name: "Lara Adeleke", transactionId: "SCI-20-0107", amount: "$10,000", status: "Successful" },
        { id: 7, name: "Obinna Eze", transactionId: "SCI-20-0108", amount: "$10,000", status: "Successful" },
        { id: 8, name: "Chinonye Nwosu", transactionId: "SCI-20-0109", amount: "$10,000", status: "Successful" },
        { id: 9, name: "Yakubu Bello", transactionId: "SCI-20-0110", amount: "$10,000", status: "Successful" },
      ];
    return (
        <div className="overflow-auto max-h-[100%] h-screen md:h-[55vh]"> {/* Adjust the height to fit the screen */}
        <table className="w-full mt-4 bg-white rounded shadow font-Manrope">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-4 w-[64px] font-semibold">S/N</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 w-[99px] text-right font-semibold">Amount</th>
              <th className="p-4 w-[148px] text-right font-semibold">Transaction ID</th>
              <th className="p-4 w-[149px] text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">{tx.id.toString().padStart(2, "0")}</td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium">{tx.name}</td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium text-right">{tx.amount}</td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium text-right">{tx.transactionId}</td>
                <td className="p-4 text-[#5F6D7E] text-sm font-medium text-center">
                  <span
                    className={`inline-block w-[90px] px-3 py-2 rounded-full text-sm font-medium ${
                      tx.status === "Successful"
                        ? "bg-green-100 text-green-600"
                        : tx.status === "Failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}