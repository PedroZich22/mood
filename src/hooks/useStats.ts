import { useMemo } from "react";
import { getWeekRange, getStartOfDay, getDaysDifference, subDays } from "@/utils/date";
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

    // Calculate weekly progress using date-fns
    const { start: weekStart, end: weekEnd } = getWeekRange();
    const thisWeek = moods.filter((mood) => {
      const moodDate = new Date(mood.date || mood.createdAt);
      return moodDate >= weekStart && moodDate <= weekEnd;
    });

    // Calculate streak (consecutive days with entries)
    const sortedMoods = [...moods].sort(
      (a, b) =>
        new Date(b.date || b.createdAt).getTime() - 
        new Date(a.date || a.createdAt).getTime(),
    );

    let streak = 0;
    let currentDate = new Date();

    // Check for consecutive days with mood entries
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const checkDate = subDays(currentDate, i);
      const dayStart = getStartOfDay(checkDate);
      
      const dayMoods = sortedMoods.filter((mood) => {
        const moodDate = new Date(mood.date || mood.createdAt);
        const moodStart = getStartOfDay(moodDate);
        return moodStart.getTime() === dayStart.getTime();
      });

      if (dayMoods.length > 0) {
        streak++;
      } else if (i > 0) {
        // Allow missing today if it's the first day checked
        break;
      }
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