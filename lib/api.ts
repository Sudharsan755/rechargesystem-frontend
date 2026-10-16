import axios from "axios";

// Base API URL: uses environment variable or defaults to current origin / proxy
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

