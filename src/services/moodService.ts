import apiClient from "@/config/api";
import type { Mood, MoodEntry, Analytics } from "@/types";

export const moodService = {
  getMoods: async (params: Record<string, any> = {}): Promise<Mood[]> => {
    const response = await apiClient.get("/moods", { params });
    return response.data;
  },

  getMoodById: async (id: string): Promise<Mood> => {
    const response = await apiClient.get(`/moods/${id}`);
    return response.data;
  },

  createMood: async (moodData: MoodEntry): Promise<Mood> => {
    const response = await apiClient.post("/moods", moodData);
    return response.data;
  },

  updateMood: async (id: string, moodData: MoodEntry): Promise<Mood> => {
    const response = await apiClient.put(`/moods/${id}`, moodData);
    return response.data;
  },

  deleteMood: async (id: string): Promise<void> => {
    await apiClient.delete(`/moods/${id}`);
  },

  getAnalytics: async (timeRange: string = "30d"): Promise<Analytics> => {
    const response = await apiClient.get(`/moods/analytics?range=${timeRange}`);
    return response.data;
  },
};