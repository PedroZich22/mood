import { useState, useEffect } from "react";
import { moodService } from "../services/moodService";

export const useAnalytics = (timeRange = "30d") => {
  const [analytics, setAnalytics] = useState(null);
  const [trends, setTrends] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [analyticsData, trendsData] = await Promise.all([
        moodService.getAnalytics(timeRange),
        moodService.getTrends("week"),
      ]);

      setAnalytics(analyticsData);
      setTrends(trendsData);
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
    trends,
    isLoading,
    error,
    refreshAnalytics,
  };
};
