import api from "../index/api";

// Function to get dinner dates
export const handleGetDinnerDates = async () => {
  try {
    const response = await api("GET", "/dinner-dates");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle dinner booking
export const handleBookDinner = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/dinner-dates", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
