export default function ScholarshipLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-zinc-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(400px,1fr)] xl:gap-10 2xl:gap-12">
          {/* Left: Scholarship information */}
          <article className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8 lg:p-10 xl:p-12">
            {/* Title and description */}
            <header className="mb-8 space-y-5">
              <div className="h-9 w-3/4 rounded-lg bg-zinc-200 md:h-12 xl:h-14" />

              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-zinc-200 md:h-5" />
                <div className="h-4 w-11/12 rounded bg-zinc-200 md:h-5" />
                <div className="h-4 w-2/3 rounded bg-zinc-200 md:h-5" />
              </div>

              {/* Application deadline */}
              <div className="h-4 w-56 rounded bg-zinc-200" />
            </header>

            {/* Scholarship image */}
            <div className="mb-8 w-full overflow-hidden rounded-xl bg-zinc-100">
              <div className="aspect-3/2 w-full" />
            </div>

            {/* Scholarship content */}
            <div className="space-y-4">
              <div className="h-7 w-2/3 rounded-lg bg-zinc-200" />

              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-zinc-200" />
                <div className="h-4 w-full rounded bg-zinc-200" />
                <div className="h-4 w-5/6 rounded bg-zinc-200" />
              </div>

              <div className="h-6 w-1/2 rounded-lg bg-zinc-200 pt-2" />

              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-zinc-200" />
                <div className="h-4 w-11/12 rounded bg-zinc-200" />
                <div className="h-4 w-4/5 rounded bg-zinc-200" />
              </div>

              <div className="h-48 rounded-xl bg-zinc-100" />

              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-zinc-200" />
                <div className="h-4 w-10/12 rounded bg-zinc-200" />
                <div className="h-4 w-3/4 rounded bg-zinc-200" />
              </div>
            </div>
          </article>

          {/* Right: Application form */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 lg:p-8">
              {/* Form heading */}
              <div className="mb-7 space-y-3">
                <div className="h-7 w-3/4 rounded-lg bg-zinc-200" />
                <div className="h-4 w-full rounded bg-zinc-200" />
                <div className="h-4 w-2/3 rounded bg-zinc-200" />
              </div>

              {/* Form fields */}
              <div className="space-y-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-4 w-1/3 rounded bg-zinc-200" />
                    <div className="h-12 w-full rounded-lg border border-zinc-200 bg-zinc-50" />
                  </div>
                ))}

                {/* Submit button */}
                <div className="h-12 w-full rounded-lg bg-zinc-200" />

                {/* Privacy or helper text */}
                <div className="mx-auto h-3 w-3/4 rounded bg-zinc-100" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
