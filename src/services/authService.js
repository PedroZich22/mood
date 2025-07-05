import apiClient from "../config/api";

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      return { token: "a", user: { name: "Pedro" } };
      const response = await apiClient.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      return { token: "a", user: { name: "Pedro" } };
      const response = await apiClient.post("/auth/login", credentials);
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem("authToken", token);
      localStorage.setItem("moodUser", JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // Logout user
  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("moodUser");
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiClient.post("/auth/refresh");
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      return token;
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await apiClient.get("/auth/verify");
      return response.data;
    } catch (error) {
      throw new Error("Token verification failed");
    }
  },
};
