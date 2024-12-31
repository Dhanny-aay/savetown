import api from "../index/api";

// Function to get user stats
export const handleGetUserStats = async () => {
  try {
    const response = await api("GET", "/user/dashboard");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to get user notifications
export const handleGetUserNotification = async () => {
  try {
    const response = await api("GET", "/user/notifications");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetUserStatsWithParam = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();

    const endpoint = `/user/dashboard/${queryString ? `?${queryString}` : ""}`;

    const response = await api("GET", endpoint);

    return response;
  } catch (error) {
    console.error("Error fetching dashboard with params:", error);
    throw error; // Optionally re-throw the error
  }
};

// Function to get user Profile
export const handleGetUserProfile = async () => {
  try {
    const response = await api("GET", "/user/profile");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle support request
export const handleSupportRequest = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/support-message", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle profile Update
export const handleUpdateProfile = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/profile", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
// Function to handle password Update
export const handleUpdatePassword = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/change-password", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
