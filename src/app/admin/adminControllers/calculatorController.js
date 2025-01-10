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

export const createHouseType = async (data, onSuccess, onError) => {
  try {
    const response = await api("POST", "/house-settings", data);
    return(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const deleteHouseType = async (id,  onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/house-settings/${id}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const editHouseType = async (id, data, onSuccess, onError) => {
  try {
    const response = await api("PUT", `/house-settings/${id}`, data);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};