import { useState } from "react";
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
import { Calendar, BarChart2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { StatCard } from "@/components/ui/StatCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatDate } from "@/utils/date";
import { getMoodEmoji, MOOD_CONFIG } from "@/config/mood";
import DynamicLucideIcon from "@/components/ui/DynamicIcon";
import type { TimeRange } from "@/types";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const { isLoading: analyticsLoading, analytics } = useAnalytics(timeRange);

  if (analyticsLoading) {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6 h-64">
                <div className="h-full bg-brown-100 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const moodDistribution = Object.entries(analytics.moodDistribution).map(
    ([rating, count]) => ({
      rating,
      count,
    })
  );

  const topTags = analytics.topTags || [];
  const trends = analytics.trends || [];

  const stats = {
    totalEntries: analytics.totalEntries || 0,
    averageMood: analytics.averageMood || 0,
    bestDay: analytics.bestDay || "N/A",
    worstDay: analytics.worstDay || "N/A",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Análise do Humor"
        description="Insights sobre seus padrões emocionais e tendências."
        badge={{ icon: BarChart2, text: "Insights de dados" }}
        action={
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="w-32"
          >
            <option value="7d">7 Dias</option>
            <option value="30d">30 Dias</option>
            <option value="90d">90 Dias</option>
            <option value="365d">1 Ano</option>
          </Select>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Calendar}
          title="Total de Registros"
          value={stats.totalEntries}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />

        <StatCard
          icon={() => (
            <span className="text-lg">
              {getMoodEmoji(stats.averageMood) || MOOD_CONFIG.emojis[1]}
            </span>
          )}
          title="Humor Médio"
          value={`${stats.averageMood.toFixed(0)}/5`}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />

        <StatCard
          icon={() => <div className="text-lg">😄</div>}
          title="Melhor Dia"
          value={formatDate(stats.bestDay) || "N/A"}
          iconBgColor="bg-green-100"
        />

        <StatCard
          icon={() => <div className="text-lg">💪</div>}
          title="Dia Desafiador"
          value={formatDate(stats.worstDay) || "N/A"}
          iconBgColor="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Tendência do Humor</CardTitle>
          </CardHeader>
          <CardContent>
            {trends.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis domain={[1, 5]} tickFormatter={getMoodEmoji} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const mood = payload[0].value as number;
                        return (
                          <div className="bg-white p-2 border rounded shadow">
                            <p>
                              <strong>Data: {formatDate(label as string)}</strong>
                            </p>
                            <p>
                              Média: {mood.toFixed(2)} {getMoodEmoji(mood)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="averageMood"
                    stroke="#8b6f47"
                    strokeWidth={3}
                    dot={{ fill: "#8b6f47", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-brown-600">
                Nenhum dado de humor disponível
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Humores Mais Comuns</CardTitle>
          </CardHeader>
          <CardContent>
            {moodDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moodDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" tickFormatter={getMoodEmoji} />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const quantidade = payload[0].value;
                        return (
                          <div className="bg-white p-2 border rounded shadow">
                            <p>
                              <strong>Quantidade: {quantidade}</strong>
                            </p>
                            <p>Humor: {getMoodEmoji(Number(label))}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#8b6f47" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-brown-600">
                Nenhum dado de tags disponível
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Tags Mais Comuns</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            {topTags.length > 0 ? (
              topTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center space-x-3 p-4 bg-brown-50 rounded-xl shadow-sm border border-brown-100"
                >
                  <DynamicLucideIcon
                    name={tag.icon}
                    className="text-brown-600 w-6 h-6 shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-brown-700 font-medium">
                      {tag.name}
                    </span>
                    <span className="text-brown-400 text-sm">
                      Quantidade: {tag.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-64 flex items-center justify-center text-brown-600">
                Nenhum dado de tags disponível
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;