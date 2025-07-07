import { LoadingSpinner } from "./ui/LoadingSpinner";

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner size="lg" />
    </div>
  );
};
