"use client";
import { useRouter } from "next/navigation";
import Headbar from "./component/headbar";
import Sidebar from "./component/sidebar";
import { useEffect, useState } from "react";
import {
  handleGetUserProfile,
  handleGetUserStats,
} from "../userControllers/profileController";
import { UserProvider } from "./UserContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [triggerProfile, setTriggerProfile] = useState(false);

  const triggerFetchDashboard = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };
  const triggerFetchProfile = () => {
    setTriggerProfile(!triggerProfile); // Toggle trigger to true or false
  };

  useEffect(() => {
    // Get the item from localStorage
    const storedItem = localStorage.getItem("savetown_token");
    if (storedItem) {
      // Do nothing
    } else {
      router.push("/sign-in");
    }
  }, []);

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const data = await handleGetUserStats();
      if (data) {
        setUserStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserProfile = async () => {
    setLoadingProfile(true);
    try {
      const data = await handleGetUserProfile();
      if (data) {
        setUserProfile(data.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, [trigger]);

  useEffect(() => {
    fetchUserProfile();
  }, [triggerProfile]);

  const contextValue = {
    userProfile,
    loadingProfile,
    userStats,
    loading,
    triggerFetchDashboard,
    triggerFetchProfile,
  };

  return (
    <UserProvider value={contextValue}>
      <div className="">
        <Sidebar />
        <Headbar />
        <main className=" absolute md:left-20 lg:left-[20%] top-[72px] w-full md:w-[calc(100%-5rem)] lg:w-[80%] px-6 pt-6 pb-20 md:pb-6 ">
          {children}
        </main>
      </div>
    </UserProvider>
  );
}
