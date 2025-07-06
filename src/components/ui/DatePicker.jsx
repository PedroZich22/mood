import { forwardRef } from "react";
import { Calendar } from "lucide-react";
import { cn } from "../../utils/cn";

const DatePicker = forwardRef(
  ({ className, value, onChange, max, ...props }, ref) => {
    return (
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-brown-400 pointer-events-none" />
        <input
          ref={ref}
          type="date"
          value={value}
          onChange={onChange}
          max={max}
          className={cn(
            "w-full pl-10 pr-4 py-3 rounded-lg border border-cream-300 focus:border-brown-400 focus:outline-none transition-colors duration-200 bg-white",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
