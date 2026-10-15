"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { PublicScholarship } from "@/services/public-scholarship.service";

interface ScholarshipShowcaseProps {
  scholarships: PublicScholarship[];
}

export default function ScholarshipShowcase({
  scholarships,
}: ScholarshipShowcaseProps) {
  const [current, setCurrent] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(1);
  const [mobileAnimating, setMobileAnimating] = useState(true);
  const mobileTransitioning = useRef(false);

  const total = scholarships.length;

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const mobileSlides =
    total > 1
      ? [scholarships[total - 1], ...scholarships, scholarships[0]]
      : scholarships;

  const nextMobile = () => {
    if (mobileTransitioning.current || total <= 1) return;

    mobileTransitioning.current = true;
    setMobileAnimating(true);
    setMobileIndex((prev) => prev + 1);
    setCurrent((prev) => (prev + 1) % total);
  };

  const previousMobile = () => {
    if (mobileTransitioning.current || total <= 1) return;

    mobileTransitioning.current = true;
    setMobileAnimating(true);
    setMobileIndex((prev) => prev - 1);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const handleMobileTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;

    if (mobileIndex === total + 1) {
      setMobileAnimating(false);
      setMobileIndex(1);
    } else if (mobileIndex === 0) {
      setMobileAnimating(false);
      setMobileIndex(total);
    }

    mobileTransitioning.current = false;
  };

  useEffect(() => {
    if (mobileAnimating) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMobileAnimating(true);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [mobileAnimating]);

  // Reset the carousel if the published scholarship list changes.
  useEffect(() => {
    setCurrent(0);
    setMobileIndex(total > 1 ? 1 : 0);
    setMobileAnimating(false);
    mobileTransitioning.current = false;
  }, [total]);

  const navigationButtonClass = `
    flex size-11 cursor-pointer items-center justify-center
    rounded-full bg-[#dce1e8] text-black transition-all duration-300
    hover:scale-105 hover:bg-white
    disabled:cursor-not-allowed sm:size-12
  `;

  if (total === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-[#2c2c2c]">
      {/* Desktop: split-screen showcase */}
      <div className="relative hidden h-175 w-full lg:block">
        {scholarships.map((scholarship, index) => {
          const isActive = index === current;
          const imageLeft = index % 2 === 0;

          return (
            <div
              key={scholarship.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "pointer-events-auto z-10 translate-x-0 opacity-100"
                  : "pointer-events-none z-0 translate-x-8 opacity-0"
              }`}
            >
              <div
                className={`flex h-full w-full ${
                  imageLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Scholarship wallpaper */}
                <div
                  className={`relative h-full w-[68%] overflow-hidden ${
                    imageLeft
                      ? "[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]"
                      : "[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
                  }`}
                >
                  {scholarship.wallpaper?.url ? (
                    <Image
                      src={scholarship.wallpaper.url}
                      alt={scholarship.title}
                      fill
                      priority={index === 0}
                      sizes="68vw"
                      className={`object-cover transition-transform duration-1000 ease-out ${
                        isActive ? "scale-100" : "scale-110"
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-700" />
                  )}

                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Scholarship information */}
                <div
                  className={`
                    flex h-full w-[32%] items-center justify-center
                    bg-[#2c2c2c] px-8 pb-24 pt-10 text-white xl:px-10
                    ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }
                    transition-all delay-150 duration-700
                  `}
                >
                  <div className="flex w-full max-w-md flex-col items-center text-center">
                    {/* University logo */}
                    <div className="relative mb-8 h-18 w-45 xl:h-32 xl:w-64">
                      {scholarship.logo?.url ? (
                        <Image
                          src={scholarship.logo.url}
                          alt={`${scholarship.title} logo`}
                          fill
                          sizes="256px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-white/50">
                          Scholarship
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h2
                      style={{ fontFamily: "Epika" }}
                      className="
                        bg-[linear-gradient(90deg,#e8c166_0%,#fff0b3_50%,#e8c166_100%)]
                        bg-clip-text text-3xl xl:text-4xl font-semibold leading-tight
                        text-transparent uppercase
                      "
                    >
                      {scholarship.title}
                    </h2>

                    {/* Amount */}
                    {scholarship.amount && (
                      <p className="mt-4 font-serif text-4xl text-[#edd08b] xl:text-5xl">
                        {scholarship.amount}
                      </p>
                    )}

                    {/* Description */}
                    <p className="mt-6 max-w-sm text-sm leading-6 text-white/90 xl:text-base">
                      {scholarship.description}
                    </p>

                    {/* Hardcoded CTA; URL is generated from the slug */}
                    <Link
                      href={`/scholarships/${scholarship.slug}`}
                      tabIndex={isActive ? 0 : -1}
                      className="
                        mt-6 border-2 border-white px-6 py-3 text-sm
                        font-semibold transition-colors duration-300
                        hover:bg-white hover:text-black
                      "
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Desktop navigation */}
        {total > 1 && (
          <div
            className="
              absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2
              items-center gap-4
            "
          >
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous scholarship"
              className={navigationButtonClass}
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next scholarship"
              className={navigationButtonClass}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile and tablet carousel */}
      <div className="px-4 py-8 sm:px-8 sm:py-12 lg:hidden">
        <div className="mx-auto max-w-lg">
          <div className="overflow-hidden rounded-2xl">
            <div
              onTransitionEnd={handleMobileTransitionEnd}
              className={`flex ${
                mobileAnimating
                  ? "transition-transform duration-500 ease-in-out"
                  : "transition-none"
              }`}
              style={{
                transform: `translateX(-${mobileIndex * 100}%)`,
              }}
            >
              {mobileSlides.map((scholarship, index) => {
                const isActive = total === 1 || index === mobileIndex;

                return (
                  <article
                    key={`${scholarship.id}-${index}`}
                    aria-hidden={!isActive}
                    className="
                      flex h-120 w-full shrink-0 flex-col overflow-hidden
                      rounded-2xl border border-white/10 bg-[#383838]
                      sm:h-130
                    "
                  >
                    {/* Wallpaper */}
                    <div className="relative h-38 w-full shrink-0 sm:h-46">
                      {scholarship.wallpaper?.url ? (
                        <Image
                          src={scholarship.wallpaper.url}
                          alt={scholarship.title}
                          fill
                          priority={index === 1}
                          sizes="(max-width: 640px) 100vw, 512px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-zinc-700" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex min-h-0 flex-1 flex-col items-center px-5 py-4 text-center text-white sm:px-8 sm:py-5">
                      {/* Logo */}
                      <div className="relative mb-2 h-18 w-44 shrink-0 sm:h-12 sm:w-36">
                        {scholarship.logo?.url ? (
                          <Image
                            src={scholarship.logo.url}
                            alt={`${scholarship.title} logo`}
                            fill
                            sizes="176px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-white/50">
                            Scholarship
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h2
                        style={{ fontFamily: "Epika" }}
                        className="
    bg-[linear-gradient(90deg,#e8c166_0%,#fff0b3_50%,#e8c166_100%)]
    bg-clip-text text-3xl leading-tight font-medium
    text-transparent uppercase
    xl:text-5xl
  "
                      >
                        {scholarship.title}
                      </h2>

                      {/* Amount */}
                      {scholarship.amount && (
                        <p className="mt-2 font-serif text-2xl text-[#edd08b] sm:text-3xl">
                          {scholarship.amount}
                        </p>
                      )}

                      {/* Description */}
                      <div className="mt-3 min-h-0 w-full flex-1 overflow-y-auto overscroll-contain">
                        <p className="mx-auto max-w-sm text-sm leading-5 text-white/85">
                          {scholarship.description}
                        </p>
                      </div>

                      {/* Hardcoded CTA */}
                      <Link
                        href={`/scholarships/${scholarship.slug}`}
                        tabIndex={isActive ? 0 : -1}
                        className="
                          mt-3 shrink-0 border-2 border-white px-5 py-2
                          text-sm font-semibold transition-colors duration-300
                          hover:bg-white hover:text-black
                        "
                      >
                        Apply Now
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Mobile navigation */}
          {total > 1 && (
            <div className="mt-6 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={previousMobile}
                aria-label="Previous scholarship"
                className={navigationButtonClass}
              >
                <ArrowLeft size={18} />
              </button>

              <span className="min-w-12 text-center text-sm font-medium text-white/75">
                {current + 1} / {total}
              </span>

              <button
                type="button"
                onClick={nextMobile}
                aria-label="Next scholarship"
                className={navigationButtonClass}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
