import Image from "next/image";
import Link from "next/link";

export interface AboutContent {
  image: {
    url: string;
    publicId: string;
  } | null;
  heading: string;
  description: string;
  cta: {
    label: string;
    url: string;
  };
}

interface WhatWeDoProps {
  content?: AboutContent;
  isVisible?: boolean;
}

const defaultContent: AboutContent = {
  image: null,
  heading: "Who We Are & What We Do",
  description:
    "At Maitri Global Education, we provide expert guidance for international admissions, visa processing, and career counseling. Our mission is to make global education accessible and hassle-free for every student.",
  cta: {
    label: "More",
    url: "/about",
  },
};

export default function WhatWeDo({ content, isVisible = true }: WhatWeDoProps) {
  if (!isVisible) return null;

  const heading = content?.heading || defaultContent.heading;
  const description = content?.description || defaultContent.description;
  const cta = {
    label: content?.cta?.label || defaultContent.cta.label,
    url: content?.cta?.url || defaultContent.cta.url,
  };
  const imageUrl = content?.image?.url || "/Images/who-we-are.jpg";

  return (
    <section className="w-full bg-white px-5 py-12 sm:px-8 md:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto flex max-w-345 flex-col gap-8 lg:flex-row lg:items-center lg:gap-8">
        {/* Image */}
        <div className="relative h-60 w-full overflow-hidden sm:h-80 lg:h-85 lg:w-[75%]">
          <Image
            src={imageUrl}
            alt="Maitri Global Education"
            fill
            sizes="(max-width: 1023px) 100vw, 75vw"
            loading="eager"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-[52%]">
          <h2
            style={{ fontFamily: "epika" }}
            className="mb-5 text-2xl font-bold uppercase leading-tight text-black sm:text-3xl lg:text-[32px]"
          >
            {heading}
          </h2>

          <p className="mb-5 text-sm leading-6 text-black sm:text-base sm:leading-7">
            {description}
          </p>

          {cta.label && cta.url && (
            <Link
              href={cta.url}
              className="flex h-11 w-full items-center justify-center rounded-md border-2 border-black text-sm font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white sm:text-base"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
