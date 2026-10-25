"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Shield } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Showroom", code: "01" },
  { href: "/vehicles", label: "Vehicles", code: "02" },
  { href: "/about", label: "Philosophy", code: "03" },
  { href: "/contact", label: "Private Viewing", code: "04" },
  { href: "/admin", label: "Admin Console", code: "05" },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#08090B]/95 backdrop-blur-md border-b border-white/10"
          : "bg-gradient-to-b from-[#08090B]/90 via-[#08090B]/50 to-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="VELOX Automotive Home"
        >
          <span className="w-2.5 h-6 bg-[#D4FF00] inline-block transition-transform duration-300 group-hover:scale-y-125" />
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-extrabold tracking-[0.22em] text-white leading-none">
              VELOX
            </span>
            <span className="font-mono-tech text-[9px] tracking-[0.28em] text-[#9BA3B0] uppercase mt-1">
              AUTOMOTIVE // DIV.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-8"
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
                  isActive ? "text-white" : "text-[#9BA3B0] hover:text-white"
                }`}
              >
                <span className="font-mono-tech text-[10px] text-[#5E6673] mr-1.5 group-hover:text-[#D4FF00] transition-colors">
                  {link.code}
                </span>
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#D4FF00] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Primary CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 border border-white/15 hover:border-[#D4FF00] text-[#C8CDD5] hover:text-white px-3.5 py-2.5 text-[11px] font-mono-tech uppercase tracking-wider transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>Admin</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#D4FF00] text-[#08090B] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors"
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
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden p-2.5 text-white border border-white/15 hover:border-[#D4FF00] transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#08090B] border-b border-white/15 px-6 py-8 space-y-6"
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
                    className={`flex items-center justify-between text-base uppercase tracking-[0.2em] font-display font-bold ${
                      isActive ? "text-[#D4FF00]" : "text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono-tech text-xs text-[#9BA3B0]">
                      /{link.code}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="pt-2">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D4FF00] text-[#08090B] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em]"
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
