import api from "../index/api";

export const showSettings = async (onSuccess, onError) => {
    try {
      const response = await api("GET", "/settings");
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };
  
  export const updateSettings = async (userId, settingsData, onSuccess, onError) => {
    try {
      const response = await api("PUT", `/settings/${userId}`, settingsData);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };