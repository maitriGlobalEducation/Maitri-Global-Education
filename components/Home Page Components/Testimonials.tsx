"use client";

import Image from "next/image";
import { ChevronRight, X, Quote } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { PublicTestimonial } from "@/services/testimonial.service";

interface TestimonialsProps {
  testimonials: PublicTestimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<PublicTestimonial | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Group testimonials according to the current screen size.
  const slides = useMemo(() => {
    const groups: PublicTestimonial[][] = [];

    for (let i = 0; i < testimonials.length; i += itemsPerPage) {
      groups.push(testimonials.slice(i, i + itemsPerPage));
    }

    return groups;
  }, [testimonials, itemsPerPage]);

  // Append the first group as a clone so the slider can loop seamlessly.
  const loopedSlides = useMemo(() => {
    if (slides.length <= 1) return slides;

    return [...slides, slides[0]];
  }, [slides]);

  const goToPage = useCallback(
    (page: number) => {
      if (totalPages === 0) return;

      // Clicking a dot selects that exact group.
      setIsTransitioning(true);
      setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
    },
    [totalPages],
  );

  const handleTransitionEnd = useCallback(() => {
    // Once the cloned first group reaches the viewport, silently
    // reset the track to the real first group.
    if (totalPages > 1 && currentPage === totalPages) {
      setIsTransitioning(false);
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  // Re-enable transitions after the invisible reset has rendered.
  useEffect(() => {
    if (!isTransitioning && currentPage === 0) {
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, [isTransitioning, currentPage]);

  // Determine the number of visible cards based on screen width.
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const tablet = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)",
    );

    const updateItemsPerPage = () => {
      const nextItemsPerPage = mobile.matches ? 1 : tablet.matches ? 2 : 3;

      setItemsPerPage((previous) =>
        previous === nextItemsPerPage ? previous : nextItemsPerPage,
      );
    };

    updateItemsPerPage();

    mobile.addEventListener("change", updateItemsPerPage);
    tablet.addEventListener("change", updateItemsPerPage);

    return () => {
      mobile.removeEventListener("change", updateItemsPerPage);
      tablet.removeEventListener("change", updateItemsPerPage);
    };
  }, []);

  // Reset the slider if the number of groups changes.
  useEffect(() => {
    setIsTransitioning(false);
    setCurrentPage(0);
  }, [itemsPerPage, testimonials.length]);

  // Automatically advance the slider. The interval is cleared while
  // the Read more modal is open, so the background does not move.
  useEffect(() => {
    if (selectedTestimonial || totalPages <= 1) return;

    const interval = window.setInterval(() => {
      setIsTransitioning(true);
      setCurrentPage((page) => {
        if (page >= totalPages - 1) {
          // Move to the cloned first group; transitionend resets to zero.
          return totalPages;
        }

        return page + 1;
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [selectedTestimonial, totalPages]);

  // Keep the modal keyboard-accessible and prevent background scrolling.
  useEffect(() => {
    if (!selectedTestimonial) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedTestimonial(null);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedTestimonial]);

  if (testimonials.length === 0) return null;

  return (
    <section className="overflow-hidden bg-[#f8f8f7] px-5 py-14 sm:px-8 lg:py-20">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-7xl text-center lg:mb-12">
        <p
          style={{ fontFamily: "Epika" }}
          className="mb-2 text-xs font-semibold tracking-[0.2em] text-[#777] uppercase sm:text-sm"
        >
          Student experiences
        </p>

        <h2
          style={{ fontFamily: "Epika" }}
          className="text-4xl leading-tight font-bold text-black sm:text-5xl lg:text-6xl"
        >
          Stories that inspire
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
          Real experiences from students on their journey to international
          education.
        </p>
      </div>

      {/* Infinite slider */}
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden">
          <div
            className="flex items-stretch"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
              transition: isTransitioning
                ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopedSlides.map((slide, slideIndex) => (
              <div
                key={`slide-${slideIndex}`}
                aria-hidden={
                  slideIndex === totalPages ||
                  (slideIndex !== currentPage && slideIndex !== totalPages)
                }
                className={`grid min-w-0 flex-[0_0_100%] items-stretch gap-4 sm:gap-5 ${
                  itemsPerPage === 1
                    ? "grid-cols-1"
                    : itemsPerPage === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                }`}
              >
                {slide.map((testimonial, testimonialIndex) => (
                  <article
                    key={`${slideIndex}-${testimonial.id}-${testimonialIndex}`}
                    className="flex min-h-72 flex-col rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-[0_3px_14px_rgba(0,0,0,0.025)] transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg sm:p-5"
                  >
                    {/* Student details */}
                    <div className="flex items-center gap-3">
                      {testimonial.image?.url ? (
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-zinc-100 ring-2 ring-zinc-100 sm:size-14">
                          <Image
                            src={testimonial.image.url}
                            alt={testimonial.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-lg font-semibold text-zinc-600 sm:size-14">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-zinc-900 sm:text-base">
                          {testimonial.name}
                        </h3>

                        <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">
                          {testimonial.course}
                        </p>

                        <p className="line-clamp-1 text-xs text-zinc-500">
                          {testimonial.university}
                        </p>
                      </div>
                    </div>

                    <div className="my-4 h-px bg-zinc-100" />

                    {/* Quote */}
                    <div className="mb-2 flex items-center gap-2 text-zinc-400">
                      <Quote size={17} />

                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">
                        Student testimonial
                      </span>
                    </div>

                    <blockquote className="line-clamp-4 flex-1 text-sm leading-6 text-zinc-600">
                      “{testimonial.testimonial}”
                    </blockquote>

                    <button
                      type="button"
                      onClick={() => setSelectedTestimonial(testimonial)}
                      className="mt-4 inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-zinc-500"
                    >
                      Read more
                      <ChevronRight size={16} />
                    </button>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots navigation */}
        {totalPages > 1 && (
          <div
            className="mt-8 flex items-center justify-center gap-2.5"
            aria-label="Testimonial slides"
          >
            {Array.from({ length: totalPages }, (_, index) => {
              const activePage = currentPage === totalPages ? 0 : currentPage;

              const isActive = activePage === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToPage(index)}
                  aria-label={`Go to testimonial group ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-zinc-900"
                      : "w-2.5 bg-zinc-300 hover:bg-zinc-500"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Full testimonial modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTestimonial(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-modal-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                {selectedTestimonial.image?.url ? (
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-zinc-100">
                    <Image
                      src={selectedTestimonial.image.url}
                      alt={selectedTestimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-lg font-semibold text-zinc-600">
                    {selectedTestimonial.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <h3
                    id="testimonial-modal-title"
                    className="text-base font-semibold text-zinc-950"
                  >
                    {selectedTestimonial.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    Student experience
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTestimonial(null)}
                aria-label="Close testimonial"
                className="cursor-pointer rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5 sm:p-6">
              <div className="rounded-xl bg-zinc-50 p-4 sm:p-5">
                <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Course
                </p>

                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {selectedTestimonial.course}
                </p>

                <p className="mt-4 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  University
                </p>

                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {selectedTestimonial.university}
                </p>
              </div>

              <div className="mb-3 mt-6 flex items-center gap-2 text-zinc-500">
                <Quote size={18} />

                <h4 className="text-sm font-semibold tracking-wider uppercase">
                  What {selectedTestimonial.name.split(" ")[0]} has to say about
                  Maitri
                </h4>
              </div>

              <blockquote className="whitespace-pre-wrap text-sm leading-7 text-zinc-700">
                “{selectedTestimonial.testimonial}”
              </blockquote>
            </div>

            <div className="flex justify-end border-t border-zinc-100 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedTestimonial(null)}
                className="cursor-pointer rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
