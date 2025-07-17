import { useState, useMemo } from "react";
import { getCalendarMonth, getStartOfDay, formatDate } from "@/utils/date";
import type { Mood, CalendarDay } from "@/types";

export const useCalendar = (moods: Mood[]) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarDays = useMemo((): CalendarDay[] => {
    const { days } = getCalendarMonth(currentDate);
    const currentMonth = currentDate.getMonth();

    return days.map((day) => {
      const dayMoods = moods.filter((mood) => {
        const moodDate = new Date(mood.date || mood.createdAt);
        const dayStart = getStartOfDay(day);
        const moodStart = getStartOfDay(moodDate);
        return dayStart.getTime() === moodStart.getTime();
      });

      return {
        date: day,
        isCurrentMonth: day.getMonth() === currentMonth,
        isToday: getStartOfDay(day).getTime() === getStartOfDay(new Date()).getTime(),
        moods: dayMoods,
        averageMood:
          dayMoods.length > 0
            ? dayMoods.reduce((sum, mood) => sum + Number(mood.rating), 0) / dayMoods.length
            : null,
      };
    });
  }, [currentDate, moods]);

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return {
    currentDate,
    calendarDays,
    navigateMonth,
    monthNames,
    dayNames,
    monthName: formatDate(currentDate, 'MMMM yyyy'),
  };
};