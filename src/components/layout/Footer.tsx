import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { getAllVehiclesFromDb } from "@/lib/vehicles-db";

export async function Footer() {
  const vehicles = await getAllVehiclesFromDb();

  return (
    <footer className="bg-[#08090B] border-t border-white/10 text-[#9BA3B0]">
      {/* Portfolio Concept Transparency Banner */}
      <div className="bg-[#0F1115] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs">
            <ShieldAlert className="w-4 h-4 text-[#D4FF00] shrink-0" />
            <p className="text-[#C8CDD5]">
              <strong className="text-white uppercase tracking-wider font-mono-tech mr-2">
                Portfolio Concept Project:
              </strong>
              VELOX Automotive is a fictional high-performance marque backed by a live SQLite + Prisma database and full Admin CMS.
            </p>
          </div>
          <Link
            href="/admin"
            className="font-mono-tech text-[11px] text-[#D4FF00] uppercase tracking-widest shrink-0 hover:underline"
          >
            ADMIN CONSOLE // {vehicles.length} MODELS ACTIVE →
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-[#D4FF00] inline-block" />
              <span className="font-display text-2xl font-extrabold tracking-[0.22em] text-white">
                VELOX
              </span>
            </div>
            <p className="text-sm text-[#9BA3B0] max-w-sm leading-relaxed">
              Engineered at the intersection of computational aerodynamics, lightweight carbon metallurgy, and electrified propulsion.
            </p>
            <div className="font-mono-tech text-xs text-[#5E6673] space-y-1">
              <p>ATELIER & WIND TUNNEL: ZÜRICH // MODENA // TOKYO</p>
              <p>TELEMETRY DIVISION: 47.3769° N, 8.5417° E</p>
            </div>
          </div>

          {/* Dynamic Model Lineup from SQLite DB */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.22em] text-white">
              01 // Live Fleet ({vehicles.length})
            </h2>
            <ul className="space-y-2.5 text-sm">
              {vehicles.slice(0, 6).map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/vehicles/${v.slug}`}
                    className="hover:text-[#D4FF00] transition-colors"
                  >
                    {v.name.replace("VELOX ", "")} ({v.bodyType})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.22em] text-white">
              02 // Experience
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Showroom Home
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
                  Engineering Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Book a Viewing
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-[#D4FF00] hover:underline transition-colors"
                >
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct CTA */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.22em] text-white">
              03 // Private Lounge
            </h2>
            <p className="text-xs leading-relaxed text-[#9BA3B0]">
              Schedule a bespoke specification consultation or closed-circuit test drive.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-widest text-[#D4FF00] hover:underline"
            >
              <span>Inquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Legal & Portfolio Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5E6673] font-mono-tech">
          <p>© {new Date().getFullYear()} VELOX AUTOMOTIVE CONCEPT. ALL SPECIFICATIONS ARE DYNAMICALLY SERVED FROM SQLITE.</p>
          <p>DESIGNED & ENGINEERED FOR FREELANCE DEVELOPER PORTFOLIO</p>
        </div>
      </div>
    </footer>
  );
}
