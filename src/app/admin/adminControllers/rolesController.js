import api from "../index/api";

export const rolesDisplay = async (onError) => {
  try {
    const response = await api("GET", "/admin-roles");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createRoles = async (roleData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/admin-roles", roleData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
