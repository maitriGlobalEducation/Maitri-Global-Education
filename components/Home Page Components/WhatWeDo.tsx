import Image from "next/image";
import Link from "next/link";

export default function WhatWeDo() {
  return (
    <section className="w-full bg-white px-5 py-12 sm:px-8 md:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto flex max-w-345 flex-col gap-8 lg:flex-row lg:items-center lg:gap-8">
        {/* Image */}
        <div className="relative h-60 w-full overflow-hidden sm:h-80 lg:h-85 lg:w-[75%]">
          <Image
            src="/Images/who-we-are.jpg"
            alt="Maitri Global Education"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-[52%]">
          <h2
            style={{ fontFamily: "epika" }}
            className="mb-5 text-2xl font-bold uppercase leading-tight text-black sm:text-3xl lg:text-[32px]"
          >
            Who We Are & What We Do
          </h2>

          <p className="mb-5 text-sm leading-6 text-black sm:text-base sm:leading-7">
            At Maitri Global Education, we provide expert guidance for
            international admissions, visa processing, and career counseling.
            Our mission is to make global education accessible and hassle-free
            for every student.
          </p>

          <Link
            href="/about"
            className="flex h-11 w-full items-center justify-center rounded-md border-2 border-black text-sm font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white sm:text-base"
          >
            More
          </Link>
        </div>
      </div>
    </section>
  );
}
