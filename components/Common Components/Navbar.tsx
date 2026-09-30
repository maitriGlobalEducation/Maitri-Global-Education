"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { title: "HOME", href: "/" },
  { title: "EXPLORE", href: "/explore" },
  { title: "SCHOLARSHIPS", href: "/scholarships" },
  { title: "EVENTS & WEBINARS", href: "/events" },
  { title: "BLOGS", href: "/blogs" },
  { title: "SERVICES", href: "/service" },
  // { title: "ELITE CAREER CHOICE", href: "/elite-career" },
  { title: "ABOUT", href: "/about" },
  { title: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-gray-300 z-20">
      {/* Hamburger for mobile + tablets */}
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
        className="lg:hidden absolute top-3 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-white/15"
      >
        {menuOpen ? <X size={22} /> : <Menu size={24} />}
      </button>

      {/* Row 1: Logo */}
      <div className="flex flex-col items-center py-1">
        <img
          src="/maitri.png"
          alt="maitri logo"
          className="h-16 w-auto mx-auto"
        />
      </div>

      {/* Row 2: Nav Links */}
      <div className="relative">
        {/* Nav links (desktop only) */}
        <div className="hidden lg:flex justify-center gap-14 py-1 text-sm lg:text-base">
          {navLinks.map((item, id) =>
            item.title === "SCHOLARSHIPS" ? (
              <Link
                key={id}
                href={item.href}
                className="hover:text-white transition-colors duration-200 text-sm"
              >
                {item.title}
              </Link>
            ) : (
              <a
                key={id}
                href={item.href}
                className="hover:text-white transition-colors duration-200 text-sm"
              >
                {item.title}
              </a>
            ),
          )}
        </div>

        {/* Nav links (mobile + tablet) */}
        <div
          className={`overflow-hidden border-t border-white/10 bg-black transition-all duration-300 lg:hidden ${
            menuOpen
              ? "max-h-200 opacity-100"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="px-5 py-5">
            {navLinks.map((item, id) =>
              item.title === "SCHOLARSHIPS" ? (
                <Link
                  key={id}
                  href={item.href}
                  className="block w-full border-b border-white/10 py-4 text-sm font-normal"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  key={id}
                  href={item.href}
                  className="block w-full border-b border-white/10 py-4 text-sm font-normal"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
