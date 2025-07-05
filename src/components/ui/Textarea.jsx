import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-cream-300 focus:border-brown-400 focus:outline-none transition-colors duration-200 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
