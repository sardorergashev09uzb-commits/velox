"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ShieldAlert, Lock } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Hide guest Footer completely on /admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#090B0F] border-t border-white/[0.08] text-[#949CA8]">
      {/* Portfolio Concept Transparency Banner */}
      <div className="bg-[#0E1117] border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs">
            <ShieldAlert className="w-4 h-4 text-[#D6C7B2] shrink-0" />
            <p className="text-[#CBD5E1]">
              <strong className="text-white uppercase tracking-wider font-mono-tech mr-2">
                Portfolio Concept Project:
              </strong>
              VELOX Automotive is a fictional luxury performance marque created to showcase full-stack Next.js architecture and art direction.
            </p>
          </div>
          <span className="font-mono-tech text-[11px] text-[#949CA8] uppercase tracking-widest shrink-0">
            2026 EDITION
          </span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-white rounded-full inline-block" />
              <span className="font-display text-2xl font-bold tracking-[0.24em] text-white">
                VELOX
              </span>
            </div>
            <p className="text-sm text-[#949CA8] max-w-sm leading-relaxed">
              Engineered at the intersection of computational aerodynamics, lightweight carbon metallurgy, and electrified propulsion.
            </p>
            <div className="font-mono-tech text-xs text-[#5E6673] space-y-1">
              <p>DESIGN & WIND TUNNEL: ZÜRICH • MODENA • TOKYO</p>
            </div>
          </div>

          {/* Model Lineup */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-white">
              Signature Lineup
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/vehicles/velox-valkyrie-apex"
                  className="hover:text-white transition-colors"
                >
                  Valkyrie Apex (Hypercar)
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles/velox-vortex-gt"
                  className="hover:text-white transition-colors"
                >
                  Vortex GT (Electric Tourer)
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles/velox-kronos-rs"
                  className="hover:text-white transition-colors"
                >
                  Kronos RS (V10 Track Coupe)
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles/velox-aether-ev"
                  className="hover:text-white transition-colors"
                >
                  Aether EV (Quad-Motor)
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles/velox-spectre-gt-s"
                  className="hover:text-white transition-colors"
                >
                  Spectre GT-S (V8 Coupe)
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles/velox-titan-x"
                  className="hover:text-white transition-colors"
                >
                  Titan X (Performance SUV)
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-white">
              Showroom
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles"
                  className="hover:text-white transition-colors"
                >
                  Full Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Private Viewing
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct CTA */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-white">
              Private Concierge
            </h2>
            <p className="text-xs leading-relaxed text-[#949CA8]">
              Schedule a bespoke specification consultation or closed-circuit test drive.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-widest text-white hover:text-[#D6C7B2] transition-colors"
            >
              <span>Inquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Legal & Discreet Staff Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5E6673]">
          <p>© {new Date().getFullYear()} VELOX Automotive Concept. All specifications are sample data for portfolio demonstration.</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[#5E6673] hover:text-[#949CA8] transition-colors font-mono-tech text-[11px]"
          >
            <Lock className="w-3 h-3" />
            <span>Staff Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
