import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // correct key is baseURL
});

// Add token automatically if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const loginUser = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    // Backend returns {error: "message"}, convert to {message: "message"}
    const errorMessage = err.response?.data?.error || err.response?.data?.message || "Login failed";
    throw { message: errorMessage };
  }
};

export const signupUser = (email, password) =>
  API.post("/auth/signup", { email, password });

// Files
export const getFiles = () => API.get("/files");
export const uploadFile = (formData) =>
  API.post("/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteFile = (id) => API.delete(`/files/${id}`);
export const restoreFile = (id) => API.post(`/files/${id}/restore`);
