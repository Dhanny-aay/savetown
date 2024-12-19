import { useUserContext } from "../UserContext";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ReferralDrawer({ isVisible, onClose }) {
  const { userStats, loading } = useUserContext();

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-4 md:px-6 plansbg border border-[#D5D7DA] ml-auto"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt=""
          onClick={onClose}
        />

        <h3 className=" text-h55 md:text-h5 font-Manrope font-bold text-[#000] mt-9">
          Referral
        </h3>

        <div className=" mt-9 h-[250px] bg-[#F3F0E9] w-full border border-[#C2C4C6] rounded-[15px] p-6">
          <div>
            <h5 className=" text-body16SemiBold font-Manrope text-[#595A5C]">
              Referral bonus
            </h5>
            {loading ? (
              <Skeleton width={24} height={24} containerClassName=" mt-2" />
            ) : (
              <span className=" mt-2 text-[#595A5C] text-body14Regular">
                {`$${userStats?.referral_balance ?? 0}.00`}
              </span>
            )}
          </div>
          <div className=" mt-12">
            <h5 className=" text-body16SemiBold font-Manrope text-[#595A5C]">
              Number of referrals
            </h5>
            {loading ? (
              <Skeleton width={24} height={24} containerClassName=" mt-2" />
            ) : (
              <span className=" mt-2 text-[#595A5C] text-body14Regular">
                {`${userStats?.referral_count ?? 0}`}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
