import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Query keys factory
export const queryKeys = {
  all: ['mood-app'] as const,
  
  // Auth
  auth: () => [...queryKeys.all, 'auth'] as const,
  user: () => [...queryKeys.auth(), 'user'] as const,
  
  // Moods
  moods: () => [...queryKeys.all, 'moods'] as const,
  moodsList: (params?: Record<string, any>) => [...queryKeys.moods(), 'list', params] as const,
  mood: (id: string) => [...queryKeys.moods(), 'detail', id] as const,
  moodsAnalytics: (timeRange: string) => [...queryKeys.moods(), 'analytics', timeRange] as const,
  
  // Tags
  tags: () => [...queryKeys.all, 'tags'] as const,
  tagGroups: () => [...queryKeys.tags(), 'groups'] as const,
  
  // Profile
  profile: () => [...queryKeys.all, 'profile'] as const,
} as const;