"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-red-500 uppercase tracking-wider">
          Something went wrong
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Oops! An error occurred
        </h2>
        <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          We&apos;re sorry, something unexpected happened. Please try again.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <button
            onClick={() => unstable_retry()}
            className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
