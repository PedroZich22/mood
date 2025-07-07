import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Save, Heart, Tag, FileText } from "lucide-react";
import { useTagGroups } from "../hooks/useTagGroups";
import { useToast } from "../contexts/ToastContext";
import { isDateInFuture, formatDateTimeIso } from "../utils/date";
import { Button } from "./ui/Button";
import { FormSection } from "./ui/FormSection";
import { DatePicker } from "./ui/DatePicker";
import { MoodSelector } from "./ui/MoodSelector";
import { TagSelector } from "./ui/TagSelector";
import { Textarea } from "./ui/Textarea";
import { PageHeader } from "./ui/PageHeader";
import { moodService } from "../services/moodService";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { tagGroups, isLoading: tagsLoading } = useTagGroups();
  const { showSuccess, showError } = useToast();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id: moodId } = useParams();

  const isEditMode = !!moodId;

  useEffect(() => {
    if (moodId) {
      loadMoodForEditing(moodId);
    }
  }, [moodId]);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);

  const loadMoodForEditing = async (id) => {
    try {
      const mood = await moodService.getMoodById(id);

      if (mood) {
        setSelectedMood(mood.rating);
        setNote(mood.note || "");
        setSelectedTags(mood.tags || []);
        setSelectedDate(
          new Date(mood.date || mood.createdAt).toISOString().split("T")[0]
        );
      } else {
        showError("Mood entry not found");
        navigate("/dashboard");
      }
    } catch {
      showError("Failed to load mood entry");
      navigate("/dashboard");
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) {
      showError("Por favor, selecione um mood primeiro");
      return;
    }

    if (isDateInFuture(selectedDate)) {
      showError("Não é possível criar registros para datas futuras");
      return;
    }

    setIsSubmitting(true);

    try {
      const moodEntry = {
        rating: selectedMood,
        note,
        tags: selectedTags.map((tag) => tag.id),
        date: formatDateTimeIso(new Date(selectedDate).toISOString())
      };

      if (isEditMode) {
        await moodService.updateMood(moodId, moodEntry);
        showSuccess("Registro de humor atualizado com sucesso! ✨");
      } else {
        await moodService.createMood(moodEntry);
        showSuccess("Registro de humor salvo com sucesso! 🎉");
      }

      navigate("/dashboard");
    } catch {
      showError("Falha ao salvar registro de humor");
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
                    Não é possível criar registros para datas futuras
                  </p>
                )}
              </div>
            }
          />
        </div>

        <FormSection
          icon={Heart}
          title="Mood Rating"
          description="How are you feeling?"
          required
        >
          <MoodSelector value={selectedMood} onChange={setSelectedMood} />
        </FormSection>

        <FormSection
          icon={Tag}
          title="Tags"
          description="What influenced your mood?"
        >
          {tagsLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="w-6 h-6 border-2 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-brown-600">Carregando...</span>
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
                <span>Salvando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Save size={18} />
                <span>Salvar registro de humor</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MoodTracker;
