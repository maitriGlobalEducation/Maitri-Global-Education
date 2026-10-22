import type { Metadata } from "next";

import ScholarshipCard from "@/components/scholarships/ScholarshipCard";

import { getPublishedScholarships } from "@/services/scholarship.service";
import FeaturedScholarshipSection from "@/components/Scholarship Page Components/FeaturedScholarshipSection";
import ScholarshipSupportSection from "@/components/Scholarship Page Components/ScholarshipSupportSection";

export const metadata: Metadata = {
  title: "Scholarships | Maitri Global Education",
  description:
    "Explore scholarships and funding opportunities for your study abroad journey.",
};

export default async function ScholarshipsPage() {
  const scholarships = await getPublishedScholarships();

  const featuredScholarship =
    scholarships.find((scholarship) => scholarship.featured) ?? null;

  const remainingScholarships = scholarships.filter(
    (scholarship) => scholarship._id !== featuredScholarship?._id,
  );

  return (
    <main data-navbar-theme="dark">
      {featuredScholarship ? (
        <FeaturedScholarshipSection scholarship={featuredScholarship} />
      ) : (
        <section className="bg-[#344563] px-6 py-20 text-white sm:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c6f5df]">
              Scholarships
            </p>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Find scholarships for your future
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
              Explore funding opportunities and discover ways to support your
              education abroad.
            </p>
          </div>
        </section>
      )}

      <ScholarshipSupportSection />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-600">
            More opportunities
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            Explore more scholarships
          </h2>

          <p className="mt-4 text-base leading-7 text-zinc-600">
            Discover additional scholarships to help you plan your educational
            journey.
          </p>
        </div>

        {remainingScholarships.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remainingScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-zinc-900">
              More opportunities coming soon
            </h3>

            <p className="mt-2 text-sm text-zinc-600">
              Check back soon to explore more scholarships.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
