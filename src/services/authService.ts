import apiClient from "@/config/api";
import type { AuthResponse, LoginCredentials, RegisterData } from "@/types";

export const authService = {
  register: async (userData: RegisterData): Promise<void> => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },
};