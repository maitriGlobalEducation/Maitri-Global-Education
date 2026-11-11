import AboutPage from "@/components/About Page Components/About";
import AboutFAQ from "@/components/About Page Components/AboutFAQ";
import AboutServicesSection from "@/components/Services Page Components/ServicesSection";
import Testimonials from "@/components/Home Page Components/Testimonials";
import { getPublicTestimonials } from "@/services/testimonial.service";
import Link from "next/link";

const benefits = [
  "Established international education consultancy since 2009.",
  "More than 10,000 students supported.",
  "International university and institutional partnerships.",
  "Free one-on-one education counselling.",
  "Scholarship and admission assistance.",
  "International presence in Italy, India and Dubai.",
  "Practical student support beyond university admissions.",
];

const page = async () => {
  const [testimonials] = await Promise.all([getPublicTestimonials()]);
  return (
    <>
      <AboutPage />
      {/* <AboutServicesSection /> */}
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
            Book Free Counselling
          </Link>

          <p className="mt-8 text-sm leading-7 text-white/50">
            Maitri Global Education – Your partner in international education,
            from admission to arrival.
          </p>
        </div>
      </section>
      <Testimonials testimonials={testimonials} />
      <AboutFAQ />
    </>
  );
};

export default page;
