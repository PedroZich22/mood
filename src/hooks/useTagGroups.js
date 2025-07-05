import { useState, useEffect } from "react";
import { tagService } from "../services/tagService";

export const useTagGroups = () => {
  const [tagGroups, setTagGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTagGroups();
  }, []);

  const fetchTagGroups = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await tagService.getTagGroups();
      setTagGroups(data);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch tag groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTagGroup = async (groupData) => {
    try {
      const newGroup = await tagService.createTagGroup(groupData);
      setTagGroups((prev) => [...prev, newGroup]);
      return newGroup;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateTagGroup = async (id, groupData) => {
    try {
      const updatedGroup = await tagService.updateTagGroup(id, groupData);
      setTagGroups((prev) =>
        prev.map((group) => (group.id === id ? updatedGroup : group)),
      );
      return updatedGroup;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteTagGroup = async (id) => {
    try {
      await tagService.deleteTagGroup(id);
      setTagGroups((prev) => prev.filter((group) => group.id !== id));
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const reorderTagGroups = async (groupIds) => {
    try {
      await tagService.reorderTagGroups(groupIds);
      // Reorder locally
      const reorderedGroups = groupIds
        .map((id) => tagGroups.find((group) => group.id === id))
        .filter(Boolean);
      setTagGroups(reorderedGroups);
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const addTagToGroup = async (groupId, tagName) => {
    try {
      const updatedGroup = await tagService.addTagToGroup(groupId, tagName);
      setTagGroups((prev) =>
        prev.map((group) => (group.id === groupId ? updatedGroup : group)),
      );
      return updatedGroup;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const removeTagFromGroup = async (groupId, tagId) => {
    try {
      await tagService.removeTagFromGroup(groupId, tagId);
      setTagGroups((prev) =>
        prev.map((group) =>
          group.id === groupId
            ? { ...group, tags: group.tags.filter((tag) => tag.id !== tagId) }
            : group,
        ),
      );
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    tagGroups,
    isLoading,
    error,
    createTagGroup,
    updateTagGroup,
    deleteTagGroup,
    reorderTagGroups,
    addTagToGroup,
    removeTagFromGroup,
    refreshTagGroups: fetchTagGroups,
  };
};
