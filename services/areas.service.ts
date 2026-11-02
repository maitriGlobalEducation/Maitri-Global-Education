import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import ExploreArea from "@/models/ExploreArea";

export type ExploreAreaItem = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export const getExploreAreas = unstable_cache(
  async (): Promise<ExploreAreaItem[]> => {
    await connectDB();

    const areas = await ExploreArea.find()
      .select("name slug image.url")
      .sort({ name: 1 })
      .lean();

    return areas.map((area) => ({
      _id: String(area._id),
      name: area.name,
      slug: area.slug,
      image: area.image?.url ?? "",
    }));
  },
  ["explore-areas"],
  {
    revalidate: 300,
    tags: ["explore-areas"],
  },
);
