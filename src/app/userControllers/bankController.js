import api from "../index/api";

// Function to get user banks
export const handleGetUserBanks = async () => {
  try {
    const response = await api("GET", "/user/bank-details");
    return response;
  } catch (error) {
    console.log(error);
  }
};
// Function to get bank list
export const handleGetBankList = async () => {
  try {
    const response = await api("GET", "/user/bank");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to Create Bank Details
export const handleCreateBankDetails = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/bank-details", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to delete user note
export const handleDeleteDankDeets = async (selectedID, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/user/bank-details/${selectedID}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get bank deets by ID
export const handleGetMethodById = async (selectedID) => {
  try {
    const response = await api("GET", `/user/bank-details/${selectedID}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to update Method by ID
export const handleUpdateMethodById = async (
  selectedID,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "PATCH",
      `/user/bank-details/${selectedID}`,
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
