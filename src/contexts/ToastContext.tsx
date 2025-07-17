import { createContext, useContext, ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";
import { handleApiError } from "@/utils/errorHandler";
import type { ApiError } from "@/types";

interface ToastContextType {
  showSuccess: (message: string) => void;
  showError: (error: ApiError | Error | string) => void;
  dismiss: (toastId?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const showSuccess = (message: string) => {
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

  const showError = (error: ApiError | Error | string) => {
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

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showError, dismiss }}>
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