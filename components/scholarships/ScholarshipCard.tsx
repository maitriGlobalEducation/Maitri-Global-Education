import Image from "next/image";
import Link from "next/link";
import type { Scholarship } from "@/types/scholarship";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
      <Link href={`/scholarships/${scholarship.slug}`} className="block">
        {/* Full-width image */}
        <div className="relative w-full overflow-hidden bg-zinc-50">
          {scholarship.cardImage?.url ? (
            <Image
              src={scholarship.cardImage.url}
              alt={scholarship.title}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="block h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex aspect-16/10 w-full items-center justify-center text-sm text-zinc-400">
              Scholarship
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="flex flex-col items-start gap-4 p-5 sm:p-6">
          <h2 className="min-w-0 text-lg font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-amber-600">
            {scholarship.title}
          </h2>

          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-700 transition-colors group-hover:text-amber-600">
            Learn More
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
