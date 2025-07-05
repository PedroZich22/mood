import apiClient from "../config/api";

export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get("/user/profile");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/user/profile", profileData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },

  // Update user settings
  updateSettings: async (settings) => {
    try {
      const response = await apiClient.put("/user/settings", settings);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update settings",
      );
    }
  },

  // Get user settings
  getSettings: async () => {
    try {
      const response = await apiClient.get("/user/settings");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch settings",
      );
    }
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await apiClient.post("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to upload avatar",
      );
    }
  },

  // Delete user account
  deleteAccount: async () => {
    try {
      await apiClient.delete("/user/account");
      return true;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete account",
      );
    }
  },

  // Export user data
  exportData: async () => {
    try {
      const response = await apiClient.get("/user/export", {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to export data");
    }
  },
};
