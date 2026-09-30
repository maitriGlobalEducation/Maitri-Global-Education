"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Scholarship {
  id: number;
  logo: string;
  image: string;
  title: string;
  amount: string;
  description: string;
  href: string;
  imagePosition: "left" | "right";
}

const scholarships: Scholarship[] = [
  {
    id: 1,
    logo: "/Images/Scholarship/Logos/domus.png",
    image: "/Images/Scholarship/domus.png",
    title: "SCHOLARSHIP",
    amount: "€7000",
    description:
      "Ready to start your journey in Milan? Fill out the form and we will contact you with details.",
    href: "/scholarships/domus",
    imagePosition: "left",
  },
  {
    id: 2,
    logo: "/Images/Scholarship/Logos/marangoni.png",
    image: "/Images/Scholarship/marangoni.jpg",
    title: "SCHOLARSHIP",
    amount: "€10,000",
    description: "ALL POSTGRADUATE PROGRAMS",
    href: "/scholarships/polimoda",
    imagePosition: "right",
  },
  {
    id: 3,
    logo: "/Images/Scholarship/Logos/naba.png",
    image: "/Images/Scholarship/naba.jpg",
    title: "SCHOLARSHIP",
    amount: "€12,000",
    description:
      "Discover new opportunities and begin your international education journey.",
    href: "/scholarships/example",
    imagePosition: "left",
  },
  {
    id: 4,
    logo: "/Images/Scholarship/Logos/polimoda.png",
    image: "/Images/Scholarship/polimoda.jpg",
    title: "SCHOLARSHIP",
    amount: "€10,000",
    description: "ALL POSTGRADUATE PROGRAMS",
    href: "/scholarships/example",
    imagePosition: "right",
  },
  {
    id: 5,
    logo: "/Images/Scholarship/Logos/accademia.png",
    image: "/Images/Scholarship/accademia.jpg",
    title: "SCHOLARSHIP",
    amount: "€10,000",
    description: `"Invest in Tomorrow's Leaders," "Fueling Futures Through Education," or "Unlock Your Potential, Fund Your Future`,
    href: "/scholarships/example",
    imagePosition: "left",
  },
];

