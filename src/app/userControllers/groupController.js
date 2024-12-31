import api from "../index/api";

// Function to get user groups
export const handleGetUserGroups = async () => {
  try {
    const response = await api("GET", "/user/group");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateGroup = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/user/group", userData);

    if (response) {
      console.log(response);
      onSuccess(response); // Call onSuccess if the response is valid
    }
  } catch (error) {
    console.log(error);
    onError(error); // Call onError if there's an error
  }
};

// Function to delete user group
export const handleDeleteGroup = async (selectedID, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/user/group/${selectedID}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to update group
export const handleUpdateGroups = async (
  selectedID,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("PATCH", `/user/group/${selectedID}`, userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
