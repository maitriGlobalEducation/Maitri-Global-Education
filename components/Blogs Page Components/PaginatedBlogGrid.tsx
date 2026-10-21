"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import BlogGridSkeleton from "./BlogGridSkeleton";

interface PaginatedBlogGridProps {
  children: ReactNode;
  currentPage: number;
  totalPages: number;
}

export default function PaginatedBlogGrid({
  children,
  currentPage,
  totalPages,
}: PaginatedBlogGridProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Hide the skeleton when the new page data arrives.
  useEffect(() => {
    setIsLoading(false);
  }, [currentPage]);

  function handlePageChange(targetPage: number) {
    if (targetPage !== currentPage) {
      setIsLoading(true);
    }
  }

  return (
    <>
      <div aria-busy={isLoading}>
        {isLoading ? (
          <BlogGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {children}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <>
          <nav
            aria-label="Blog pagination"
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            {currentPage > 1 && (
              <Link
                href={`/blogs?page=${currentPage - 1}#all-blogs`}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-disabled={isLoading}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                ← Previous
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === currentPage;

              return (
                <Link
                  key={pageNumber}
                  href={`/blogs?page=${pageNumber}#all-blogs`}
                  onClick={() => handlePageChange(pageNumber)}
                  aria-current={isCurrentPage ? "page" : undefined}
                  aria-disabled={isLoading}
                  className={`inline-flex size-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                    isCurrentPage
                      ? "border-zinc-950 bg-zinc-950 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            })}

            {currentPage < totalPages && (
              <Link
                href={`/blogs?page=${currentPage + 1}#all-blogs`}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-disabled={isLoading}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                Next →
              </Link>
            )}
          </nav>

          <p className="mt-4 text-center text-xs text-zinc-500">
            Page {currentPage} of {totalPages}
          </p>
        </>
      )}
    </>
  );
}
