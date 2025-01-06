import api from "../index/api";

// Function to handle admin log in
export const handleAdminLogin = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/auth/login", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};







// // Function to get user banks
// export const handleGetUserBanks = async () => {
//   try {
//     const response = await api("GET", "/user/bank-details");
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

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

// // Function to update user note
// export const handleUpdateNote = async (noteID, userData, onSuccess, onError) => {
//   try {
//     const response = await api("PATCH", `/students/notes/${noteID}`, userData);
//     if (onSuccess) {
//       onSuccess(response);
//     }
//   } catch (error) {
//     if (onError) {
//       onError(error);
//     }
//   }
// };
