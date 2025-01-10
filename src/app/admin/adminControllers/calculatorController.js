import api from "../index/api";

export const calculatorDisplay = async (onSuccess, onError) => {
  try {
    const response = await api("GET", "/calculator-savings-request");
    return(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const houseDisplay = async (onSuccess, onError) => {
  try {
    const response = await api("GET", "/house-settings");
    return(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const createHouse = async (data, onSuccess, onError) => {
  try {
    const response = await api("POST", "/house-settings", data);
    return(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
