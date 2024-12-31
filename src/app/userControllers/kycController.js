import api from "../index/api";

// Function to handle dinner booking
export const handleKYCVerify = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/kyc", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const handleGetKYCSettings = async () => {
  try {
    const response = await api("GET", "/user/kyc-settings");
    return response;
  } catch (error) {
    console.log(error);
  }
};
