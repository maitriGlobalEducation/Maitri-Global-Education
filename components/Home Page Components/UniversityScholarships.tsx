"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { University } from "@/types/university";

interface UniversityScholarshipsProps {
  universities: University[];
  isVisible?: boolean;
}

export default function UniversityScholarships({
  universities,
  isVisible = true,
}: UniversityScholarshipsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const universityCount = universities.length;

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }

      setCurrentIndex(0);
      setIsTransitioning(true);
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  if (!isVisible || universityCount === 0) {
    return null;
  }

  const canNavigate = universityCount > itemsPerPage;

  const nextPage = () => {
    if (!canNavigate || currentIndex >= universityCount) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const previousPage = () => {
    if (!canNavigate) return;

    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(universityCount);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(universityCount - 1);
        });
      });

      return;
    }

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const displayedUniversities = [
    ...universities,
    ...universities.slice(0, Math.min(itemsPerPage, universityCount)),
  ];

  return (
    <section className="relative min-h-160 w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/Images/Academy.png"
        alt="University campus"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-160 max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="relative w-full">
          {/* University cards */}
          <div className="overflow-hidden">
            <div
              className={`flex ${
                isTransitioning
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
              onTransitionEnd={() => {
                if (currentIndex === universityCount) {
                  setIsTransitioning(false);
                  setCurrentIndex(0);
                }
              }}
            >
              {displayedUniversities.map((university, index) => (
                <div
                  key={`${university._id}-${index}`}
                  className="shrink-0 px-2.5"
                  style={{
                    width: `${100 / itemsPerPage}%`,
                  }}
                >
                  <article
                    className="
                      group
                      flex
                      min-h-95
                      h-full
                      flex-col
                      rounded-lg
                      border
                      border-white/25
                      bg-white/12
                      p-6
                      text-white
                      backdrop-blur-md
                      backdrop-saturate-125
                      transition-all
                      duration-300
                      hover:border-white/35
                      hover:bg-white/16
                      sm:p-7
                      lg:min-h-92
                    "
                  >
                    {/* Report */}
                    <p className="mb-3 text-xs font-medium text-white/75 sm:text-sm">
                      {university.reportLabel || "Report"}
                      {university.reportYear
                        ? ` | ${university.reportYear}`
                        : ""}
                    </p>

                    {/* University name, country and logo */}
                    <div className="mb-6 flex min-h-14 items-start justify-between gap-5">
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold leading-tight sm:text-2xl">
                          {university.name}
                        </h3>

                        <p className="mt-1 text-sm text-white/65">
                          {university.country}
                        </p>
                      </div>

                      {university.logo?.url && (
                        <div className="relative mt-1 h-10 w-24 shrink-0 lg:h-20 lg:w-30">
                          <Image
                            src={university.logo.url}
                            alt={`${university.name} logo`}
                            fill
                            sizes="120px"
                            className="object-contain object-right"
                          />
                        </div>
                      )}
                    </div>

                    {/* University title */}
                    <h4 className="mb-4 text-base font-semibold leading-6 sm:text-lg">
                      {university.title}
                    </h4>

                    {/* Description */}
                    <p className="flex-1 text-sm leading-5 text-white/85 sm:leading-6">
                      {university.description}
                    </p>

                    {/* CTA */}
                    {university.ctaUrl && (
                      <div className="mt-7">
                        <Link
                          href={university.ctaUrl}
                          className="
                            inline-flex
                            min-h-11
                            items-center
                            justify-center
                            rounded-md
                            border-2
                            border-white
                            px-6
                            text-sm
                            font-semibold
                            transition-colors
                            duration-300
                            hover:bg-white
                            hover:text-black
                          "
                        >
                          {university.ctaLabel || "Go to University Page"}
                        </Link>
                      </div>
                    )}
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop / tablet arrows */}
          {canNavigate && (
            <>
              <button
                type="button"
                onClick={previousPage}
                aria-label="Previous universities"
                className="
                  absolute
                  top-1/2
                  -left-15
                  hidden
                  size-11
                  -translate-y-1/2
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-white/25
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-black
                  lg:flex
                "
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={nextPage}
                aria-label="Next universities"
                className="
                  absolute
                  top-1/2
                  -right-15
                  hidden
                  size-11
                  -translate-y-1/2
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-white/25
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-black
                  lg:flex
                "
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Mobile / tablet navigation */}
          {canNavigate && (
            <div className="mt-7 flex items-center justify-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={previousPage}
                aria-label="Previous universities"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextPage}
                aria-label="Next universities"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
