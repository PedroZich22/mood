import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { queryKeys } from '@/config/queryClient';
import type { LoginCredentials, RegisterData, User } from '@/types';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get current user
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.user(),
    queryFn: async (): Promise<User | null> => {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");

      if (!token || !storedUser) {
        return null;
      }

      try {
        await userService.verifyToken();
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        return null;
      }
    },
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: ({ token, user }) => {
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      queryClient.setQueryData(queryKeys.user(), user);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterData) => authService.register(userData),
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.user(), null);
      queryClient.clear();
    },
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};