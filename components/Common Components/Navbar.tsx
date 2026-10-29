"use client";

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Palette,
  Clapperboard,
  CookingPot,
  BriefcaseBusiness,
  HeartPulse,
  Cpu,
  PanelsTopLeft,
  Languages,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { title: "HOME", href: "/" },
  { title: "SCHOLARSHIPS", href: "/scholarships" },
  { title: "BLOGS", href: "/blogs" },
  { title: "EVENTS", href: "/events" },
  { title: "ABOUT", href: "/about" },
  { title: "CONTACT US", href: "/contact" },
];

const exploreColleges = [
  {
    title: "Art, Fashion & Design",
    href: "/explore/college/art-fashion-design",
    Icon: Palette,
  },
  {
    title: "Film, Animation, Media & Acting",
    href: "/explore/college/film-animation-media-acting",
    Icon: Clapperboard,
  },
  {
    title: "Hospitality & Culinary Arts",
    href: "/explore/college/hospitality-culinary-arts",
    Icon: CookingPot,
  },
  {
    title: "Business & Management",
    href: "/explore/college/business-management",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Medical",
    href: "/explore/college/medical",
    Icon: HeartPulse,
  },
  {
    title: "Engineering, Humanities & Social Sciences",
    href: "/explore/college/engineering-humanities-social-sciences",
    Icon: Cpu,
  },
];

