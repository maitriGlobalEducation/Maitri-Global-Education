import Image from "next/image";
import Link from "next/link";

export interface StudyLocation {
  countryName: string;
  image: {
    url: string;
    publicId: string;
  } | null;
}

export interface StudyLocationsContent {
  heading: string;
  cta: {
    label: string;
    url: string;
  };
  countries: StudyLocation[];
}

interface StudyLocationsProps {
  content?: StudyLocationsContent;
  isVisible?: boolean;
}

const defaultContent: StudyLocationsContent = {
  heading: "Study in Prestigious Locations",
  cta: {
    label: "Find out our school",
    url: "/locations",
  },
  countries: [
    {
      countryName: "France",
      image: { url: "/Images/france.png", publicId: "" },
    },
    { countryName: "Milan", image: { url: "/Images/milan.jpg", publicId: "" } },
    { countryName: "Rome", image: { url: "/Images/rome.jpg", publicId: "" } },
    {
      countryName: "Netherlands",
      image: { url: "/Images/netherlands.png", publicId: "" },
    },
    { countryName: "Spain", image: { url: "/Images/spain.png", publicId: "" } },
    { countryName: "Dubai", image: { url: "/Images/dubai.jpg", publicId: "" } },
    { countryName: "UK", image: { url: "/Images/uk.png", publicId: "" } },
    { countryName: "USA", image: { url: "/Images/usa.png", publicId: "" } },
    {
      countryName: "Canada",
      image: { url: "/Images/canada.png", publicId: "" },
    },
    {
      countryName: "Mexico",
      image: { url: "/Images/mexico.png", publicId: "" },
    },
  ],
};

export default function StudyLocations({
  content,
  isVisible = true,
}: StudyLocationsProps) {
  if (!isVisible) return null;

  const heading = content?.heading || defaultContent.heading;
  const cta = {
    label: content?.cta?.label || defaultContent.cta.label,
    url: content?.cta?.url || defaultContent.cta.url,
  };

  const countries = content?.countries?.length
    ? content.countries
    : defaultContent.countries;

  const locations = countries.map((country) => ({
    name: country.countryName,
    image:
      country.image?.url ||
      defaultContent.countries.find(
        (item) => item.countryName === country.countryName,
      )?.image?.url ||
      "/Images/france.png",
  }));

  return (
    <section className="overflow-hidden bg-[#292929] py-10 text-white md:py-14">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-7xl px-5 md:px-8">
        <h2
          style={{ fontFamily: "epika" }}
          className="max-w-200 bg-linear-to-r from-[#e8c166] via-[#fff0b3] to-[#e8c166] bg-clip-text text-4xl leading-[0.95] font-bold text-transparent uppercase sm:text-5xl lg:text-6xl"
        >
          {heading}
        </h2>

        {cta.label && cta.url && (
          <Link
            href={cta.url}
            className="mt-3 inline-block text-sm font-medium underline underline-offset-2 sm:text-base"
          >
            {cta.label}
          </Link>
        )}
      </div>

      {/* Marquee */}
      {locations.length > 0 && (
        <div className="w-full overflow-hidden">
          <div className="location-marquee flex w-max animate-location-marquee">
            {/* First set */}
            <div className="flex shrink-0 gap-4 pr-4">
              {locations.map((location, index) => (
                <LocationCard
                  key={`${location.name}-${index}`}
                  location={location}
                />
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
              {locations.map((location, index) => (
                <LocationCard
                  key={`duplicate-${location.name}-${index}`}
                  location={location}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function LocationCard({
  location,
}: {
  location: { name: string; image: string };
}) {
  return (
    <div
      className="
        location-card group relative h-60 w-75 shrink-0
        cursor-pointer overflow-hidden rounded-xl
        sm:h-70 sm:w-100 lg:h-80 lg:w-lg
      "
    >
      <Image
        src={location.image}
        alt={location.name}
        fill
        sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 512px"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Country name */}
      <h3
        style={{ fontFamily: "epika" }}
        className="absolute top-3 left-0 z-10 w-full text-center text-xl font-bold text-white uppercase sm:text-2xl"
      >
        {location.name}
      </h3>
    </div>
  );
}
