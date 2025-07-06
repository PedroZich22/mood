import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Save, Heart, Tag, FileText } from "lucide-react";
import { useMoods } from "../hooks/useMoods";
import { useTagGroups } from "../hooks/useTagGroups";
import { useToast } from "../contexts/ToastContext";
import { isDateInFuture } from "../utils/date";
import { Button } from "./ui/Button";
import { FormSection } from "./ui/FormSection";
import { DatePicker } from "./ui/DatePicker";
import { MoodSelector } from "./ui/MoodSelector";
import { TagSelector } from "./ui/TagSelector";
import { Textarea } from "./ui/Textarea";
import { PageHeader } from "./ui/PageHeader";

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

    if (isDateInFuture(selectedDate)) {
      showError("Cannot create mood entries for future dates");
      return;
    }

    setIsSubmitting(true);

    try {
      const moodEntry = {
        rating: selectedMood,
        note,
        tags: selectedTags,
        date: new Date(selectedDate).toISOString(),
      };

      await createMood(moodEntry);
      showSuccess("Mood entry saved successfully! 🎉");
      navigate("/dashboard");
    } catch {
      showError("Failed to save mood entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    selectedDate && selectedMood && !isDateInFuture(selectedDate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-8">
          <PageHeader
            title="How are you feeling?"
            description="Take a moment to reflect on your current mood and add any thoughts or context that might help you understand your emotional patterns."
            badge={{ icon: Heart, text: "Track your emotional journey" }}
            action={
              <div className="max-w-md">
                <DatePicker
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
                {isDateInFuture(selectedDate) && (
                  <p className="text-red-600 text-sm mt-1">
                    Cannot create entries for future dates
                  </p>
                )}
              </div>
            }
          />
        </div>

        <FormSection
          icon={Heart}
          title="Mood Rating"
          description="How are you feeling? (1-5 scale)"
          required
        >
          <MoodSelector
            value={selectedMood}
            onChange={setSelectedMood}
            variant="buttons"
          />
        </FormSection>

        <FormSection
          icon={Tag}
          title="Tags"
          description="What influenced your mood?"
        >
          {tagsLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="w-6 h-6 border-2 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-brown-600">Loading...</span>
            </div>
          ) : (
            <TagSelector
              tagGroups={tagGroups}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          )}
        </FormSection>

        <FormSection
          icon={FileText}
          title="Notes"
          description="Any additional thoughts?"
        >
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind?"
            className="h-24 resize-none"
            maxLength={500}
          />
          {note.length > 0 && (
            <div className="text-right mt-1">
              <span className="text-xs text-brown-500">{note.length}/500</span>
            </div>
          )}
        </FormSection>

        <div className="flex items-center justify-center pt-4">
          <Button type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Save size={18} />
                <span>Save Mood Entry</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MoodTracker;
