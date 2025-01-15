import api from "../index/api";

export const statDisplay = async (onError) => {
  try {
    const response = await api("GET", "/admin-statistics");
    return response;
  } catch (error) {
    console.log(error);
  }
};