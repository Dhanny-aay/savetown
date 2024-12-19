import api from "../index/api";

// Function to get exchabge amount
export const handleGetExchangAmount = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/get-exchange-rate", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
// Function to initiate Deposit
export const handleInitiateDeposit = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/savings", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to show saving details
export const handleVerifyDepo = async (selectedID) => {
  try {
    const response = await api("GET", `/user/savings/${selectedID}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// transactions for groups

// Function to initiate group Deposit
export const handleInitiateTransfer = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/transfer", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
// Function to initiate wihdrawal
export const handleInitiateWithdrawal = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("POST", "/user/withdrawals", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
