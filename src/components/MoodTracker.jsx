import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Save, Heart, Tag, FileText } from "lucide-react";
import { useTagGroups } from "../hooks/useTagGroups";
import { useToast } from "../contexts/ToastContext";
import { isDateInFuture, formatDateTimeIso, getLocalDateString, getLocalTimeString } from "../utils/date";
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
  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [selectedTime, setSelectedTime] = useState(getLocalTimeString());
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
    console.log(searchParams)
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
        const moodDate = new Date(mood.date || mood.createdAt);
        setSelectedDate(getLocalDateString(moodDate));
        setSelectedTime(getLocalTimeString(moodDate));
      } else {
        showError("Registro de humor não encontrado");
        navigate("/dashboard");
      }
    } catch {
      showError("Falha ao carregar registro de humor");
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
      showError("Por favor, selecione um humor primeiro");
      return;
    }

    const fullDateTime = new Date(`${selectedDate}T${selectedTime}`);
    if (isDateInFuture(fullDateTime)) {
      showError("Não é possível criar registros para datas futuras");
      return;
    }

    setIsSubmitting(true);

    try {
      const moodEntry = {
        rating: selectedMood,
        note,
        tags: selectedTags.map((tag) => tag.id),
        date: formatDateTimeIso(`${selectedDate}T${selectedTime}:00`)
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

  const fullDateTime = `${selectedDate}T${selectedTime}:00`;
  const isFormValid = selectedDate && selectedTime && selectedMood && !isDateInFuture(fullDateTime);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-8">
          <PageHeader
            title="Como você está se sentindo?"
            description="Reserve um momento para refletir sobre seu humor atual e adicione quaisquer pensamentos ou contexto que possam ajudá-lo a entender seus padrões emocionais."
            badge={{ icon: Heart, text: "Acompanhe sua jornada emocional" }}
            action={
              <div className="max-w-md space-y-2">
                <div className="flex space-x-2">
                  <DatePicker
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brown-500 focus:ring-brown-500 sm:text-sm"
                  />
                </div>
                {isDateInFuture(fullDateTime) && (
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
          title="Avaliação do Humor"
          description="Como você está se sentindo?"
          required
        >
          <MoodSelector value={selectedMood} onChange={setSelectedMood} />
        </FormSection>

        <FormSection
          icon={Tag}
          title="Tags"
          description="O que influenciou seu humor?"
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
          title="Anotações"
          description="Algum pensamento adicional?"
        >
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="O que está em sua mente?"
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