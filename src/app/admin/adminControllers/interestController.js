import api from "../index/api";

export const showInterest = async (onError) => {
    try {
      // Call the API function
      const response = await api("GET", '/interest-rates');
      return(response);
    } catch (error) {
        //   console.log('i am response', response)
      if (onError) {
        onError(error);
      }
    }
  };

  export const editInterest = async (userId, permissionData, onSuccess, onError) => {
    try {
      const response = await api("PUT", `/interest-rates/${userId}`, permissionData);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };