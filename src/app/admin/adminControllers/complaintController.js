import api from "../index/api";

export const complaintsDisplay = async (onSuccess, onError) => {
  try {
    const response = await api("GET", "/support-message");
    return(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const replyComplaint = async (msgId, reply, onSuccess, onError) => {
    try {
      const response = await api("PUT", `/admin-permissions/${msgId}`, reply);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };