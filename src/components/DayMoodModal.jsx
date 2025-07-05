import { useState, useEffect } from "react";
import { X, Edit3, Trash2, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTagGroups } from "../hooks/useTagGroups";
import { useToast } from "../contexts/ToastContext";
import { getMoodEmoji, getMoodLabel } from "../config/mood";
import { Button } from "./ui/Button";
import { formatDate, isDateInFuture } from "../utils/date";

const DayMoodModal = ({
  isOpen,
  onClose,
  selectedDate,
  dayMoods,
  onUpdateMood,
  onDeleteMood,
}) => {
  const [editingMood, setEditingMood] = useState(null);
  const { tagGroups } = useTagGroups();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setEditingMood(null);
    }
  }, [isOpen]);

  const handleUpdateMood = async () => {
    try {
      const moodData = { ...editingMood };
      await onUpdateMood(editingMood.id, moodData);
      setEditingMood(null);
      showSuccess("Mood entry updated successfully!");
    } catch {
      showError("Failed to update mood entry");
    }
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

  const handleTagToggle = (tag) => {
    setEditingMood((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
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
            <Button variant="icon" onClick={onClose}>
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
                  {editingMood?.id === mood.id ? (
                    // Edit mode
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-brown-700 mb-2">
                          How are you feeling?
                        </label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() =>
                                setEditingMood((prev) => ({ ...prev, rating }))
                              }
                              className={`p-3 rounded-lg border-2 transition-all ${
                                editingMood.rating === rating
                                  ? "border-brown-600 bg-brown-100 scale-110"
                                  : "border-brown-200 hover:border-brown-400"
                              }`}
                            >
                              <div className="text-2xl">
                                {getMoodEmoji(rating)}
                              </div>
                              <div className="text-xs text-brown-600 mt-1">
                                {getMoodLabel(rating)}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brown-700 mb-2">
                          Note (Optional)
                        </label>
                        <textarea
                          value={editingMood.note || ""}
                          onChange={(e) =>
                            setEditingMood((prev) => ({
                              ...prev,
                              note: e.target.value,
                            }))
                          }
                          placeholder="What's on your mind?"
                          className="input-field h-20 resize-none"
                        />
                      </div>

                      {tagGroups.map((group) => (
                        <div key={group.id}>
                          <label className="block text-sm font-medium text-brown-700 mb-2">
                            {group.name}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {group.tags.map((tag) => (
                              <button
                                key={typeof tag === "string" ? tag : tag.id}
                                type="button"
                                onClick={() =>
                                  handleTagToggle(
                                    typeof tag === "string" ? tag : tag.name
                                  )
                                }
                                className={`tag-item transition-all ${
                                  editingMood.tags?.includes(
                                    typeof tag === "string" ? tag : tag.name
                                  )
                                    ? "bg-brown-600 text-white border-brown-600"
                                    : `${group.color} hover:bg-opacity-80`
                                }`}
                              >
                                {typeof tag === "string" ? tag : tag.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="flex space-x-3">
                        <Button variant="primary" onClick={handleUpdateMood}>
                          Save Changes
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditingMood(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
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
                                  className="text-xs bg-brown-200 text-brown-700 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => setEditingMood(mood)}
                          variant="ghost"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteMood(mood.id)}
                          variant="destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
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
