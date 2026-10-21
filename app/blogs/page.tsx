import Link from "next/link";
import {
  getFeaturedBlogCard,
  getPublishedBlogCards,
  getPaginatedBlogCards,
  type PublicBlogCard,
} from "@/services/blog.service";
import PaginatedBlogGrid from "@/components/Blogs Page Components/PaginatedBlogGrid";

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
  blog: PublicBlogCard;
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
  blog: PublicBlogCard;
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

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const pageStart = Date.now();

  const [featuredBlog, query] = await Promise.all([
    getFeaturedBlogCard(),
    searchParams,
  ]);

  console.log(`[TIMING] Featured blog query: ${Date.now() - pageStart}ms`);

  const requestedPage = Number(query.page ?? "1");
  const page = Number.isInteger(requestedPage) ? Math.max(1, requestedPage) : 1;

  const secondaryStart = Date.now();

  // Fetch only three cards for the secondary featured section.
  const secondaryBlogs = featuredBlog
    ? await getPublishedBlogCards(3, [featuredBlog.slug])
    : [];

  console.log(
    `[TIMING] Secondary blogs ready: ${Date.now() - secondaryStart}ms`,
  );

  // Keep featured-section blogs out of the paginated results.
  const excludedSlugs = [
    ...(featuredBlog ? [featuredBlog.slug] : []),
    ...secondaryBlogs.map((blog) => blog.slug),
  ];

  const paginationStart = Date.now();

  let { blogs: paginatedBlogs, total: gridBlogsCount } =
    await getPaginatedBlogCards({
      page,
      pageSize: PAGE_SIZE,
      excludeSlugs: excludedSlugs,
    });

  console.log(
    `[TIMING] Pagination data ready: ${Date.now() - paginationStart}ms`,
  );

  const totalPages = Math.ceil(gridBlogsCount / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(totalPages, 1));

  // Handle invalid page URLs by showing the last valid page.
  if (currentPage !== page) {
    const result = await getPaginatedBlogCards({
      page: currentPage,
      pageSize: PAGE_SIZE,
      excludeSlugs: excludedSlugs,
    });

    paginatedBlogs = result.blogs;
  }

  console.log(`[TIMING] Total page data ready: ${Date.now() - pageStart}ms`);

  const hasAnyBlogs =
    Boolean(featuredBlog) || secondaryBlogs.length > 0 || gridBlogsCount > 0;

  console.log(`[TIMING] Blogs page data ready: ${Date.now() - pageStart}ms`);

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

        {/* Featured editorial layout */}
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
              <div className="min-w-0 lg:row-span-2">
                <OverlayBlogCard
                  blog={featuredBlog}
                  variant="featured"
                  priority
                />
              </div>

              {secondaryBlogs[0] && (
                <OverlayBlogCard blog={secondaryBlogs[0]} variant="wide" />
              )}

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
              {gridBlogsCount} {gridBlogsCount === 1 ? "article" : "articles"}
            </p>
          </div>

          {paginatedBlogs.length > 0 ? (
            <PaginatedBlogGrid
              initialBlogs={paginatedBlogs}
              initialPage={currentPage}
              initialTotalPages={totalPages}
              initialTotal={gridBlogsCount}
            />
          ) : (
            <p className="py-12 text-sm text-zinc-500">
              {hasAnyBlogs
                ? "You've reached the end of our articles."
                : "No published blogs available yet."}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
