import Link from "next/link";
import { ChevronRight } from "lucide-react";

const badgeLinks = [
  {
    title: "ONLINE ADMISSION",
    href: "/online-admission",
  },
  {
    title: "ENTRY REQUIREMENTS",
    href: "/entry-requirements",
  },
  {
    title: "SCHOLARSHIPS",
    href: "/scholarships",
  },
];

export default function Badge() {
  return (
    <section className="w-full bg-black px-5 py-16 text-white sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-20">
        {/* Heading */}
        <div>
          <h2
            style={{ fontFamily: "epika" }}
            className="text-3xl leading-[0.95] font-bold uppercase sm:text-4xl lg:text-5xl"
          >
            Admissions &
            <br />
            Scholarship
          </h2>
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-4">
          {badgeLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                group
                flex
                min-h-17
                w-full
                items-center
                justify-between
                border
                border-[#e8c166]
                px-5
                py-4
                transition-all
                duration-300
                hover:bg-[#e8c166]
                hover:text-black
                sm:min-h-18
                sm:px-6
              "
            >
              <span className="text-sm font-bold sm:text-base">
                {item.title}
              </span>

              <ChevronRight
                size={19}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
