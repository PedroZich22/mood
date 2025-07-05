import { useState, useEffect } from "react";
import { moodService } from "../services/moodService";

export const useMoods = (params = {}) => {
  const [moods, setMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await moodService.getMoods(params);
      setMoods(data);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch moods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createMood = async (moodData) => {
    try {
      const newMood = await moodService.createMood(moodData);
      setMoods((prev) => [newMood, ...prev]);
      return newMood;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateMood = async (id, moodData) => {
    try {
      const updatedMood = await moodService.updateMood(id, moodData);
      setMoods((prev) =>
        prev.map((mood) => (mood.id === id ? updatedMood : mood)),
      );
      return updatedMood;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteMood = async (id) => {
    try {
      await moodService.deleteMood(id);
      setMoods((prev) => prev.filter((mood) => mood.id !== id));
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const refreshMoods = () => {
    fetchMoods();
  };

  return {
    moods,
    isLoading,
    error,
    createMood,
    updateMood,
    deleteMood,
    refreshMoods,
  };
};
