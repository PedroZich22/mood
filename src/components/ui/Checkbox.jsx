import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Checkbox = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 text-brown-600 border-brown-300 rounded focus:ring-brown-500 focus:ring-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
