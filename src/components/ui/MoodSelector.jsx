import {
  getMoodCalendarColor,
  getMoodDescription,
  getMoodEmoji,
  getMoodLabel,
  MOOD_CONFIG,
} from "../../config/mood";
import { cn } from "../../utils/cn";

const MoodSelector = ({ value, onChange, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(MOOD_CONFIG.emojis).map(([rating, emoji]) => {
          const ratingValue = parseInt(rating);

          return (
            <button
              key={ratingValue}
              type="button"
              onClick={() => onChange(ratingValue)}
              className={cn(
                "p-3 rounded-lg border-2 transition-all duration-200 text-center",
                value === ratingValue
                  ? `${getMoodCalendarColor(ratingValue)} border-brown-600 scale-105`
                  : ""
              )}
            >
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-sm font-medium text-brown-700">
                {getMoodLabel(ratingValue)}
              </div>
            </button>
          );
        })}
      </div>

      {value && (
        <div className="text-center text-brown-600">
          <span className="text-sm">
            {`${getMoodEmoji(value)} ${getMoodLabel(value)} ${getMoodDescription(value)}`}
          </span>
        </div>
      )}
    </div>
  );
};

export { MoodSelector };
