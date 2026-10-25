"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Showroom" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/about", label: "Philosophy" },
  { href: "/contact", label: "Private Viewing" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Completely hide public guest Navbar on /admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#090B0F]/90 backdrop-blur-xl border-b border-white/[0.08]"
          : "bg-gradient-to-b from-[#090B0F]/85 via-[#090B0F]/40 to-transparent border-b border-white/[0.04]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 focus:outline-none"
          aria-label="VELOX Automotive Home"
        >
          <span className="w-1.5 h-6 bg-white rounded-full inline-block transition-transform duration-300 group-hover:scale-y-110" />
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.24em] text-white leading-none">
              VELOX
            </span>
            <span className="font-mono-tech text-[9px] tracking-[0.26em] text-[#949CA8] uppercase mt-1">
              AUTOMOTIVE
            </span>
          </div>
        </Link>

        {/* Desktop Guest Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-10"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-2 text-xs uppercase tracking-[0.18em] font-medium transition-colors ${
                  isActive ? "text-white" : "text-[#949CA8] hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-white transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Guest Primary CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#090B0F] hover:bg-[#E2E8F0] px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-[0.15em] transition-colors"
          >
            <span>Book a Viewing</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="md:hidden p-2.5 text-white rounded-md border border-white/15 hover:border-white/40 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#090B0F] border-b border-white/10 px-6 py-8 space-y-6"
        >
          <ul className="space-y-4">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href} className="border-b border-white/10 pb-3">
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between text-base uppercase tracking-[0.18em] font-display font-semibold ${
                      isActive ? "text-white" : "text-[#949CA8]"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="pt-2">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#090B0F] px-6 py-3.5 rounded-md text-xs font-semibold uppercase tracking-[0.18em]"
            >
              <span>Request Private Viewing</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
