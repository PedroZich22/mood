import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, Settings, Calendar } from "lucide-react";
import { useMoods } from "../hooks/useMoods";
import { useTagGroups } from "../hooks/useTagGroups";
import { useToast } from "../contexts/ToastContext";
import MoodCarousel from "./MoodCarousel";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { isDateInFuture } from "../utils/date";

const MoodTracker = () => {
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
    } catch {
      showError("Failed to save mood entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Button>
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
        <Card>
          <CardHeader className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="w-5 h-5 text-brown-600" />
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent className="max-w-xs mx-auto">
            <Input
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
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <MoodCarousel
              onMoodSelect={handleMoodSelect}
              selectedMood={selectedMood}
            />
          </CardContent>
        </Card>

        {tagsLoading ? (
          <Card>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-6 bg-brown-200 rounded w-1/4 mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-brown-100 rounded w-16"
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          tagGroups.map((group) => (
            <Card key={group.id}>
              <CardHeader className="items-center justify-center space-x-3 mb-6">
                <CardTitle>
                  {group.name} <span className="text-subtle">(Optional)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3 justify-center">
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
              </CardContent>
            </Card>
          ))
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              Add a Note <span className="text-subtle">(Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How are you feeling today? What's on your mind?"
              maxLength={500}
            />
            <div className="text-right mt-2">
              <span className="text-sm text-brown-500">
                {note.length}/500 characters
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={
              !selectedMood || isSubmitting || isDateInFuture(selectedDate)
            }
          >
            <Save size={20} />
            <span>{isSubmitting ? "Saving..." : "Save Mood Entry"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MoodTracker;
