import { useState } from "react";
import { Calendar, Clock, Edit3, Trash2, Search } from "lucide-react";
import { getMoodEmoji, getMoodLabel, MOOD_CONFIG } from "../config/mood";
import { formatDate, formatTime } from "../utils/date";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { getTagIcon } from "../config/tags";

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
        <CardTitle>History</CardTitle>
        <div className="flex items-center space-x-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-brown-400" />
            <Input
              type="text"
              placeholder="Search moods..."
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
            <option value="all">All Moods</option>
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
            <option value="date">By Date</option>
            <option value="rating">By Rating</option>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredMoods.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-brown-600 font-light mb-4">
              {searchTerm || filterRating !== "all"
                ? "No moods match your filters"
                : "No mood entries yet"}
            </p>
            {searchTerm || filterRating !== "all" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchTerm("");
                  setFilterRating("all");
                }}
              >
                Clear Filters
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredMoods.map((mood, index) => (
              <div
                key={mood.id || index}
                className="bg-brown-50 rounded-lg p-4 hover:bg-brown-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-3xl">{getMoodEmoji(mood.rating)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-brown-800">
                          {getMoodLabel(mood.rating)}
                        </h3>
                        <span className="text-brown-600 text-sm flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(mood.date || mood.createdAt)}
                        </span>
                        <span className="text-brown-600 text-sm flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTime(mood.date || mood.createdAt)}
                        </span>
                      </div>

                      {mood.note && (
                        <p className="text-brown-700 text-sm mb-2 bg-white p-2 rounded">
                          &quot;{mood.note}&quot;
                        </p>
                      )}

                      {mood.tags && mood.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {mood.tags.map((tag, tagIndex) => {
                            const IconComponent = getTagIcon(tag);
                            return (
                              <Badge
                                key={tagIndex}
                                variant="default"
                                className="text-xs"
                              >
                                <IconComponent className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditMood(mood)}
                      title="Edit mood"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDeleteMood(mood.id)}
                      title="Delete mood"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodList;
