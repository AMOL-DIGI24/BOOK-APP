import axios from "axios";

// Set baseURL correctly
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://fakerestapi.azurewebsites.net/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response Interceptor (Handles Errors)
http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// Export the instance instead of axios methods
export default http;
