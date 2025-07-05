import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-cream-300 focus:outline-brown-400 focus:outline-2 transition-colors duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
