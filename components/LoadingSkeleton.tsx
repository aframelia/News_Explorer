export default function LoadingSkeleton() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }