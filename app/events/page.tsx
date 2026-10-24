import type { Metadata } from "next";

import ExploreEvents from "@/components/Events Page Components/ExploreEvents";
import { getPublishedEvents } from "@/services/event.service";
import FeaturedEventSection from "@/components/Events Page Components/FeaturedEventSection";

export const metadata: Metadata = {
  title: "Events | Maitri Global Education",
  description:
    "Discover upcoming events, information sessions, and opportunities from Maitri Global Education.",
};

export default async function EventsPage() {
  const events = await getPublishedEvents();

  const featuredEvent = events.find((event) => event.featured) ?? null;

  const remainingEvents = events.filter(
    (event) => event._id !== featuredEvent?._id,
  );

  return (
    <main data-navbar-theme="dark">
      {featuredEvent ? (
        <FeaturedEventSection event={featuredEvent} />
      ) : (
        <section className="bg-[#344563] px-6 py-20 text-white sm:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c6f5df]">
              Events
            </p>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Discover events that move you forward
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
              Explore upcoming events, gain valuable insights, and take the next
              step in your international education journey.
            </p>
          </div>
        </section>
      )}

      <ExploreEvents events={remainingEvents} />
    </main>
  );
}
