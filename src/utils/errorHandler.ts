import type { ApiError } from "@/types";

// Error handling utilities
export const handleApiError = (error: ApiError | Error | string): string => {
  if (typeof error === 'string') {
    return error;
  }

  if ('status' in error && error.status) {
    // API Error with status
    const { status, message } = error;

    switch (status) {
      case 400:
        return message || "Solicitação inválida. Por favor, verifique sua entrada.";
      case 401:
        return "Você não está autorizado. Por favor, faça login novamente.";
      case 403:
        return "Você não tem permissão para realizar esta ação.";
      case 404:
        return "O recurso solicitado não foi encontrado.";
      case 422:
        return message || "Erro de validação. Por favor, verifique sua entrada.";
      case 429:
        return "Muitas solicitações. Por favor, tente novamente mais tarde.";
      case 500:
        return "Erro do servidor. Por favor, tente novamente mais tarde.";
      default:
        return message || "Ocorreu um erro inesperado.";
    }
  }

  // Regular Error object
  if (error instanceof Error) {
    return error.message || "Ocorreu um erro inesperado.";
  }

  // Fallback
  return "Ocorreu um erro inesperado.";
};