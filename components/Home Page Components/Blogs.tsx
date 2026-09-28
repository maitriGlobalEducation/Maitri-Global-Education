"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  category: string;
  image: string;
  href: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title:
      "Designing for Attention: How Visual Communicators Are Adapting to Shorter Attention Spans",
    category: "Development",
    image: "/Images/blogs/blogs-design.jpg",
    href: "/blogs/blog-1",
  },
  {
    id: 2,
    title:
      "Mobility Meets Emotion: How Transportation Designers Are Shaping the Future of Human-Centric Travel",
    category: "Development",
    image: "/Images/blogs/blogs-mobility.jpg",
    href: "/blogs/blog-2",
  },
  {
    id: 3,
    title:
      "From Concept to Space: How Interior Designers Tell Stories Through Form and Function",
    category: "Development",
    image: "/Images/blogs/blogs-interior.jpg",
    href: "/blogs/blog-3",
  },
  {
    id: 4,
    title:
      "Green is the New Black: Why Sustainability is the Future of Fashion Design",
    category: "Fashion",
    image: "/Images/blogs/blogs-fashion.png",
    href: "/blogs/blog-4",
  },
  {
    id: 5,
    title: "Study Smarter",
    category: "Development",
    image: "/Images/blogs/blogs-study.jpg",
    href: "/blogs/blog-5",
  },
];

export default function Blogs() {
  const [activeIndex, setActiveIndex] = useState(0);

  // False only for the initial page render.
  // After the first navigation click, shutter animations are enabled.
  const [hasInteracted, setHasInteracted] = useState(false);

  const next = () => {
    setHasInteracted(true);
    setActiveIndex((prev) => (prev + 1) % blogs.length);
  };

  const previous = () => {
    setHasInteracted(true);

    setActiveIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const getBlog = (offset: number) => {
    return blogs[(activeIndex + offset) % blogs.length];
  };

  const visibleBlogs = [getBlog(0), getBlog(1), getBlog(2)];

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-16 sm:py-20 lg:py-24">
      {/* Preload all blog images */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      >
        {blogs.map((blog) => (
          <Image
            key={`preload-${blog.id}`}
            src={blog.image}
            alt=""
            width={1200}
            height={800}
            priority
            sizes="(max-width: 640px) 100vw, 45vw"
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <h2
          style={{ fontFamily: "Epika" }}
          className="
            mb-8
            text-center
            text-4xl
            font-semibold
            uppercase
            text-[#d8aa22]
            sm:text-5xl
            lg:text-6xl
          "
        >
          Blogs
        </h2>

        {/* Desktop / Tablet */}
        <div className="hidden h-150 sm:block lg:h-160">
          <div
            className="
              grid
              h-full
              items-start
              gap-5
              sm:grid-cols-[1.15fr_1fr]
              lg:grid-cols-[1.15fr_1fr_0.5fr]
            "
          >
            {visibleBlogs.map((blog, index) => (
              <BlogCard
                key={`${activeIndex}-${index}`}
                blog={blog}
                active={index === 0}
                position={index}
                animate={hasInteracted}
                className={index === 2 ? "hidden lg:block" : ""}
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="h-125 sm:hidden">
          <BlogCard
            key={`mobile-${activeIndex}`}
            blog={visibleBlogs[0]}
            active
            position={0}
            animate={hasInteracted}
            className="w-full"
          />
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous blog"
            className="
              flex
              size-12
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-[#dce1e8]
              text-black
              transition-all
              duration-300
              hover:scale-105
              hover:bg-black
              hover:text-white
            "
          >
            <ChevronLeft size={21} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next blog"
            className="
              flex
              size-12
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-[#dce1e8]
              text-black
              transition-all
              duration-300
              hover:scale-105
              hover:bg-black
              hover:text-white
            "
          >
            <ChevronRight size={21} />
          </button>
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
  /*
    Initial page load:
    revealed = true

    Navigation:
    active card starts closed and opens after its image is ready.
  */
  const [imageLoaded, setImageLoaded] = useState(false);
  const [revealed, setRevealed] = useState(!animate || !active);

  useEffect(() => {
    /*
      INITIAL RENDER

      Don't run the shutter at all.
      First image should simply be visible.
    */
    if (!animate) {
      setRevealed(true);
      return;
    }

    /*
      Non-active cards are always fully visible.
    */
    if (!active) {
      setRevealed(true);
      return;
    }

    /*
      New active card:
      close shutter first.
    */
    setRevealed(false);

    /*
      Don't open it until the image has loaded.
    */
    if (!imageLoaded) {
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
  }, [active, animate, imageLoaded]);

  return (
    <article className={`min-w-0 ${className}`}>
      {/* Image */}
      <Link
        href={blog.href}
        className={`
          group/image
          relative
          block
          w-full
          overflow-hidden
          rounded-lg

          ${position === 0 ? "h-85 sm:h-105 lg:h-122" : "h-60 sm:h-62 lg:h-62"}
        `}
      >
        <div
          className={`
            absolute
            inset-0

            ${
              animate
                ? "transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                : ""
            }
          `}
          style={{
            clipPath:
              active && !revealed ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
          }}
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority={position === 0}
            onLoad={() => {
              setImageLoaded(true);
            }}
            sizes={
              position === 0
                ? "(max-width: 640px) 100vw, 45vw"
                : position === 1
                  ? "38vw"
                  : "20vw"
            }
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover/image:scale-105
            "
          />
        </div>
      </Link>

      {/* Blog information */}
      <div className="pt-4">
        <div className="flex items-start gap-3">
          <h3
            className={`
              flex-1
              font-semibold
              text-[#101010]

              ${
                position === 0
                  ? "text-xl leading-7 sm:text-2xl sm:leading-8"
                  : "text-base leading-6 lg:text-lg"
              }
            `}
          >
            {blog.title}
          </h3>

          <Link
            href={blog.href}
            aria-label={`Read ${blog.title}`}
            className="
              flex
              size-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#d8aa22]
              hover:text-black
            "
          >
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Category */}
        <span
          className="
            mt-3
            inline-flex
            rounded-full
            border
            border-gray-400
            px-3
            py-1
            text-[11px]
            font-medium
            tracking-wide
            text-gray-600
            uppercase
          "
        >
          {blog.category}
        </span>

        {/* Gold divider */}
        <div className="mt-6 h-px w-full bg-[#d8aa22]" />
      </div>
    </article>
  );
}
