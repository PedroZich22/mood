import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "../hooks/useCalendar";
import {
  getMoodCalendarColor,
  getMoodEmoji,
  MOOD_CONFIG,
} from "../config/mood";
import { isDateInFuture } from "../utils/date";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import DayMoodModal from "./DayMoodModal";
import { useState } from "react";

const Calendar = ({ moods, onEditMood, onDeleteMood }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayMoods, setDayMoods] = useState([]);
  const {
    currentDate: calendarCurrentDate,
    calendarDays,
    navigateMonth,
    monthNames,
    dayNames,
  } = useCalendar(moods);

  const handleDateClick = (day) => {
    if (isDateInFuture(day.date)) return;

    setDayMoods(day.moods);
    setSelectedDate(day.date);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="items-center justify-between">
          <CardTitle>Calendário</CardTitle>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h3 className="text-lg font-semibold text-brown-800 min-w-[140px] text-center">
              {monthNames[calendarCurrentDate.getMonth()]}{" "}
              {calendarCurrentDate.getFullYear()}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth(1)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-brown-600"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                disabled={isDateInFuture(day.date) || !day.isCurrentMonth}
                className={`
              flex items-start justify-start relative p-2 h-16 border border-brown-100 bg-white rounded-lg transition-all duration-200 cursor-pointer
              hover:bg-brown-50 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400
              ${day.isToday ? "ring-2 ring-brown-400" : ""}
              ${
                selectedDate &&
                selectedDate.toDateString() === day.date.toDateString()
                  ? "ring-2 ring-brown-600 bg-brown-50"
                  : ""
              }
              ${getMoodCalendarColor(day.averageMood)}
              `}
              >
                <div className="flex flex-col h-full">
                  <span className="text-sm font-medium">
                    {day.date.getDate()}
                  </span>

                  {day.averageMood && (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-lg">
                        {getMoodEmoji(Math.round(day.averageMood))}
                      </span>
                    </div>
                  )}

                  {day.moods.length > 1 && (
                    <div className="absolute bottom-1 right-1">
                      <span className="text-xs bg-brown-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                        {day.moods.length}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-brown-600">
            {Object.keys(MOOD_CONFIG.emojis).map((rating) => (
              <div key={rating} className="flex items-center space-x-1">
                <div
                  className={`w-3 h-3 rounded-sm ${getMoodCalendarColor(rating)}`}
                />
                <span>{MOOD_CONFIG.labels[rating]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DayMoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        dayMoods={dayMoods}
        onEditMood={onEditMood}
        onDeleteMood={onDeleteMood}
      />
    </>
  );
};

export default Calendar;