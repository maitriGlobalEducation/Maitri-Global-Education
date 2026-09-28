"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  review: string;
  source: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    review:
      "The team at Maitri is truly dedicated and knowledgeable. They not only helped me find the perfect course but also prepared me for interviews and ensured my application stood out. I couldn’t have asked for a better experience.",
    source: "Facebook",
  },
  {
    id: 2,
    review:
      "Maitri Global Education made my dream of studying abroad a reality! The guidance and support I received throughout the application process were outstanding. From selecting the right university to visa assistance, they were with me every step of the way.",
    source: "Website",
  },
  {
    id: 3,
    review:
      "Thanks to Maitri Global Education, I am now pursuing my postgraduate studies in Europe. Their personalized counseling and deep understanding of international education made the entire journey smooth and stress-free.",
    source: "Tiktok",
  },
  {
    id: 4,
    review:
      "The entire process was handled professionally and clearly. I always knew what the next step was, and the team was available whenever I needed guidance.",
    source: "Instagram",
  },
  {
    id: 5,
    review:
      "From university selection to completing my application, Maitri provided excellent support. Their experience made a complicated process feel much easier.",
    source: "Website",
  },
  {
    id: 6,
    review:
      "I received excellent guidance throughout my study abroad journey. The team helped me understand my options and supported me through every important decision.",
    source: "Facebook",
  },
];

const studentImages = [
  "/Images/Testimonials/student-1.jpg",
  "/Images/Testimonials/student-2.jpg",
  "/Images/Testimonials/student-3.jpg",
];

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

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

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Prevent invalid page after resizing
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(totalPages - 1, 0));
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const previousPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const startIndex = currentPage * itemsPerPage;

  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <section className="overflow-hidden bg-[#f8f8f7] px-5 py-16 sm:px-8 lg:py-24">
      {/* Top */}
      <div className="mx-auto mb-14 max-w-7xl text-center lg:mb-16">
        {/* Student Images */}
        <div className="mb-8 flex items-end justify-center gap-3 sm:gap-8 lg:gap-16">
          {studentImages.map((image, index) => (
            <div
              key={index}
              className={`
                relative
                overflow-hidden
                rounded-sm
                size-24 sm:size-32 lg:size-60"
              `}
            >
              <Image
                src={image}
                alt="Maitri student"
                fill
                sizes="(max-width: 640px) 96px, 160px"
                className="object-cover grayscale w-100"
              />
            </div>
          ))}
        </div>

        {/* Heading */}
        <p
          style={{ fontFamily: "Epika" }}
          className="mb-1 text-xs tracking-[0.2em] font-semibold text-[#777] uppercase sm:text-sm"
        >
          Join Over
        </p>

        <h2
          style={{ fontFamily: "Epika" }}
          className="text-5xl leading-[0.9] font-bold text-black sm:text-6xl lg:text-7xl"
        >
          10000<span className="text-4xl sm:text-5xl">+</span>
          <br />
          Students
        </h2>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-7xl">
        <div
          key={`${currentPage}-${itemsPerPage}`}
          className={`grid gap-5 ${
            itemsPerPage === 1
              ? "grid-cols-1"
              : itemsPerPage === 2
                ? "grid-cols-2"
                : "grid-cols-3"
          } animate-[testimonialFade_0.4s_ease-out]`}
        >
          {visibleTestimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="
                flex
                min-h-65
                flex-col
                rounded-xl
                border
                border-black/8
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                sm:p-7
                lg:min-h-70
              "
            >
              {/* Stars */}
              <div
                className="mb-5 flex gap-0.5 text-lg text-black"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>

              {/* Review */}
              <blockquote className="flex-1 text-sm leading-6 text-[#242424] sm:text-base sm:leading-7">
                “ {testimonial.review} ”
              </blockquote>

              {/* Source */}
              <div className="mt-8 flex items-center gap-2 text-xs font-medium text-[#333] sm:text-sm">
                {/* <Instagram size={16} strokeWidth={1.8} /> */}

                {testimonial.source}
              </div>
            </article>
          ))}
        </div>

        {/* Navigation */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={previousPage}
              aria-label="Previous testimonials"
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
                hover:bg-black
                hover:text-white
              "
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextPage}
              aria-label="Next testimonials"
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
                hover:bg-black
                hover:text-white
              "
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
