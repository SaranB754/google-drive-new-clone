// Save token after login
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token on logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // redirect to login
};

// Check if logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
