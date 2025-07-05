// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return data.message || "Invalid request. Please check your input.";
      case 401:
        return "You are not authorized. Please log in again.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 422:
        return data.message || "Validation error. Please check your input.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return data.message || "An unexpected error occurred.";
    }
  } else if (error.request) {
    // Network error
    return "Network error. Please check your internet connection.";
  } else {
    // Other error
    return error.message || "An unexpected error occurred.";
  }
};
