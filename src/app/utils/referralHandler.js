"use client";
import { useEffect } from "react";

const ReferralHandler = () => {
  useEffect(() => {
    // Extract the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get("referral_code");

    // If referral code exists, set it to localStorage
    if (referralCode) {
      localStorage.setItem("savetown_referral_code", referralCode);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default ReferralHandler;
