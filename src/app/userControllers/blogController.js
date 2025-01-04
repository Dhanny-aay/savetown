import api from "../index/api";

// Function to get items with params
export const handleGetItemsWithParam = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();

    const endpoint = `/blog${queryString ? `?${queryString}` : ""}`;

    const response = await api("GET", endpoint);

    return response;
  } catch (error) {
    console.log("Error fetching items with params:", error);
    throw error; // Optionally re-throw the error
  }
};
