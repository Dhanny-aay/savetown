import Link from "next/link";
import Table from "./table";

export default function TransactionTable() {


  return (
    <div className="mt-10 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <h3 className="text-xl md:text-2xl font-semibold text-[#262626]">Recent Transactions</h3>
        {/* <Link href="#" className="text-base font-normal text-[#ED1450] hover:underline">View All</Link> */}
      </div>

     <Table/>
    </div>
  );
}
