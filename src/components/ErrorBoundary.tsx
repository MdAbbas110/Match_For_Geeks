import { useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="text-gray-600">Something went wrong</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {error instanceof Error ? error.message : "Unknown error occurred"}
      </pre>
    </div>
  );
};
