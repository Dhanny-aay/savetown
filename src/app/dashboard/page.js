"use client";
import { useEffect, useState } from "react";
import open from "./assets/open.svg";
import depo from "./assets/depo.svg";
import Calculator from "./assets/Calculator.svg";
import housemodel from "./assets/housemodel.svg";
import ArrowRightwhite from "./assets/ArrowRightwhite.svg";
import xml from "./assets/xml.svg";
import share from "./assets/share.svg";
import SavingPlanTab from "./component/savingPlanTab";
import Link from "next/link";
import DinnerDrawer from "./component/dinnerDrawer";
import ReferralDrawer from "./component/referralDrawer";
import CalculatorDrawer from "./component/calculatorDrawer";
import VerifyDrawer from "./component/verifyDrawer";
import DepositDrawer from "./component/walletDepositDrawer";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import DinnerModal from "./component/dinnerModal";
import { useUserContext } from "./UserContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DepositModal from "./component/depositModal";
import WalletDepositDrawer from "./component/walletDepositDrawer";
import GroupDepositDrawer from "./component/groupDepositDrawer";

export default function Page() {
  const {
    userProfile,
    loadingProfile,
    userStats,
    loading,
    toggleVisibility,
    isVisible,
  } = useUserContext();
  const [isDinnerDrawerVisible, setDinnerDrawerVisible] = useState(false);
  const [isDinnerModalVisible, setDinnerModalVisible] = useState(false);
  const [isReferralDrawerVisible, setReferralDrawerVisible] = useState(false);
  const [isCalculatorDrawerVisible, setCalculatorDrawerVisible] =
    useState(false);
  const [isVerifyDrawerVisible, setVerifyDrawerVisible] = useState(false);
  const [isWalletDepositDrawerVisible, setWalletDepositDrawerVisible] =
    useState(false);
  const [isGroupDepositDrawerVisible, setGroupDepositDrawerVisible] =
    useState(false);
  const [isDepositModalVisible, setDepositModalVisible] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASEURL;

  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00"; // Handle 0, null, and undefined
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [isCopied, setIsCopied] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    // Check if userProfile and group_savings are defined before accessing them
    if (userProfile?.group_savings?.length > 0) {
      setSelectedID(userProfile.group_savings[0]);
    }
  }, [userProfile]);

  // Function to copy the referral link
  const handleCopyReferral = async () => {
    const referralLink = `${BASE_URL}/sign-up?referral_code=${userProfile?.referral_code}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);

      // Reset the "Link Copied!" text after 3 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy referral link:", err);
    }
  };

  // dinner drawer
  const showDinnerDrawer = () => setDinnerDrawerVisible(true);
  const closeDinnerDrawer = () => setDinnerDrawerVisible(false);

  // dinner modal
  const showDinnerModal = () => setDinnerModalVisible(true);
  const closeDinnerModal = () => setDinnerModalVisible(false);

  // referral drawer
  const showReferralDrawer = () => setReferralDrawerVisible(true);
  const closeReferralDrawer = () => setReferralDrawerVisible(false);

  // calculator drawer
  const showCalculatorDrawer = () => setCalculatorDrawerVisible(true);
  const closeCalculatorDrawer = () => setCalculatorDrawerVisible(false);

  // verification drawer
  const showVerifyDrawer = () => setVerifyDrawerVisible(true);
  const closeVerifyDrawer = () => setVerifyDrawerVisible(false);

  // deposit drawer
  const showWalletDepositDrawer = () => setWalletDepositDrawerVisible(true);
  const closeWalletDepositDrawer = () => setWalletDepositDrawerVisible(false);

  // deposit modal
  const showDepositModal = () => setDepositModalVisible(true);
  const closeDepositModal = () => setDepositModalVisible(false);

  //group deposit drawer
  const showGroupDepositDrawer = () => setGroupDepositDrawerVisible(true);
  const closeGroupDepositDrawer = () => setGroupDepositDrawerVisible(false);

  useEffect(() => {
    if (
      userProfile?.event_date_booking === false &&
      userProfile?.id_status === "verified"
    ) {
      // Set a timer to call showDinnerModal after 30 seconds (30,000 ms)
      const timer = setTimeout(showDinnerModal, 30000);

      // Clean up the timer if the component unmounts before 30 seconds
      return () => clearTimeout(timer);
    }
  }, [userProfile?.event_date_booking]);

  return (
    <>
      {loadingProfile ? (
        <Skeleton
          width={200}
          height={32}
          containerClassName=" block md:hidden"
        />
      ) : (
        <p className="text-[#262626] block md:hidden font-bold text-lg py-3 md:text-xl leading-none font-Manrope">
          {`Welcome Back, ${userProfile.first_name}!`}
        </p>
      )}
      <div className=" shadowDB w-full bg-white mt-6 md:mt-0 rounded-[32px] p-6 md:p-8 flex flex-col lg:flex-row items-center lg:items-center lg:justify-between">
        <div className=" w-full lg:w-1/2">
          <div className=" flex items-center space-x-3">
            <p className=" text-body14Medium md:text-body16Bold font-Manrope text-[#595A5C]">
              Total Balance
            </p>

            <img
              src={open.src}
              className="w-5 cursor-pointer"
              alt="Toggle visibility"
              onClick={toggleVisibility}
            />
          </div>
          {loading ? (
            <Skeleton width={90} height={36} />
          ) : (
            <h2 className="text-h3 md:text-h1 text-[#666666] font-Manrope font-bold mt-1">
              {isVisible
                ? `$${formatWithCommas(userStats?.total_balance) ?? 0}`
                : "****"}
            </h2>
          )}
        </div>
        <div className=" w-full mt-8 md:mt-0 lg:w-1/2 flex items-center justify-between md:justify-end space-x-3">
          <button
            onClick={() => {
              if (userProfile?.id_status === "pending") {
                showVerifyDrawer();
              } else if (userProfile?.id_status === "verified") {
                showDepositModal();
              }
            }}
            className="bg-btnPrimary w-1/2 md:w-auto rounded-[40px] border border-[#EAEBF0] py-3 px-6 flex items-center justify-center space-x-2"
          >
            <img src={depo.src} className="w-5" alt="" />
            <p className="text-body12SemiBold md:text-body16Bold font-Manrope text-white">
              Deposit
            </p>
          </button>
          <button
            onClick={showCalculatorDrawer}
            className=" w-1/2 md:w-auto rounded-[40px] border border-[#C2C4C6] py-3 px-6 flex items-center justify-center space-x-2"
          >
            <img src={Calculator.src} className=" w-5" alt="" />
            <p className=" text-body12SemiBold md:text-body16Bold font-Manrope text-[#262626]">
              Calculator
            </p>
          </button>
        </div>
      </div>

      <h2 className=" text-h55 md:text-h5 font-bold text-[#262626] mt-8 font-Manrope">
        My Savings Plan
      </h2>
      <SavingPlanTab isDashboard={true} />

      <div className=" w-full mt-8 lg:mt-6 rfrcode md:h-auto lg:h-[150px] rounded-[24px] py-8 px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center relative">
        <div className=" w-full md:max-w-[400px] lg:max-w-full lg:w-[48%]">
          <h3 className=" text-h6 md:text-h5 font-bold font-Manrope text-white">
            Refer your friends and Earn
          </h3>
          <p className=" mt-3 font-Manrope font-normal text-body12Regular md:text-body14Regular text-white">
            Your friend gets 10% bonus on sign up and you get 20% bonus on house
            listing which will reflect on your wallet.
          </p>
        </div>
        <div className=" w-full lg:w-[48%] mt-6 md:mt-3 lg:mt-0 flex items-center lg:justify-between">
          <img src={xml.src} className=" hidden lg:block lg:mt-[54px]" alt="" />

          <button
            onClick={handleCopyReferral}
            className="flex items-center bg-[#FFFFFF] rounded-[32px] px-6 py-3 space-x-2 text-[#262626] font-Manrope text-body12SemiBold md:text-body14SemiBold mr-4 md:mr-6 lg:mr-0"
          >
            {loadingProfile ? (
              <Skeleton width={90} height={24} />
            ) : (
              <p>
                {isCopied
                  ? "Link Copied!"
                  : userProfile?.referral_code ?? "******"}
              </p>
            )}
            <img src={share.src} className="w-4 md:w-5" alt="Share Icon" />
          </button>

          <button
            onClick={showReferralDrawer}
            className="hidden md:flex items-center space-x-2 z-20"
          >
            <span className="text-[#FFFFFF] text-body12SemiBold md:text-body14Bold font-Manrope">
              View referrals
            </span>
            <img src={ArrowRightwhite.src} className=" " alt="" />
          </button>
        </div>
        <img
          src={xml.src}
          className=" w-[35%] md:w-auto lg:hidden absolute bottom-0 right-6 md:right-14"
          alt=""
        />
      </div>

      <div className=" w-full block md:hidden">
        <h2 className=" text-h55 md:text-h5 font-bold text-[#262626] mt-8 font-Manrope">
          Referrals
        </h2>
        <div className=" w-full lg:h-[140px] rounded-3xl border border-[#C2C4C6] mt-6 p-6">
          <div>
            <h5 className=" text-body12SemiBold font-Manrope text-[#595A5C]">
              Referral bonus
            </h5>
            {loading ? (
              <Skeleton width={24} height={24} containerClassName=" mt-2" />
            ) : (
              <span className=" mt-2 text-[#000] text-body12Regular">
                {`$${userStats?.referral_balance ?? 0}.00`}
              </span>
            )}
          </div>
          <div className=" mt-5">
            <h5 className=" text-body12SemiBold font-Manrope text-[#595A5C]">
              Number of referrals
            </h5>
            {loading ? (
              <Skeleton width={24} height={24} containerClassName=" mt-2" />
            ) : (
              <span className=" mt-2 text-[#000] text-body12Regular">
                {`${userStats?.referral_count ?? 0}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {userProfile?.id_status === "pending" && (
        <div className=" w-full ">
          <h2 className="text-h55 md:text-h5 font-bold text-[#262626] mt-8 font-Manrope">
            My To-Dos
          </h2>
          <div className=" w-full lg:h-[140px] rounded-3xl bg-[#F3F0E9] mt-6 p-6">
            <h4 className=" text-h6 md:text-h5 font-Manrope font-bold text-black">
              Profile Verification
            </h4>
            <p className=" text-body12Regular md:text-body14Regular font-Manrope text-black mt-1">
              Complete your profile verification to unlock all features
            </p>

            <div className=" flex flex-col lg:flex-row lg:items-end justify-between">
              <div className="flex items-center w-full lg:w-[70%] space-x-2">
                <div className="flex-grow bg-[#FFFFFF] rounded-full">
                  <div
                    className="bg-[#9900CC] text-xs font-Manrope text-center p-0.5 leading-none rounded-full text-blue-100"
                    style={{ width: `70%` }}
                  />
                </div>
                <div className="text-sm font-medium font-Manrope text-[#000]">
                  70%
                </div>
              </div>

              <button
                onClick={showVerifyDrawer}
                className=" bg-btnPrimary rounded-[40px] w-full md:w-auto lg:w-[25%] border border-[#EAEBF0] py-3 px-6 mt-4 lg:mt-0 ml-auto lg:ml-0 "
              >
                <p className="text-xs font-bold font-Manrope text-white">
                  Complete Verification Now
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" w-full">
        <div className=" flex space-x-3 items-center mt-8">
          <h2 className=" text-h5 font-bold text-[#262626] font-Manrope">
            House Model
          </h2>

          <button className=" bg-[#EAF6EC] rounded-[40px] py-2 px-3 text-[#24983F] text-body12SemiBold font-Manrope">
            Coming soon
          </button>
        </div>

        <div className=" w-full mt-6 hidden lg:grid grid-cols-3 gap-6">
          <div className="plansbg w-full h-[250px] bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]"></div>
          <div className="plansbg w-full h-[250px] bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]"></div>
          <div className="plansbg w-full h-[250px] bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]"></div>
        </div>

        <div className=" w-full mt-6 block lg:hidden">
          <Swiper
            pagination={{
              clickable: true,
              el: ".model-pagination",
            }}
            modules={[Pagination]}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            className="mt-6 w-full"
          >
            <SwiperSlide>
              <div className="plansbg w-full h-[250px] flex items-center justify-center bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]">
                <img src={housemodel.src} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="plansbg w-full h-[250px] flex items-center justify-center bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]">
                <img src={housemodel.src} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="plansbg w-full h-[250px] flex items-center justify-center bg-[#CEDEEE] border border-[#D5D7DA] rounded-[15px]">
                <img src={housemodel.src} alt="" />
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="model-pagination flex justify-center w-full items-center space-x-1"></div>
        </div>
      </div>

      {/* <SavingPlanTab /> */}

      {/* dinner form */}
      <DinnerDrawer
        isVisible={isDinnerDrawerVisible}
        onClose={closeDinnerDrawer}
      />

      {/* dinner modal */}
      <DinnerModal
        isVisible={isDinnerModalVisible}
        onClose={closeDinnerModal}
        showDinnerDrawer={showDinnerDrawer}
      />

      {/* referrals */}
      <ReferralDrawer
        isVisible={isReferralDrawerVisible}
        onClose={closeReferralDrawer}
      />

      {/* calculator */}
      <CalculatorDrawer
        isVisible={isCalculatorDrawerVisible}
        onClose={closeCalculatorDrawer}
      />

      {/* calculator */}
      <VerifyDrawer
        isVisible={isVerifyDrawerVisible}
        onClose={closeVerifyDrawer}
      />

      {/* deposit modal*/}
      <DepositModal
        isVisible={isDepositModalVisible}
        onClose={closeDepositModal}
        showWalletDepositDrawer={showWalletDepositDrawer}
        showGroupDepositDrawer={showGroupDepositDrawer}
      />
      {/* deposit */}
      <WalletDepositDrawer
        isVisible={isWalletDepositDrawerVisible}
        onClose={closeWalletDepositDrawer}
      />
      {/*group deposit */}
      <GroupDepositDrawer
        isVisible={isGroupDepositDrawerVisible}
        onClose={closeGroupDepositDrawer}
        selectedID={selectedID}
      />
    </>
  );
}
