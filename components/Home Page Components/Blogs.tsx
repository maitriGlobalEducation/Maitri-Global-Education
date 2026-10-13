"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  cardImage: { url: string; publicId: string } | null;
  excerpt: string;
  publishedAt: string | null;
}

interface ExploreBlogsProps {
  blogs: Blog[];
}

export default function ExploreBlogs({ blogs }: ExploreBlogsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const blogCount = blogs?.length ?? 0;

  const next = () => {
    if (blogCount <= 1) return;

    setHasInteracted(true);
    setActiveIndex((prev) => (prev + 1) % blogCount);
  };

  const previous = () => {
    if (blogCount <= 1) return;

    setHasInteracted(true);
    setActiveIndex((prev) => (prev - 1 + blogCount) % blogCount);
  };

  if (blogCount === 0) return null;

  const getBlog = (offset: number) => blogs[(activeIndex + offset) % blogCount];

  const visibleBlogs = Array.from(
    { length: Math.min(blogCount, 3) },
    (_, index) => getBlog(index),
  );

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          style={{ fontFamily: "Epika" }}
          className="mb-8 text-center text-4xl font-semibold uppercase text-[#d8aa22] sm:text-5xl lg:text-6xl"
        >
          Blogs
        </h2>

        {/* Desktop / Tablet */}
        <div className="hidden h-150 sm:block lg:h-160">
          <div
            className={`grid h-full items-start gap-5 ${
              blogCount === 1 ? "sm:grid-cols-1" : "sm:grid-cols-[1.15fr_1fr]"
            } ${
              blogCount >= 3
                ? "lg:grid-cols-[1.15fr_1fr_0.5fr]"
                : blogCount === 2
                  ? "lg:grid-cols-[1.15fr_1fr]"
                  : ""
            }`}
          >
            {visibleBlogs.map((blog, index) => (
              <BlogCard
                key={`${activeIndex}-${index}-${blog._id}`}
                blog={blog}
                active={index === 0}
                position={index}
                animate={hasInteracted}
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="h-125 sm:hidden">
          <BlogCard
            key={`mobile-${activeIndex}-${visibleBlogs[0]._id}`}
            blog={visibleBlogs[0]}
            active
            position={0}
            animate={hasInteracted}
            className="w-full"
          />
        </div>

        {/* Navigation */}
        {blogCount > 1 && (
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous blog"
              className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#dce1e8] text-black transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
            >
              <ChevronLeft size={21} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next blog"
              className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#dce1e8] text-black transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
            >
              <ChevronRight size={21} />
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/blogs"
            className="inline-flex cursor-pointer items-center justify-center rounded-md border-2 border-black px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
          >
            Explore all blogs
          </Link>
        </div>
      </div>
    </section>
  );
}

interface BlogCardProps {
  blog: Blog;
  active: boolean;
  position: number;
  animate: boolean;
  className?: string;
}

function BlogCard({
  blog,
  active,
  position,
  animate,
  className = "",
}: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [revealed, setRevealed] = useState(!animate || !active);

  useEffect(() => {
    if (!animate || !active) {
      setRevealed(true);
      return;
    }

    setRevealed(false);

    if (!imageLoaded || !blog.cardImage?.url) {
      setRevealed(true);
      return;
    }

    let secondFrame = 0;

    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setRevealed(true);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);

      if (secondFrame) {
        cancelAnimationFrame(secondFrame);
      }
    };
  }, [active, animate, imageLoaded, blog._id, blog.cardImage?.url]);

  return (
    <article className={`min-w-0 ${className}`}>
      {/* Image */}
      <Link
        href={`/blogs/${blog.slug}`}
        className={`group/image relative block w-full overflow-hidden rounded-lg bg-zinc-100 ${
          position === 0 ? "h-85 sm:h-105 lg:h-122" : "h-60 sm:h-62 lg:h-62"
        }`}
      >
        {blog.cardImage?.url ? (
          <div
            className={`absolute inset-0 ${
              animate
                ? "transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                : ""
            }`}
            style={{
              clipPath:
                active && !revealed ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
            }}
          >
            <Image
              src={blog.cardImage.url}
              alt={blog.title}
              fill
              priority={position === 0}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              sizes={
                position === 0
                  ? "(max-width: 640px) 100vw, 45vw"
                  : position === 1
                    ? "38vw"
                    : "20vw"
              }
              className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No image available
          </div>
        )}
      </Link>

      {/* Blog information */}
      <div className="pt-4">
        <div className="flex items-start gap-3">
          <h3
            className={`flex-1 font-semibold text-[#101010] ${
              position === 0
                ? "text-xl leading-7 sm:text-2xl sm:leading-8"
                : "text-base leading-6 lg:text-lg"
            }`}
          >
            {blog.title}
          </h3>

          <Link
            href={`/blogs/${blog.slug}`}
            aria-label={`Read ${blog.title}`}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-[#d8aa22] hover:text-black"
          >
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <span className="mt-3 inline-flex rounded-full border border-gray-400 px-3 py-1 text-[11px] font-medium tracking-wide text-gray-600 uppercase">
          {blog.category}
        </span>

        {blog.publishedAt && (
          <p className="mt-2 text-xs text-zinc-500">
            {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "Asia/Kolkata",
            })}
          </p>
        )}

        {/* {position === 0 && blog.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#344054] sm:text-base">
            {blog.excerpt}
          </p>
        )} */}

        <div className="mt-6 h-px w-full bg-[#d8aa22]" />
      </div>
    </article>
  );
}
