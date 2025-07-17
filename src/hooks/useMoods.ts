import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moodService } from '@/services/moodService';
import { queryKeys } from '@/config/queryClient';
import type { Mood, MoodEntry } from '@/types';

export const useMoods = (params: Record<string, any> = {}) => {
  const queryClient = useQueryClient();

  // Get moods query
  const {
    data: moods = [],
    isLoading,
    error,
    refetch: fetchMoods,
  } = useQuery({
    queryKey: queryKeys.moodsList(params),
    queryFn: () => moodService.getMoods(params),
  });

  // Create mood mutation
  const createMoodMutation = useMutation({
    mutationFn: (moodData: MoodEntry) => moodService.createMood(moodData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.moods() });
    },
  });

  // Update mood mutation
  const updateMoodMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: MoodEntry }) =>
      moodService.updateMood(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.moods() });
    },
  });

  // Delete mood mutation
  const deleteMoodMutation = useMutation({
    mutationFn: (id: string) => moodService.deleteMood(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.moods() });
    },
  });

  return {
    moods,
    isLoading,
    error,
    fetchMoods,
    createMood: createMoodMutation.mutateAsync,
    updateMood: updateMoodMutation.mutateAsync,
    deleteMood: deleteMoodMutation.mutateAsync,
    isCreating: createMoodMutation.isPending,
    isUpdating: updateMoodMutation.isPending,
    isDeleting: deleteMoodMutation.isPending,
  };
};

// Hook for getting a single mood
export const useMood = (id: string) => {
  return useQuery({
    queryKey: queryKeys.mood(id),
    queryFn: () => moodService.getMoodById(id),
    enabled: !!id,
  });
};