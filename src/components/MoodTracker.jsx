import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, Settings, Calendar } from "lucide-react";
import { useMoods } from "../hooks/useMoods";
import { useTagGroups } from "../hooks/useTagGroups";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import MoodCarousel from "./MoodCarousel";

const MoodTracker = () => {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { createMood } = useMoods();
  const { tagGroups, isLoading: tagsLoading } = useTagGroups();
  const { showSuccess, showError } = useToast();

  // Set date from URL parameter if provided
  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) {
      showError("Please select a mood first");
      return;
    }

    // Validate date is not in the future
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (selectedDateObj > today) {
      showError("Cannot create mood entries for future dates");
      return;
    }

    setIsSubmitting(true);

    try {
      const moodEntry = {
        rating: selectedMood.rating,
        emoji: selectedMood.emoji,
        label: selectedMood.label,
        note,
        tags: selectedTags,
        date: new Date(selectedDate).toISOString(),
      };

      await createMood(moodEntry);
      showSuccess("Mood entry saved successfully!");
      navigate("/");
    } catch (error) {
      showError("Failed to save mood entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconComponent = (iconName) => {
    return <div className="w-5 h-5 bg-brown-400 rounded"></div>;
  };

  const isDateInFuture = (date) => {
    const selectedDateObj = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return selectedDateObj > today;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-brown-600 hover:text-brown-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/mood-settings")}
            className="flex items-center space-x-2 text-brown-600 hover:text-brown-800 transition-colors"
          >
            <Settings size={20} />
            <span>Configure Tags</span>
          </button>
        </div>
        <div className="text-center">
          <h1 className="heading-lg mb-2">Track Your Mood</h1>
          <p className="text-brown-600 font-light">
            Select your current mood and add any notes or tags to help track
            your emotional patterns.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Date Selection */}
        <div className="card p-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="w-5 h-5 text-brown-600" />
            <h2 className="heading-md">Select Date</h2>
          </div>
          <div className="max-w-xs mx-auto">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="input-field text-center"
            />
            {isDateInFuture(selectedDate) && (
              <p className="text-red-600 text-sm mt-2 text-center">
                Cannot create entries for future dates
              </p>
            )}
          </div>
        </div>

        {/* Mood Carousel */}
        <div className="card p-8">
          <MoodCarousel
            onMoodSelect={handleMoodSelect}
            selectedMood={selectedMood}
          />
        </div>

        {/* Tag Groups */}
        {tagsLoading ? (
          <div className="card p-8">
            <div className="animate-pulse">
              <div className="h-6 bg-brown-200 rounded w-1/4 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 bg-brown-100 rounded w-16"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          tagGroups.map((group) => (
            <div key={group.id} className="card p-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                {getIconComponent(group.icon)}
                <h2 className="heading-md">
                  {group.name} <span className="text-subtle">(Optional)</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {group.tags.map((tag) => (
                  <button
                    key={typeof tag === "string" ? tag : tag.id}
                    type="button"
                    onClick={() =>
                      handleTagToggle(typeof tag === "string" ? tag : tag.name)
                    }
                    className={`tag-item transition-all duration-200 ${
                      selectedTags.includes(
                        typeof tag === "string" ? tag : tag.name
                      )
                        ? "bg-brown-600 text-white border-brown-600 scale-105"
                        : `${group.color} hover:bg-opacity-80 hover:scale-105`
                    }`}
                  >
                    {typeof tag === "string" ? tag : tag.name}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Note Section */}
        <div className="card p-8">
          <h2 className="heading-md mb-6 text-center">
            Add a Note <span className="text-subtle">(Optional)</span>
          </h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How are you feeling today? What's on your mind?"
            className="input-field min-h-[120px] resize-none"
            maxLength={500}
          />
          <div className="text-right mt-2">
            <span className="text-sm text-brown-500">
              {note.length}/500 characters
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={
              !selectedMood || isSubmitting || isDateInFuture(selectedDate)
            }
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>{isSubmitting ? "Saving..." : "Save Mood Entry"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MoodTracker;
