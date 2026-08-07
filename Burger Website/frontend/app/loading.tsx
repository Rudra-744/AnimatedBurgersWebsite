export default function Loading() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-zinc-200 dark:border-zinc-800" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
