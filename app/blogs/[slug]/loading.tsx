export default function BlogLoading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1600px] px-4 py-8 sm:px-8 lg:px-12 xl:px-16">
      <div className="h-4 w-28 animate-pulse rounded bg-zinc-200" />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="h-4 w-36 animate-pulse rounded bg-zinc-200" />
          <div className="mt-5 h-12 max-w-3xl animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 h-12 max-w-xl animate-pulse rounded bg-zinc-200" />
          <div className="mt-8 aspect-video w-full animate-pulse rounded-xl bg-zinc-200" />

          <div className="mt-10 space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-200" />
          </div>
        </div>

        <aside className="hidden space-y-5 lg:block">
          <div className="h-7 w-40 animate-pulse rounded bg-zinc-200" />
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex gap-4">
              <div className="aspect-4/3 w-24 shrink-0 animate-pulse rounded-lg bg-zinc-200" />
              <div className="flex-1 space-y-3">
                <div className="h-3 w-20 animate-pulse rounded bg-zinc-200" />
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-200" />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}
