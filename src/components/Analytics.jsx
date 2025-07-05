import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";
import { useMoods } from "../hooks/useMoods";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Select } from "./ui/Select";
import { StatCard } from "./ui/StatCard";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const { isLoading: analyticsLoading } = useAnalytics(timeRange);
  const { moods, isLoading: moodsLoading } = useMoods();
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    totalEntries: 0,
    averageMood: 0,
    bestDay: "",
    worstDay: "",
    mostCommonTags: [],
  });

  useEffect(() => {
    if (moods.length > 0) {
      // Process chart data
      const processedData = moods
        .slice(0, 14)
        .reverse()
        .map((mood) => ({
          date: new Date(mood.date || mood.createdAt).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" }
          ),
          mood: mood.rating,
          fullDate: mood.date || mood.createdAt,
        }));
      setChartData(processedData);

      // Calculate stats
      const avgMood =
        moods.reduce((sum, mood) => sum + mood.rating, 0) / moods.length;

      const sortedMoods = [...moods].sort((a, b) => b.rating - a.rating);
      const bestDay = sortedMoods[0]
        ? new Date(
            sortedMoods[0].date || sortedMoods[0].createdAt
          ).toLocaleDateString()
        : "";
      const worstDay = sortedMoods[sortedMoods.length - 1]
        ? new Date(
            sortedMoods[sortedMoods.length - 1].date ||
              sortedMoods[sortedMoods.length - 1].createdAt
          ).toLocaleDateString()
        : "";

      const allTags = moods.flatMap((mood) => mood.tags || []);
      const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});
      const mostCommonTags = Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([tag, count]) => ({ tag, count }));

      setStats({
        totalEntries: moods.length,
        averageMood: avgMood,
        bestDay,
        worstDay,
        mostCommonTags,
      });
    }
  }, [moods]);

  if (moodsLoading || analyticsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-brown-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-brown-100 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="h-16 bg-brown-100 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="heading-lg mb-2">Mood Analytics</h1>
            <p className="text-brown-600 font-light">
              Insights into your emotional patterns and trends.
            </p>
          </div>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-32"
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
            <option value="1y">1 Year</option>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Calendar}
          title="Total Entries"
          value={stats.totalEntries}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />

        <StatCard
          icon={TrendingUp}
          title="Average Mood"
          value={`${stats.averageMood.toFixed(1)}/5`}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />

        <StatCard
          icon={() => <div className="text-2xl">😄</div>}
          title="Best Day"
          value={stats.bestDay || "N/A"}
          iconBgColor="bg-green-100"
        />

        <StatCard
          icon={() => <div className="text-2xl">💪</div>}
          title="Challenging Day"
          value={stats.worstDay || "N/A"}
          iconBgColor="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Mood Trend (Last 14 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#8b6f47"
                    strokeWidth={3}
                    dot={{ fill: "#8b6f47", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-brown-600">
                No mood data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Most Common Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Tags</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.mostCommonTags.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.mostCommonTags}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tag" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b6f47" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-brown-600">
                No tags data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.averageMood > 3.5 && (
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="text-2xl">😊</div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Great Mood Average!
                  </h3>
                  <p className="text-green-700 text-sm">
                    Your average mood of {stats.averageMood.toFixed(1)}/5 shows
                    you&apos;re generally feeling positive. Keep up the great
                    work with your mood tracking!
                  </p>
                </div>
              </div>
            )}

            {stats.averageMood < 3 && (
              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl">🤗</div>
                <div>
                  <h3 className="font-semibold text-orange-800">
                    Consider Self-Care
                  </h3>
                  <p className="text-orange-700 text-sm">
                    Your average mood of {stats.averageMood.toFixed(1)}/5
                    suggests you might be going through a challenging time.
                    Remember to practice self-care and consider reaching out to
                    friends, family, or a professional for support.
                  </p>
                </div>
              </div>
            )}

            {stats.mostCommonTags.length > 0 && (
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl">🏷️</div>
                <div>
                  <h3 className="font-semibold text-blue-800">Tag Patterns</h3>
                  <p className="text-blue-700 text-sm">
                    Your most common tags are:{" "}
                    {stats.mostCommonTags
                      .slice(0, 3)
                      .map((t) => t.tag)
                      .join(", ")}
                    . This can help you identify patterns in what affects your
                    mood.
                  </p>
                </div>
              </div>
            )}

            {stats.totalEntries < 7 && (
              <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl">📈</div>
                <div>
                  <h3 className="font-semibold text-purple-800">
                    Build Consistency
                  </h3>
                  <p className="text-purple-700 text-sm">
                    You&apos;ve tracked {stats.totalEntries} mood entries so
                    far. Try to track your mood daily to get better insights
                    into your emotional patterns over time.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
