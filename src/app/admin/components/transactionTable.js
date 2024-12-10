import Table from "./table";

export default function TransactionTable() {


  return (
    <div className="mt-8 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <h3 className="text-xl md:text-2xl font-bold text-black">Recent Transactions</h3>
        <a href="#" className="text-base font-normal text-[#ED1450] hover:underline">View All</a>
      </div>

      {/* Table Section with Fixed Height */}
     <Table/>
    </div>
  );
}
