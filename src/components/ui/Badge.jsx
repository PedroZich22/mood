import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Badge = forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-brown-100 text-brown-700 border-brown-200",
      secondary: "bg-cream-100 text-cream-700 border-cream-200",
      outline: "border border-brown-300 text-brown-700",
      destructive: "bg-red-100 text-red-700 border-red-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border",
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
