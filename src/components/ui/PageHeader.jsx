import { cn } from "../../utils/cn";

const PageHeader = ({ title, description, action, className, badge }) => {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-col items-start gap-2">
          {badge && (
            <div className="inline-flex items-center space-x-2 bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-sm font-medium">
              {badge.icon && <badge.icon className="w-4 h-4" />}
              <span>{badge.text}</span>
            </div>
          )}
          <h1 className="heading-lg">{title}</h1>
          {description && (
            <p className="text-brown-600 text-sm max-w-2xl">{description}</p>
          )}
        </div>

        {action && <div className="flex-shrink-0 ml-6">{action}</div>}
      </div>
    </div>
  );
};

export { PageHeader };
