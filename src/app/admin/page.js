"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "./components/card";
import TransactionTable from "./components/transactionTable";
import { getToken } from "../utils/authAdminUtils";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("savetown_admin_token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/admin-login"); // Redirect to login if unauthenticated
    }

    setIsLoading(false); // Stop loading after token check
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Spinner for the loading state */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering until redirect
  }

  return (
    <div className="w-full h-full">
      <Card />
      <TransactionTable />
    </div>
  );
}
