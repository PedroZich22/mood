import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Zap,
  Target,
  Calendar as CalendarIcon,
  List,
  Sparkles,
} from "lucide-react";
import { useMoods } from "../hooks/useMoods";
import { useStats } from "../hooks/useStats";
import { getGreeting } from "../utils/date";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/Button";
import { StatCard } from "./ui/StatCard";
import Calendar from "./Calendar";
import MoodList from "./MoodList";
import { getMoodEmoji, MOOD_CONFIG } from "../config/mood";
import { PageHeader } from "./ui/PageHeader";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState("calendar");

  const { user } = useAuth();
  const { moods, deleteMood, isLoading, fetchMoods } = useMoods();
  const stats = useStats(moods);
  const navigate = useNavigate();

  const handleEditMood = async (id) => {
    navigate(`/mood/${id}`);
  };

  const handleDeleteMood = async (id) => {
    await deleteMood(id);
    await fetchMoods();
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-brown-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-brown-100 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-16 bg-brown-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={`${getGreeting()}, ${user.name}! 👋`}
        description="Track your emotional journey and build healthy habits"
        badge={{ icon: Sparkles, text: "Your wellness dashboard" }}
        action={
          <Link to="/mood" className="btn btn-primary space-x-2">
            <Plus size={20} />
            <span>Track Mood</span>
          </Link>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Target}
          title="Weekly Goal"
          value={`${stats.completedThisWeek}/${stats.weeklyGoal}`}
          progress={stats.completedThisWeek / stats.weeklyGoal}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />

        <StatCard
          icon={Zap}
          title="Day Streak"
          value={stats.streakDays}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />

        <StatCard
          icon={() => (
            <span className="text-lg">
              {getMoodEmoji(stats.averageMood) || MOOD_CONFIG.emojis[1]}
            </span>
          )}
          title="Avg Mood"
          value={`${stats.averageMood.toFixed(2)}/5`}
          iconBgColor="bg-purple-100"
        />

        <StatCard
          icon={CalendarIcon}
          title="Total Entries"
          value={stats.totalEntries}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-brown-800">Your Journey</h2>
        <div className="flex items-center space-x-2 bg-brown-100 rounded-lg p-1">
          <Button
            variant={viewMode === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="flex items-center space-x-2"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Calendar</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex items-center space-x-2"
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </Button>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <Calendar
          moods={moods}
          onEditMood={handleEditMood}
          onDeleteMood={handleDeleteMood}
        />
      ) : (
        <MoodList
          moods={moods}
          onEditMood={handleEditMood}
          onDeleteMood={handleDeleteMood}
        />
      )}
    </div>
  );
};

export default Dashboard;
