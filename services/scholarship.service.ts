import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import ScholarshipModel from "@/models/Scholarship";
import type { Scholarship } from "@/types/scholarship";

export const getPublishedScholarships = unstable_cache(
  async (): Promise<Scholarship[]> => {
    await connectDB();

    const scholarships = await ScholarshipModel.find({
      status: "published",
    })
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(scholarships)) as Scholarship[];
  },
  ["public-scholarships"],
  {
    revalidate: 3600,
    tags: ["public-scholarships"],
  },
);

async function getPublishedScholarshipBySlugUncached(
  slug: string,
): Promise<Scholarship | null> {
  await connectDB();

  const scholarship = await ScholarshipModel.findOne({
    slug: slug.toLowerCase(),
    status: "published",
  }).lean();

  if (!scholarship) return null;

  return JSON.parse(JSON.stringify(scholarship)) as Scholarship;
}

export const getPublishedScholarshipBySlug = cache((slug: string) => {
  const normalizedSlug = slug.toLowerCase();

  return unstable_cache(
    () => getPublishedScholarshipBySlugUncached(normalizedSlug),
    ["public-scholarship-by-slug", normalizedSlug],
    {
      revalidate: 3600,
      tags: ["public-scholarships", `public-scholarship-${normalizedSlug}`],
    },
  )();
});
