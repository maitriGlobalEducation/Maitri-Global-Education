import "server-only";

import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Homepage from "@/models/Homepage";
import { PublicHomepage } from "@/types/homepage";

const getCachedHomepage = unstable_cache(
  async () => {
    await connectDB();

    const homepage = await Homepage.findOne().lean();

    if (!homepage) {
      return null;
    }

    // Convert the MongoDB document into a plain serializable object.
    return JSON.parse(JSON.stringify(homepage));
  },
  ["public-homepage"],
  {
    revalidate: 60,
    tags: ["public-homepage"],
  },
);

export async function getPublicHomepage(): Promise<PublicHomepage | null> {
  return getCachedHomepage() as Promise<PublicHomepage | null>;
}
