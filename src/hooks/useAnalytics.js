import { useState, useEffect } from "react";
import { moodService } from "../services/moodService";

export const useAnalytics = (timeRange = "30d") => {
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const analyticsData = await moodService.getAnalytics(timeRange);

      setAnalytics(analyticsData);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAnalytics = () => {
    fetchAnalytics();
  };

  return {
    analytics,
    isLoading,
    error,
    refreshAnalytics,
  };
};
