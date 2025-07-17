import { useQuery } from '@tanstack/react-query';
import { moodService } from '@/services/moodService';
import { queryKeys } from '@/config/queryClient';
import type { Analytics, TimeRange } from '@/types';

export const useAnalytics = (timeRange: TimeRange = "30d") => {
  const {
    data: analytics,
    isLoading,
    error,
    refetch: refreshAnalytics,
  } = useQuery({
    queryKey: queryKeys.moodsAnalytics(timeRange),
    queryFn: () => moodService.getAnalytics(timeRange),
  });

  return {
    analytics: analytics || {
      totalEntries: 0,
      averageMood: 0,
      bestDay: '',
      worstDay: '',
      moodDistribution: {},
      topTags: [],
      trends: [],
    },
    isLoading,
    error,
    refreshAnalytics,
  };
};