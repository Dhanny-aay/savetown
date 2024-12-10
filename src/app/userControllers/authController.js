import api from "../index/api";

// Function to handle user email verification
export const handleEmailVerification = async (userData, onSuccess, onError) => {
  try {
    const response = await api(
      "POST",
      "/user/auth/email-verification",
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
