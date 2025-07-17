import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { queryKeys } from '@/config/queryClient';
import type { ProfileData } from '@/types';

export const useProfile = () => {
  const queryClient = useQueryClient();

  // Get profile query
  const {
    data: profile,
    isLoading,
    error,
    refetch: refreshUserData,
  } = useQuery({
    queryKey: queryKeys.profile(),
    queryFn: () => userService.getProfile(),
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (profileData: ProfileData) => userService.updateProfile(profileData),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(queryKeys.profile(), updatedProfile);
      // Also update the user data in auth
      queryClient.setQueryData(queryKeys.user(), updatedProfile);
      // Update localStorage
      localStorage.setItem("authUser", JSON.stringify(updatedProfile));
    },
  });

  // Delete account mutation
  const deleteAccountMutation = useMutation({
    mutationFn: () => userService.deleteAccount(),
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutateAsync,
    deleteAccount: deleteAccountMutation.mutateAsync,
    refreshUserData,
    isUpdating: updateProfileMutation.isPending,
    isDeleting: deleteAccountMutation.isPending,
  };
};