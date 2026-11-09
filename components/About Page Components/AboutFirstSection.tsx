"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const AboutFirstSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative isolate flex min-h-175 w-full items-center overflow-hidden bg-[#101828] sm:min-h-170 lg:min-h-187.5">
        {/* Background Image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Images/students.jpg')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#101828]/95 via-[#101828]/75 to-[#101828]/20" />

        {/* Additional bottom Gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#101828]/40 via-transparent to-transparent" />

        {/* Hero Content */}
        <div className="mx-auto w-full max-w-7xl px-6 pb-32 pt-20 sm:px-10 sm:pb-36 lg:px-16">
          <motion.div
            className="max-w-3xl sm:translate-y-12 lg:translate-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="h-px w-10 bg-amber-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 sm:text-sm">
                About Maitri Global Education
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="text-4xl font-medium leading-[1.2] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Your Trusted Study Abroad Consultants in India
              <span className="mt-3 block bg-gold-gradient bg-clip-text text-transparent">
                Connecting Students with Global Education Opportunities Since
                2009
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8"
            >
              Maitri Global Education is an international education consultancy
              helping students from India and around the world access higher
              education opportunities at leading universities, specialised
              institutions and design schools across Europe and other
              international destinations.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base"
            >
              Established in 2009, Maitri Global Education has supported over
              10,000 students in exploring international education
              opportunities, selecting the right universities, securing
              admissions and preparing for life abroad.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex cursor-pointer items-center gap-3 rounded-lg bg-gold-gradient px-6 py-3.5 text-sm font-semibold shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Book Free Counselling
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom information strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#101828]/40 backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-16">
            <p className="text-xs tracking-wide text-white/60 sm:text-sm">
              Florence, Italy <span className="mx-2 text-amber-400">•</span>
              India <span className="mx-2 text-amber-400">•</span> Dubai
            </p>

            <p className="text-xs font-medium tracking-wide text-white/80 sm:text-sm">
              10,000+ Students Supported Since 2009
            </p>
          </div>
        </motion.div>

        {/* Bottom information strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#101828]/40 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-16">
            <p className="text-xs tracking-wide text-white/60 sm:text-sm">
              Florence, Italy <span className="mx-2 text-amber-400">•</span>{" "}
              India
              <span className="mx-2 text-amber-400">•</span> Dubai
            </p>

            <p className="text-xs font-medium tracking-wide text-white/80 sm:text-sm">
              10,000+ Students Supported Since 2009
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"
          >
            {/* Section Heading */}
            <motion.div variants={itemVariants}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                Our Story
              </span>

              <h2
                style={{ fontFamily: "Epika" }}
                className="mt-4 text-3xl font-semibold leading-tight text-[#101828] sm:text-4xl"
              >
                A world of education, connected through Maitri.
              </h2>

              <motion.div
                variants={itemVariants}
                className="mt-5 h-1 w-20 rounded-full bg-gold-gradient"
              />
            </motion.div>

            {/* Section Content */}
            <motion.div
              variants={containerVariants}
              className="space-y-6 text-sm leading-8 text-[#475467] sm:text-base"
            >
              <motion.p variants={itemVariants}>
                With our headquarters in Florence, Italy, and offices in India
                and Dubai, we bring together international university
                partnerships, experienced education counsellors and personalised
                student support to make studying abroad a more accessible and
                manageable experience.
              </motion.p>

              <motion.p variants={itemVariants}>
                Whether you are planning to study in Italy, France, Germany,
                Spain, Ireland, the UK, the UAE or another international
                destination, our team helps you navigate the process from your
                first counselling session to your arrival at university and
                beyond.
              </motion.p>

              <motion.p variants={itemVariants}>
                We specialise in international education counselling, overseas
                university admissions, course selection, scholarship assistance,
                student visa guidance, accommodation and pre-departure support.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="border-l-2 border-amber-400 pl-5 font-medium text-[#101828]"
              >
                At Maitri Global Education, we believe that studying abroad is
                more than an academic decision. It is the beginning of a new
                journey, and we are here to help you make it count.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Who We Are */}
      <div className="bg-[#f9fafb] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Intro */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600"
            >
              Who We Are
            </motion.span>

            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="mt-4 text-3xl font-semibold text-[#101828] sm:text-4xl"
            >
              Connecting education with opportunity.
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-5 h-1 w-20 rounded-full bg-gold-gradient"
            />

            <motion.div
              variants={containerVariants}
              className="mt-8 space-y-5 text-sm leading-8 text-[#475467] sm:text-base"
            >
              <motion.p variants={itemVariants}>
                Maitri Global Education was established in 2009 with a vision to
                connect students with international educational institutions and
                create opportunities for cross-cultural learning.
              </motion.p>

              <motion.p variants={itemVariants}>
                Over the years, we have developed strong relationships with
                universities, private higher education institutions, specialised
                design schools and international educational organisations.
              </motion.p>

              <motion.p variants={itemVariants}>
                Our experience spans several academic disciplines, including:
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Academic Disciplines */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              "Fashion Design and Fashion Business",
              "Interior Design and Product Design",
              "Graphic Design and Visual Communication",
              "Business and Management",
              "Luxury Brand Management",
              "Art, Media and Communication",
              "Film, Animation and Acting",
              "Hospitality and Culinary Arts",
              "Engineering and Humanities",
            ].map((discipline, index) => (
              <motion.div
                key={discipline}
                variants={itemVariants}
                className="group flex items-center gap-4 rounded-2xl border border-[#eaecf0] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-sm font-semibold text-amber-600 transition-colors group-hover:bg-gold-gradient">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm font-medium leading-6 text-[#344054]">
                  {discipline}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 max-w-4xl space-y-5 text-sm leading-8 text-[#475467] sm:text-base"
          >
            <motion.p variants={itemVariants}>
              We help students explore undergraduate programmes, postgraduate
              degrees, specialised master's programmes, one-year intensive
              courses and short-term educational programmes.
            </motion.p>

            <motion.p variants={itemVariants}>
              Our approach combines international education expertise with
              individual attention, ensuring students receive guidance based on
              their academic backgrounds, career aspirations and financial
              considerations.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Maitri */}
      <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600"
            >
              Why Choose Maitri Global Education?
            </motion.span>

            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="mt-4 text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-5xl"
            >
              Your journey deserves the right guidance.
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-gradient"
            />
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                number: "01",
                title: "Over 15 Years of International Education Experience",
                description:
                  "Since 2009, we have been helping students navigate international education opportunities. Our experience gives us an understanding of university admissions, international student requirements and the challenges of relocating to another country.",
              },
              {
                number: "02",
                title: "Established University Partnerships",
                description:
                  "We maintain close relationships with international universities, private educational institutions and specialised design schools. These connections help us guide students towards suitable programmes and available scholarship opportunities.",
              },
              {
                number: "03",
                title: "Free Personalised Study Abroad Counselling",
                description:
                  "Our one-on-one education counselling helps students identify suitable courses, universities and destinations. We provide guidance based on academic qualifications, interests, career goals and individual requirements.",
              },
              {
                number: "04",
                title: "Scholarship and Admission Assistance",
                description:
                  "We help students explore eligible scholarship opportunities, understand admission requirements and prepare their university applications. Our team also provides portfolio guidance for creative and design-related programmes.",
              },
              {
                number: "05",
                title: "International Presence and Local Support",
                description:
                  "With offices in Florence, Italy, India and Dubai, Maitri combines international education counselling with destination-based student assistance.",
              },
              {
                number: "06",
                title: "Complete Student Journey Support",
                description:
                  "Our relationship with students extends beyond university admissions. We assist with visa documentation guidance, accommodation, airport transfers, local SIM cards, administrative requirements and settling into life abroad.",
              },
            ].map((item) => (
              <motion.div
                key={item.number}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-[#eaecf0] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/5 sm:p-8"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-amber-50/70 transition-all duration-300 group-hover:bg-amber-100/70" />

                <div className="relative">
                  <span className="text-3xl font-semibold text-amber-500/50">
                    {item.number}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold leading-7 text-[#101828]">
                    {item.title}
                  </h3>

                  <div className="mt-4 h-0.5 w-12 rounded-full bg-gold-gradient transition-all duration-300 group-hover:w-20" />

                  <p className="mt-5 text-sm leading-7 text-[#475467]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Study Abroad Destinations */}
      <div className="relative overflow-hidden bg-[#101828] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Heading */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300"
            >
              Study Abroad Destinations
            </motion.span>

            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="mt-4 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
            >
              Discover your world of possibilities.
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-5 h-1 w-20 rounded-full bg-gold-gradient"
            />

            <motion.p
              variants={itemVariants}
              className="mt-8 text-sm leading-8 text-white/65 sm:text-base"
            >
              Maitri Global Education helps students explore international
              education opportunities across multiple destinations.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm leading-8 text-white/65 sm:text-base"
            >
              Our destination expertise includes:
            </motion.p>
          </motion.div>

          {/* Destination Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                country: "Italy",
                description:
                  "Study fashion, design, business, architecture and specialised postgraduate programmes at Italian universities and design institutions.",
              },
              {
                country: "France",
                description:
                  "Explore international programmes in fashion, design, business, arts and related disciplines.",
              },
              {
                country: "Germany",
                description:
                  "Discover higher education opportunities across business, engineering, technology and other academic fields.",
              },
              {
                country: "Spain",
                description:
                  "Explore international undergraduate and postgraduate study opportunities.",
              },
              {
                country: "Ireland",
                description:
                  "Discover internationally recognised programmes across business, technology and other disciplines.",
              },
              {
                country: "United Kingdom",
                description:
                  "Explore undergraduate and postgraduate education opportunities at UK institutions.",
              },
              {
                country: "United Arab Emirates",
                description:
                  "Discover international education opportunities, including programmes in Dubai.",
              },
            ].map((destination, index) => (
              <motion.div
                key={destination.country}
                variants={itemVariants}
                className="group rounded-2xl border border-white/10 bg-white/4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-widest text-amber-300/60">
                    DESTINATION {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-amber-300 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3
                  style={{ fontFamily: "Epika" }}
                  className="mt-5 text-2xl font-semibold text-white"
                >
                  {destination.country}
                </h3>

                <div className="mt-4 h-0.5 w-10 rounded-full bg-gold-gradient" />

                <p className="mt-5 text-sm leading-7 text-white/60">
                  {destination.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 text-xs leading-6 text-white/40"
          >
            Programme availability, entry requirements and scholarship
            opportunities vary by institution and destination.
          </motion.p>
        </div>
      </div>

      {/* Our Approach */}
      <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
          >
            {/* Left Content */}
            <motion.div variants={containerVariants}>
              <motion.span
                variants={itemVariants}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600"
              >
                Our Approach
              </motion.span>

              <motion.h2
                variants={itemVariants}
                style={{ fontFamily: "Epika" }}
                className="mt-4 text-3xl font-semibold leading-tight text-[#101828] sm:text-4xl"
              >
                More Than Overseas Education Counselling
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="mt-5 h-1 w-20 rounded-full bg-gold-gradient"
              />

              <motion.div
                variants={containerVariants}
                className="mt-8 space-y-5 text-sm leading-8 text-[#475467] sm:text-base"
              >
                <motion.p variants={itemVariants}>
                  We understand that choosing to study abroad involves more than
                  selecting a university and submitting an application.
                </motion.p>

                <motion.p variants={itemVariants}>
                  Students and parents need reliable information, practical
                  assistance and continued guidance throughout the transition.
                </motion.p>

                <motion.p variants={itemVariants}>
                  That is why our services cover the complete international
                  education journey:
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Services Checklist */}
            <motion.div
              variants={containerVariants}
              className="rounded-3xl border border-[#eaecf0] bg-[#f9fafb] p-6 sm:p-10"
            >
              <motion.div
                variants={containerVariants}
                className="grid gap-4 sm:grid-cols-2"
              >
                {[
                  "Free education and career counselling.",
                  "University and course selection.",
                  "Scholarship opportunity identification.",
                  "University application and admission assistance.",
                  "Portfolio preparation guidance.",
                  "Student visa documentation assistance.",
                  "Pre-departure preparation.",
                  "Accommodation and housing assistance.",
                  "Airport pickup and arrival assistance.",
                  "On-ground administrative support in Italy.",
                  "Student community connections.",
                ].map((service) => (
                  <motion.div
                    key={service}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-[#344054]">
                      {service}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Callout */}
              <motion.div
                variants={itemVariants}
                className="mt-8 rounded-2xl bg-[#101828] p-6"
              >
                <p className="text-sm leading-7 text-white/75">
                  Our goal is to make international education a well-planned and
                  rewarding experience.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Our Commitment */}
      {/* Our Commitment */}
      <div className="bg-[#f9fafb] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600"
          >
            Our Commitment
          </motion.span>

          <motion.h2
            variants={itemVariants}
            style={{ fontFamily: "Epika" }}
            className="mt-4 text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-5xl"
          >
            Every student. Every ambition. Every journey.
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-gradient"
          />

          {/* Commitment Content */}
          <motion.div
            variants={containerVariants}
            className="mx-auto mt-10 max-w-3xl space-y-6 text-sm leading-8 text-[#475467] sm:text-base"
          >
            <motion.p variants={itemVariants}>
              At Maitri Global Education, every student has a different
              ambition, academic background and vision for the future.
            </motion.p>

            <motion.p variants={itemVariants}>
              We are committed to providing honest guidance, personalised
              attention and practical assistance that helps students make
              informed decisions about their education abroad.
            </motion.p>

            <motion.p variants={itemVariants}>
              From the first conversation with our counsellors to the experience
              of settling into a new country, we strive to make every stage of
              the journey easier.
            </motion.p>
          </motion.div>

          {/* Closing CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-12 rounded-3xl bg-[#101828] px-6 py-10 sm:px-12 sm:py-14"
          >
            <motion.div
              variants={containerVariants}
              className="mx-auto max-w-3xl"
            >
              <motion.div
                variants={itemVariants}
                className="mx-auto h-1 w-16 rounded-full bg-gold-gradient"
              />

              <motion.h3
                variants={itemVariants}
                style={{ fontFamily: "Epika" }}
                className="mt-6 text-2xl font-semibold leading-relaxed text-white sm:text-3xl"
              >
                Maitri Global Education – Helping students discover global
                opportunities and build brighter futures since 2009.
              </motion.h3>

              <motion.a
                variants={itemVariants}
                href="/contact"
                className="mt-8 inline-flex cursor-pointer items-center gap-3 rounded-xl bg-gold-gradient px-7 py-4 text-sm font-semibold shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Book your free study abroad counselling session and take the
                first step towards your international education journey.
                <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFirstSection;
