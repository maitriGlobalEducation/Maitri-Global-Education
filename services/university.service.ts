import "server-only";

import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import type { University as UniversityType } from "@/types/university";
import University from "@/models/University";

const getCachedUniversities = unstable_cache(
  async (): Promise<UniversityType[]> => {
    await connectDB();

    const universities = await University.find({
      status: "published",
    })
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(universities));
  },
  ["public-homepage-universities"],
  {
    revalidate: 60,
    tags: ["public-homepage-universities"],
  },
);

export async function getUniversities(): Promise<UniversityType[]> {
  return getCachedUniversities();
}
