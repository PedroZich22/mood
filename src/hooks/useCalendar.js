import { useState, useMemo } from "react";

export const useCalendar = (moods) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log('moods', moods)
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    // const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayMoods = moods.filter((mood) => {
        const moodDate = new Date(mood.date || mood.createdAt);
        return moodDate.toDateString() === currentDateObj.toDateString();
      });

      days.push({
        date: new Date(currentDateObj),
        isCurrentMonth: currentDateObj.getMonth() === month,
        isToday: currentDateObj.toDateString() === new Date().toDateString(),
        moods: dayMoods,
        averageMood:
          dayMoods.length > 0
            ? dayMoods.reduce((sum, mood) => sum + Number(mood.rating), 0) / dayMoods.length
            : null,
      });

      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return days;
  }, [currentDate, moods]);

  const navigateMonth = (direction) => {
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
  };
};