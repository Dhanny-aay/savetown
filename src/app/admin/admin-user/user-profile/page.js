"use client";
import React, { Suspense } from "react";
import UserProfile from "./userProfile";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading User Profile...</p>}>
      <UserProfile />
    </Suspense>
  );
}
