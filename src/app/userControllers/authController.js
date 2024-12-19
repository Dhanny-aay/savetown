import api from "../index/api";

// Function to handle send otp to user email
export const handleSendOTPToMail = async (userData, onSuccess, onError) => {
  try {
    const response = await api(
      "POST",
      "/user/auth/send-email-onboarding",
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
// Function to handle send otp to user phone
export const handleSendOTPToPhone = async (userData, onSuccess, onError) => {
  try {
    const response = await api(
      "POST",
      "/user/auth/send-sms-onboarding",
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle user email verification
export const handleVerifyMail = async (userData, onSuccess, onError) => {
  try {
    const response = await api(
      "POST",
      "/user/auth/verify-email-onboarding",
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle user phone verification
export const handleVerifyPhone = async (userData, onSuccess, onError) => {
  try {
    const response = await api(
      "POST",
      "/user/auth/verify-sms-onboarding",
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle send otp for password reset
export const handleSendResetPasswordOTP = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "POST",
      "/user/auth/reset-password-with-otp",
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle register
export const handleRegisterUser = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/auth/register", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle signin
export const handleLoginUser = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/auth/login", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
