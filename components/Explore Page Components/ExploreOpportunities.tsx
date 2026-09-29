"use client";

import Image from "next/image";
import { useState } from "react";

type OpportunityType = "scholarships" | "universities" | "courses";

interface Opportunity {
  id: number;
  title: string;
  image: string;
  amount?: string;
  description?: string;
}

const scholarships: Opportunity[] = [
  {
    id: 1,
    title: "20% - 30% Scholarship",
    image: "/Images/Scholarship/domus.png",
    amount: "€7000",
    description:
      "Ready to start your journey in Milan? Fill out the Form and we will contact you with details.",
  },
  {
    id: 2,
    title: "SCHOLARSHIP",
    image: "/Images/Scholarship/marangoni.jpg",
    amount: "€15,000",
    description: "ALL POSTGRADUATE PROGRAMS",
  },
  {
    id: 3,
    title: "SCHOLARSHIP",
    image: "/Images/Scholarship/naba.jpg",
    amount: "€12,000",
    description: "ALL POSTGRADUATE PROGRAMS",
  },
  {
    id: 4,
    title: "SCHOLARSHIP",
    image: "/Images/Scholarship/polimoda.jpg",
    amount: "€10,000",
    description: "ALL POSTGRADUATE PROGRAMS",
  },
  {
    id: 5,
    title: "xyz",
    image: "/Images/Scholarship/accademia.jpg",
    amount: "€10000",
    description:
      '"Invest in Tomorrow\'s Leaders," "Fueling Futures Through Education," or "Unlock Your Potential, Fund Your Future"',
  },
];

const universities: Opportunity[] = [
  {
    id: 1,
    title: "University of Milan",
    image: "/Images/opportunities/university-1.jpg",
    description: "Explore undergraduate and postgraduate programs.",
  },
  {
    id: 2,
    title: "University of Florence",
    image: "/Images/opportunities/university-2.jpg",
    description: "Discover programs and study opportunities in Italy.",
  },
  {
    id: 3,
    title: "University of Rome",
    image: "/Images/opportunities/university-3.jpg",
    description: "Explore courses, admissions and international programs.",
  },
];

const courses: Opportunity[] = [
  {
    id: 1,
    title: "Fashion Design",
    image: "/Images/opportunities/course-1.jpg",
    description: "Explore fashion, creativity and contemporary design.",
  },
  {
    id: 2,
    title: "Interior Design",
    image: "/Images/opportunities/course-2.jpg",
    description: "Learn spatial design, materials and visual storytelling.",
  },
  {
    id: 3,
    title: "Visual Communication",
    image: "/Images/opportunities/course-3.jpg",
    description: "Develop communication, branding and visual design skills.",
  },
];

const tabs: {
  id: OpportunityType;
  label: string;
}[] = [
  {
    id: "scholarships",
    label: "Scholarships",
  },
  {
    id: "universities",
    label: "Universities",
  },
  {
    id: "courses",
    label: "Courses",
  },
];

export default function ExploreOpportunities() {
  const [activeTab, setActiveTab] = useState<OpportunityType>("scholarships");

  const opportunities: Record<OpportunityType, Opportunity[]> = {
    scholarships,
    universities,
    courses,
  };

  const currentItems = opportunities[activeTab];

  return (
    <section className="bg-[#fafafa] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div>
          <h2 className="text-2xl font-bold text-[#171717] sm:text-3xl lg:text-[32px]">
            Explore Opportunities
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4b5563] sm:text-base">
            Discover scholarships, top universities, and courses to help you
            excel in your academic journey.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-[#e2e2e2] sm:mt-10">
          <div className="flex gap-1 overflow-x-auto sm:gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative
                    shrink-0
                    cursor-pointer
                    px-5
                    pb-4
                    text-sm
                    font-medium
                    transition-colors
                    duration-300
                    sm:px-6

                    ${
                      isActive
                        ? "text-[#0057ff]"
                        : "text-[#4b5563] hover:text-black"
                    }
                  `}
                >
                  {tab.label}

                  {/* Active underline */}
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-0.5
                      w-full
                      bg-[#0057ff]
                      transition-transform
                      duration-300

                      ${isActive ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div
          key={activeTab}
          className="
            mt-8
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {currentItems.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface OpportunityCardProps {
  item: Opportunity;
}

function OpportunityCard({ item }: OpportunityCardProps) {
  return (
    <article
      className="
        overflow-hidden
        rounded-md
        border
        border-[#dedede]
        bg-white
        p-4
        shadow-[0_2px_5px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]
        sm:p-5
      "
    >
      {/* Image */}
      <div className="relative h-45 w-full overflow-hidden rounded-md sm:h-48 lg:h-50">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
          className="
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="pt-4">
        <h3 className="text-lg font-bold leading-6 text-[#111]">
          {item.title}
        </h3>

        {item.amount && (
          <p className="mt-1 text-sm text-[#536074]">Amount: {item.amount}</p>
        )}

        {item.description && (
          <p className="mt-3 text-sm leading-5 text-[#293548]">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
