import { cn } from "../../utils/cn";
import { Card } from "./Card";

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  progress,
  iconColor = "text-brown-600",
  iconBgColor = "bg-brown-100",
  className,
}) => {
  return (
    <Card className={cn("p-4 text-center", className)}>
      <div className="flex justify-center mb-2">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            iconBgColor
          )}
        >
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>
      <p className="text-xl font-bold text-brown-800">{value}</p>
      <p className="text-brown-600 text-xs font-medium">{title}</p>
      {subtitle && <p className="text-brown-500 text-xs mt-1">{subtitle}</p>}
      {progress !== undefined && (
        <div className="w-full bg-brown-100 rounded-full h-1.5 mt-2">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      )}
    </Card>
  );
};

export { StatCard };
