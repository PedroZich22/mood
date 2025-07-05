import apiClient from "../config/api";

export const authService = {
  register: async (userData) => {
    try {
      await apiClient.post("/auth/register", userData);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  login: async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      const { token } = response.data;
      return { token };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
    }
  },

  verifyToken: async () => {
    try {
      const response = await apiClient.get("/auth/verify");
      return response.data;
    } catch {
      throw new Error("Token verification failed");
    }
  },
};
