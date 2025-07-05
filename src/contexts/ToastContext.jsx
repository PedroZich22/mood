import { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { handleApiError } from "../utils/errorHandler";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const showSuccess = (message) => {
    toast.success(message, {
      duration: 3000,
      style: {
        background: "#8b6f47",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#8b6f47",
      },
    });
  };

  const showError = (error) => {
    const message = handleApiError(error);
    toast.error(message, {
      duration: 4000,
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#dc2626",
      },
    });
  };

  const showLoading = (message) => {
    return toast.loading(message, {
      style: {
        background: "#f5e6d3",
        color: "#8b6f47",
        borderRadius: "12px",
        padding: "16px",
        fontWeight: "500",
      },
    });
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  return (
    <ToastContext.Provider
      value={{ showSuccess, showError, showLoading, dismiss }}
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            maxWidth: "400px",
          },
        }}
      />
    </ToastContext.Provider>
  );
};
