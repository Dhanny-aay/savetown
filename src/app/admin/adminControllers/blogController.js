import api from "../index/api";

export const fetchBlog = async (params, onSuccess,onError) => {
    try {
      const query = new URLSearchParams(params).toString();
      const endpoint = `/blog?${query}`; // Append query to endpoint
  
      const response = await api("GET", endpoint);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

export const updateBlog = async (id, userData, onSuccess, onError) => {
  try {
    const response = await api("PUT", `/blog/${id}`, userData);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const createBlog = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", `/blog`, userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

  // /// Function to delete user note
  export const deleteBlog = async (userId, onSuccess, onError) => {
    try {
      const response = await api("DELETE", `/blog/${userId}`);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };