"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CareerChoice {
  id: number;
  title: string;
  company: string;
  image: string;
  tags: string[];
}

const careerChoices: CareerChoice[] = [
  {
    id: 1,
    title: "Accessory Designing and Building",
    company: "Truck with Benefits",
    image: "/Images/Careers/accessory.png",
    tags: ["Design", "Build"],
  },
  {
    id: 2,
    title: "Fashion Design: A new way to design, build and automate",
    company: "Venture.io",
    image: "/Images/Careers/fashion-design.jpg",
    tags: ["Design", "Build", "Automate"],
  },
  {
    id: 3,
    title: "Fashion Photography and Videography",
    company: "GOMA",
    image: "/Images/Careers/photography.png",
    tags: ["Design", "Build"],
  },
  {
    id: 4,
    title: "Fashion Business: A new approach to design, build and automate",
    company: "Skybox X Samsung",
    image: "/Images/Careers/fashion-business.png",
    tags: ["Design", "Build", "Automate"],
  },
  {
    id: 5,
    title: "Interior Design and Architecture Services",
    company: "GOMA",
    image: "/Images/Careers/interior-design.png",
    tags: ["Design", "Creative"],
  },
];

export default function EliteCareerChoices() {
  const [visibleCards, setVisibleCards] = useState(4);

  // We start after the cloned cards.
  const [currentIndex, setCurrentIndex] = useState(4);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const isAnimating = useRef(false);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  const carouselItems = [
    ...careerChoices.slice(-4),
    ...careerChoices,
    ...careerChoices.slice(0, 4),
  ];

  const next = () => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const previous = () => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    isAnimating.current = false;

    // Reached cloned cards on the right
    if (currentIndex >= careerChoices.length + 4) {
      setTransitionEnabled(false);
      setCurrentIndex(4);
    }

    // Reached cloned cards on the left
    if (currentIndex < 4) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + careerChoices.length);
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
          Elite Career Choices
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
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {carouselItems.map((career, index) => (
              <div
                key={`${career.id}-${index}`}
                className="shrink-0 px-2.5"
                style={{
                  width: `${100 / visibleCards}%`,
                }}
              >
                <article className="group h-full overflow-hidden rounded-xl bg-[#181818]">
                  {/* Image */}
                  <div className="relative h-95 overflow-hidden sm:h-105 lg:h-110">
                    <Image
                      src={career.image}
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

                    {/* Tags */}
                    <div className="absolute top-0 right-0 rounded-bl-2xl p-2 bg-black flex max-w-[90%] flex-wrap justify-end gap-2">
                      {career.tags.map((tag) => (
                        <span
                          key={tag}
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
                  </div>

                  {/* Content */}
                  <div className="flex min-h-28 flex-col p-5">
                    <h3 className="text-lg leading-6 font-semibold text-white">
                      {career.title}
                    </h3>

                    <p className="mt-auto pt-3 text-sm text-gray-400">
                      {career.company}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
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
      </div>
    </section>
  );
}
