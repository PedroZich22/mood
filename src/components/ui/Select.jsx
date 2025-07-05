import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-cream-300 focus:outline-brown-400 focus:outline-2 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export { Select };
