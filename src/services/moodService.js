import apiClient from "../config/api";

export const moodService = {
  getMoods: async (params = {}) => {
    try {
      const response = await apiClient.get("/moods", { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch moods");
    }
  },

  getMoodById: async (id) => {
    try {
      const response = await apiClient.get(`/moods/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch mood");
    }
  },

  createMood: async (moodData) => {
    try {
      const response = await apiClient.post("/moods", moodData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create mood entry"
      );
    }
  },

  updateMood: async (id, moodData) => {
    try {
      const response = await apiClient.put(`/moods/${id}`, moodData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update mood");
    }
  },

  deleteMood: async (id) => {
    try {
      await apiClient.delete(`/moods/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete mood");
    }
  },

  getAnalytics: async (timeRange = "30d") => {
    try {
      const response = await apiClient.get(
        `/moods/analytics?range=${timeRange}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch analytics"
      );
    }
  },

  getTrends: async (period = "week") => {
    try {
      const response = await apiClient.get(`/moods/trends?period=${period}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch trends"
      );
    }
  },
};
