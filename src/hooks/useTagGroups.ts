import { useQuery } from '@tanstack/react-query';
import { tagService } from '@/services/tagService';
import { queryKeys } from '@/config/queryClient';

export const useTagGroups = () => {
  const {
    data: tagGroups = [],
    isLoading,
    error,
    refetch: refreshTagGroups,
  } = useQuery({
    queryKey: queryKeys.tagGroups(),
    queryFn: () => tagService.getTagGroups(),
  });

  return {
    tagGroups,
    isLoading,
    error,
    refreshTagGroups,
  };
};