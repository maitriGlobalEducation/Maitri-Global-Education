import Image from "next/image";
import Link from "next/link";
import { Phone, Send } from "lucide-react";
import { siFacebook, siInstagram, siYoutube } from "simple-icons";

const quickLinks = [
  { label: "Undergraduate Courses", href: "/undergraduate-courses" },
  { label: "Master/Phd. Courses", href: "/masters-courses" },
  { label: "Short Courses", href: "/short-courses" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Events and talk", href: "/events" },
  { label: "About Maitri", href: "/about" },
];

const countries = [
  { label: "Italy", href: "/countries/italy" },
  { label: "France", href: "/countries/france" },
  { label: "Germany", href: "/countries/germany" },
  { label: "Ireland", href: "/countries/ireland" },
  { label: "Spain", href: "/countries/spain" },
  { label: "USA", href: "/countries/usa" },
  { label: "Canada", href: "/countries/canada" },
  { label: "Ukraine", href: "/countries/ukraine" },
];

const careerAreas = [
  { label: "Art, Fashion & Design", href: "/career-areas/art-fashion-design" },
  {
    label: "Business & Management",
    href: "/career-areas/business-management",
  },
  {
    label: "Film, Animation, Media & Acting",
    href: "/career-areas/film-animation-media-acting",
  },
  {
    label: "Hospitality & Culinary Arts",
    href: "/career-areas/hospitality-culinary-arts",
  },
  {
    label: "Engineering, Humanities & Social Sciences",
    href: "/career-areas/engineering-humanities-social-sciences",
  },
];

const courses = [
  { label: "Portfolio Preparation", href: "/courses/portfolio-preparation" },
  { label: "Italian Language Course", href: "/courses/italian-language" },
];

const footerSections = [
  {
    title: "Quick Links",
    links: quickLinks,
  },
  {
    title: "Countries",
    links: countries,
  },
  {
    title: "Career Areas",
    links: careerAreas,
  },
  {
    title: "Courses",
    links: courses,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#242124] text-white">
      {/* Main footer */}
      <div
        className="
          mx-auto max-w-330 px-5 py-12
          lg:grid lg:grid-cols-[1.25fr_0.8fr_0.55fr_0.85fr_0.8fr_1.6fr]
          lg:gap-10 lg:px-8 lg:py-12
        "
      >
        {/* Company */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="https://maitriglobaleducation.com/public/img/logo/small.png"
              alt="Maitri Global Education"
              width={150}
              height={80}
              className="h-auto w-30 lg:w-36"
            />
          </Link>

          <div className="mt-8 text-sm leading-5 text-[#d0cbd0]">
            <h3 className="mb-2 text-base font-bold text-white">HQ Office:</h3>

            <address className="not-italic">
              Via di Villamagna 98
              <br />
              Florence, Italy 50126.
            </address>

            <p className="mt-6">Weekdays: 9:00am to 5:00pm</p>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <Phone size={19} strokeWidth={1.7} className="text-[#ff5a24]" />

                <span className="font-bold text-white">Phone:</span>
              </div>

              <div className="mt-2 space-y-1">
                <a
                  href="tel:+393318476757"
                  className="block transition-colors hover:text-[#ff5a24]"
                >
                  +393318476757
                </a>

                <a
                  href="tel:+393249887245"
                  className="block transition-colors hover:text-[#ff5a24]"
                >
                  +393249887245
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop links */}
        {footerSections.map((section) => (
          <FooterLinks
            key={section.title}
            title={section.title}
            links={section.links}
          />
        ))}

        {/* Newsletter */}
        <div className="mt-10 border-t border-white/10 pt-8 lg:mt-0 lg:border-0 lg:pt-0">
          <FooterHeading>Subscribe to newsletter</FooterHeading>

          <p className="mt-5 max-w-90 text-sm leading-6 text-[#d0cbd0]">
            Receive updates on the latest scholarships, events, career tips and
            study abroad experiences.
          </p>

          <form className="mt-5 flex h-10 w-full max-w-90 overflow-hidden rounded-full bg-[#575158]">
            <input
              type="email"
              placeholder="Enter Email Address"
              aria-label="Email address"
              className="
                min-w-0 flex-1 bg-transparent
                px-4 text-sm text-white
                outline-none placeholder:text-[#eee]
              "
            />

            <button
              type="submit"
              aria-label="Subscribe"
              className="
                flex w-12 shrink-0 items-center
                justify-center bg-[#ff6547]
                transition hover:bg-[#f4512c]
              "
            >
              <Send size={17} />
            </button>
          </form>

          {/* Socials */}
          <div className="mt-6 flex gap-3">
            <SocialLink
              href="#"
              label="Facebook"
              className="bg-[#34579a]"
              path={siFacebook.path}
            />

            <SocialLink
              href="#"
              label="Instagram"
              className="bg-[#d60072]"
              path={siInstagram.path}
            />

            <SocialLink
              href="#"
              label="YouTube"
              className="bg-[#ff0017]"
              path={siYoutube.path}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#ff5a24]">
        <div
          className="
            mx-auto flex max-w-330
            flex-col items-center
            gap-4 px-5 py-5
            text-center text-xs

            lg:flex-row
            lg:justify-between
            lg:px-8 lg:py-4
            lg:text-sm
          "
        >
          <p>
            © {new Date().getFullYear()} Maitri Global Education. All rights
            reserved, P.IVA 06726250480
          </p>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-opacity hover:opacity-75"
            >
              Privacy Policy
            </Link>

            <span className="hidden opacity-60 sm:inline">|</span>

            <Link
              href="/dmca-policy"
              className="transition-opacity hover:opacity-75"
            >
              DMCA Policy
            </Link>

            <span className="hidden opacity-60 sm:inline">|</span>

            <Link
              href="/terms-and-conditions"
              className="transition-opacity hover:opacity-75"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-bold text-white">{children}</h3>

      <div className="mt-2 h-1 w-7 rounded-full bg-[#ff5a24]" />
    </div>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div className="mt-10 lg:mt-0">
      <FooterHeading>{title}</FooterHeading>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="
                text-sm leading-5 text-[#d0cbd0]
                transition-colors
                hover:text-[#ff5a24]
              "
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  className,
  path,
}: {
  href: string;
  label: string;
  className: string;
  path: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex size-10 items-center
        justify-center rounded-full
        text-white transition-transform
        hover:-translate-y-1
        ${className}
      `}
    >
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 fill-current"
      >
        <path d={path} />
      </svg>
    </a>
  );
}
