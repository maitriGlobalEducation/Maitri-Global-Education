"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

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

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? scholarships.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === scholarships.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full overflow-hidden bg-[#2c2c2c]">
      <div className="relative h-175 w-full max-lg:h-auto">
        {scholarships.map((scholarship, index) => {
          const isActive = index === current;
          const imageLeft = scholarship.imagePosition === "left";

          return (
            <div
              key={scholarship.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out max-lg:relative ${
                isActive
                  ? "pointer-events-auto translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-8 opacity-0 max-lg:absolute"
              }`}
            >
              <div
                className={`flex h-full w-full max-lg:flex-col ${
                  imageLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div
                  className={`relative h-full w-[68%] overflow-hidden max-lg:h-105 max-lg:w-full max-md:h-85 max-sm:h-70 ${
                    imageLeft
                      ? "[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]"
                      : "[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
                  } max-lg:[clip-path:none]`}
                >
                  <Image
                    src={scholarship.image}
                    alt={`${scholarship.title} ${scholarship.amount}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 68vw"
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
                    px-10
                    text-white
                    max-lg:w-full
                    max-lg:px-6
                    max-lg:py-12
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
                    <div className="relative mb-10 h-18 w-45 sm:h-20 sm:w-50">
                      <Image
                        src={scholarship.logo}
                        alt="University logo"
                        fill
                        sizes="200px"
                        className="object-contain w-96"
                      />
                    </div>

                    {/* Scholarship */}
                    <h2
                      style={{ fontFamily: "epika" }}
                      className="
                        bg-[linear-gradient(90deg,#e8c166_0%,#fff0b3_50%,#e8c166_100%)]
                        bg-clip-text
                        text-3xl
                        font-medium
                        leading-none
                        text-transparent
                        uppercase
                        sm:text-4xl
                        lg:text-5xl
                      "
                    >
                      {scholarship.title}
                    </h2>

                    <p className="mt-4 font-serif text-4xl text-[#edd08b] sm:text-5xl">
                      {scholarship.amount}
                    </p>

                    <p className="mt-6 max-w-sm text-sm leading-6 text-white/90 sm:text-base">
                      {scholarship.description}
                    </p>

                    {/* Apply */}
                    <Link
                      href={scholarship.href}
                      className="mt-6 border-2 border-white px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-white hover:text-black"
                    >
                      Apply Now
                    </Link>

                    {/* Navigation */}
                    <div className="mt-8 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={previousSlide}
                        aria-label="Previous scholarship"
                        className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#dce1e8] text-black transition-all duration-300 hover:scale-105 hover:bg-white"
                      >
                        <ArrowLeft size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next scholarship"
                        className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#dce1e8] text-black transition-all duration-300 hover:scale-105 hover:bg-white"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
