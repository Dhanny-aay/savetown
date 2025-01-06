"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { showUsers } from "../../adminControllers/usersController";
import profilePic from "../assets/profile_pic.svg";
import Image from "next/image";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import UserTransactions from "../components/users-transactions";
import OngoingPlans from "../components/ongoing-plans";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("User Information");
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const userid = searchParams.get("userid");

  const fetchData = async () => {
    await showUsers(
      `${userid}`,
      (response) => {
        setUserInfo(response.data);
      },
      (err) => {
        console.error("Error fetching user info:", err);
      }
    );
  };

  useEffect(() => {
    if (userid && !userInfo) {
      fetchData();
    }
  }, [userid]);

  if (!userInfo) {
    return <p>Loading user information...</p>;
  }

  const navItems = [
    { name: "User Information", id: "User" },
    { name: "Ongoing Plans", id: "Ongoing" },
    { name: "Transactions", id: "Transactions" },
  ];

  return (
    <div className="w-full font-Manrope space-y-4">
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => router.back()}
            className="text-[#ED1450] hover:underline text-base font-normal"
          >
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            User Management
          </h3>
        </div>
      </div>
      {/* Banner Section */}
      <div className="bg-[#F3F0E9] px-8 py-6 flex gap-6 items-center rounded-[15px]">
        <Image
          src={profilePic.src}
          alt="profile picture"
          width={24}
          height={24}
          priority
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1 font-Manrope w-full">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold font-Manrope">
              {userInfo.first_name} {userInfo.last_name}
            </h2>
            <span className="inline-block px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              {(userInfo.is_active = true ? "Active" : "Inactive")}
            </span>
          </div>
          <hr className="border-white h-2" />
          <p className="text-[#979797] text-sm md:flex gap-2 font-bold">
            Contact:{" "}
            <span className="font-medium text-black flex gap-2">
              {" "}
              <Image
                src={mail.src}
                alt="mail picture"
                width={12}
                height={12}
                priority
              />{" "}
              {userInfo.email}
            </span>{" "}
            <span className="font-medium text-black  flex gap-2">
              {" "}
              <Image
                src={phone.src}
                alt="phone picture"
                width={12}
                height={12}
                priority
              />{" "}
              {userInfo.phone === null ? "N/A" : userInfo.phone}
            </span>
          </p>
          <p className="text-[#979797] text-sm font-bold">
            Date Joined:{" "}
            <span className="font-medium text-black">
              {" "}
              {new Date(userInfo.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="flex items-center gap-8 text-black px-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`pb-2 text-sm md:text-base font-semibold ${
              activeTab === item.name
                ? "border-b-2 border-[#ED1450] text-[#ED1450]"
                : "text-[#979797]"
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="bg-white p-8 border rounded-[15px]">
        {activeTab === "User Information" ? (
          <div>
            <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
            <hr />
            <div className="space-y-4 mt-4">
              <p className="flex flex-col">
                <span className="text-[#979797] text-sm">Full Name</span>{" "}
                <span className="font-semibold text-base">
                  {userInfo.first_name} {userInfo.middle_name}{" "}
                  {userInfo.last_name}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="text-[#979797] text-sm">Gender</span>{" "}
                <span className="font-semibold text-base capitalize">
                  {userInfo.gender === null ? "N/A" : userInfo.gender}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="text-[#979797] text-sm">Marital Status</span>{" "}
                <span className="font-semibold text-base">
                  {userInfo.marital_status === null
                    ? "N/A"
                    : userInfo.marital_status}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="text-[#979797] text-sm">Address</span>{" "}
                <span className="font-semibold text-base">
                  {userInfo.address === null ? "N/A" : userInfo.address}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="text-[#979797] text-sm">Education</span>{" "}
                <span className="font-semibold text-base">
                  University of Ibadan
                </span>
              </p>
              <p className="flex flex-col">
                <span className="text-[#979797] text-sm">Net Income</span>{" "}
                <span className="font-semibold text-base">$10,000</span>
              </p>
            </div>
          </div>
        ) : activeTab === "Ongoing Plans" ? (
          <OngoingPlans />
        ) : (
          <div>
            <h3 className="font-semibold text-lg">Transactions</h3>
            {/* <p className="text-[#979797] text-sm mt-2">
              No transactions available at this time.
            </p> */}
            <div>
              <UserTransactions />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
