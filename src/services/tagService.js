import apiClient from "../config/api";

export const tagService = {
  getTagGroups: async () => {
    try {
      const response = await apiClient.get("/tags");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch tag groups"
      );
    }
  },
};
