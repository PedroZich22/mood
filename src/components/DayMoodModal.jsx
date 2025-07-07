import { X, Edit3, Trash2, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { getMoodEmoji, getMoodLabel } from "../config/mood";
import { Button } from "./ui/Button";
import { formatDate, isDateInFuture } from "../utils/date";
import DynamicLucideIcon from "./ui/DynamicIcon";

const DayMoodModal = ({
  isOpen,
  onClose,
  selectedDate,
  dayMoods,
  onEditMood,
  onDeleteMood,
}) => {
  const { showSuccess, showError } = useToast();

  const handleEditMood = (moodId) => {
    onEditMood(moodId);
  };

  const handleDeleteMood = async (moodId) => {
    if (!confirm("Are you sure you want to delete this mood entry?")) return;

    try {
      await onDeleteMood(moodId);
      showSuccess("Mood entry deleted successfully!");
    } catch {
      showError("Failed to delete mood entry");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-brown-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="heading-md mb-1">{formatDate(selectedDate)}</h2>
              <p className="text-brown-600 text-sm">
                {dayMoods.length} mood{" "}
                {dayMoods.length === 1 ? "entry" : "entries"}
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} aria-label="Close Modal">
              <X className="w-5 h-5 text-brown-600" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {dayMoods.length > 0 ? (
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-brown-800">Mood Entries</h3>
              {dayMoods.map((mood, index) => (
                <div
                  key={mood.id || index}
                  className="bg-brown-50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">
                        {getMoodEmoji(mood.rating)}
                      </div>
                      <div>
                        <h4 className="font-medium text-brown-800">
                          {getMoodLabel(mood.rating)}
                        </h4>
                        <p className="text-brown-600 text-sm flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(
                            mood.date || mood.createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {mood.note && (
                          <p className="text-brown-700 text-sm mt-2 bg-white p-2 rounded">
                            &quot;{mood.note}&quot;
                          </p>
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
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleEditMood(mood.id)}
                        variant="ghost"
                        aria-label="Edit Mood"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteMood(mood.id)}
                        variant="destructive"
                        aria-label="Delete Mood"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 mb-6">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-brown-600 font-light mb-4">
                No mood entries for this day
              </p>
            </div>
          )}

          {!isDateInFuture(selectedDate) && (
            <div className="border-t border-brown-200 pt-6">
              <Link
                to={`/mood?date=${selectedDate.toISOString().split("T")[0]}`}
                onClick={onClose}
                className="w-full p-4 border-2 border-dashed border-brown-300 rounded-lg text-brown-600 hover:border-brown-400 hover:bg-brown-50 transition-colors flex items-center justify-center space-x-2 no-underline"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Mood Entry for This Day</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayMoodModal;
