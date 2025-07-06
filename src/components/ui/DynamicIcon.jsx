import { lazy, Suspense } from "react";

const kebabToPascalCase = (name) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const DynamicLucideIcon = ({ name, ...props }) => {
  const IconComponent = lazy(() =>
    import("lucide-react").then((module) => {
      const ComponentName = kebabToPascalCase(name);
      return { default: module[ComponentName] || module["AlertCircle"] };
    })
  );

  return (
    <Suspense
      fallback={
        <div style={{ width: props.size || 24, height: props.size || 24 }} />
      }
    >
      <IconComponent {...props} />
    </Suspense>
  );
};

export default DynamicLucideIcon;
