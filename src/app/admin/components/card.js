import Image from "next/image";
import piggyBank from "../assets/piggyBank.svg";
import Users from '../assets/usersPink.svg'
import UsersPlus from '../assets/userPlus.svg'

const cardsData = [
  { title: "Total Deposits", value: "₦70,000.00", icon: piggyBank, subtext:'All Stats'},
  { title: "Active Users", value: "700", icon: Users, subtext:'All Stats' },
  { title: "Inactive Users", value: "700", icon: Users, subtext:'All Stats' },
  { title: "New Users", value: "700", icon: UsersPlus, subtext:'Weekly Stats' },
];

export default function Card() {
  return (
    <div className="">
      {/* Analysis Header */}
      <h3 className="text-2xl font-bold text-black mb-4">Analysis</h3>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto">
        {cardsData.map(({ title, value, icon, subtext }, index) => (
          <div
            key={index}
            className="flex justify-between gap-4 bg-white rounded-[10px] py-4 px-5 border border-[#EAEBF0]"
          >
            <div className=" font-Manrope text-left flex flex-col gap-4">
              <h4 className="text-black text-base font-medium">{title}</h4>
              <h2 className="text-[28px] font-bold font-Manrope">{value}</h2>
              <p className="font-medium text-sm ">{subtext}</p>
            </div>
            <div className="">
            <Image
              src={icon}
              alt="Savetown logo"
              width={48}
              height={48}
              priority
            />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
