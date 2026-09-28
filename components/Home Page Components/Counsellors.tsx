"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const counsellors = [
  {
    id: 1,
    name: "Pooja Krishnan",
    image:
      "https://maitriglobaleducation.com/crm/public/uploads/team/64e4b061a8296.jpg",
  },
  {
    id: 2,
    name: "Priyanka Yadav",
    image:
      "https://maitriglobaleducation.com/crm/public/uploads/team/644fb7af1be70.jpg",
  },
];

export default function Counsellors() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const slider = sliderRef.current;

      if (!slider || window.innerWidth >= 1024) return;

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

      const isAtEnd = slider.scrollLeft >= maxScrollLeft - 5;

      if (isAtEnd) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: slider.clientWidth,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-360 px-5">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold uppercase text-[#071735] lg:text-3xl">
            Our Counsellors
          </h2>

          <div className="mx-auto mt-3 h-0.5 w-9 bg-[#f4512c]" />
        </div>

        {/* Counsellors */}
        <div
          ref={sliderRef}
          className="
            mx-auto mt-10 flex max-w-300
            snap-x snap-mandatory
            overflow-x-auto scroll-smooth
            scrollbar-none
            [&::-webkit-scrollbar]:hidden

            lg:mt-12 lg:grid
            lg:grid-cols-4
            lg:gap-4
            lg:overflow-visible
          "
        >
          {counsellors.map((counsellor) => (
            <article
              key={counsellor.id}
              className="
                min-w-full snap-start
                px-3
                lg:min-w-0 lg:px-0
              "
            >
              <div
                className="
                  group mx-auto max-w-80
                  overflow-hidden bg-white
                  shadow-lg
                  lg:max-w-none
                "
              >
                {/* Image */}
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image
                    src={counsellor.image}
                    alt={counsellor.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="
  object-cover grayscale
  transition-all duration-500
  group-hover:scale-105
  group-hover:grayscale-0
"
                  />
                </div>

                {/* Name */}
                <div className="bg-[#fff9f2] px-4 py-5 text-center">
                  <h3 className="text-base font-semibold text-[#ff5722]">
                    {counsellor.name}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
