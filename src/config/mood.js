export const MOOD_CONFIG = {
  emojis: {
    1: "😢",
    2: "😟",
    3: "😐",
    4: "😊",
    5: "😄",
  },

  labels: {
    1: "Very Sad",
    2: "Sad",
    3: "Neutral",
    4: "Happy",
    5: "Very Happy",
  },

  descriptions: {
    1: "Feeling really down today",
    2: "Not having a great day",
    3: "Feeling okay, nothing special",
    4: "Having a good day!",
    5: "Feeling absolutely amazing!",
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

export const getMoodEmoji = (rating) => MOOD_CONFIG.emojis[rating] || "";
export const getMoodLabel = (rating) => MOOD_CONFIG.labels[rating] || "";
export const getMoodDescription = (rating) =>
  MOOD_CONFIG.descriptions[rating] || "";
export const getMoodColor = (rating) => MOOD_CONFIG.colors[rating] || "";
export const getMoodCalendarColor = (averageMood) => {
  if (!averageMood) return "bg-gray-100";
  const rating = Math.round(averageMood);
  return MOOD_CONFIG.calendarColors[rating] || "bg-gray-100";
};
