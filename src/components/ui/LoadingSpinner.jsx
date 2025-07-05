import { cn } from "../../utils/cn";

const LoadingSpinner = ({ className, size = "default" }) => {
  const sizes = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "border-2 border-brown-200 border-t-brown-600 rounded-full animate-spin",
        sizes[size],
        className,
      )}
    />
  );
};

export { LoadingSpinner };
