"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface EventItem {
  id: number;
  title: string;
  category: string;
  image: string;
  buttonText: string;
  description?: string;
  keywords?: string[];
}

const events: EventItem[] = [
  {
    id: 1,
    title: "Design",
    category: "Fashion Design",
    image: "/Images/Events/design.jpg",
    buttonText: "Save Your Seat",
  },
  {
    id: 2,
    title: "Ocean",
    category: "The Blue Abyss",
    image: "/Images/Events/ocean.jpg",
    buttonText: "Register Now",
    description:
      "Waves crashing onto the shore bring calmness and inspiration.",
    keywords: ["Sail Away", "Dive In", "Gallery", "Subscribe"],
  },
  {
    id: 3,
    title: "Mountains",
    category: "Where silence speaks",
    image: "/Images/Events/mountains.jpg",
    buttonText: "Explore Event",
    description:
      "Peaceful view of the mountains with serene skies and fresh air.",
    keywords: ["Trek Now", "Gallery", "Explore", "Share"],
  },
];

export default function EventsEngagement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const getIndex = (offset: number) => {
    return (activeIndex + offset + events.length) % events.length;
  };

  const previousIndex = getIndex(-1);
  const nextIndex = getIndex(1);

  const next = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const previous = () => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section className="overflow-hidden bg-[#2b2b2b] py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <h2
          style={{ fontFamily: "Epika" }}
          className="
            mb-10
            text-center
            text-4xl
            font-medium
            uppercase
            text-[#e8c166]
            sm:text-5xl
            lg:mb-6
            lg:text-6xl
          "
        >
          Events & Engagements
        </h2>

        {/* Carousel */}
        <div className="relative mx-auto h-125 sm:h-145 lg:h-155">
          {events.map((event, index) => {
            const isActive = index === activeIndex;
            const isPrevious = index === previousIndex;
            const isNext = index === nextIndex;

            if (!isActive && !isPrevious && !isNext) {
              return null;
            }

            return (
              <EventCard
                key={event.id}
                event={event}
                position={isActive ? "center" : isPrevious ? "left" : "right"}
                direction={direction}
              />
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-8 flex justify-center gap-3 sm:mt-0">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous event"
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
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next event"
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
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

interface EventCardProps {
  event: EventItem;
  position: "left" | "center" | "right";
  direction: "next" | "prev";
}

function EventCard({ event, position }: EventCardProps) {
  const isCenter = position === "center";

  const positionClasses = {
    left: `
      left-[3%]
      top-24
      z-10
      w-[28%]
      -translate-x-1/2
      scale-[0.72]
      opacity-40

      sm:left-[10%]
      sm:w-[26%]
      sm:scale-[0.78]

      lg:left-[15%]
      lg:top-32
      lg:w-[25%]
      lg:scale-[0.72]
    `,

    center: `
      left-1/2
      top-0
      z-30
      w-[76%]
      -translate-x-1/2
      scale-100
      opacity-100

      sm:w-[66%]

      lg:w-[58%]
    `,

    right: `
      left-[97%]
      top-24
      z-10
      w-[28%]
      -translate-x-1/2
      scale-[0.72]
      opacity-40

      sm:left-[90%]
      sm:w-[26%]
      sm:scale-[0.78]

      lg:left-[85%]
      lg:top-32
      lg:w-[25%]
      lg:scale-[0.72]
    `,
  };

  return (
    <article
      className={`
        absolute
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${positionClasses[position]}
      `}
    >
      {/* Image */}
      <div
        className={`
          relative
          overflow-hidden
          rounded-xl
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${isCenter ? "h-80 sm:h-105 lg:h-110" : "h-72 sm:h-85 lg:h-92"}
        `}
      >
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes={
            isCenter
              ? "(max-width: 640px) 76vw, (max-width: 1024px) 66vw, 58vw"
              : "(max-width: 1024px) 28vw, 25vw"
          }
          className="object-cover"
        />

        {/* Dim side cards */}
        {!isCenter && <div className="absolute inset-0 bg-black/45" />}

        {/* Center subtle gradient */}
        {isCenter && (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/40 to-transparent" />
        )}

        {/* CTA - only center */}
        <div
          className={`
            absolute
            inset-x-0
            bottom-5
            flex
            justify-center
            transition-all
            duration-500

            ${
              isCenter ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }
          `}
        >
          <button
            type="button"
            className="
              rounded-md
              border
              border-white
              bg-black/10
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              backdrop-blur-sm
              transition-all
              duration-300
              hover:bg-white
              hover:text-black
            "
          >
            {event.buttonText}
          </button>
        </div>
      </div>

      {/* Text */}
      {/* Content */}
      <div
        className={`
    px-3 pt-4
    transition-all
    duration-700
    ${isCenter ? "opacity-100" : "opacity-50"}
  `}
      >
        {/* Title */}
        <h3
          className={`
      font-semibold
      transition-all
      duration-700
      ${isCenter ? "text-xl sm:text-2xl" : "text-sm sm:text-base"}
    `}
        >
          {event.title}
        </h3>

        {/* Category / subtitle */}
        <p
          className={`
      mt-1
      transition-all
      duration-700
      ${
        isCenter
          ? "text-sm text-white/90 sm:text-base"
          : "text-xs text-white/60"
      }
    `}
        >
          {event.category}
        </p>

        {/* Extra description */}
        {event.description && (
          <p
            className={`
        mt-4
        leading-6
        transition-all
        duration-500
        ${
          isCenter
            ? "translate-y-0 text-sm text-white/80 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }
      `}
          >
            {event.description}
          </p>
        )}

        {/* Keywords */}
        {event.keywords && event.keywords.length > 0 && (
          <div
            className={`
        mt-6
        flex
        flex-wrap
        gap-x-8
        gap-y-3
        transition-all
        duration-500
        ${
          isCenter
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }
      `}
          >
            {event.keywords.map((keyword) => (
              <span
                key={keyword}
                className="
            cursor-pointer
            text-xs
            font-medium
            text-white/90
            transition-colors
            duration-200
            hover:text-[#e8c166]
            sm:text-sm
          "
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
