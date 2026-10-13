"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { HomepageCareerChoicesContent } from "@/types/homepage";

interface EliteCareerChoicesProps {
  content?: HomepageCareerChoicesContent;
  isVisible?: boolean;
}

export default function EliteCareerChoices({
  content,
  isVisible = true,
}: EliteCareerChoicesProps) {
  const cards = content?.cards ?? [];
  const heading = content?.heading || "Elite Career Choices";

  const [visibleCards, setVisibleCards] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.min(4, cards.length),
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const isAnimating = useRef(false);

  const cloneCount = Math.min(visibleCards, cards.length);
  const cardsPerView = Math.min(visibleCards, cards.length);

  useEffect(() => {
    const updateVisibleCards = () => {
      let nextVisibleCards = 4;

      if (window.innerWidth < 640) {
        nextVisibleCards = 1;
      } else if (window.innerWidth < 1024) {
        nextVisibleCards = 2;
      }

      setVisibleCards(nextVisibleCards);
      setCurrentIndex(Math.min(nextVisibleCards, cards.length));
      setTransitionEnabled(false);
      isAnimating.current = false;
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, [cards.length]);

  if (!isVisible || cards.length === 0) {
    return null;
  }

  const canNavigate = cards.length > visibleCards;

  const carouselItems = [
    ...cards.slice(-cloneCount),
    ...cards,
    ...cards.slice(0, cloneCount),
  ];

  const next = () => {
    if (!canNavigate || isAnimating.current) return;

    isAnimating.current = true;
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const previous = () => {
    if (!canNavigate || isAnimating.current) return;

    isAnimating.current = true;
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    isAnimating.current = false;

    if (currentIndex >= cards.length + cloneCount) {
      setTransitionEnabled(false);
      setCurrentIndex(cloneCount);
    } else if (currentIndex < cloneCount) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + cards.length);
    }
  };

  return (
    <section className="overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <h2
          style={{ fontFamily: "Epika" }}
          className="
            mb-10
            leading-none
            font-semibold
            bg-linear-to-r
            from-[#e8c166]
            via-[#fff0b3]
            to-[#e8c166]
            bg-clip-text
            text-4xl
            text-transparent
            sm:mb-12
            sm:text-5xl
            lg:mb-14
            lg:text-7xl
          "
        >
          {heading}
        </h2>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className={`flex ${
              transitionEnabled
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {carouselItems.map((career, index) => (
              <div
                key={`${career.id}-${index}`}
                className="shrink-0 px-2.5"
                style={{
                  width: `${100 / cardsPerView}%`,
                }}
              >
                <article className="group h-full overflow-hidden rounded-xl bg-[#181818]">
                  {/* Image */}
                  <div className="relative h-95 overflow-hidden bg-[#222] sm:h-105 lg:h-110">
                    {career.image?.url && (
                      <Image
                        src={career.image.url}
                        alt={career.title}
                        fill
                        sizes="
                          (max-width: 640px) 100vw,
                          (max-width: 1024px) 50vw,
                          25vw
                        "
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-105
                        "
                      />
                    )}

                    {/* Tags */}
                    {career.tags.length > 0 && (
                      <div className="absolute top-0 right-0 flex max-w-[90%] flex-wrap justify-end gap-2 rounded-bl-2xl bg-black p-2">
                        {career.tags.map((tag, tagIndex) => (
                          <span
                            key={`${tag}-${tagIndex}`}
                            className="
                              rounded-full
                              border
                              border-white/15
                              bg-black/80
                              px-3
                              py-1.5
                              text-[10px]
                              font-semibold
                              text-white
                              backdrop-blur-sm
                              sm:text-xs
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex min-h-28 flex-col p-5">
                    <h3 className="text-lg leading-6 font-semibold text-white">
                      {career.title}
                    </h3>

                    <p className="mt-auto pt-3 text-sm text-gray-400">
                      {career.source}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {canNavigate && (
          <div className="mt-7 flex justify-center gap-3">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous career"
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
                hover:bg-white
              "
            >
              <ChevronLeft size={21} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next career"
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
                hover:bg-white
              "
            >
              <ChevronRight size={21} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
