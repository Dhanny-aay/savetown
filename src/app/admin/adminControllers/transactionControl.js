import api from "../index/api";

export const fetchTransactions = async (params, onSuccess, onError) => {
    try {
      // Construct the query parameters
      const query = new URLSearchParams(params).toString();
      const endpoint = `/transactions?${query}`; // Append query to endpoint
  
      // Call the API function
      const response = await api("GET", endpoint);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };