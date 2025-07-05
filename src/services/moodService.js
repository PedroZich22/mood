import apiClient from "../config/api";

export const moodService = {
  // Get all mood entries for user
  getMoods: async (params = {}) => {
    try {
      const response = await apiClient.get("/moods", { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch moods");
    }
  },

  // Get single mood entry
  getMood: async (id) => {
    try {
      const response = await apiClient.get(`/moods/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch mood");
    }
  },

  // Create new mood entry
  createMood: async (moodData) => {
    try {
      const response = await apiClient.post("/moods", moodData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create mood entry",
      );
    }
  },

  // Update mood entry
  updateMood: async (id, moodData) => {
    try {
      const response = await apiClient.put(`/moods/${id}`, moodData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update mood");
    }
  },

  // Delete mood entry
  deleteMood: async (id) => {
    try {
      await apiClient.delete(`/moods/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete mood");
    }
  },

  // Get mood analytics
  getAnalytics: async (timeRange = "30d") => {
    try {
      const response = await apiClient.get(
        `/moods/analytics?range=${timeRange}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch analytics",
      );
    }
  },

  // Get mood trends
  getTrends: async (period = "week") => {
    try {
      const response = await apiClient.get(`/moods/trends?period=${period}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch trends",
      );
    }
  },
};
