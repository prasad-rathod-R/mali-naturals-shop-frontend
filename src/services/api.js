// src/services/api.js
import axios from "axios";
import { toast } from "react-toastify";

const TOKEN_KEY = "mali_token";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Request interceptor: attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor: handle 401 (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      toast.error("Unauthorized – please login again.", {
        theme: "dark",
      });
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("mali_user");
      setTimeout(() => {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }, 800);
    }
    return Promise.reject(error);
  }
);

export default api;
