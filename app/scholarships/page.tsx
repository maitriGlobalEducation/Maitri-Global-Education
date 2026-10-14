import type { Metadata } from "next";
import ScholarshipCard from "@/components/scholarships/ScholarshipCard";
import { getPublishedScholarships } from "@/services/scholarship.service";

export const metadata: Metadata = {
  title: "Scholarships | Maitri Global Education",
  description:
    "Explore scholarships and funding opportunities for your study abroad journey.",
};

export default async function ScholarshipsPage() {
  const scholarships = await getPublishedScholarships();

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-600">
            Scholarships
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl">
            Find scholarships for your future
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-600">
            Explore available scholarships and discover opportunities to support
            your education abroad.
          </p>
        </div>

        {scholarships.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-zinc-900">
              No scholarships available right now
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Please check back soon for new opportunities.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
