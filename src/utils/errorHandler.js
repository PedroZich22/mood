// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return data.message || "Solicitação inválida. Por favor, verifique sua entrada.";
      case 401:
        return "Você não está autorizado. Por favor, faça login novamente.";
      case 403:
        return "Você não tem permissão para realizar esta ação.";
      case 404:
        return "O recurso solicitado não foi encontrado.";
      case 422:
        return data.message || "Erro de validação. Por favor, verifique sua entrada.";
      case 429:
        return "Muitas solicitações. Por favor, tente novamente mais tarde.";
      case 500:
        return "Erro do servidor. Por favor, tente novamente mais tarde.";
      default:
        return data.message || "Ocorreu um erro inesperado.";
    }
  } else if (error.request) {
    // Network error
    return "Erro de rede. Por favor, verifique sua conexão com a internet.";
  } else {
    // Other error
    return error.message || "Ocorreu um erro inesperado.";
  }
};