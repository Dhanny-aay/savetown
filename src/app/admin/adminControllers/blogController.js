import api from "../index/api";

export const fetchBlog = async (params, onSuccess,onError) => {
    try {
      const query = new URLSearchParams(params).toString();
      const endpoint = `/blog?${query}`; // Append query to endpoint
  
      const response = await api("GET", endpoint);
      console.log(response, 'response')
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };