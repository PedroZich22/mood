import { useMemo } from "react";
import type { Mood, Stats } from "@/types";

export const useStats = (moods: Mood[]): Stats => {
  return useMemo(() => {
    if (!moods || moods.length === 0) {
      return {
        totalEntries: 0,
        averageMood: 0,
        streakDays: 0,
        weeklyGoal: 7,
        completedThisWeek: 0,
      };
    }

    const avgMood =
      moods.reduce((sum, mood) => sum + mood.rating, 0) / moods.length;

    // Calculate weekly progress
    const thisWeek = moods.filter((mood) => {
      const moodDate = new Date(mood.date || mood.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return moodDate >= weekAgo;
    });

    // Calculate streak (simplified - consecutive days with entries)
    const sortedMoods = [...moods].sort(
      (a, b) =>
        new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime(),
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      // Check last 30 days
      const dayMoods = sortedMoods.filter((mood) => {
        const moodDate = new Date(mood.date || mood.createdAt);
        moodDate.setHours(0, 0, 0, 0);
        return moodDate.getTime() === currentDate.getTime();
      });

      if (dayMoods.length > 0) {
        streak++;
      } else if (i > 0) {
        // Allow missing today if it's the first day
        break;
      }

      currentDate.setDate(currentDate.getDate() - 1);
    }

    return {
      totalEntries: moods.length,
      averageMood: avgMood,
      streakDays: streak,
      weeklyGoal: 7,
      completedThisWeek: thisWeek.length,
    };
  }, [moods]);
};