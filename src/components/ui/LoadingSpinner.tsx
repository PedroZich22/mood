import * as React from "react";
import { cn } from "@/utils/cn";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "default" | "lg";
}

const LoadingSpinner = ({ className, size = "default" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-brown-200 border-t-brown-600",
        sizeClasses[size],
        className
      )}
    />
  );
};

export { LoadingSpinner };