const maitriCourses = [
  {
    title: "Portfolio Design",
    href: "/courses/portfolio-design",
    Icon: PanelsTopLeft,
  },
  {
    title: "Language Courses",
    href: "/courses/language-courses",
    Icon: Languages,
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  const pathname = usePathname();
  const [navbarTheme, setNavbarTheme] = useState<"light" | "dark">("light");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const detectNavbarTheme = () => {
      if (window.scrollY > 24) return;

      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const detectionY = headerHeight + 1;

      const sections = document.querySelectorAll<HTMLElement>(
        "[data-navbar-theme]",
      );

      const activeSection = Array.from(sections).find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= detectionY && rect.bottom > detectionY;
      });

      const theme = activeSection?.dataset.navbarTheme;

      if (theme === "light" || theme === "dark") {
        setNavbarTheme(theme);
      }
    };

    detectNavbarTheme();

    window.addEventListener("scroll", detectNavbarTheme, {
      passive: true,
    });
    window.addEventListener("resize", detectNavbarTheme);

    return () => {
      window.removeEventListener("scroll", detectNavbarTheme);
      window.removeEventListener("resize", detectNavbarTheme);
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setExploreOpen(false);
    setMobileExploreOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileExploreOpen(false);
  };

  const isActiveLink = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/20 bg-black shadow-lg shadow-black/10 backdrop-blur-2xl"
          : navbarTheme === "light"
            ? "border-b border-white/10 bg-black"
            : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="Maitri Global Education home"
          className="relative z-10 shrink-0"
        >
          <img
            src="/maitri.png"
            alt="Maitri Global Education"
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
            }`}
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(0, 1).map((item) => {
            const active = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-full px-3 py-3 text-[11px] font-semibold tracking-[0.12em] transition-colors duration-200 xl:px-4 xl:text-xs ${
                  active ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {item.title}
                <span
                  className={`absolute inset-x-4 bottom-1 h-px origin-center bg-[#D4AF37] transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          {/* Explore mega menu trigger */}
          <div
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button
              type="button"
              aria-expanded={exploreOpen}
              aria-controls="desktop-explore-menu"
              onClick={() => setExploreOpen((previous) => !previous)}
              onFocus={() => setExploreOpen(true)}
              className={`group relative inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-3 text-[11px] font-semibold tracking-[0.12em] transition-colors xl:px-4 xl:text-xs ${
                exploreOpen ||
                pathname.startsWith("/explore") ||
                pathname.startsWith("/courses")
                  ? "text-white"
                  : "text-white/75 hover:text-white"
              }`}
            >
              EXPLORE
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  exploreOpen ? "rotate-180" : ""
                }`}
              />
              <span className="absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-[#D4AF37] transition-transform duration-300 group-hover:scale-x-100" />
            </button>

            {/* Desktop mega menu */}
            <div
              id="desktop-explore-menu"
              className={`absolute left-1/2 top-full w-[min(100vw-2rem,1240px)] -translate-x-1/2 pt-3 transition-all duration-200 ${
                exploreOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-b-xl border border-zinc-100 bg-white p-5 text-zinc-800 shadow-2xl sm:p-6 lg:p-7">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
                  {/* Explore College */}
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-dashed border-zinc-300 pb-2">
                      <h2 className="text-[#D4AF37] text-xs font-bold uppercase tracking-wide">
                        Explore College
                      </h2>
                      {/* <Link
                        href="/explore/college"
                        onClick={() => setExploreOpen(false)}
                        className="inline-flex items-center gap-1 text-xs text-zinc-500 transition hover:text-[#f04b23]"
                      >
                        View all
                        <ArrowUpRight size={13} />
                      </Link> */}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {exploreColleges.map(({ title, href, Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setExploreOpen(false)}
                          className="group flex min-h-22 flex-col items-center justify-center gap-2 rounded-md bg-white px-3 py-4 text-center shadow-[0_5px_25px_rgba(0,0,0,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
                        >
                          <Icon
                            size={27}
                            strokeWidth={1.25}
                            className="text-[#D4AF37] transition-transform duration-200 group-hover:scale-110 group-hover:text-[#e4bd40]"
                          />
                          <span className="text-sm leading-5 text-zinc-700 group-hover:text-[#d8b133]">
                            {title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Maitri Courses */}
                  <div>
                    <div className="mb-4 border-b border-dashed border-zinc-300 pb-2">
                      <h2 className="text-xs font-bold uppercase tracking-wide text-[#D4AF37]">
                        Maitri Courses
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {maitriCourses.map(({ title, href, Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setExploreOpen(false)}
                          className="group flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-center shadow-[0_5px_25px_rgba(0,0,0,0.08)] transition duration-200 hover:-translate-y-0.5 hover:text-[#d3ad31] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.5}
                            className="text-[#D4AF37] md:hidden"
                          />
                          <span className="text-sm">{title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {navLinks.slice(1).map((item) => {
            const active = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-full px-3 py-3 text-[11px] font-semibold tracking-[0.12em] transition-colors duration-200 xl:px-4 xl:text-xs ${
                  active ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {item.title}
                <span
                  className={`absolute inset-x-4 bottom-1 h-px origin-center bg-[#D4AF37] transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="ml-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-[#8A6420] via-[#FFF0A3] to-[#A77B22] px-5 py-3 text-xs font-bold tracking-wide text-[#263b51] transition duration-300 hover:brightness-105"
          >
            GET IN TOUCH
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previous) => !previous)}
          className="relative z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <div className="max-h-[calc(100dvh-5rem)] border-t border-white/10 bg-black px-5 pb-5 pt-2 shadow-2xl sm:px-8">
            {navLinks.slice(0, 1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between border-b border-white/10 py-4 text-xs font-medium tracking-[0.12em] ${
                  isActiveLink(item.href)
                    ? "text-[#D4AF37]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.title}
                <ArrowUpRight size={16} className="text-white/45" />
              </Link>
            ))}

            {/* Mobile Explore accordion */}
            <div className="border-b border-white/10">
              <button
                type="button"
                aria-expanded={mobileExploreOpen}
                onClick={() => setMobileExploreOpen((previous) => !previous)}
                className="flex w-full cursor-pointer items-center justify-between py-4 text-xs font-semibold tracking-[0.12em] text-white/90"
              >
                <span>EXPLORE</span>
                <ChevronDown
                  size={17}
                  className={`transition-transform duration-200 ${
                    mobileExploreOpen ? "rotate-180 text-[#D4AF37]" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  mobileExploreOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="pb-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4AF37]">
                      Explore College
                    </p>

                    <div className="space-y-1">
                      {exploreColleges.map(({ title, href, Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
                        >
                          <Icon
                            size={18}
                            strokeWidth={1.4}
                            className="shrink-0 text-[#D4AF37]"
                          />
                          <span>{title}</span>
                          <ArrowUpRight
                            size={14}
                            className="ml-auto shrink-0 text-white/30"
                          />
                        </Link>
                      ))}
                    </div>

                    {/* <Link
                      href="/explore/college"
                      onClick={closeMobileMenu}
                      className="mt-2 flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#D4AF37]"
                    >
                      View all colleges
                      <ArrowUpRight size={14} />
                    </Link> */}

                    <p className="mb-2 mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4AF37]">
                      Maitri Courses
                    </p>

                    <div className="space-y-1">
                      {maitriCourses.map(({ title, href, Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
                        >
                          <Icon
                            size={18}
                            strokeWidth={1.4}
                            className="shrink-0 text-[#D4AF37]"
                          />
                          <span>{title}</span>
                          <ArrowUpRight
                            size={14}
                            className="ml-auto shrink-0 text-white/30"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between border-b border-white/10 py-4 text-xs font-medium tracking-[0.12em] transition-colors ${
                  isActiveLink(item.href)
                    ? "text-[#D4AF37]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span>{item.title}</span>
                <ArrowUpRight size={16} className="text-white/45" />
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#8A6420] via-[#FFF0A3] to-[#A77B22] px-5 py-3.5 text-xs font-bold text-[#263b51] transition hover:brightness-105"
            >
              GET IN TOUCH
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
