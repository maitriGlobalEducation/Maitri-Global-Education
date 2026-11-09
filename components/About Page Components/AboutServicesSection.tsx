"use client";
import { services } from "@/data/AboutServicesData";
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

const benefits = [
  "Established international education consultancy since 2009.",
  "More than 10,000 students supported.",
  "International university and institutional partnerships.",
  "Free one-on-one education counselling.",
  "Scholarship and admission assistance.",
  "International presence in Italy, India and Dubai.",
  "Practical student support beyond university admissions.",
];

export default function AboutServicesSection() {
  return (
    <main className="w-full overflow-hidden bg-white">
      {/* Hero */}
      <motion.section
        className="relative isolate overflow-hidden bg-[#101828]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,164,75,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#101828]/20 to-[#101828]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <motion.div className="max-w-4xl" variants={containerVariants}>
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="h-px w-10 bg-amber-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                Maitri Global Education
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="text-4xl leading-tight font-medium text-white sm:text-5xl lg:text-6xl"
            >
              Our Services
              <motion.span
                variants={itemVariants}
                className="mt-3 block font-medium bg-gold-gradient bg-clip-text text-transparent"
              >
                Complete Study Abroad Assistance from Admission to Arrival
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl"
            >
              Your International Education Journey, Supported at Every Step
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-3xl text-base leading-8 text-white/65"
            >
              Planning to study abroad? Maitri Global Education provides
              comprehensive study abroad consultancy services for students
              aspiring to pursue higher education in Italy, France, Germany,
              Spain, Ireland, the UK, the UAE and other international
              destinations.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-[#101828] transition duration-300 hover:scale-[1.02]"
              >
                Book Free Counselling
              </Link>

              <Link
                href="#study-abroad-services"
                className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-amber-300/60 hover:bg-white/5"
              >
                Explore Our Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-16 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2"
          >
            <motion.p
              variants={itemVariants}
              className="text-sm leading-7 text-white/60"
            >
              As an international education consultancy established in 2009, we
              help students navigate university selection, overseas admissions,
              scholarships, visa documentation, accommodation and pre-departure
              preparations.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm leading-7 text-white/60"
            >
              With our international presence in Florence, Italy, India and
              Dubai, we combine personalised education counselling with
              practical student support to make your transition to studying
              abroad easier.
            </motion.p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-sm leading-7 text-white/60"
          >
            Whether you are looking for an undergraduate degree, a master's
            programme, a specialised course in fashion and design, or an
            international business qualification, our team is here to guide you.
          </motion.p>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section
        id="study-abroad-services"
        className="scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <motion.div className="mb-14 max-w-3xl" variants={containerVariants}>
            <motion.span
              variants={itemVariants}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600"
            >
              What We Do
            </motion.span>

            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="mt-4 text-3xl leading-tight font-semibold text-[#101828] sm:text-4xl lg:text-5xl"
            >
              Our Study Abroad Consultancy Services
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-6 h-1 w-16 rounded-full bg-gold-gradient"
            />
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid gap-6 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service) => (
              <motion.article
                key={service.number}
                variants={itemVariants}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/70 hover:shadow-xl hover:shadow-amber-900/5 sm:p-8"
              >
                <div className="mb-6 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#101828] text-sm font-semibold text-amber-300 transition-colors duration-300 group-hover:bg-gold-gradient">
                    {service.number}
                  </span>

                  <h3 className="text-xl leading-snug font-medium text-[#101828] sm:text-2xl">
                    {service.title}
                  </h3>
                </div>

                <div className="space-y-4 text-sm leading-7 text-zinc-600 sm:text-base">
                  {service.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {service.label && (
                  <p className="mt-6 font-semibold text-[#101828]">
                    {service.label}
                  </p>
                )}

                {service.items && (
                  <ul className="mt-4 space-y-3">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-zinc-600 sm:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {service.groups && (
                  <div className="mt-6 space-y-6">
                    {service.groups.map((group) => (
                      <div key={group.title}>
                        <h4 className="font-semibold text-[#101828]">
                          {group.title}
                        </h4>

                        <ul className="mt-3 space-y-3">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm leading-6 text-zinc-600 sm:text-base"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {service.outro && (
                  <p className="mt-6 border-t border-zinc-100 pt-5 text-sm leading-7 text-zinc-600 sm:text-base">
                    {service.outro}
                  </p>
                )}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Maitri */}
      <section className="bg-[#f8f7f4] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              The Maitri Difference
            </span>

            <h2
              style={{ fontFamily: "Epika" }}
              className="mt-4 text-3xl leading-tight font-medium text-[#101828] sm:text-4xl"
            >
              Why Choose Maitri Global Education?
            </h2>

            <div className="mt-6 h-1 w-16 rounded-full bg-gold-gradient" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="flex items-start gap-4 rounded-xl border border-zinc-200/80 bg-white p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-6 font-medium text-zinc-700">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#101828] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Take the First Step
          </span>

          <h2
            style={{ fontFamily: "Epika" }}
            className="mt-5 text-3xl leading-tight font-medium text-white sm:text-4xl lg:text-5xl"
          >
            Start Your Study Abroad Journey with Maitri
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/70">
            Whether you are planning to study in Italy, pursue a master's degree
            in Europe, apply to an international design school or explore
            undergraduate education abroad, Maitri Global Education can help you
            understand your options.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70">
            Our team is ready to guide you through university selection,
            admissions, scholarships and the practical preparations required to
            study overseas.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-lg bg-gold-gradient px-7 py-4 text-sm font-semibold text-[#101828] transition duration-300 hover:scale-[1.03]"
          >
            Book your free study abroad counselling session today.
          </Link>

          <p className="mt-8 text-sm leading-7 text-white/50">
            Maitri Global Education – Your partner in international education,
            from admission to arrival.
          </p>
        </div>
      </section>
    </main>
  );
}
