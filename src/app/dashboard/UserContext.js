"use client";
import { createContext, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
