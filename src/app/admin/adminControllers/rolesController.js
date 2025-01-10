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

export const editRoles = async (id, roleData, onSuccess, onError) => {
  try {
    const response = await api("PUT", `/admin-roles/${id}`, roleData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const deleteRoles = async (id, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/admin-roles/${id}`);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};