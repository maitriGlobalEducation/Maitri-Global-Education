"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [navbarTheme, setNavbarTheme] = useState<"light" | "dark">("light");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const detectNavbarTheme = () => {
      // Keep the existing scrolled navbar appearance unchanged.
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

    window.addEventListener("scroll", detectNavbarTheme, { passive: true });
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-full px-3 py-3 text-[11px] font-semibold tracking-[0.12em] transition-colors duration-200 xl:px-4 xl:text-xs ${
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {item.title}

                <span
                  className={`absolute inset-x-4 bottom-1 h-px origin-center transition-transform duration-300 bg-[#D4AF37] ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="ml-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-[#8A6420] via-[#FFF0A3] to-[#A77B22] px-5 py-3 text-xs font-bold tracking-wide text-[#263b51] transition duration-300 hover:bg-white"
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
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile navigation panel */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-white/10 bg-black px-5 pb-5 pt-2 shadow-2xl backdrop-blur-2xl sm:px-8">
            {navLinks.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-white/10 py-4 text-xs font-medium tracking-[0.12em] transition-colors ${
                    isActive
                      ? "text-[#D4AF37]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <span>{item.title}</span>
                  <ArrowUpRight size={16} className="text-white/45" />
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#8A6420] via-[#FFF0A3] to-[#A77B22] px-5 py-3.5 text-xs font-bold text-[#263b51] transition"
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
