"use client";
import openwhite from "./assets/openwhite.svg";
import infop from "./assets/infop.svg";
import forward from "./assets/forward.svg";
import receipt from "./assets/receipt.svg";
import grp from "./assets/grp.svg";
import depo from "./assets/depo.svg";
import withdraw from "./assets/withdraw.svg";
import pattern from "./assets/pattern.svg";
import { useState } from "react";
import GroupDrawer from "../../component/groupDrawer";
import LearnModal from "../../component/learnModal";
import InviteMore from "./inviteMore";
import GroupMembers from "./groupMembers";

export default function GroupSaving() {
  const [isGroupDrawerVisible, setGroupDrawerVisible] = useState(false);
  const [isLearnVisible, setLearnVisible] = useState(false);
  const [isGroupCreated, setGroupCreated] = useState(false);
  const [isInviteDrawerVisible, setInviteDrawerVisible] = useState(false);
  const [isMemberDrawerVisible, setMemberDrawerVisible] = useState(false);

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
              <img src={openwhite.src} className=" w-4 md:w-5" alt="" />
            </div>
            <h2 className=" text-[32px] font-Manrope font-bold text-white mt-[6px]">
              $ 0.00
            </h2>
          </div>
        </div>

        <div className="  md:absolute mt-8 md:mt-0 w-full md:w-auto justify-end items-center bottom-6 right-6 flex space-x-3 ">
          {isGroupCreated ? (
            <>
              <button className=" bg-[#fff] rounded-[40px] py-3 px-6 w-1/2 md:w-auto flex items-center justify-center space-x-2">
                <img src={depo.src} className=" w-4 md:w-5" alt="" />
                <p className="text-body14Bold font-Manrope text-black">
                  Deposit
                </p>
              </button>
              <button className="border border-[#fff] rounded-[40px] py-3 px-6 w-1/2 md:w-auto flex items-center justify-center space-x-2">
                <img
                  src={withdraw.src}
                  className=" rotate-90 w-4 md:w-5"
                  alt=""
                />
                <p className=" text-body12SemiBold md:text-body14Bold font-Manrope text-white">
                  Withdraw
                </p>
              </button>
            </>
          ) : (
            <button
              onClick={showGroupDrawer}
              className=" bg-[#fff] rounded-[40px] py-3 px-6 flex items-center space-x-2"
            >
              <img src={grp.src} className=" w-4 md:w-5" alt="" />
              <p className=" text-body12SemiBold md:text-body14Bold font-Manrope text-[#666666]">
                Create Group
              </p>
            </button>
          )}
        </div>
      </div>

      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {isGroupCreated && (
          <>
            <div
              onClick={showMemberDrawer}
              className=" border border-[#C2C4C6] rounded-[15px] cursor-pointer px-6 py-3 w-full flex items-center justify-between"
            >
              <div className=" flex items-center space-x-4">
                <span className=" w-16 h-16 rounded-full flex items-center justify-center bg-[#EFE6FD]">
                  <img src={infop.src} className=" ml-1" alt="" />
                </span>
                <div className="">
                  <h6 className=" text-body14Bold font-Manrope text-[#262626]">
                    Number of group members
                  </h6>
                  <p className=" font-Manrope text-body12Regular text-[#595A5C] mt-2 leading-none">
                    0
                  </p>
                </div>
              </div>
              <img src={forward.src} alt="" />
            </div>
            <div
              onClick={showInviteDrawer}
              className=" border border-[#C2C4C6] rounded-[15px] cursor-pointer px-6 py-3 w-full flex items-center justify-between"
            >
              <div className=" flex items-center space-x-4">
                <span className=" w-16 h-16 rounded-full flex items-center justify-center bg-[#EAF6EC]">
                  <img src={infop.src} className=" ml-1" alt="" />
                </span>
                <div className="">
                  <h6 className=" text-body14Bold font-Manrope text-[#262626]">
                    Invite more friends
                  </h6>
                  <p className=" font-Manrope text-body12Regular text-[#595A5C] mt-2 leading-none">
                    Send your friends an invitation to join savings
                  </p>
                </div>
              </div>
              <img src={forward.src} alt="" />
            </div>
          </>
        )}
        <div
          onClick={showLearnModal}
          className=" border border-[#C2C4C6] rounded-[15px] cursor-pointer px-6 py-3 w-full flex items-center justify-between"
        >
          <div className=" flex items-center space-x-4">
            <span className=" w-16 h-16 rounded-full flex items-center justify-center bg-[#E6F2FF]">
              <img src={infop.src} className=" ml-1" alt="" />
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
          <img src={forward.src} alt="" />
        </div>
      </div>

      <div className=" w-full mt-8 flex flex-col items-center justify-center">
        <img src={receipt.src} className="" alt="" />
        <h6 className="text-center text-body16Bold font-Manrope text-[#666666] mt-6">
          Transcation History
        </h6>
        <p className="text-body14Regular font-Manrope text-[#595A5C] mt-2 text-center">
          Recent tarnsctions and transctions history will show here
        </p>
      </div>

      {/* groups */}
      <GroupDrawer
        isVisible={isGroupDrawerVisible}
        onClose={closeGroupDrawer}
      />
      {/* invite */}
      <InviteMore
        isVisible={isInviteDrawerVisible}
        onClose={closeInviteDrawer}
      />
      {/* member */}
      <GroupMembers
        isVisible={isMemberDrawerVisible}
        onClose={closeMemberDrawer}
      />

      {/* learn modal */}
      <LearnModal isVisible={isLearnVisible} onClose={closeLearnModal} />
    </>
  );
}
