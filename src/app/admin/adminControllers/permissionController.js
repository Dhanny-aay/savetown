import api from "../index/api";

export const permissionsDisplay = async (onError) => {
  try {
    const response = await api("GET", "/admin-permissions");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createPermissions = async (permissionData, onSuccess, onError) => {
    try {
      const response = await api("POST", "/admin-permissions", permissionData);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  export const editPermissions = async (userId, permissionData, onSuccess, onError) => {
    try {
      const response = await api("PUT", `/admin-permissions/${userId}`, permissionData);
      onSuccess(response);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  // /// Function to delete user note
export const deletePermissions = async (userId, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/admin-permissions/${userId}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};