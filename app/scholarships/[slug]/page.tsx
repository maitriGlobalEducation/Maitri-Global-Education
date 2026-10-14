import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedScholarshipBySlug } from "@/services/scholarship.service";
import BlogContent from "@/components/Blogs Page Components/BlogContent";
import ScholarshipApplicationForm from "@/components/scholarships/ScholarshipApplicationForm";

interface ScholarshipPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ScholarshipPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = await getPublishedScholarshipBySlug(slug);

  if (!scholarship) {
    return { title: "Scholarship Not Found" };
  }

  return {
    title:
      scholarship.metaTitle || `${scholarship.title} | Maitri Global Education`,
    description:
      scholarship.metaDescription ||
      scholarship.description ||
      "Maitri Global Scholarship Description",
    keywords: scholarship.metaKeywords,
  };
}

export default async function ScholarshipDetailPage({
  params,
}: ScholarshipPageProps) {
  const { slug } = await params;
  const scholarship = await getPublishedScholarshipBySlug(slug);

  if (!scholarship) notFound();

  return (
    <main className="bg-zinc-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 md:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(400px,1fr)] xl:gap-10 2xl:gap-12">
          {/* Left: Scholarship information */}
          <article className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8 lg:p-10 xl:p-12">
            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl xl:text-5xl">
                {scholarship.title}
              </h1>

              {scholarship.description && (
                <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-600 md:text-lg">
                  {scholarship.description}
                </p>
              )}

              {scholarship.deadline && (
                <p className="mt-5 text-sm text-zinc-500">
                  Application deadline:{" "}
                  <span className="font-semibold text-zinc-800">
                    {new Date(scholarship.deadline).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "UTC",
                      },
                    )}
                  </span>
                </p>
              )}
            </header>

            {scholarship.cardImage?.url && (
              <div className="relative mb-8 w-full overflow-hidden rounded-xl bg-zinc-50">
                <Image
                  src={scholarship.cardImage.url}
                  alt={scholarship.title}
                  width={1200}
                  height={800}
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="block h-auto w-full object-contain"
                />
              </div>
            )}

            {scholarship.content && (
              <div className="min-w-0">
                <BlogContent content={scholarship.content} />
              </div>
            )}
          </article>

          {/* Right: Wider application form */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <ScholarshipApplicationForm
              fields={scholarship.applicationForm?.fields ?? []}
              scholarshipTitle={scholarship.title}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
