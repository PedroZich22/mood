import type { MoodConfig, MoodRating } from "@/types";

export const MOOD_CONFIG: MoodConfig = {
  emojis: {
    1: "😢",
    2: "😟",
    3: "😐",
    4: "😊",
    5: "😄",
  },

  labels: {
    1: "Muito Triste",
    2: "Triste",
    3: "Neutro",
    4: "Feliz",
    5: "Muito Feliz",
  },

  descriptions: {
    1: "Me sentindo muito mal hoje",
    2: "Não está sendo um bom dia",
    3: "Me sentindo bem, nada especial",
    4: "Tendo um bom dia!",
    5: "Me sentindo absolutamente incrível!",
  },

  colors: {
    1: "from-red-400 to-red-500",
    2: "from-orange-400 to-orange-500",
    3: "from-yellow-400 to-yellow-500",
    4: "from-green-400 to-green-500",
    5: "from-emerald-400 to-emerald-500",
  },

  calendarColors: {
    1: "bg-red-100",
    2: "bg-orange-100",
    3: "bg-yellow-100",
    4: "bg-green-100",
    5: "bg-green-200",
  },
};

export const getMoodEmoji = (rating: number): string => 
  MOOD_CONFIG.emojis[rating as MoodRating] || "";

export const getMoodLabel = (rating: number): string => 
  MOOD_CONFIG.labels[rating as MoodRating] || "";

export const getMoodDescription = (rating: number): string =>
  MOOD_CONFIG.descriptions[rating as MoodRating] || "";

export const getMoodColor = (rating: number): string => 
  MOOD_CONFIG.colors[rating as MoodRating] || "";

export const getMoodCalendarColor = (averageMood: number | null): string => {
  if (!averageMood || isNaN(averageMood)) return "bg-white";
  const rating = Math.round(Number(averageMood)) as MoodRating;
  return MOOD_CONFIG.calendarColors[rating] || "bg-white";
};