import { Clock, Edit3, Trash2 } from "lucide-react";
import { getMoodEmoji, getMoodLabel } from "../config/mood";
import { Button } from "./ui/Button";
import DynamicLucideIcon from "./ui/DynamicIcon";
import { formatToBrazilianDateTime } from "../utils/date";

export const MoodItem = ({ mood, handleEditMood, handleDeleteMood }) => {
  return (
    <div className="flex items-start bg-brown-50 rounded-lg p-4 gap-4">
      <div className="text-2xl">{getMoodEmoji(mood.rating)}</div>
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-brown-800">
              {getMoodLabel(mood.rating)}
            </h4>
            <p className="text-brown-600 text-sm flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatToBrazilianDateTime(mood.date || mood.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleEditMood(mood.id)}
              variant="ghost"
              size="sm"
              aria-label="Edit Mood"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleDeleteMood(mood.id)}
              variant="destructive"
              size="sm"
              aria-label="Delete Mood"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {mood.note && (
          <div className="w-full mt-2 bg-white p-2 rounded">
            <p className="text-brown-700 text-sm">{mood.note}</p>
          </div>
        )}
        {mood.tags && mood.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {mood.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-200 border bg-brown-600 text-white border-brown-600"
              >
                <DynamicLucideIcon name={tag.icon} size={20} />
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
