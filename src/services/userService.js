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

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/user", profileData);
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
};
