// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/handleApiError";

const AuthContext = createContext(null);

const TOKEN_KEY = "mali_token";
const USER_KEY = "mali_user";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Read token from localStorage on load
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  // When token changes, you COULD set default header here too (extra safety)
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ✅ LOGIN – uses /auth/public/signin and jwtToken from response
  const login = async (username, password) => {
    try {
      const payload = {
        username,
        password,
        role: "admin", // hardcoded as requested
      };

      const res = await api.post("/auth/public/signin", payload);

      const jwt = res.data.jwtToken;
      if (!jwt) {
        toast.error("Login failed: token not found in response");
        return;
      }

      const userData = {
        username: res.data.username,
        roles: res.data.roles || [],
      };

      setToken(jwt);
      setUser(userData);
      localStorage.setItem(TOKEN_KEY, jwt);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));

      toast.success("Welcome back, " + userData.username + "!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed. Please check your username/password.";
      toast.error(msg);
    }
  };

  // ✅ SIGNUP – matches your signup curl
  const signup = async (username, email, password) => {
    try {
      const payload = {
        username,
        email,
        password,
        role: ["admin"], // you said role is an array with "admin"
      };

      await api.post("/auth/public/signup", payload);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      handleApiError(err, "Failed to save shop");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    toast.info("Logged out");
    navigate("/login");
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
