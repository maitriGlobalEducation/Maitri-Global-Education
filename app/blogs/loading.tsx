import type { ReactNode } from "react";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-zinc-200/80 ${className}`}
    />
  );
}

function FeaturedBlogSkeleton() {
  return (
    <div className="relative isolate flex min-h-105 overflow-hidden rounded-xl bg-zinc-200 sm:min-h-125 lg:min-h-150">
      <div className="absolute inset-0 bg-linear-to-t from-zinc-400/40 to-transparent" />

      <div className="relative z-10 mt-auto flex w-full flex-col p-5 sm:p-8 lg:p-9">
        <Skeleton className="mb-3 h-6 w-28 bg-zinc-300" />
        <Skeleton className="h-8 w-11/12 bg-zinc-300 sm:h-10" />
        <Skeleton className="mt-3 h-8 w-3/4 bg-zinc-300 sm:h-10" />
        <Skeleton className="mt-4 h-4 w-full max-w-lg bg-zinc-300" />
        <Skeleton className="mt-2 h-4 w-2/3 max-w-lg bg-zinc-300" />

        <div className="mt-5 flex items-center gap-3">
          <Skeleton className="h-3 w-32 bg-zinc-300" />
          <Skeleton className="h-3 w-24 bg-zinc-300" />
        </div>

        <Skeleton className="mt-6 h-4 w-36 bg-zinc-300" />
      </div>
    </div>
  );
}

function SupportingBlogSkeleton({
  variant = "small",
}: {
  variant?: "wide" | "small";
}) {
  return (
    <div
      className={`relative isolate flex animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-zinc-200 ${
        variant === "wide" ? "min-h-70 sm:min-h-75" : "min-h-65 sm:min-h-70"
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-t from-zinc-400/40 to-transparent" />

      <div className="relative z-10 flex flex-col p-4 sm:p-5">
        <Skeleton className="mb-3 h-5 w-24 bg-zinc-300" />
        <Skeleton className="h-6 w-full bg-zinc-300" />
        <Skeleton className="mt-2 h-6 w-3/4 bg-zinc-300" />

        <div className="mt-4 flex items-center gap-3">
          <Skeleton className="h-3 w-28 bg-zinc-300" />
          <Skeleton className="h-3 w-20 bg-zinc-300" />
        </div>
      </div>
    </div>
  );
}

function BlogGridCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <Skeleton className="aspect-video w-full rounded-none" />

      <div className="p-4 sm:p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-6 w-full" />
        <Skeleton className="mt-2 h-6 w-4/5" />
        <Skeleton className="mt-4 h-4 w-32" />

        <Skeleton className="mt-5 h-4 w-28" />
      </div>
    </div>
  );
}

function SectionLabelSkeleton() {
  return (
    <div className="mb-5 flex items-center gap-3">
      <Skeleton className="h-px w-8 rounded-none" />
      <Skeleton className="h-3 w-44" />
    </div>
  );
}

function BlogPageSkeletonContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function Loading() {
  return (
    <main
      data-navbar-theme="light"
      aria-busy="true"
      aria-label="Loading blogs"
      className="bg-[#fafafa] py-10 sm:py-14 lg:py-30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Page heading */}
        <header className="mb-9 max-w-3xl sm:mb-12 lg:mb-14">
          <Skeleton className="mb-4 h-3 w-48" />
          <Skeleton className="h-10 w-64 sm:h-12 sm:w-80 lg:h-14 lg:w-96" />
          <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-4 w-4/5 max-w-xl" />
        </header>

        {/* Featured editorial layout */}
        <section
          aria-label="Featured stories loading"
          className="mb-14 lg:mb-18"
        >
          <SectionLabelSkeleton />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            {/* Featured blog */}
            <div className="min-w-0 lg:row-span-2">
              <FeaturedBlogSkeleton />
            </div>

            {/* First supporting blog */}
            <SupportingBlogSkeleton variant="wide" />

            {/* Two smaller supporting blogs */}
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <SupportingBlogSkeleton />
              <SupportingBlogSkeleton />
            </div>
          </div>
        </section>

        {/* Remaining blogs */}
        <section id="all-blogs" className="scroll-mt-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-zinc-200 pb-5">
            <div>
              <Skeleton className="mb-3 h-3 w-32" />
              <Skeleton className="h-8 w-48 sm:h-9 sm:w-60" />
            </div>

            <Skeleton className="h-4 w-24" />
          </div>

          {/* Six blog cards to match PAGE_SIZE */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <BlogGridCardSkeleton key={index} />
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="size-10 rounded-lg" />
          </div>
        </section>
      </div>
    </main>
  );
}
