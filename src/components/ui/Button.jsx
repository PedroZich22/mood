import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Button = forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      disabled = false,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-brown-600 hover:bg-brown-700 text-white",
      secondary: "bg-cream-200 hover:bg-cream-300 text-brown-700",
      outline:
        "border border-brown-300 bg-white hover:bg-brown-50 text-brown-700",
      ghost: "hover:bg-brown-100 text-brown-700",
      destructive: "bg-red-600 hover:bg-red-700 text-white",
    };

    const sizes = {
      default: "py-3 px-6 text-base",
      sm: "py-2 px-4 text-sm",
      lg: "py-4 px-8 text-lg",
      icon: "p-2",
    };

    if (asChild) {
      return (
        <div className={cn(variants[variant], sizes[size], className)}>
          {children}
        </div>
      );
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
