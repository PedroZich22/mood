import apiClient from "@/config/api";
import type { User, ProfileData } from "@/types";

export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get("/user");
    return response.data;
  },

  updateProfile: async (userData: ProfileData): Promise<User> => {
    const response = await apiClient.put("/user", userData);
    return response.data;
  },

  deleteAccount: async (): Promise<void> => {
    await apiClient.delete("/user");
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/user/logout");
    } catch (error) {
      console.error("Erro ao realizar logout", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
  },

  verifyToken: async (): Promise<User> => {
    const response = await apiClient.get("/user/verify");
    return response.data;
  },
};