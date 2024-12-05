import Link from "next/link";
import Savetown from "./assets/Savetown.svg";
import house from "./assets/house.svg";
import houseAct from "./assets/houseAct.svg";
import savings from "./assets/savings.svg";
import savingsAct from "./assets/savingsAct.svg";
import setting from "./assets/setting.svg";
import settingAct from "./assets/settingAct.svg";
import support from "./assets/support.svg";
import supportAct from "./assets/supportAct.svg";

export default function Sidebar() {
  const activePage = "Home";
  const sidebar = [
    {
      name: "Home",
      img: house,
      activeImg: houseAct,
      page: "Home",
      url: "/dashboard",
    },
    {
      name: "My Savings",
      img: savings,
      activeImg: savingsAct,
      page: "My Savings",
      url: "/dashboard/savings",
    },
    {
      name: "Settings",
      img: setting,
      activeImg: settingAct,
      page: "Settings",
      url: "/dashboard",
    },
    {
      name: "Support",
      img: support,
      activeImg: supportAct,
      page: "Support",
      url: "/dashboard/support",
    },
  ];

  return (
    <div className="fixed top-0 left-0 z-[999] w-[80%] md:w-[40%] lg:w-[20%] h-[100vh] border-r border-[#E4E7EC] bg-[#F6E9ED] transition-transform">
      <div className=" w-full h-full relative">
        <div className=" w-full flex justify-between border-b py-3 h-[72px] px-6 border-[#EAEBF0] border-opacity-5">
          <div className=" flex items-center">
            <img src={Savetown.src} alt="" />
          </div>
        </div>

        <div className="">
          {/* Sidebar content */}
          {sidebar.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={`text-center py-3 px-6 flex w-full flex-row space-x-4 items-center ${
                activePage === item.page
                  ? "bg-white border-l-[3px] border-btnPrimary"
                  : ""
              }`}
              //   onClick={() => handleClick(item.page)}
            >
              <img
                src={
                  activePage === item.page ? item.activeImg.src : item.img.src
                }
                className="w-4 h-4"
                alt=""
              />
              <p
                className={`font-Manrope font-normal text-xs ${
                  activePage === item.page
                    ? "text-btnPrimary"
                    : "text-[#00000080]"
                }`}
              >
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
