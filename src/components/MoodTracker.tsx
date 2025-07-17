import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Save, Heart, Tag, FileText } from "lucide-react";
import { useTagGroups } from "@/hooks/useTagGroups";
import { useMood, useMoods } from "@/hooks/useMoods";
import { useToast } from "@/contexts/ToastContext";
import { isDateInFuture, formatDateTimeIso, getLocalDateString, getLocalTimeString } from "@/utils/date";
import { Button } from "@/components/ui/Button";
import { FormSection } from "@/components/ui/FormSection";
import { DatePicker } from "@/components/ui/DatePicker";
import { MoodSelector } from "@/components/ui/MoodSelector";
import { TagSelector } from "@/components/ui/TagSelector";
import { Textarea } from "@/components/ui/Textarea";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Tag, MoodRating } from "@/types";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<MoodRating | null>(null);
  const [note, setNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [selectedTime, setSelectedTime] = useState(getLocalTimeString());

  const { tagGroups, isLoading: tagsLoading } = useTagGroups();
  const { createMood, updateMood } = useMoods();
  const { showSuccess, showError } = useToast();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id: moodId } = useParams<{ id: string }>();

  const isEditMode = !!moodId;
  const { data: existingMood, isLoading: moodLoading } = useMood(moodId || "");

  useEffect(() => {
    if (existingMood && isEditMode) {
      setSelectedMood(existingMood.rating as MoodRating);
      setNote(existingMood.note || "");
      setSelectedTags(existingMood.tags || []);
      const moodDate = new Date(existingMood.date || existingMood.createdAt);
      setSelectedDate(getLocalDateString(moodDate));
      setSelectedTime(getLocalTimeString(moodDate));
    }
  }, [existingMood, isEditMode]);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);

  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.some(t => t.id === tag.id) 
        ? prev.filter((t) => t.id !== tag.id) 
        : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const moodEntry = {
        rating: selectedMood,
        note,
        tags: selectedTags.map((tag) => tag.id),
        date: formatDateTimeIso(`${selectedDate}T${selectedTime}:00`)
      };

      if (isEditMode && moodId) {
        await updateMood({ id: moodId, data: moodEntry });
        showSuccess("Registro de humor atualizado com sucesso! ✨");
      } else {
        await createMood(moodEntry);
        showSuccess("Registro de humor salvo com sucesso! 🎉");
      }

      navigate("/dashboard");
    } catch (error) {
      showError(error);
    }
  };

  const fullDateTime = `${selectedDate}T${selectedTime}:00`;
  const isFormValid = selectedDate && selectedTime && selectedMood && !isDateInFuture(fullDateTime);
  const isLoading = moodLoading || tagsLoading;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-brown-200 rounded w-1/3 mb-8"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6">
                <div className="h-32 bg-brown-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          <Button type="submit" disabled={!isFormValid}>
            <div className="flex items-center justify-center space-x-2">
              <Save size={18} />
              <span>Salvar registro de humor</span>
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MoodTracker;