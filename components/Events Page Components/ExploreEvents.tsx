import Image from "next/image";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  publishedOn: string;
  description: string;
  image: string;
  href: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Event name 1",
    publishedOn: "25 Aug 2025",
    description:
      "Brief description of the blog content goes here. It should be concise and engaging to encourage readers to click through.",
    image: "/Images/events/banquet-wedding.jpg",
    href: "/events/event-1",
  },
  {
    id: 2,
    title: "Event name 2",
    publishedOn: "25 Aug 2025",
    description:
      "Brief description of the blog content goes here. It should be concise and engaging to encourage readers to click through.",
    image: "/Images/events/girl.jpg",
    href: "/events/event-2",
  },
  {
    id: 3,
    title: "Event name 3",
    publishedOn: "25 Aug 2025",
    description:
      "Brief description of the blog content goes here. It should be concise and engaging to encourage readers to click through.",
    image: "/Images/events/work.jpg",
    href: "/events/event-3",
  },
];

export default function ExploreEvents() {
  return (
    <section className="bg-[#fafafa] py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <h2
          style={{ fontFamily: "Epika" }}
          className="
            mb-10
            text-center
            text-4xl
            font-medium
            text-black
            sm:mb-12
            sm:text-5xl
            lg:mb-14
            lg:text-6xl
          "
        >
          Explore Events
        </h2>

        {/* Events Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-x-5
            gap-y-12
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-6
          "
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="group min-w-0">
      {/* Image */}
      <Link
        href={event.href}
        className="
          relative
          block
          h-60
          w-full
          overflow-hidden
          rounded-lg
          sm:h-65
          lg:h-70
        "
      >
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
          className="
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
        />
      </Link>

      {/* Content */}
      <div className="pt-3">
        <h3 className="text-xl font-medium leading-tight text-black sm:text-2xl">
          {event.title}
        </h3>

        <p className="mt-1 text-sm text-[#344054] sm:text-base">
          Published on : {event.publishedOn}
        </p>

        <p className="mt-3 text-sm leading-6 text-[#171717] sm:text-base">
          {event.description}
        </p>

        <Link
          href={event.href}
          className="
            mt-2
            inline-flex
            min-w-32
            items-center
            justify-center
            rounded-md
            border-2
            border-black
            px-5
            py-2.5
            text-sm
            font-semibold
            text-black
            transition-all
            duration-300
            hover:bg-black
            hover:text-white
          "
        >
          Apply Now
        </Link>
      </div>
    </article>
  );
}
