import apiClient from "@/config/api";
import type { TagGroup } from "@/types";

export const tagService = {
  getTagGroups: async (): Promise<TagGroup[]> => {
    const response = await apiClient.get("/tags");
    return response.data;
  },
};