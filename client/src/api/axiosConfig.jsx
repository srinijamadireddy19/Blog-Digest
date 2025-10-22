import axios from "axios";

function getApiBaseUrl() {
  // Vite -> import.meta.env.VITE_API_URL
  // Vite -> import.meta.env.VITE_API_URL
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Create React App / webpack -> process.env.REACT_APP_API_URL (may be compiled away)
  if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Optional runtime override (set window.__API_URL__ in index.html if needed)
  if (typeof window !== "undefined" && window.__API_URL__) {
    return window.__API_URL__;
  }

  // Safe default
  return "/";
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
