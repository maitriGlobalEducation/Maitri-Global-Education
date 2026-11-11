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

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const VisionAndMission = () => {
  return (
    <section className="w-full overflow-hidden bg-white">
      {/* ==================== MISSION & VISION ==================== */}
      <motion.div
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Section Heading */}
        <motion.div className="mb-16 text-center" variants={containerVariants}>
          <motion.span
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600"
          >
            Our Purpose
          </motion.span>

          <motion.h2
            variants={itemVariants}
            style={{ fontFamily: "Epika" }}
            className="mt-4 text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-5xl"
          >
            Our Mission and Vision
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-gradient"
          />
        </motion.div>

        {/* ==================== OUR MISSION ==================== */}
        <motion.div
          className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Mission Image */}
          <motion.div
            variants={imageVariants}
            className="group relative lg:h-full"
          >
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-bl-3xl border-b-2 border-l-2 border-amber-400/60" />

            <div className="relative h-80 overflow-hidden rounded-3xl sm:h-100 lg:h-full">
              <img
                src="/Images/About/Mission-2.jpeg"
                alt="Students exploring international education opportunities"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#101828]/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  Our Mission
                </span>
              </div>
            </div>
          </motion.div>

          {/* Mission Content */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col justify-center"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600"
            >
              Making Global Education Accessible
            </motion.span>

            <motion.h3
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="mt-4 text-3xl font-semibold leading-tight text-[#101828] sm:text-4xl"
            >
              Our Mission – Making Global Education Accessible
            </motion.h3>

            <motion.div
              variants={itemVariants}
              className="mt-5 h-1 w-20 rounded-full bg-gold-gradient"
            />

            <motion.div
              variants={containerVariants}
              className="mt-8 space-y-5 text-sm leading-6 text-[#475467] sm:text-base"
            >
              <motion.p variants={itemVariants}>
                At Maitri Global Education, our mission is to make international
                education more accessible by connecting students with the right
                universities, academic programmes and global opportunities.
              </motion.p>

              <motion.p variants={itemVariants}>
                As an international education consultancy established in 2009,
                we are committed to providing personalised study abroad
                counselling, overseas university admission assistance,
                scholarship guidance and comprehensive student support.
              </motion.p>

              <motion.p variants={itemVariants}>
                We strive to simplify the process of studying abroad by helping
                students make informed academic decisions, navigate
                international admissions and prepare for life in a new country.
              </motion.p>

              <motion.p variants={itemVariants}>
                Through our relationships with universities, specialised
                educational institutions and international student communities,
                we aim to make every student's journey more informed, supported
                and rewarding.
              </motion.p>

              <motion.p variants={itemVariants}>
                Our commitment extends beyond securing university admissions. We
                want students to feel confident, prepared and supported as they
                take their next steps towards an international education and
                career.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ==================== OUR VISION ==================== */}
        <motion.div
          className="mt-24 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Vision Content */}
          <motion.div
            variants={containerVariants}
            className="order-2 flex flex-col lg:order-1"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600"
            >
              Connecting Students to a World of Opportunities
            </motion.span>

            <motion.h3
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="mt-4 text-3xl font-semibold leading-tight text-[#101828] sm:text-4xl"
            >
              Our Vision – Connecting Students to a World of Opportunities
            </motion.h3>

            <motion.div
              variants={itemVariants}
              className="mt-5 h-1 w-20 rounded-full bg-gold-gradient"
            />

            <motion.div
              variants={containerVariants}
              className="mt-8 space-y-5 text-sm leading-6 text-[#475467] sm:text-base"
            >
              <motion.p variants={itemVariants}>
                Our vision is to become a trusted global education partner,
                connecting students, universities and institutions across
                borders.
              </motion.p>

              <motion.p variants={itemVariants}>
                We believe geographical boundaries should never limit access to
                quality education. Every student deserves the opportunity to
                explore global academic pathways and achieve meaningful personal
                and professional growth.
              </motion.p>

              <motion.p variants={itemVariants}>
                With our presence in Florence, Italy, India and Dubai, we aim to
                strengthen international partnerships, encourage cultural
                exchange and provide students with the guidance and support to
                thrive as global citizens.
              </motion.p>
            </motion.div>

            {/* Vision Statement */}
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-2xl border-l-4 border-amber-400 bg-[#f9fafb] p-6"
            >
              <p className="text-sm font-medium italic leading-7 text-[#101828] sm:text-base">
                We don't just envision a world where students study abroad. We
                envision a world where global education opens doors to limitless
                possibilities.
              </p>
            </motion.div>
          </motion.div>

          {/* Vision Image */}
          <motion.div
            variants={imageVariants}
            className="group relative order-1 lg:order-2"
          >
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-tr-3xl border-r-2 border-t-2 border-amber-400/60" />

            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/Images/About/About-Hero-2.jpeg"
                alt="International students experiencing global education"
                className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-100 lg:h-125"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#101828]/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  Our Vision
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ==================== CORE VALUES ==================== */}
      <motion.div
        className="bg-[#f9fafb] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600"
            >
              What Defines Us
            </motion.span>

            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "Epika" }}
              className="mt-4 text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-5xl"
            >
              Our Core Values
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-gradient"
            />
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {[
              {
                number: "01",
                title: "Student-Centred Guidance",
                description:
                  "Every student has different academic interests, ambitions and circumstances. We believe in personalised counselling that puts individual needs and aspirations first.",
              },
              {
                number: "02",
                title: "Trust and Transparency",
                description:
                  "We value honest communication, clear information and responsible guidance throughout the study abroad process.",
              },
              {
                number: "03",
                title: "Global Connections",
                description:
                  "We believe in building meaningful relationships between students, international universities and educational institutions across borders.",
              },
              {
                number: "04",
                title: "Personalised Support",
                description:
                  "From course selection and university applications to arrival and settling into a new country, we believe every student deserves individual attention.",
              },
              {
                number: "05",
                title: "Opportunity and Growth",
                description:
                  "We strive to connect students with international educational opportunities that help them develop academically, professionally and personally.",
              },
              {
                number: "06",
                title: "Lifelong Relationships",
                description:
                  "Our relationship with students does not end with an admission letter. We value long-term connections and continued support throughout their international education experience.",
              },
            ].map((value) => (
              <motion.div
                key={value.number}
                variants={itemVariants}
                className="group rounded-2xl border border-[#eaecf0] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/5 sm:p-8"
              >
                <span className="text-3xl font-semibold text-amber-500/50">
                  {value.number}
                </span>

                <h3 className="mt-5 text-lg font-semibold text-[#101828]">
                  {value.title}
                </h3>

                <div className="mt-4 h-0.5 w-12 rounded-full bg-gold-gradient transition-all duration-300 group-hover:w-20" />

                <p className="mt-5 text-sm leading-7 text-[#475467]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ==================== OUR PROMISE ==================== */}
      <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#101828] px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            {/* Decorative background */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-4xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Our Promise
              </span>

              <h2
                style={{ fontFamily: "Epika" }}
                className="mt-5 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
              >
                Our Promise
              </h2>

              <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-gradient" />

              <div className="mt-8 space-y-6 text-sm leading-8 text-white/70 sm:text-base">
                <p>
                  Every international education journey begins with a decision.
                  We are here to help students make that decision with
                  confidence.
                </p>

                <p>
                  With over 15 years of experience in international education, a
                  global network of institutional relationships and a commitment
                  to personalised student care, Maitri Global Education
                  continues to help students turn international education
                  aspirations into meaningful opportunities.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-3xl">
                <h3
                  style={{ fontFamily: "Epika" }}
                  className="text-2xl font-semibold leading-relaxed text-white sm:text-3xl"
                >
                  Maitri Global Education – Connecting Students, Universities
                  and Global Futures Since 2009.
                </h3>
              </div>

              <Link
                href="/contact"
                className="mt-10 inline-flex cursor-pointer items-center gap-3 rounded-lg bg-gold-gradient px-7 py-4 text-sm font-semibold shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Book Free Counselling
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionAndMission;
