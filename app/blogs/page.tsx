import Link from "next/link";
import { getPublishedBlogs, type PublicBlog } from "@/services/blog.service";

interface BlogsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 6;

function formatDate(date: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function BlogImage({
  blog,
  priority = false,
}: {
  blog: PublicBlog;
  priority?: boolean;
}) {
  return blog.cardImage?.url ? (
    <img
      src={blog.cardImage.url}
      alt={blog.title}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-sm text-white/60">
      No image available
    </div>
  );
}

function OverlayBlogCard({
  blog,
  variant = "small",
  priority = false,
}: {
  blog: PublicBlog;
  variant?: "featured" | "wide" | "small";
  priority?: boolean;
}) {
  const isFeatured = variant === "featured";
  const isWide = variant === "wide";

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={`group relative isolate flex min-w-0 overflow-hidden rounded-xl bg-zinc-900 text-white ${
        isFeatured
          ? "min-h-105 sm:min-h-125 lg:min-h-150"
          : isWide
            ? "min-h-70 sm:min-h-75"
            : "min-h-65 sm:min-h-70"
      }`}
    >
      <BlogImage blog={blog} priority={priority} />

      <div className="absolute inset-0 z-0 bg-linear-to-t from-black via-black/45 to-black/5 transition-opacity duration-300 group-hover:from-black/95" />

      {blog.featured && (
        <span className="absolute right-0 top-0 z-10 flex size-11 items-center justify-center rounded-bl-2xl bg-amber-600 text-white">
          <span aria-label="Featured article" title="Featured article">
            ★
          </span>
        </span>
      )}

      <div
        className={`relative z-10 mt-auto flex w-full flex-col ${
          isFeatured
            ? "p-5 sm:p-8 lg:p-9"
            : isWide
              ? "p-5 sm:p-7"
              : "p-4 sm:p-5"
        }`}
      >
        <span className="mb-3 w-fit max-w-full truncate rounded-md bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
          {blog.category}
        </span>

        <h2
          style={{ fontFamily: "Epika" }}
          className={`font-semibold leading-tight text-white transition-colors group-hover:text-orange-100 ${
            isFeatured
              ? "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
              : isWide
                ? "text-xl sm:text-2xl lg:text-3xl"
                : "text-lg sm:text-xl"
          }`}
        >
          {blog.title}
        </h2>

        {isFeatured && blog.metaDescription && (
          <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            {blog.metaDescription}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/80 sm:text-sm">
          <span>By Maitri Global Education</span>

          {blog.publishedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>{formatDate(blog.publishedAt)}</span>
            </>
          )}
        </div>

        {isFeatured && (
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
            Read featured story
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        )}
      </div>
    </Link>
  );
}

function StandardBlogCard({ blog }: { blog: PublicBlog }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group relative isolate flex min-w-0 min-h-75 overflow-hidden rounded-xl bg-zinc-900 text-white sm:min-h-80"
    >
      <BlogImage blog={blog} />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-black via-black/45 to-black/5 transition-opacity duration-300 group-hover:from-black/95" />

      {/* Text displayed over the image */}
      <div className="relative z-10 mt-auto flex w-full flex-col p-5 sm:p-6">
        <span className="mb-3 w-fit max-w-full truncate rounded-md bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
          {blog.category}
        </span>

        <h3
          style={{ fontFamily: "Epika" }}
          className="text-xl font-semibold leading-snug text-white transition-colors group-hover:text-orange-100 sm:text-2xl"
        >
          {blog.title}
        </h3>

        {/* {blog.metaDescription && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/80">
            {blog.metaDescription}
          </p>
        )} */}

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/80 sm:text-sm">
          {/* <span>By Maitri Global Education</span> */}

          {blog.publishedAt && (
            <>
              <span>{formatDate(blog.publishedAt)}</span>
            </>
          )}
        </div>

        <span className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white">
          Read article
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const [blogs, query] = await Promise.all([getPublishedBlogs(), searchParams]);

  const featuredBlog = blogs.find((blog) => blog.featured);
  const remainingBlogs = blogs.filter((blog) => blog._id !== featuredBlog?._id);

  // The first three non-featured blogs appear in the editorial layout.
  const secondaryBlogs = featuredBlog ? remainingBlogs.slice(0, 3) : [];
  const gridBlogs = featuredBlog ? remainingBlogs.slice(3) : remainingBlogs;

  const totalPages = Math.ceil(gridBlogs.length / PAGE_SIZE);
  const requestedPage = Number(query.page ?? "1");

  const currentPage = Number.isInteger(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), Math.max(totalPages, 1))
    : 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedBlogs = gridBlogs.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <main className="bg-[#fafafa] py-10 sm:py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className="mb-9 max-w-3xl sm:mb-12 lg:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Maitri Global Education
          </p>

          <h1
            style={{ fontFamily: "Epika" }}
            className="text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl"
          >
            Explore Blogs
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#344054] sm:text-base">
            Discover insights, guides, and updates to help you make informed
            decisions about your international education journey.
          </p>
        </header>

        {/* Editorial featured layout */}
        {featuredBlog && (
          <section
            aria-label="Featured and latest stories"
            className="mb-14 lg:mb-18"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-zinc-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                Stories worth exploring
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
              {/* Largest card */}
              <div className="min-w-0 lg:row-span-2">
                <OverlayBlogCard
                  blog={featuredBlog}
                  variant="featured"
                  priority
                />
              </div>

              {/* Second-largest card */}
              {secondaryBlogs[0] && (
                <OverlayBlogCard blog={secondaryBlogs[0]} variant="wide" />
              )}

              {/* Two smaller cards */}
              {secondaryBlogs.length > 1 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  {secondaryBlogs.slice(1, 3).map((blog) => (
                    <OverlayBlogCard
                      key={blog._id}
                      blog={blog}
                      variant="small"
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Remaining blog cards */}
        <section id="all-blogs" className="scroll-mt-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-zinc-200 pb-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                From our journal
              </p>

              <h2
                style={{ fontFamily: "Epika" }}
                className="text-2xl font-semibold text-zinc-950 sm:text-3xl"
              >
                More to Explore
              </h2>
            </div>

            <p className="text-sm text-zinc-500">
              {gridBlogs.length}{" "}
              {gridBlogs.length === 1 ? "article" : "articles"}
            </p>
          </div>

          {paginatedBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedBlogs.map((blog) => (
                  <StandardBlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* URL-based pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Blog pagination"
                  className="mt-12 flex flex-wrap items-center justify-center gap-2"
                >
                  {currentPage > 1 && (
                    <Link
                      href={`/blogs?page=${currentPage - 1}#all-blogs`}
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
                    >
                      ← Previous
                    </Link>
                  )}

                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;

                    return (
                      <Link
                        key={page}
                        href={`/blogs?page=${page}#all-blogs`}
                        aria-current={isCurrentPage ? "page" : undefined}
                        className={`inline-flex size-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                          isCurrentPage
                            ? "border-zinc-950 bg-zinc-950 text-white"
                            : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                        }`}
                      >
                        {page}
                      </Link>
                    );
                  })}

                  {currentPage < totalPages && (
                    <Link
                      href={`/blogs?page=${currentPage + 1}#all-blogs`}
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
                    >
                      Next →
                    </Link>
                  )}
                </nav>
              )}

              {totalPages > 1 && (
                <p className="mt-4 text-center text-xs text-zinc-500">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </>
          ) : (
            <p className="py-12 text-sm text-zinc-500">
              {blogs.length === 0
                ? "No published blogs available yet."
                : "You've reached the end of our articles."}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
