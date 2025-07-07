import { useState } from "react";
import { Search } from "lucide-react";
import { getMoodLabel, MOOD_CONFIG } from "../config/mood";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { MoodItem } from "./MoodItem";

const MoodList = ({ moods, onEditMood, onDeleteMood }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filteredMoods = moods
    .filter((mood) => {
      const matchesSearch =
        mood.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mood.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesRating =
        filterRating === "all" || mood.rating.toString() === filterRating;
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt);
      const dateB = new Date(b.date || b.createdAt);

      switch (sortBy) {
        case "date":
          return dateB - dateA; // Newest first
        case "rating":
          return b.rating - a.rating; // Highest first
        default:
          return dateB - dateA;
      }
    });

  return (
    <Card>
      <CardHeader className="items-center justify-between">
        <CardTitle>Histórico</CardTitle>
        <div className="flex items-center space-x-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-brown-400" />
            <Input
              type="text"
              placeholder="Buscar humores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-48 text-sm py-2"
            />
          </div>
          <Select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="text-sm py-2 w-32"
          >
            <option value="all">Todos os Humores</option>
            {Object.entries(MOOD_CONFIG.emojis).map(([rating, emoji]) => (
              <option key={rating} value={rating}>
                {emoji} {getMoodLabel(rating)}
              </option>
            ))}
          </Select>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm py-2 w-32"
          >
            <option value="date">Por Data</option>
            <option value="rating">Por Avaliação</option>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredMoods.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-brown-600 font-light mb-4">
              {searchTerm || filterRating !== "all"
                ? "Nenhum humor corresponde aos seus filtros"
                : "Nenhum registro de humor ainda"}
            </p>
            {searchTerm || filterRating !== "all" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchTerm("");
                  setFilterRating("all");
                }}
              >
                Limpar Filtros
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredMoods.map((mood, index) => (
              <MoodItem
                key={index}
                mood={mood}
                handleEditMood={onEditMood}
                handleDeleteMood={onDeleteMood}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodList;