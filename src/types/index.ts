export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface Tag {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

export interface TagGroup {
  id: string;
  groupName: string;
  tags: Tag[];
}

export interface Mood {
  id: string;
  rating: number;
  note?: string;
  tags: Tag[];
  date: string;
  createdAt: string;
  updatedAt?: string;
  userId: string;
}

export interface MoodEntry {
  rating: number;
  note?: string;
  tags: string[];
  date: string;
}

export interface Analytics {
  totalEntries: number;
  averageMood: number;
  bestDay: string;
  worstDay: string;
  moodDistribution: Record<string, number>;
  topTags: Array<Tag & { count: number }>;
  trends: Array<{
    date: string;
    averageMood: number;
  }>;
}

export interface Stats {
  totalEntries: number;
  averageMood: number;
  streakDays: number;
  weeklyGoal: number;
  completedThisWeek: number;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  moods: Mood[];
  averageMood: number | null;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ProfileData {
  name: string;
  email: string;
  createdAt?: string;
}

export type TimeRange = '7d' | '30d' | '90d' | '365d';

export type MoodRating = 1 | 2 | 3 | 4 | 5;

export interface MoodConfig {
  emojis: Record<MoodRating, string>;
  labels: Record<MoodRating, string>;
  descriptions: Record<MoodRating, string>;
  colors: Record<MoodRating, string>;
  calendarColors: Record<MoodRating, string>;
}