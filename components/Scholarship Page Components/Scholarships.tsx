"use client";
import Image from "next/image";
import Link from "next/link";

interface Scholarship {
  id: number;
  title: string;
  amount: string;
  deadline: string;
  image: string;
  href: string;
}

const scholarships: Scholarship[] = [
  {
    id: 1,
    title: "SCHOLARSHIP",
    amount: "€7000",
    deadline: "2025-09-27",
    image: "/Images/scholarship/domus.png",
    href: "/apply",
  },
  {
    id: 2,
    title: "SCHOLARSHIP",
    amount: "€15,000",
    deadline: "2025-08-30",
    image: "/Images/scholarship/marangoni.jpg",
    href: "/apply",
  },
  {
    id: 3,
    title: "SCHOLARSHIP",
    amount: "€12,000",
    deadline: "2025-09-04",
    image: "/Images/scholarship/naba.jpg",
    href: "/apply",
  },
  {
    id: 4,
    title: "SCHOLARSHIP",
    amount: "€10,000",
    deadline: "2025-08-23",
    image: "/Images/scholarship/polimoda.jpg",
    href: "/apply",
  },
  {
    id: 5,
    title: "SCHOLARSHIP",
    amount: "€10000",
    deadline: "2025-08-18",
    image: "/Images/scholarship/accademia.jpg",
    href: "/apply",
  },
];

export default function Scholarships() {
  return (
    <section className="overflow-hidden bg-[#fafafa] py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <h2
          style={{ fontFamily: "Epika" }}
          className="
            mb-12
            text-center
            text-4xl
            font-semibold
            uppercase
            text-[#d8aa22]
            sm:mb-14
            sm:text-5xl
            lg:mb-16
            lg:text-6xl
          "
        >
          Scholarships
        </h2>

        {/* Scholarship Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-x-8
            gap-y-12
            sm:grid-cols-2
            sm:gap-y-14
            lg:grid-cols-3
            lg:gap-x-12
            lg:gap-y-16
          "
        >
          {scholarships.map((scholarship, index) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ScholarshipCardProps {
  scholarship: Scholarship;
  index: number;
}

function ScholarshipCard({ scholarship, index }: ScholarshipCardProps) {
  /*
   * Alternate the image tilt:
   *
   * 1 → clockwise
   * 2 → counter-clockwise
   * 3 → clockwise
   * etc.
   */
  //   const rotation = index % 2 === 0 ? "rotate-[1deg]" : "-rotate-[1deg]";

  return (
    <article className="group min-w-0">
      {/* Image */}
      <div
        className="
          relative
          h-55
          w-full
          sm:h-58
          lg:h-62
        "
      >
        <div
          className="
    relative
    h-full
    w-full
    overflow-hidden
    rounded-lg
    shadow-md
    grayscale
    transition-[transform,filter]
    duration-500
    ease-in-out
    group-hover:grayscale-0
  "
          style={{
            transform: "perspective(1000px) rotateX(6deg) rotateY(8deg)",
            transformOrigin: "top left",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "perspective(1000px) rotateX(0deg) rotateY(0deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "perspective(1000px) rotateX(6deg) rotateY(8deg)";
          }}
        >
          <Image
            src={scholarship.image}
            alt={`${scholarship.title} ${scholarship.amount}`}
            fill
            sizes="
      (max-width: 640px) 100vw,
      (max-width: 1024px) 50vw,
      33vw
    "
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3
          style={{ fontFamily: "Epika" }}
          className="
            text-xl
            font-semibold
            leading-tight
            text-[#111]
            sm:text-[21px]
          "
        >
          {scholarship.title} {scholarship.amount}
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#111] sm:text-base">
          Deadline: {scholarship.deadline}
        </p>

        <Link
          href={scholarship.href}
          className="
            mt-3
            inline-flex
            min-w-30
            items-center
            justify-center
            rounded-md
            border-2
            border-black
            px-5
            py-2.5
            text-sm
            font-semibold
            text-black

            transition-all
            duration-300

            hover:bg-black
            hover:text-white
          "
        >
          Apply Now
        </Link>
      </div>
    </article>
  );
}
