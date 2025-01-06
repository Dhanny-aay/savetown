import api from "../index/api";

export const pushNotificationsDisplay = async ( onError) => {
    try {
      const response = await api("GET", "/push-notifications-content");
      return(response);
    } catch (error) {
     console.log(error)
    }
  };
  
  export const pushNotificationsCreate = async (notificationsData, onSuccess, onError) => {
    try {
      const response = await api("POST", "/push-notifications-content", notificationsData);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  export const editNotifications = async (id, notificationsData, onSuccess, onError) => {
    try {
      const response = await api("PUT", `/push-notifications-content/${id}`, notificationsData);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };