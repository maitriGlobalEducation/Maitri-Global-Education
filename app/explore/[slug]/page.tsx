import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import ExploreArea from "@/models/ExploreArea";
import ExploreInstitute from "@/models/ExploreInstitute";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ExploreAreaPage({ params }: Props) {
  const { slug } = await params;

  await connectDB();

  // Find the area using its dynamic slug
  const area = await ExploreArea.findOne({ slug })
    .select("name slug image")
    .lean();

  if (!area) {
    notFound();
  }

  const institutes = await ExploreInstitute.find({
    "areas.areaId": area._id,
    status: "published",
  })
    .select("name slug logo.url")
    .sort({ sortOrder: 1, name: 1 })
    .lean();

  return (
    <main className="min-h-screen bg-white">
      {/* Page heading */}
      <section className="bg-zinc-950 px-5 py-30 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
            Explore Colleges
          </p>

          <h1 className="text-3xl font-semibold sm:text-5xl">{area.name}</h1>

          <p className="mt-4 max-w-2xl text-white/70">
            Explore institutes offering programs in {area.name}.
          </p>
        </div>
      </section>

      {/* Institutes */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-zinc-900">Institutes</h2>

          <p className="mt-2 text-sm text-zinc-500">
            {institutes.length} institutes found
          </p>
        </div>

        {institutes.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 p-10 text-center">
            <p className="text-zinc-500">
              No institutes found in this area yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {institutes.map((institute) => (
              <article
                key={String(institute._id)}
                className="overflow-hidden rounded-xl border border-zinc-200 transition hover:border-[#D4AF37] hover:shadow-md"
              >
                <div className="relative flex h-48 items-center justify-center bg-zinc-50 p-6">
                  {institute.logo?.url ? (
                    <Image
                      src={institute.logo.url}
                      alt={institute.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="text-sm text-zinc-400">
                      No institute image available
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {institute.name}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">{area.name}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
