export default function ExploreAreaLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-white">
      {/* Hero skeleton */}
      <section className="bg-zinc-950 px-5 py-30 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 h-4 w-40 rounded bg-zinc-700" />

          <div className="h-10 w-72 max-w-full rounded bg-zinc-700 sm:h-14 sm:w-96" />

          <div className="mt-4 h-4 w-full max-w-xl rounded bg-zinc-800" />
        </div>
      </section>

      {/* Universities skeleton */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="mb-8">
          <div className="h-8 w-48 rounded bg-zinc-200" />

          <div className="mt-2 h-4 w-36 rounded bg-zinc-100" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-zinc-200"
            >
              {/* University logo */}
              <div className="flex h-48 items-center justify-center bg-zinc-100">
                <div className="h-20 w-32 rounded-lg bg-zinc-200" />
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="h-5 w-3/4 rounded bg-zinc-200" />

                <div className="mt-3 h-4 w-1/3 rounded bg-zinc-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
