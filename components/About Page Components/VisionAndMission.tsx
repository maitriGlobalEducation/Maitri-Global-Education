import Image from "next/image";
import React from "react";

const VisionAndMission = () => {
  return (
    <div
      className="
        mx-auto
        mt-18
        max-w-6xl
        sm:mt-22
        lg:mt-28
      "
    >
      <div
        className="
          grid
          gap-10
          lg:grid-cols-2
          lg:items-stretch
          lg:gap-14
        "
      >
        {/* Image */}
        <div
          className="
            group
            relative
            h-70
            overflow-hidden
            rounded-2xl
            shadow-[0_12px_35px_rgba(0,0,0,0.10)]
            sm:h-95
            lg:h-auto
            lg:min-h-full
          "
        >
          <Image
            src="/Images/vision-and-mission.jpg"
            alt="Maitri Global Education students"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.03]
            "
          />

          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Right Content */}
        <div className="flex h-full flex-col">
          <h3
            style={{ fontFamily: "Epika" }}
            className="
              text-3xl
              font-semibold
              leading-tight
              text-[#101828]
              sm:text-4xl
            "
          >
            Our Vision &amp; Mission
          </h3>

          {/* Accent */}
          <div className="mt-3 h-1 w-16 rounded-full bg-[#ff5a00]" />

          {/* Intro */}
          <p
            className="
              mt-6
              text-sm
              leading-7
              text-[#344054]
              sm:text-base
              sm:leading-8
            "
          >
            The Core purpose of Maitri Global Education, is to be a bridge
            between cultures, extending high quality education and services
            reachable to every aspiring student.
          </p>

          {/* Mission Points */}
          <div
            className="
              mt-7
              flex
              flex-1
              flex-col
              justify-center
              space-y-5
              rounded-2xl
              bg-[#fcfcfc]
              p-5
              shadow-[0_8px_30px_rgba(0,0,0,0.035)]
              sm:p-6
            "
          >
            <div className="flex items-start gap-3">
              <span className="mt-2.5 size-2 shrink-0 rounded-full bg-[#ff5a00]" />

              <p className="text-sm leading-7 text-[#344054] sm:text-base">
                MGE guides the student in discerning and decision making, in the
                selection of the course and institution.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-2.5 size-2 shrink-0 rounded-full bg-[#ff5a00]" />

              <p className="text-sm leading-7 text-[#344054] sm:text-base">
                MGE is dedicated to find institutions where, talented students
                are given the opportunity to be trained under experts, making
                the international experience a reality.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-2.5 size-2 shrink-0 rounded-full bg-[#ff5a00]" />

              <p className="text-sm leading-7 text-[#344054] sm:text-base">
                MGE engages to enhance the international learning by
                interlinking the educational institutions, students and teachers
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionAndMission;
