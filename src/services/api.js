import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("omnivera-auth-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function submitContactForm(payload) {
  return api.post("/contact", payload);
}
