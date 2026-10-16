import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublishedEventBySlug } from "@/services/event.service";
import BlogContent from "@/components/Blogs Page Components/BlogContent";
import EventRegistrationForm from "@/components/Events Page Components/EventRegistrationForm";
import LocalEventDateTime from "@/components/Events Page Components/LocalEventDateTime";
import Link from "next/link";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublishedEventBySlug(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: event.metaTitle || `${event.title} | Maitri Global Education`,
    description: event.metaDescription || `Learn more about ${event.title}.`,
    keywords: event.metaKeywords,
  };
}

function formatEventDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);

  if (match) {
    const [, year, month, day] = match;

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${year}-${month}-${day}T00:00:00.000Z`));
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getPublishedEventBySlug(slug);

  if (!event) notFound();

  const image = event.contentImage?.url || event.cardImage?.url;

  return (
    <main className="bg-zinc-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(400px,1fr)] xl:gap-10 2xl:gap-12">
          <div className="min-w-0">
            <Link
              href="/events"
              className="mb-4 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              <span aria-hidden="true">←</span>
              Back to Events
            </Link>
            <article className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8 lg:p-10 xl:p-12">
              <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl xl:text-5xl">
                  {event.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
                  <LocalEventDateTime
                    eventStartsAt={new Date(event.eventStartsAt).toISOString()}
                  />
                </div>

                {event.metaDescription && (
                  <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-600 md:text-lg">
                    {event.metaDescription}
                  </p>
                )}
              </header>

              {image && (
                <div className="relative mb-8 w-full overflow-hidden rounded-xl bg-zinc-50">
                  <Image
                    src={image}
                    alt={event.title}
                    width={1200}
                    height={800}
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="block h-auto w-full object-contain"
                  />
                </div>
              )}

              {event.content && (
                <div className="min-w-0">
                  <BlogContent content={event.content} />
                </div>
              )}
            </article>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-8">
            <EventRegistrationForm
              fields={event.registrationForm?.fields ?? []}
              eventTitle={event.title}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
