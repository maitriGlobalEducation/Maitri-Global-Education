"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Scholarship {
  id: number;
  year: string;
  university: string;
  location: string;
  logo: string;
  title: string;
  description: string;
  href: string;
}

const scholarships: Scholarship[] = [
  {
    id: 1,
    year: "2025",
    university: "POLIMODA",
    location: "USA",
    logo: "/Images/Scholarship/Logos/polimoda.png",
    title: "Global Education Excellence Scholarship",
    description:
      "Full tuition coverage for outstanding students pursuing a Master's in Education. Includes mentorship and teaching assistant opportunities.",
    href: "/universities/polimoda",
  },
  {
    id: 2,
    year: "N/A",
    university: "Domus Academy",
    location: "Milan",
    logo: "/Images/Scholarship/Logos/domus.png",
    title: "Domus Academy Milano | Top Design and Fashion School in Italy",
    description:
      "Discover Domus Academy Milano, Italy’s first postgraduate design school. Study fashion, design, and luxury management with real-world projects and global industry connections in the heart of Milan.",
    href: "/universities/domus-academy",
  },
  {
    id: 3,
    year: "2024",
    university: "NABA - Nuova Accademia di Belle Arti",
    location: "UK",
    logo: "/Images/Scholarship/Logos/accademia-2.png",
    title: "Future Educators Fellowship",
    description:
      "Funding up to £15,000 for research and field projects in education leadership, open to both domestic and international students.",
    href: "/universities/naba",
  },
  {
    id: 4,
    year: "2025",
    university: "Istituto Marangoni",
    location: "Milan",
    logo: "/Images/Scholarship/Logos/marangoni.png",
    title: "International Student Scholarship",
    description:
      "Scholarship opportunities for international students pursuing creative programs in fashion, design and business.",
    href: "/universities/marangoni",
  },
  {
    id: 5,
    year: "2025",
    university: "Accademia Costume e Moda",
    location: "Rome",
    logo: "/Images/Scholarship/Logos/accademia.png",
    title: "International Education Access Scholarship",
    description:
      "Award of CAD $10,000 for postgraduate research projects exploring innovative classroom teaching techniques and digital learning tools.",
    href: "/universities/moda",
  },
];

export default function UniversityScholarships() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const nextPage = () => {
    if (currentIndex >= scholarships.length) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const previousPage = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(scholarships.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(scholarships.length - 1);
        });
      });

      return;
    }

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <section className="relative min-h-160 w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/Images/Academy.png"
        alt="img"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-160 max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="relative w-full">
          {/* Cards */}
          <div className="overflow-hidden">
            <div
              className={`flex ${
                isTransitioning
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
              onTransitionEnd={() => {
                if (currentIndex === scholarships.length) {
                  setIsTransitioning(false);
                  setCurrentIndex(0);
                }
              }}
            >
              {[...scholarships, ...scholarships.slice(0, itemsPerPage)].map(
                (scholarship, index) => (
                  <div
                    key={`${scholarship.id}-${index}`}
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
                        Report | {scholarship.year}
                      </p>

                      {/* University + Logo */}
                      <div className="mb-6 flex min-h-14 items-start justify-between gap-5">
                        <div>
                          <h3 className="text-xl font-bold leading-tight sm:text-2xl">
                            {scholarship.university}
                          </h3>

                          <p className="mt-1 text-sm text-white/65">
                            {scholarship.location}
                          </p>
                        </div>

                        <div className="relative mt-1 h-10 w-24 shrink-0">
                          <Image
                            src={scholarship.logo}
                            alt={`${scholarship.university} logo`}
                            fill
                            sizes="96px"
                            className="object-contain object-right"
                          />
                        </div>
                      </div>

                      {/* Scholarship title */}
                      <h4 className="mb-4 text-base font-semibold leading-6 sm:text-lg">
                        {scholarship.title}
                      </h4>

                      {/* Description */}
                      <p className="flex-1 text-sm leading-5 text-white/85 sm:leading-6">
                        {scholarship.description}
                      </p>

                      {/* CTA */}
                      <div className="mt-7">
                        <Link
                          href={scholarship.href}
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
                          Go to University Page
                        </Link>
                      </div>
                    </article>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Desktop / Tablet arrows */}
          {scholarships.length > itemsPerPage && (
            <>
              <button
                type="button"
                onClick={previousPage}
                aria-label="Previous scholarships"
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
                aria-label="Next scholarships"
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

          {/* Mobile / Tablet navigation */}
          {scholarships.length > itemsPerPage && (
            <div className="mt-7 flex items-center justify-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={previousPage}
                aria-label="Previous scholarships"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextPage}
                aria-label="Next scholarships"
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
