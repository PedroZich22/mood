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

  return {
    tagGroups,
    isLoading,
    error,
    refreshTagGroups: fetchTagGroups,
  };
};
