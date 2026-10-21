export default function BlogGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading articles"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="relative min-h-75 animate-pulse overflow-hidden rounded-xl bg-zinc-200 sm:min-h-80"
        >
          {/* Image placeholder */}
          <div className="absolute inset-0 bg-zinc-300" />

          {/* Text placeholders */}
          <div className="absolute inset-x-0 bottom-0 space-y-4 p-5 sm:p-6">
            <div className="h-6 w-24 rounded-md bg-zinc-400" />

            <div className="space-y-2">
              <div className="h-5 w-full rounded bg-zinc-400" />
              <div className="h-5 w-4/5 rounded bg-zinc-400" />
            </div>

            <div className="h-3 w-28 rounded bg-zinc-400" />

            <div className="h-4 w-28 rounded bg-zinc-400" />
          </div>
        </div>
      ))}
    </div>
  );
}
