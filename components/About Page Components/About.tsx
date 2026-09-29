import VisionAndMission from "./VisionAndMission";
import WhyMaitri from "./WhyMaitri";

export default function AboutPage() {
  return (
    <section className="bg-white py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="text-center">
          <h2
            style={{ fontFamily: "Epika" }}
            className="
              text-3xl
              font-semibold
              text-[#101828]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Maitri Global Education
          </h2>

          {/* Orange underline */}
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#ff5a00] sm:w-24" />

          {/* Introduction */}
          <p
            className="
              mx-auto
              mt-8
              max-w-6xl
              text-sm
              leading-7
              text-[#344054]
              sm:text-base
              sm:leading-8
            "
          >
            Maitri Global Education is an organization born in 2009 under the
            umbrella of Associazione Maitri a registered association to promote
            the exchange between cultures specifically focusing on international
            education. Developed itself through the years rendering services to
            large groups of students, schools, and educational institutions such
            as counselling for higher education, institutional collaborations,
            educational tours, etc. In 2017 Maitri Global Education which was
            under the Associazione Maitri got separated and registered itself in
            the chamber of commerce of Florence with its REA number FI651447 and
            registered name &quot;Maitri Global Sas&quot; . The company has
            extended its services during the pandemic with the preparation of
            students before admission online with coaching and language classes.
          </p>
        </div>

        {/* Why Maitri */}
        <WhyMaitri />

        {/* Vision & Mission */}
        <VisionAndMission />
      </div>
    </section>
  );
}
