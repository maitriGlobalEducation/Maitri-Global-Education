"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import type { PublicBlogCard } from "@/services/blog.service";
import BlogGridSkeleton from "./BlogGridSkeleton";

interface PageData {
  blogs: PublicBlogCard[];
  currentPage: number;
  totalPages: number;
  total: number;
}

interface PaginatedBlogGridProps {
  initialBlogs: PublicBlogCard[];
  initialPage: number;
  initialTotalPages: number;
  initialTotal: number;
}

function formatDate(date: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function StandardBlogCard({ blog }: { blog: PublicBlogCard }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group relative isolate flex min-w-0 min-h-75 overflow-hidden rounded-xl bg-zinc-900 text-white sm:min-h-80"
    >
      {blog.cardImage?.url ? (
        <img
          src={blog.cardImage.url}
          alt={blog.title}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-800" />
      )}

      <div className="absolute inset-0 z-0 bg-linear-to-t from-black via-black/45 to-black/5 transition-opacity duration-300 group-hover:from-black/95" />

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

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/80 sm:text-sm">
          {blog.publishedAt && <span>{formatDate(blog.publishedAt)}</span>}
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

export default function PaginatedBlogGrid({
  initialBlogs,
  initialPage,
  initialTotalPages,
  initialTotal,
}: PaginatedBlogGridProps) {
  const initialData: PageData = {
    blogs: initialBlogs,
    currentPage: initialPage,
    totalPages: initialTotalPages,
    total: initialTotal,
  };

  const [pageData, setPageData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const cacheRef = useRef(
    new Map<number, PageData>([[initialPage, initialData]]),
  );

  const requestsRef = useRef(new Map<number, Promise<PageData>>());

  const getPageData = useCallback(async (page: number) => {
    const cached = cacheRef.current.get(page);

    if (cached) return cached;

    const existingRequest = requestsRef.current.get(page);

    if (existingRequest) return existingRequest;

    const request = (async () => {
      const response = await fetch(`/api/blogs?page=${page}`);

      if (!response.ok) {
        throw new Error("Unable to load articles.");
      }

      const data = (await response.json()) as PageData;

      cacheRef.current.set(data.currentPage, data);

      return data;
    })();

    requestsRef.current.set(page, request);

    try {
      return await request;
    } finally {
      requestsRef.current.delete(page);
    }
  }, []);

  // Prefetch the next page in the background.
  useEffect(() => {
    if (currentPage >= pageData.totalPages) return;

    void getPageData(currentPage + 1).catch(() => {
      // A failed prefetch should not interrupt the current page.
    });
  }, [currentPage, pageData.totalPages, getPageData]);

  const navigateToPage = useCallback(
    async (targetPage: number, updateUrl = true) => {
      if (
        targetPage < 1 ||
        targetPage > pageData.totalPages ||
        targetPage === currentPage ||
        isLoading
      ) {
        return;
      }

      const previousPage = currentPage;
      setLoadError("");

      if (updateUrl) {
        window.history.pushState(
          null,
          "",
          `/blogs?page=${targetPage}#all-blogs`,
        );
      }

      setCurrentPage(targetPage);

      const cached = cacheRef.current.get(targetPage);

      if (cached) {
        setPageData(cached);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const data = await getPageData(targetPage);

        setPageData(data);
        setCurrentPage(data.currentPage);

        if (updateUrl && data.currentPage !== targetPage) {
          window.history.replaceState(
            null,
            "",
            `/blogs?page=${data.currentPage}#all-blogs`,
          );
        }
      } catch {
        setCurrentPage(previousPage);
        setLoadError("Couldn't load articles. Please try again.");

        if (updateUrl) {
          window.history.replaceState(
            null,
            "",
            `/blogs?page=${previousPage}#all-blogs`,
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, getPageData, isLoading, pageData.totalPages],
  );

  // Support browser Back and Forward navigation.
  useEffect(() => {
    function handlePopState() {
      const url = new URL(window.location.href);
      const requestedPage = Number(url.searchParams.get("page") ?? "1");

      if (Number.isSafeInteger(requestedPage) && requestedPage >= 1) {
        void navigateToPage(requestedPage, false);
      }
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigateToPage]);

  function pageLink(
    targetPage: number,
    label: ReactNode,
    className: string,
    key: string | number,
  ) {
    return (
      <Link
        key={key}
        href={`/blogs?page=${targetPage}#all-blogs`}
        scroll={false}
        aria-disabled={isLoading}
        onClick={(event) => {
          event.preventDefault();
          void navigateToPage(targetPage);
        }}
        className={`${className} ${isLoading ? "cursor-wait" : ""}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <>
      <div aria-busy={isLoading}>
        {isLoading ? (
          <BlogGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {pageData.blogs.map((blog) => (
              <StandardBlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {loadError && (
        <p role="alert" className="mt-4 text-center text-sm text-red-600">
          {loadError}
        </p>
      )}

      {pageData.totalPages > 1 && (
        <>
          <nav
            aria-label="Blog pagination"
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            {currentPage > 1 &&
              pageLink(
                currentPage - 1,
                "← Previous",
                "inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50",
                "previous",
              )}

            {Array.from({ length: pageData.totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === currentPage;

              return pageLink(
                pageNumber,
                pageNumber,
                `inline-flex size-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                  isCurrentPage
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                }`,
                pageNumber,
              );
            })}

            {currentPage < pageData.totalPages &&
              pageLink(
                currentPage + 1,
                "Next →",
                "inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50",
                "next",
              )}
          </nav>

          <p className="mt-4 text-center text-xs text-zinc-500">
            Page {currentPage} of {pageData.totalPages}
          </p>
        </>
      )}
    </>
  );
}
