import "server-only";

import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import EventModel from "@/models/Event";
import type { Event as EventType } from "@/types/event";
import { cache } from "react";

export const getPublishedEvents = unstable_cache(
  async (): Promise<EventType[]> => {
    await connectDB();

    const events = await EventModel.find({
      status: "published",
    })
      .sort({ eventStartsAt: 1, createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(events)) as EventType[];
  },
  ["public-homepage-events"],
  {
    revalidate: 3600,
    tags: ["public-homepage-events"],
  },
);

export const getPublishedEventBySlug = cache(
  async (slug: string): Promise<EventType | null> => {
    return unstable_cache(
      async (): Promise<EventType | null> => {
        await connectDB();

        const event = await EventModel.findOne({
          slug: slug.toLowerCase(),
          status: "published",
        }).lean();

        if (!event) return null;

        return JSON.parse(JSON.stringify(event)) as EventType;
      },
      ["public-event-by-slug", slug.toLowerCase()],
      {
        revalidate: 3600,
        tags: ["public-homepage-events", `public-event-${slug.toLowerCase()}`],
      },
    )();
  },
);
