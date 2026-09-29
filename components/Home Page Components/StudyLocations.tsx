import Image from "next/image";
import Link from "next/link";

interface Location {
  name: string;
  image: string;
}

const locations: Location[] = [
  {
    name: "France",
    image: "/Images/france.png",
  },
  {
    name: "Milan",
    image: "/Images/milan.jpg",
  },
  {
    name: "Rome",
    image: "/Images/rome.jpg",
  },
  {
    name: "Netherlands",
    image: "/Images/netherlands.png",
  },
  {
    name: "Spain",
    image: "/Images/spain.png",
  },
  {
    name: "Dubai",
    image: "/Images/dubai.jpg",
  },
  {
    name: "UK",
    image: "/Images/uk.png",
  },
  {
    name: "USA",
    image: "/Images/usa.png",
  },
  {
    name: "Canada",
    image: "/Images/canada.png",
  },
  {
    name: "Mexico",
    image: "/Images/mexico.png",
  },
];

export default function StudyLocations() {
  return (
    <section className="overflow-hidden bg-[#292929] py-10 text-white md:py-14">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-7xl px-5 md:px-8">
        <h2
          style={{ fontFamily: "epika" }}
          className="
    max-w-200
    font-bold
    bg-linear-to-r
    from-[#e8c166]
    via-[#fff0b3]
    to-[#e8c166]
    bg-clip-text
    text-transparent
    text-4xl
    leading-[0.95]
    uppercase
    sm:text-5xl
    lg:text-6xl
  "
        >
          Study in Prestigious
          <br />
          Locations
        </h2>

        <Link
          href="/locations"
          className="mt-3 inline-block text-sm font-medium underline underline-offset-2 sm:text-base"
        >
          Find out our school
        </Link>
      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden">
        <div className="location-marquee flex w-max animate-location-marquee">
          {/* First set */}
          <div className="flex shrink-0 gap-4 pr-4">
            {locations.map((location) => (
              <LocationCard key={location.name} location={location} />
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
            {locations.map((location) => (
              <LocationCard
                key={`duplicate-${location.name}`}
                location={location}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationCard({ location }: { location: Location }) {
  return (
    <div
      className="
        location-card
        group
        relative
        h-60
        w-75
        shrink-0
        cursor-pointer
        overflow-hidden
        rounded-xl
        sm:h-70
        sm:w-100
        lg:h-80
        lg:w-lg
      "
    >
      <Image
        src={location.image}
        alt={location.name}
        fill
        sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 512px"
        className="
          object-cover
          transition-transform
          duration-500
          ease-out
          group-hover:scale-110
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Country name */}
      <h3
        style={{ fontFamily: "epika" }}
        className="absolute top-3 left-0 z-10 w-full text-center text-xl font-bold uppercase text-white sm:text-2xl"
      >
        {location.name}
      </h3>
    </div>
  );
}
