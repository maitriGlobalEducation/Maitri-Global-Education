import "server-only";

import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Scholarship from "@/models/Scholarship";

export interface PublicScholarship {
  id: string;
  title: string;
  description: string;
  amount: string | null;
  slug: string;
  logo: {
    url: string;
  } | null;
  wallpaper: {
    url: string;
  } | null;
}

export const getPublishedScholarships = unstable_cache(
  async (): Promise<PublicScholarship[]> => {
    await connectDB();

    const scholarships = await Scholarship.find({ status: "published" })
      .select("title description amount slug logo wallpaper createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return scholarships.map((scholarship) => ({
      id: scholarship._id.toString(),
      title: scholarship.title,
      description: scholarship.description ?? "",
      amount: scholarship.amount ?? null,
      slug: scholarship.slug,
      logo: scholarship.logo?.url ? { url: scholarship.logo.url } : null,
      wallpaper: scholarship.wallpaper?.url
        ? { url: scholarship.wallpaper.url }
        : null,
    }));
  },
  ["public-scholarships"],
  {
    revalidate: 3600,
    tags: ["public-scholarships"],
  },
);
