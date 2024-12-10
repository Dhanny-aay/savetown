import api from "../index/api";

// Function to handle admin log in
export const handleAdminLogin = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/auth/login", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
