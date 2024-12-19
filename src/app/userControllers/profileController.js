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
