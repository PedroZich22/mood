import apiClient from "../config/api";

export const tagService = {
  getTagGroups: async () => {
    try {
      const response = await apiClient.get("/tags/groups");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch tag groups"
      );
    }
  },

  createTagGroup: async (groupData) => {
    try {
      const response = await apiClient.post("/tags/groups", groupData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create tag group"
      );
    }
  },

  updateTagGroup: async (id, groupData) => {
    try {
      const response = await apiClient.put(`/tags/groups/${id}`, groupData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update tag group"
      );
    }
  },

  deleteTagGroup: async (id) => {
    try {
      await apiClient.delete(`/tags/groups/${id}`);
      return true;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete tag group"
      );
    }
  },

  reorderTagGroups: async (groupIds) => {
    try {
      const response = await apiClient.put("/tags/groups/reorder", {
        groupIds,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to reorder tag groups"
      );
    }
  },

  addTagToGroup: async (groupId, tagName) => {
    try {
      const response = await apiClient.post(`/tags/groups/${groupId}/tags`, {
        name: tagName,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add tag");
    }
  },

  removeTagFromGroup: async (groupId, tagId) => {
    try {
      await apiClient.delete(`/tags/groups/${groupId}/tags/${tagId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to remove tag");
    }
  },
};
