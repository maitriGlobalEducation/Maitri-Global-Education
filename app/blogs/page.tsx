import Link from "next/link";
import { getPublishedBlogs } from "@/services/blog.service";

function formatDate(date: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  const featuredBlog = blogs.find((blog) => blog.featured);
  const remainingBlogs = blogs.filter((blog) => blog._id !== featuredBlog?._id);

  const latestBlogs = remainingBlogs.slice(0, 4);

  return (
    <main className="bg-[#fafafa] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Maitri Global Education
          </p>

          <h1
            style={{ fontFamily: "Epika" }}
            className="text-4xl font-semibold leading-tight text-black sm:text-5xl lg:text-6xl"
          >
            Explore Blogs
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#344054] sm:text-base">
            Discover insights, guides, and updates to help you make informed
            decisions about your international education journey.
          </p>
        </header>

        {featuredBlog && (
          <section className="mb-14 lg:mb-20">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-zinc-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                Featured story
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch lg:gap-10 xl:grid-cols-[minmax(0,1fr)_350px]">
              <Link
                href={`/blogs/${featuredBlog.slug}`}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-100 sm:aspect-16/8 lg:aspect-video">
                  {featuredBlog.cardImage?.url ? (
                    <img
                      src={featuredBlog.cardImage.url}
                      alt={featuredBlog.title}
                      fetchPriority="high"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                      No image available
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-zinc-500 sm:text-sm">
                    <span className="text-zinc-800">
                      {featuredBlog.category}
                    </span>
                    {featuredBlog.publishedAt && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{formatDate(featuredBlog.publishedAt)}</span>
                      </>
                    )}
                  </div>

                  <h2
                    style={{ fontFamily: "Epika" }}
                    className="mt-4 text-2xl font-semibold leading-snug text-zinc-950 transition-colors group-hover:text-zinc-600 sm:text-3xl lg:text-4xl"
                  >
                    {featuredBlog.title}
                  </h2>

                  {featuredBlog.metaDescription && (
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 sm:text-base">
                      {featuredBlog.metaDescription}
                    </p>
                  )}

                  <span className="mt-6 inline-flex w-fit items-center gap-2 border-b border-zinc-900 pb-1 text-sm font-semibold text-zinc-900">
                    Read featured article
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>

              <aside className="min-w-0 rounded-xl border border-zinc-200/80 bg-white p-5 sm:p-6 lg:p-5 xl:p-6">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                  <h2
                    style={{ fontFamily: "Epika" }}
                    className="text-xl font-semibold text-zinc-950"
                  >
                    Latest Blogs
                  </h2>

                  <span className="text-xs text-zinc-500">
                    {latestBlogs.length} articles
                  </span>
                </div>

                {latestBlogs.length > 0 ? (
                  <div className="divide-y divide-zinc-100">
                    {latestBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        href={`/blogs/${blog.slug}`}
                        className="group flex gap-3 py-4 first:pt-5 last:pb-1"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:h-22 sm:w-24 lg:h-18 lg:w-18 xl:h-20 xl:w-20">
                          {blog.cardImage?.url ? (
                            <img
                              src={blog.cardImage.url}
                              alt={blog.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="h-full w-full bg-zinc-100" />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                            {blog.category}
                          </p>

                          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-zinc-900 transition-colors group-hover:text-zinc-600">
                            {blog.title}
                          </h3>

                          {blog.publishedAt && (
                            <p className="mt-1.5 text-xs text-zinc-500">
                              {formatDate(blog.publishedAt)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="py-6 text-sm leading-6 text-zinc-500">
                    More articles will be available here soon.
                  </p>
                )}

                {remainingBlogs.length > latestBlogs.length && (
                  <Link
                    href="#all-blogs"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition-colors hover:text-zinc-500"
                  >
                    Browse all blogs <span>↓</span>
                  </Link>
                )}
              </aside>
            </div>
          </section>
        )}

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
                All Blogs
              </h2>
            </div>

            <p className="text-sm text-zinc-500">
              {remainingBlogs.length}{" "}
              {remainingBlogs.length === 1 ? "article" : "articles"}
            </p>
          </div>

          {remainingBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {remainingBlogs.map((blog) => (
                <article key={blog._id} className="group flex min-w-0 flex-col">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="relative block aspect-5/3 overflow-hidden rounded-xl bg-zinc-100"
                  >
                    {blog.cardImage?.url ? (
                      <img
                        src={blog.cardImage.url}
                        alt={blog.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                        No image available
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col pt-4">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
                      <span className="font-medium text-zinc-700">
                        {blog.category}
                      </span>
                      {blog.publishedAt && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{formatDate(blog.publishedAt)}</span>
                        </>
                      )}
                    </div>

                    <h3 className="mt-3 text-xl font-semibold leading-snug text-zinc-950 transition-colors group-hover:text-zinc-600">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">
                      {blog.metaDescription ||
                        "Discover more insights from Maitri Global Education."}
                    </p>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 border-b border-zinc-900 pb-1 text-sm font-semibold text-zinc-900 transition-colors hover:text-zinc-500"
                    >
                      Read article
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-12 text-sm text-zinc-500">
              {blogs.length === 0
                ? "No published blogs available yet."
                : "No other articles available yet."}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
