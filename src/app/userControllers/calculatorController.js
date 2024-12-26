import api from "../index/api";

// Function to handle dinner booking
export const handleCalculatorRequest = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/calculator", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get user transactions
export const handleGetCalculatorControl = async () => {
  try {
    const response = await api("GET", "/calculator");
    return response;
  } catch (error) {
    console.log(error);
  }
};
