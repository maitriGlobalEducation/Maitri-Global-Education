export default function ExploreInstituteLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-white">
      {/* Hero skeleton */}
      <section className="bg-zinc-950 px-5 py-30 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 h-4 w-40 rounded bg-zinc-700" />

          {/* Area name */}
          <div className="mb-3 h-4 w-32 rounded bg-zinc-800" />

          {/* University name */}
          <div className="h-10 w-72 max-w-full rounded bg-zinc-700 sm:h-14 sm:w-96" />

          {/* Description */}
          <div className="mt-4 h-4 w-full max-w-xl rounded bg-zinc-800" />
        </div>
      </section>

      {/* Courses skeleton */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="mb-8">
          <div className="h-8 w-56 rounded bg-zinc-200" />

          <div className="mt-2 h-4 w-32 rounded bg-zinc-100" />
        </div>

        <div className="space-y-10">
          {Array.from({ length: 3 }).map((_, categoryIndex) => (
            <section key={categoryIndex}>
              {/* Category heading */}
              <div className="mb-5 border-b border-zinc-200 pb-3">
                <div className="h-7 w-48 rounded bg-zinc-200" />
              </div>

              {/* Course cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, courseIndex) => (
                  <div
                    key={courseIndex}
                    className="rounded-xl border border-zinc-200 p-5"
                  >
                    <div className="h-5 w-3/4 rounded bg-zinc-200" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
