import EventsHero from "@/components/Events Page Components/EventsHero";
import ExploreEvents from "@/components/Events Page Components/ExploreEvents";
import { getPublishedEvents } from "@/services/event.service";

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <>
      <EventsHero />
      <ExploreEvents events={events} />
    </>
  );
}
