import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import type { Event as EventType } from "@/types/event";

interface EventImage {
  url: string;
  publicId?: string;
}

type ExploreEvent = Omit<EventType, "cardImage" | "contentImage"> & {
  _id: string;
  cardImage?: EventImage | null;
  contentImage?: EventImage | null;
  metaDescription?: string;
};

interface ExploreEventsProps {
  events: ExploreEvent[];
}

function extractText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(extractText).filter(Boolean).join(" ");
  }

  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;

    if (typeof object.text === "string") {
      return object.text;
    }

    return Object.values(object).map(extractText).filter(Boolean).join(" ");
  }

  return "";
}

function getEventDescription(event: ExploreEvent): string {
  const description = event.metaDescription?.trim();

  if (description) return description;

  const contentText = extractText(event.content)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return contentText || "Discover more about this event and what to expect.";
}

function formatEventDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);

  if (match) {
    const [, year, month, day] = match;

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${year}-${month}-${day}T00:00:00.000Z`));
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export default function ExploreEvents({ events }: ExploreEventsProps) {
  return (
    <section className="bg-[#fafafa] py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2
          style={{ fontFamily: "Epika" }}
          className="mb-10 text-center text-4xl font-medium text-black sm:mb-12 sm:text-5xl lg:mb-14 lg:text-6xl"
        >
          Explore Events
        </h2>

        {events.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white px-5 py-14 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-zinc-400" />

            <h3 className="mt-4 text-lg font-medium text-zinc-900">
              No events available yet
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Check back soon for upcoming events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
            {events.map((event) => (
              <EventCard key={event._id.toString()} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: ExploreEvent }) {
  const image =
    event.cardImage?.url ||
    event.contentImage?.url ||
    "/Images/Events/work.jpg";

  const description = getEventDescription(event);

  return (
    <article className="group min-w-0">
      <Link
        href={`/events/${event.slug}`}
        aria-label={`View event: ${event.title}`}
        className="block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="relative h-60 overflow-hidden bg-zinc-100 sm:h-65 lg:h-70">
          <Image
            src={image}
            alt={event.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-800 shadow-sm">
            <CalendarDays size={14} />
            {formatEventDate(event.eventDate)}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-sm lg:text-xl font-medium leading-tight text-black transition-colors group-hover:text-zinc-600">
            {event.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-xs lg:text-sm leading-6 text-zinc-600">
            {description}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black">
            View Event
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
