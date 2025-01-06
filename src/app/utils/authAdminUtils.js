// Save the token in localStorage
export const saveToken = (token) => {
  localStorage.setItem('authToken', token); // Save the token with the key 'authToken'
  // console.log("Token saved in localStorage:", token);
};

// Retrieve the token from localStorage
export const getToken = () => {
  const token = localStorage.getItem('authToken'); // Get the token from localStorage
  // console.log("Token retrieved from localStorage:", token);
  return token || null; // Return null if no token is found
};

// Remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem('authToken'); // Remove the token from localStorage
  // console.log("Token removed from localStorage");
};
