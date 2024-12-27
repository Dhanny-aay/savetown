"use client";
import openwhite from "./assets/openwhite.svg";
import infop from "./assets/infop.svg";
import tabler_send from "./assets/tabler_send.svg";
import groups from "./assets/groups.svg";
import forward from "./assets/forward.svg";
import receipt from "./assets/receipt.svg";
import grp from "./assets/grp.svg";
import depo from "./assets/depo.svg";
import withdraw from "./assets/withdraw.svg";
import pattern from "./assets/pattern.svg";
import { useEffect, useState } from "react";
import GroupDrawer from "../../component/groupDrawer";
import LearnModal from "../../component/learnModal";
import InviteMore from "./inviteMore";
import GroupMembers from "./groupMembers";
import {
  handleDeleteGroup,
  handleGetUserGroups,
} from "@/app/userControllers/groupController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GroupDepositDrawer from "../../component/groupDepositDrawer";
import { useUserContext } from "../../UserContext";
import GroupWithdraw from "../../component/groupWithdraw";
import VerifyDrawer from "../../component/verifyDrawer";
import { handleGetTransactionsWithParam } from "@/app/userControllers/transactionController";
import SkeletonTable from "@/app/utils/loadingTable";
import TableFilter from "./dateFilter";

export default function GroupSaving() {
  const [isGroupDrawerVisible, setGroupDrawerVisible] = useState(false);
  const [isLearnVisible, setLearnVisible] = useState(false);
  const [isGroupCreated, setGroupCreated] = useState(false);
  const [isInviteDrawerVisible, setInviteDrawerVisible] = useState(false);
  const [isMemberDrawerVisible, setMemberDrawerVisible] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [members, setMembers] = useState(null);
  const [isGroupDepositDrawerVisible, setGroupDepositDrawerVisible] =
    useState(false);
  const [isGroupWithdrawDrawerVisible, setGroupWithdrawDrawerVisible] =
    useState(false);
  const [isVerifyDrawerVisible, setVerifyDrawerVisible] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const fetchTransactions = async () => {
    const params = {
      category: "group_savings",
    };
    try {
      const data = await handleGetTransactionsWithParam(params);
      if (data) {
        setTransactions(data.data);
      }
    } catch (error) {
      console.log("Error fetching transactions:", error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const {
    userProfile,
    loadingProfile,
    userStats,
    loading,
    isVisible,

    toggleVisibility,
  } = useUserContext();

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  // learn modal
  const showLearnModal = () => setLearnVisible(true);
  const closeLearnModal = () => setLearnVisible(false);

  // group drawer
  const showGroupDrawer = () => setGroupDrawerVisible(true);
  const closeGroupDrawer = () => setGroupDrawerVisible(false);

  // invite drawer
  const showInviteDrawer = () => setInviteDrawerVisible(true);
  const closeInviteDrawer = () => setInviteDrawerVisible(false);

  // members drawer
  const showMemberDrawer = () => setMemberDrawerVisible(true);
  const closeMemberDrawer = () => setMemberDrawerVisible(false);

  //group deposit drawer
  const showGroupDepositDrawer = () => setGroupDepositDrawerVisible(true);
  const closeGroupDepositDrawer = () => setGroupDepositDrawerVisible(false);

  //group withdraw drawer
  const showGroupWithdrawDrawer = () => setGroupWithdrawDrawerVisible(true);
  const closeGroupWithdrawDrawer = () => setGroupWithdrawDrawerVisible(false);

  // verification drawer
  const showVerifyDrawer = () => setVerifyDrawerVisible(true);
  const closeVerifyDrawer = () => setVerifyDrawerVisible(false);

  const fetchUserGroups = async () => {
    setLoadingGroups(true);
    try {
      const data = await handleGetUserGroups();
      if (data) {
        if (data?.data?.length > 0) {
          setUserGroups(data.data); // Set the full array to state
          setGroupCreated(data.data.length > 0);
          setSelectedID(data.data[0].id); // Set the first object's id
          setMembers(data.data[0].members);
        }
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
    } finally {
      setLoadingGroups(false);
    }
  };

  useEffect(() => {
    fetchUserGroups();
  }, [trigger]);

  const handleDelete = () => {
    handleDeleteGroup(selectedID);
  };

  const formatWithCommas = (value) => {
    if (value === 0 || value == null) return "0.00"; // Handle 0, null, and undefined
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Date options
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };

    // Get the day and determine the appropriate suffix
    const day = date.getDate();
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    // Format the date with the suffix
    const formattedDate = date
      .toLocaleDateString("en-US", dateOptions)
      .replace(/\d+/, day + daySuffix);

    // Time options
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    // Combine date and time
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleFilterChange = (filter) => {
    if (filter.startDate && filter.endDate) {
      const startDate = new Date(filter.startDate).setHours(0, 0, 0, 0);
      const endDate = new Date(filter.endDate).setHours(23, 59, 59, 999);

      const filtered = transactions.filter((tx) => {
        const transactionDate = new Date(tx.created_at).getTime();
        return transactionDate >= startDate && transactionDate <= endDate;
      });

      setFilteredTransactions(filtered);
    } else {
      // If no date range is provided, reset to all transactions
      setFilteredTransactions(transactions);
    }
  };

  return (
    <>
      <h2 className=" text-h55 md:text-h5 font-bold text-[#262626] font-Manrope">
        Group Savings
      </h2>

      <div className="bg-[#FB9E00] relative rounded-[24px] md:h-[180px] p-6 mt-6 md:mt-8">
        <img src={pattern.src} className=" absolute top-0 right-0" alt="" />

        <div className=" flex w-full justify-between items-start">
          <div>
            <div className=" flex items-center space-x-3">
              <p className=" text-body14Medium md:text-body16Medium font-Manrope text-[#FFFFFF]">
                Group Savings Balance
              </p>
              <img
                src={openwhite.src}
                className=" w-4 md:w-5 cursor-pointer"
                alt="Toggle groupSavings balance visibility"
                onClick={toggleVisibility}
              />
            </div>
            <h2 className=" text-[32px] font-Manrope font-bold text-white mt-[6px]">
              {isVisible
                ? `$${
                    formatWithCommas(userStats?.group_savings_balance) ?? "0.00"
                  }`
                : "****"}
            </h2>
          </div>
        </div>

        <div className="  md:absolute mt-8 md:mt-0 w-full md:w-auto justify-end items-center bottom-6 right-6 flex space-x-3 ">
          {userProfile.group_savings?.length > 0 ? (
            <>
              <button
                onClick={() => {
                  if (userProfile?.id_status === "pending") {
                    showVerifyDrawer();
                  } else if (userProfile?.id_status === "verified") {
                    showGroupDepositDrawer();
                  }
                }}
                className=" bg-[#fff] rounded-[40px] py-3 px-6 w-1/2 md:w-auto flex items-center justify-center space-x-2"
              >
                <img src={depo.src} className=" w-4 md:w-5" alt="" />
                <p className="text-body14Bold font-Manrope text-black">
                  Deposit
                </p>
              </button>
              <button
                onClick={showGroupWithdrawDrawer}
                className="border border-[#fff] rounded-[40px] py-3 px-6 w-1/2 md:w-auto flex items-center justify-center space-x-2"
              >
                <img
                  src={withdraw.src}
                  className=" rotate-90 w-4 md:w-5"
                  alt=""
                />
                <p className=" text-body12SemiBold md:text-body14Bold font-Manrope text-white">
                  Withdraw
                </p>
              </button>
              {/* <button onClick={handleDelete} className="">
                Delete
              </button> */}
            </>
          ) : (
            <button
              onClick={showGroupDrawer}
              className=" bg-[#fff] w-full md:w-auto rounded-[40px] py-3 px-6 flex justify-center items-center space-x-2"
            >
              <img src={grp.src} className=" w-4 md:w-5" alt="" />
              <p className=" text-body12SemiBold md:text-body14Bold font-Manrope text-[#666666]">
                Create Group
              </p>
            </button>
          )}
        </div>
      </div>

      {loadingGroups ? (
        // Skeleton loader while loading is true
        <div className="w-full border border-[#EAEBF0] p-6 rounded-[15px] mt-8">
          <div className="flex items-center space-x-3">
            <Skeleton circle width={48} height={48} />
            <div className="w-full">
              <Skeleton width="60%" height={20} />
              <Skeleton width="40%" height={20} className="mt-2" />
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {isGroupCreated && (
            <>
              <div
                onClick={showMemberDrawer}
                className=" border border-[#C2C4C6] rounded-[15px] h-[80px] cursor-pointer px-4 md:px-6 py-3 w-full flex items-center justify-between"
              >
                <div className=" flex items-center space-x-4">
                  <span className="  w-10 md:w-16 h-10 md:h-16 rounded-full flex items-center justify-center bg-[#EFE6FD]">
                    <img src={groups.src} className=" w-5 md:w-auto " alt="" />
                  </span>
                  <div className="">
                    <h6 className=" text-body14Bold font-Manrope text-[#262626]">
                      Number of group members
                    </h6>
                    <p className="font-Manrope text-body12Regular text-[#595A5C] mt-2 leading-none">
                      {userGroups[0]?.members?.length || 0}
                    </p>
                  </div>
                </div>
                <img src={forward.src} className=" h-3 md:h-auto" alt="" />
              </div>
              <div
                onClick={showInviteDrawer}
                className=" border border-[#C2C4C6] rounded-[15px] h-[80px] cursor-pointer px-4 md:px-6 py-3 w-full flex items-center justify-between"
              >
                <div className=" flex items-center space-x-4">
                  <span className="  w-10 md:w-16 h-10 md:h-16 rounded-full flex items-center justify-center bg-[#EAF6EC]">
                    <img
                      src={tabler_send.src}
                      className="w-5 md:w-auto "
                      alt=""
                    />
                  </span>
                  <div className="max-w-[70%] md:max-w-max">
                    <h6 className=" text-body14Bold font-Manrope text-[#262626]">
                      Invite more friends
                    </h6>
                    <p className=" font-Manrope text-body12Regular  text-[#595A5C] mt-2 leading-none">
                      Send your friends an invitation to join savings
                    </p>
                  </div>
                </div>
                <img src={forward.src} className=" h-3 md:h-auto" alt="" />
              </div>
            </>
          )}
          <div
            onClick={showLearnModal}
            className=" border border-[#C2C4C6] rounded-[15px] h-[80px] cursor-pointer px-4 md:px-6 py-3 w-full flex items-center justify-between"
          >
            <div className=" flex items-center space-x-4">
              <span className=" w-10 md:w-16 h-10 md:h-16 rounded-full flex items-center justify-center bg-[#E6F2FF]">
                <img src={infop.src} className=" w-5 md:w-auto ml-1" alt="" />
              </span>
              <div className="">
                <h6 className=" text-body14Bold font-Manrope text-[#262626]">
                  About Group savings plan
                </h6>
                <p className=" font-Manrope text-body12Regular text-[#595A5C] mt-2 leading-none">
                  Learn more about the plan
                </p>
              </div>
            </div>
            <img src={forward.src} className=" h-3 md:h-auto" alt="" />
          </div>
        </div>
      )}

      {loadingTransactions ? (
        <SkeletonTable />
      ) : transactions.length === 0 ? (
        <div className=" w-full mt-8 flex flex-col items-center justify-center">
          <img src={receipt.src} className=" w-[45px]  md:w-auto" alt="" />
          <h6 className="text-center text-body16Bold font-Manrope text-[#666666] mt-6">
            Transcation History
          </h6>
          <p className="text-body14Regular font-Manrope text-[#595A5C] mt-2 text-center">
            Recent transactions and transactions history will show here
          </p>
        </div>
      ) : (
        <>
          <div className=" w-full mt-6 md:mt-8">
            <div className=" flex flex-col space-y-6 md:space-y-0 md:flex-row items-start md:items-center w-full justify-between">
              <h2 className="text-h55 md:text-h5 font-bold text-[#262626] font-Manrope">
                Recent Transactions
              </h2>

              {/* Filter Section */}
              <div className="flex items-center space-x-4">
                <TableFilter
                  transactions={transactions}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
          {/* Table Section with Fixed Height */}
          <div className="overflow-auto mt-6 max-h-[100%] h-screen md:h-[55vh] border border-[#c2c4c686] rounded-[8px]">
            {filteredTransactions.length > 0 ? (
              <table className="w-full bg-white shadow font-Manrope relative">
                <thead className="sticky top-0 left-0 bg-white">
                  <tr className="text-left">
                    <th className="p-4 w-[64px] font-medium text-sm">S/N</th>
                    <th className="p-4 font-medium text-sm">Name</th>
                    <th className="p-4 w-[148px] text-left font-medium text-sm">
                      Payment ID
                    </th>
                    <th className="p-4 w-[99px] text-left font-medium text-sm">
                      Amount
                    </th>
                    <th className="p-4 w-[149px] text-center font-medium text-sm">
                      Payment Type
                    </th>
                    <th className="p-4 w-[149px] text-center font-medium text-sm">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions
                    .slice()
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map((tx, index) => (
                      <tr key={tx.id} className="border-t">
                        <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                          {index + 1}
                        </td>
                        <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                          {tx.description}
                        </td>
                        <td className="p-4 text-[#5F6D7E] text-sm font-medium text-left">
                          {tx.identifier}
                        </td>
                        <td className="p-4 text-[#5F6D7E] text-sm font-medium text-left">
                          {tx.amount}
                        </td>
                        <td className="p-4 text-[#5F6D7E] text-sm capitalize font-medium text-center">
                          {tx.type}
                        </td>
                        <td className="p-4 text-[#5F6D7E] text-sm font-medium text-center">
                          {formatDateTime(tx.created_at)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-[#5F6D7E] text-sm w-full h-full justify-center items-center flex">
                No transactions within this period.
              </div>
            )}
          </div>
        </>
      )}

      {/* groups */}
      <GroupDrawer
        isVisible={isGroupDrawerVisible}
        onClose={closeGroupDrawer}
        triggerFetch={triggerFetch}
      />
      {/* invite */}
      <InviteMore
        isVisible={isInviteDrawerVisible}
        onClose={closeInviteDrawer}
        selectedID={selectedID}
        triggerFetch={triggerFetch}
      />
      {/* member */}
      <GroupMembers
        isVisible={isMemberDrawerVisible}
        onClose={closeMemberDrawer}
        members={members}
        loading={loadingGroups}
      />

      {/* learn modal */}
      <LearnModal isVisible={isLearnVisible} onClose={closeLearnModal} />

      {/*group deposit */}
      <GroupDepositDrawer
        isVisible={isGroupDepositDrawerVisible}
        onClose={closeGroupDepositDrawer}
        selectedID={selectedID}
      />

      {/*group withdraw */}
      <GroupWithdraw
        isVisible={isGroupWithdrawDrawerVisible}
        onClose={closeGroupWithdrawDrawer}
        selectedID={selectedID}
      />

      {/* verify  */}
      <VerifyDrawer
        isVisible={isVerifyDrawerVisible}
        onClose={closeVerifyDrawer}
      />
    </>
  );
}
