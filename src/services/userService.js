import apiClient from "../config/api";

export const userService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get("/user");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put("/user", userData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  },

  deleteAccount: async () => {
    try {
      await apiClient.delete("/user");
      return true;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete account"
      );
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/user/logout");
    } catch (error) {
      console.error("Erro ao realizar logout", error);
    } finally {
      localStorage.removeItem("authToken");
    }
  },

  verifyToken: async () => {
    try {
      const response = await apiClient.get("/user/verify");
      return response.data;
    } catch {
      throw new Error("Verificação de token falhou");
    }
  },
};