export default function ScholarshipShowcase() {
  const [current, setCurrent] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(1);
  const [mobileAnimating, setMobileAnimating] = useState(true);
  const mobileTransitioning = useRef(false);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? scholarships.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === scholarships.length - 1 ? 0 : prev + 1));
  };

  // Inside ScholarshipShowcase:

  // Clone last + all scholarships + clone first.
  const mobileSlides = [
    scholarships[scholarships.length - 1],
    ...scholarships,
    scholarships[0],
  ];

  const nextMobile = () => {
    if (mobileTransitioning.current) return;

    mobileTransitioning.current = true;
    setMobileAnimating(true);
    setMobileIndex((prev) => prev + 1);
    setCurrent((prev) => (prev + 1) % scholarships.length);
  };

  const previousMobile = () => {
    if (mobileTransitioning.current) return;

    mobileTransitioning.current = true;
    setMobileAnimating(true);
    setMobileIndex((prev) => prev - 1);
    setCurrent(
      (prev) => (prev - 1 + scholarships.length) % scholarships.length,
    );
  };

  const handleMobileTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;

    if (mobileIndex === scholarships.length + 1) {
      setMobileAnimating(false);
      setMobileIndex(1);
    } else if (mobileIndex === 0) {
      setMobileAnimating(false);
      setMobileIndex(scholarships.length);
    }

    mobileTransitioning.current = false;
  };

  // Re-enable animation after the invisible position reset.
  useEffect(() => {
    if (mobileAnimating) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMobileAnimating(true);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [mobileAnimating]);

  const navigationButtonClass = `
    flex
    size-11
    cursor-pointer
    items-center
    justify-center
    rounded-full
    bg-[#dce1e8]
    text-black
    transition-all
    duration-300
    hover:scale-105
    hover:bg-white
    disabled:cursor-not-allowed
    sm:size-12
  `;

  return (
    <section className="w-full overflow-hidden bg-[#2c2c2c]">
      {/* DESKTOP: ORIGINAL SPLIT-SCREEN DESIGN */}
      <div className="relative hidden h-175 w-full lg:block">
        {scholarships.map((scholarship, index) => {
          const isActive = index === current;
          const imageLeft = scholarship.imagePosition === "left";

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
                {/* Image */}
                <div
                  className={`relative h-full w-[68%] overflow-hidden ${
                    imageLeft
                      ? "[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]"
                      : "[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
                  }`}
                >
                  <Image
                    src={scholarship.image}
                    alt={`${scholarship.title} ${scholarship.amount}`}
                    fill
                    priority={index === 0}
                    sizes="68vw"
                    className={`object-cover transition-transform duration-1000 ease-out ${
                      isActive ? "scale-100" : "scale-110"
                    }`}
                  />

                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Content */}
                <div
                  className={`
                    flex
                    h-full
                    w-[32%]
                    items-center
                    justify-center
                    bg-[#2c2c2c]
                    px-8
                    pb-24
                    pt-10
                    text-white
                    xl:px-10
                    ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }
                    transition-all
                    delay-150
                    duration-700
                  `}
                >
                  <div className="flex w-full max-w-md flex-col items-center text-center">
                    {/* Logo */}
                    <div className="relative mb-8 h-18 w-45 xl:h-32 xl:w-64">
                      <Image
                        src={scholarship.logo}
                        alt="University logo"
                        fill
                        sizes="200px"
                        className="object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h2
                      style={{ fontFamily: "Epika" }}
                      className="
                        bg-[linear-gradient(90deg,#e8c166_0%,#fff0b3_50%,#e8c166_100%)]
                        bg-clip-text
                        text-3xl
                        font-medium
                        leading-tight
                        text-transparent
                        uppercase
                        xl:text-5xl
                      "
                    >
                      {scholarship.title}
                    </h2>

                    {/* Amount */}
                    <p className="mt-4 font-serif text-4xl text-[#edd08b] xl:text-5xl">
                      {scholarship.amount}
                    </p>

                    {/* Description */}
                    <p className="mt-6 max-w-sm text-sm leading-6 text-white/90 xl:text-base">
                      {scholarship.description}
                    </p>

                    {/* Apply */}
                    <Link
                      href={scholarship.href}
                      tabIndex={isActive ? 0 : -1}
                      className="
                        mt-6
                        border-2
                        border-white
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        transition-colors
                        duration-300
                        hover:bg-white
                        hover:text-black
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

        {/* FIXED DESKTOP NAVIGATION */}
        <div
          className="
            absolute
            bottom-8
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-4
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
      </div>

      {/* MOBILE & TABLET */}
      <div className="px-4 py-8 sm:px-8 sm:py-12 lg:hidden">
        <div className="mx-auto max-w-lg">
          {/* Carousel viewport */}
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
                const isActive = index === mobileIndex;

                return (
                  <article
                    key={`${scholarship.id}-${index}`}
                    aria-hidden={!isActive}
                    className="
                flex
                h-120
                w-full
                shrink-0
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#383838]
                sm:h-130
              "
                  >
                    {/* Image */}
                    <div className="relative h-38 w-full shrink-0 sm:h-46">
                      <Image
                        src={scholarship.image}
                        alt={`${scholarship.title} ${scholarship.amount}`}
                        fill
                        priority={index === 1}
                        sizes="(max-width: 640px) 100vw, 512px"
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex min-h-0 flex-1 flex-col items-center px-5 py-4 text-center text-white sm:px-8 sm:py-5">
                      {/* Logo */}
                      <div className="relative mb-2 h-18 w-44 shrink-0 sm:h-12 sm:w-36">
                        <Image
                          src={scholarship.logo}
                          alt="University logo"
                          fill
                          sizes="144px"
                          className="object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h2
                        style={{ fontFamily: "Epika" }}
                        className="
                    bg-[linear-gradient(90deg,#e8c166_0%,#fff0b3_50%,#e8c166_100%)]
                    bg-clip-text
                    text-xl
                    leading-tight
                    font-medium
                    text-transparent
                    uppercase
                    sm:text-2xl
                  "
                      >
                        {scholarship.title}
                      </h2>

                      {/* Amount */}
                      <p className="mt-2 font-serif text-2xl text-[#edd08b] sm:text-3xl">
                        {scholarship.amount}
                      </p>

                      {/* Scrollable description */}
                      <div className="mt-3 min-h-0 w-full flex-1 overflow-y-auto overscroll-contain">
                        <p className="mx-auto max-w-sm text-sm leading-5 text-white/85">
                          {scholarship.description}
                        </p>
                      </div>

                      {/* Apply */}
                      <Link
                        href={scholarship.href}
                        tabIndex={isActive ? 0 : -1}
                        className="
                    mt-3
                    shrink-0
                    border-2
                    border-white
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    transition-colors
                    duration-300
                    hover:bg-white
                    hover:text-black
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

          {/* Fixed navigation */}
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
              {current + 1} / {scholarships.length}
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
        </div>
      </div>
    </section>
  );
}
