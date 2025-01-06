import api from "../index/api";

export const adminDisplay = async ( onError) => {
    try {
      const response = await api("GET", "/admin-users");
      return(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  export const createAdminUser = async ( adminData, onError) => {
    try {
        const response = await api("POST", "/admin-users", adminData);
        onSuccess(response);
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
  };