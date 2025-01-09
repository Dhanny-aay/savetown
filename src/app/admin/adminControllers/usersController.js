import api from "../index/api";

export const fetchUsers = async (params, onSuccess, onError) => {
    try {
      // Construct the query parameters
      const query = new URLSearchParams(params).toString();
      const endpoint = `/users?${query}`; // Append query to endpoint
  
      // Call the API function
      const response = await api("GET", endpoint);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  export const showUsers = async (id, onSuccess, onError) => {
    try {
      // Call the API function
      const response = await api("GET", `/users/${id}`);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

 export const updateUsers = async (id, userData, onSuccess, onError) => {
  try {
    // console.log(userData)
    const response = await api("PUT", `/users/${id}`, userData);
    // console.log(userData)
    if (onSuccess) {
      onSuccess(response);
      // console.log(response)
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const showUsersTransactions = async (id, onSuccess, onError) => {
  try {
    // Call the API function
    const response = await api("GET", `/user-transactions/${id}`);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// /// Function to delete user note
// export const handleDeleteNote = async (noteId, onSuccess, onError) => {
//   try {
//     const response = await api("DELETE", `/students/notes/${noteId}`);
//     if (onSuccess) {
//       onSuccess(response);
//     }
//   } catch (error) {
//     if (onError) {
//       onError(error);
//     }
//   }
// };