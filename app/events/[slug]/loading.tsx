export default function EventDetailLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-zinc-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(400px,1fr)] xl:gap-10 2xl:gap-12">
          {/* Event content */}
          <div className="min-w-0">
            {/* Back button */}
            <div className="mb-4 h-10 w-36 rounded-lg border border-zinc-200 bg-white" />

            <article className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8 lg:p-10 xl:p-12">
              <header className="mb-8 space-y-5">
                {/* Event title */}
                <div className="h-9 w-4/5 rounded-lg bg-zinc-200 md:h-11 xl:h-12" />
                <div className="h-4 w-52 rounded bg-zinc-100" />

                {/* Event description */}
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full rounded bg-zinc-100" />
                  <div className="h-4 w-11/12 rounded bg-zinc-100" />
                  <div className="h-4 w-3/4 rounded bg-zinc-100" />
                </div>
              </header>

              {/* Event image */}
              <div className="mb-8 aspect-3/2 w-full rounded-xl bg-zinc-100" />

              {/* Event body */}
              <div className="space-y-4">
                <div className="h-6 w-2/5 rounded bg-zinc-200" />

                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-zinc-100" />
                  <div className="h-4 w-full rounded bg-zinc-100" />
                  <div className="h-4 w-5/6 rounded bg-zinc-100" />
                </div>

                <div className="h-52 w-full rounded-xl bg-zinc-100" />

                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-zinc-100" />
                  <div className="h-4 w-11/12 rounded bg-zinc-100" />
                  <div className="h-4 w-2/3 rounded bg-zinc-100" />
                </div>
              </div>
            </article>
          </div>

          {/* Registration form */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7">
              <div className="mb-6 space-y-3">
                <div className="h-7 w-3/4 rounded-lg bg-zinc-200" />
                <div className="h-4 w-full rounded bg-zinc-100" />
              </div>

              <div className="space-y-5">
                {[1, 2, 3, 4].map((field) => (
                  <div key={field} className="space-y-2">
                    <div className="h-4 w-1/3 rounded bg-zinc-200" />
                    <div className="h-11 w-full rounded-lg border border-zinc-200 bg-zinc-50" />
                  </div>
                ))}

                <div className="h-12 w-full rounded-lg bg-zinc-200" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
