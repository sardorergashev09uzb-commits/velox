import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Layers, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Philosophy & Engineering — VELOX Automotive",
  description:
    "Discover the story, aerodynamic doctrine, and portfolio concept architecture behind VELOX Automotive.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#090B0F] pt-28 pb-24 lg:pb-32">
      {/* 1. EDITORIAL HERO */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-20 border-b border-white/[0.08] space-y-12">
        <div className="max-w-4xl space-y-5">
          <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
            Brand Manifesto • Concept 2026
          </span>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.03]">
            We Do Not Style Metal. <br /> We Sculpt Airflow.
          </h1>
          <p className="text-base sm:text-xl text-[#CBD5E1] leading-relaxed max-w-3xl">
            VELOX was conceived around a singular obsession: removing every barrier between a driver’s neurological intent and the mechanical response of a carbon-titanium chassis at speed.
          </p>
        </div>

        {/* Wide Editorial Photography Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 relative aspect-[16/9] rounded-xl border border-white/10 overflow-hidden bg-[#11141B]">
            <img
              src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85"
              alt="VELOX aerodynamic wind tunnel study"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090B0F] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 font-mono-tech text-xs text-white bg-[#090B0F]/85 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/10">
              FIG 01 • ZÜRICH COMPUTATIONAL FLUID DYNAMICS LAB
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#11141B] rounded-xl border border-white/[0.08] p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2]">
                The Three Laws of VELOX
              </span>
              <h2 className="font-display text-2xl font-bold text-white">
                Zero Ornamentation
              </h2>
              <p className="text-sm text-[#949CA8] leading-relaxed">
                If a louver, splitter, or crease does not extract thermal load from the inverters or increase negative lift across the axle, it is deleted from the CAD model.
              </p>
            </div>

            <div className="space-y-4 border-t border-white/[0.08] pt-6 font-mono-tech text-xs">
              <div className="flex justify-between">
                <span className="text-[#5E6673]">TORSIONAL RIGIDITY</span>
                <span className="text-white">52,000 NM/DEG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5E6673]">CARBON AUTOCLAVE CURING</span>
                <span className="text-white">140°C @ 7 BAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5E6673]">TELEMETRY SAMPLING</span>
                <span className="text-[#D6C7B2]">1,000 HZ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIGHT EDITORIAL CONTRAST SECTION: THE ATELIER TRIAD */}
      <section className="bg-[#F4F5F7] text-[#090B0F] py-20 lg:py-28 border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] bg-[#090B0F] text-white px-3.5 py-1.5 rounded-md inline-block">
              Global Engineering Triad
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
              Three Cities. One Monocoque.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-black/[0.08] p-8 space-y-4 shadow-sm">
              <span className="font-mono-tech text-xs font-semibold text-[#5E6673]">
                01 // ZÜRICH, SWITZERLAND
              </span>
              <h3 className="font-display text-2xl font-bold">
                Aerodynamics & Software
              </h3>
              <p className="text-sm text-[#4A5260] leading-relaxed">
                Home to our rolling-road wind tunnel and torque-vectoring control algorithms. Every millisecond of slip-angle prediction is written and simulated in Zürich.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-black/[0.08] p-8 space-y-4 shadow-sm">
              <span className="font-mono-tech text-xs font-semibold text-[#5E6673]">
                02 // MODENA, ITALY
              </span>
              <h3 className="font-display text-2xl font-bold">
                Carbon & Combustion
              </h3>
              <p className="text-sm text-[#4A5260] leading-relaxed">
                Where our pre-preg carbon-titanium tubs are hand-laid and our high-revving flat-plane V8 and naturally aspirated V10 engines are dyno-calibrated.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-black/[0.08] p-8 space-y-4 shadow-sm">
              <span className="font-mono-tech text-xs font-semibold text-[#5E6673]">
                03 // TOKYO, JAPAN
              </span>
              <h3 className="font-display text-2xl font-bold">
                Solid-State & Axial Flux
              </h3>
              <p className="text-sm text-[#4A5260] leading-relaxed">
                Our high-voltage battery cell laboratory and cockpit human-machine interface studio, blending billet titanium switchgear with laser HUD optics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PORTFOLIO POSITIONING & TECHNICAL ARCHITECTURE DISCLOSURE */}
      <section className="pt-20 lg:pt-28 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="bg-[#11141B] rounded-2xl border border-white/10 p-8 sm:p-12 lg:p-16 space-y-10">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
              Portfolio Case Study Disclosure
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
              About This Concept Project
            </h2>
            <p className="text-sm sm:text-base text-[#949CA8] leading-relaxed">
              <strong className="text-white">VELOX Automotive</strong> is an original fictional marque created as a freelance developer portfolio piece. It is designed to contrast with bright luxury fashion/editorial websites (such as <em>ATELIER</em>) by demonstrating mastery of dark-mode nocturnal art direction, technical typography, and full-stack interactive architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/[0.08] bg-[#090B0F] p-6 space-y-3">
              <Compass className="w-5 h-5 text-[#D6C7B2]" />
              <h3 className="font-display text-lg font-bold text-white">
                Art Direction & UX
              </h3>
              <p className="text-xs text-[#949CA8] leading-relaxed">
                Asymmetrical editorial layouts, balanced typography, high-contrast light/dark sections, and accessible keyboard navigation.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#090B0F] p-6 space-y-3">
              <Layers className="w-5 h-5 text-[#D6C7B2]" />
              <h3 className="font-display text-lg font-bold text-white">
                Reusable Data Architecture
              </h3>
              <p className="text-xs text-[#949CA8] leading-relaxed">
                Strictly typed TypeScript vehicle models powering dynamic App Router pages, real-time multi-criteria filtering, and interactive image galleries.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#090B0F] p-6 space-y-3">
              <Terminal className="w-5 h-5 text-[#D6C7B2]" />
              <h3 className="font-display text-lg font-bold text-white">
                Next.js + Prisma + SQLite
              </h3>
              <p className="text-xs text-[#949CA8] leading-relaxed">
                Full-stack inquiry handling with server-side Zod validation, SQLite persistence via Prisma ORM, and a protected staff studio.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 bg-white text-[#090B0F] hover:bg-[#E2E8F0] px-7 py-4 rounded-md text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
            >
              <span>Explore the Fleet</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/15 text-white hover:border-white/40 px-7 py-4 rounded-md text-xs font-mono-tech uppercase tracking-[0.18em] transition-colors"
            >
              <span>Test the Booking Flow</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
