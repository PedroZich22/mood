import { X, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { Button } from "./ui/Button";
import { formatDate, isDateInFuture } from "../utils/date";
import { MoodItem } from "./MoodItem";

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
    if (!confirm("Tem certeza que deseja excluir este registro de humor?")) return;

    try {
      await onDeleteMood(moodId);
      showSuccess("Registro de humor excluído com sucesso!");
    } catch {
      showError("Falha ao excluir registro de humor");
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
                {dayMoods.length} registro{" "}
                {dayMoods.length === 1 ? "de humor" : "de humor"}
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} aria-label="Fechar Modal">
              <X className="w-5 h-5 text-brown-600" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {dayMoods.length > 0 ? (
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-brown-800">Registros de Humor</h3>
              {dayMoods.map((mood, index) => (
                <MoodItem
                  mood={mood}
                  key={index}
                  handleEditMood={handleEditMood}
                  handleDeleteMood={handleDeleteMood}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 mb-6">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-brown-600 font-light mb-4">
                Nenhum registro de humor para este dia
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
                <span>Adicionar Novo Registro de Humor para Este Dia</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayMoodModal;