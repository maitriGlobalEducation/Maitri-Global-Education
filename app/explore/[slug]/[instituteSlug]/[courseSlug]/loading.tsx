export default function ExploreCourseLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-white">
      {/* Hero */}
      <section className="bg-zinc-950 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 h-4 w-60 rounded bg-zinc-700" />

          <div className="h-10 w-96 max-w-full rounded bg-zinc-700 sm:h-14" />

          <div className="mt-4 h-4 w-48 rounded bg-zinc-800" />
        </div>
      </section>

      {/* Details and description */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          {/* Sidebar */}
          <div className="h-fit rounded-xl border border-zinc-200 p-6">
            <div className="mb-6 h-6 w-48 rounded bg-zinc-200" />

            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="border-b border-zinc-100 py-4">
                <div className="mb-2 h-3 w-24 rounded bg-zinc-100" />

                <div className="h-4 w-40 rounded bg-zinc-200" />
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <div className="mb-8 h-8 w-64 rounded bg-zinc-200" />

            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 rounded bg-zinc-100"
                  style={{
                    width: `${index % 3 === 0 ? 75 : index % 3 === 1 ? 95 : 85}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
