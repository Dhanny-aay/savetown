import api from "../index/api";

// Function to handle admin log in
export const fetchWallet = async (onError) => {
  try {
    const response = await api("GET", "/third-party-wallets");
    return response;
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const fetchWalletDetails = async (id, onError) => {
  try {
    const response = await api("GET", `/third-party-wallets/${id}`);
    return response;
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
