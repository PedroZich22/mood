import { cn } from "../../utils/cn";

const FormSection = ({
  icon: Icon,
  title,
  description,
  children,
  className,
  required = false,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-cream-200 p-6 transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center space-x-3 mb-4">
        {Icon && (
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-brown-100 text-brown-600">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-brown-800 flex items-center">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          {description && (
            <p className="text-brown-600 text-sm">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export { FormSection };
