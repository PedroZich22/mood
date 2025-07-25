import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Switch = forwardRef(
  ({ className, checked, onChange, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          "relative inline-flex items-center cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
          ref={ref}
          {...props}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
      </label>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
