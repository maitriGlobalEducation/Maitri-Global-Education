import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPublicBlogBySlug,
  getPublishedBlogs,
} from "@/services/blog.service";
import BlogContent from "@/components/Blogs Page Components/BlogContent";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublicBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Maitri Global Education",
      robots: { index: false, follow: false },
    };
  }

  const title = blog.metaTitle.trim() || blog.title;
  const description =
    blog.metaDescription.trim() ||
    `Read ${blog.title} on Maitri Global Education.`;

  return {
    title,
    description,
    keywords: blog.metaKeywords,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blogs/${blog.slug}`,
      images: blog.cardImage?.url
        ? [{ url: blog.cardImage.url, alt: blog.title }]
        : undefined,
      publishedTime: blog.publishedAt ?? undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const [blog, allBlogs] = await Promise.all([
    getPublicBlogBySlug(slug),
    getPublishedBlogs(),
  ]);

  if (!blog) notFound();

  const recentBlogs = allBlogs
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 5);

  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-375 px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-16">
        <Link
          href="/blogs"
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
        >
          <span aria-hidden="true">←</span>
          Back to blogs
        </Link>

        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-14">
          {/* Main blog article */}
          <article className="min-w-0">
            <header className="w-full">
              <p className="text-sm font-medium text-zinc-500">
                {blog.category}
                {blog.publishedAt && (
                  <>
                    {" · "}
                    {formatDate(blog.publishedAt)}
                  </>
                )}
              </p>

              <h1
                style={{ fontFamily: "Epika" }}
                className="mt-4 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl lg:text-5xl"
              >
                {blog.title}
              </h1>

              {blog.cardImage?.url && (
                <img
                  src={blog.cardImage.url}
                  alt={blog.title}
                  fetchPriority="high"
                  className="mt-8 aspect-video w-full rounded-xl object-cover sm:mt-10"
                />
              )}
            </header>

            <div className="mt-8 w-full sm:mt-10">
              <BlogContent content={blog.content} />
            </div>

            {blog.ctaText && blog.ctaLink && (
              <div className="mt-12 rounded-xl bg-zinc-50 p-5 sm:p-8">
                <p className="text-lg font-medium text-zinc-900">
                  {blog.ctaText}
                </p>

                <Link
                  href={blog.ctaLink}
                  className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Learn more
                </Link>
              </div>
            )}
          </article>

          {/* Recent blogs sidebar */}
          <aside className="min-w-0 border-t border-zinc-200 pt-8 lg:sticky lg:top-8 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 xl:pl-8">
            <div className="flex items-center justify-between gap-3">
              <h2
                style={{ fontFamily: "Epika" }}
                className="text-xl font-semibold text-zinc-950"
              >
                Recent Blogs
              </h2>

              <Link
                href="/blogs"
                className="shrink-0 text-xs font-medium text-zinc-500 transition-colors hover:text-black"
              >
                View all →
              </Link>
            </div>

            {recentBlogs.length > 0 ? (
              <div className="mt-6 divide-y divide-zinc-200">
                {recentBlogs.map((recentBlog) => (
                  <Link
                    key={recentBlog._id}
                    href={`/blogs/${recentBlog.slug}`}
                    className="group flex cursor-pointer gap-4 py-5 first:pt-0"
                  >
                    {recentBlog.cardImage?.url && (
                      <div className="w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:w-28 lg:w-24 xl:w-28">
                        <img
                          src={recentBlog.cardImage.url}
                          alt={recentBlog.title}
                          loading="lazy"
                          className="aspect-4/3 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-zinc-500">
                        {recentBlog.category}
                      </p>

                      <h3 className="mt-2 line-clamp-3 text-sm font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-zinc-600">
                        {recentBlog.title}
                      </h3>

                      {recentBlog.publishedAt && (
                        <p className="mt-2 text-xs text-zinc-500">
                          {formatDate(recentBlog.publishedAt)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm leading-6 text-zinc-500">
                No other blogs are available yet.
              </p>
            )}

            <Link
              href="/blogs"
              className="mt-4 inline-flex cursor-pointer items-center gap-2 border-b border-zinc-900 pb-1 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-500"
            >
              Explore all blogs
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
