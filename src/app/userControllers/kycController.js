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
