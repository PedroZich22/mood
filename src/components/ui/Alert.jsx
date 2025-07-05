import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Alert = forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-brown-50 border-brown-200 text-brown-800",
      success: "bg-green-50 border-green-200 text-green-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      error: "bg-red-50 border-red-200 text-red-800",
      info: "bg-blue-50 border-blue-200 text-blue-800",
    };

    return (
      <div
        ref={ref}
        className={cn("border rounded-lg p-4", variants[variant], className)}
        {...props}
      />
    );
  },
);

const AlertTitle = forwardRef(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("font-medium mb-1", className)} {...props} />
));

const AlertDescription = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm", className)} {...props} />
));

Alert.displayName = "Alert";
AlertTitle.displayName = "AlertTitle";
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
