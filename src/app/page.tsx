import React from "react";
import Link from "next/link";
import { ArrowUpRight, Gauge, Wind, Cpu, ShieldCheck } from "lucide-react";
import {
  getAllVehiclesFromDb,
  getFeaturedVehiclesFromDb,
} from "@/lib/vehicles-db";
import { formatPrice } from "@/lib/utils";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [allVehicles, featuredVehicles] = await Promise.all([
    getAllVehiclesFromDb(),
    getFeaturedVehiclesFromDb(),
  ]);

  const flagship = featuredVehicles[0] || allVehicles[0];

  if (!flagship) {
    return null;
  }

  return (
    <div className="bg-[#08090B]">
      {/* 1. IMMERSIVE AUTOMOTIVE HERO */}
      <section className="relative min-h-[94vh] flex flex-col justify-end pt-28 pb-14 lg:pb-20 border-b border-white/10 overflow-hidden">
        {/* Background Hero Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src={flagship.images.hero}
            alt={`${flagship.name} hypercar in nocturnal studio lighting`}
            fetchPriority="high"
            className="w-full h-full object-cover object-center scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/40 to-[#08090B]/60" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-3 bg-[#0F1115]/90 border border-white/15 px-4 py-1.5 backdrop-blur-md">
              <span className="w-2 h-2 bg-[#D4FF00]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#C8CDD5]">
                {flagship.year} PREMIERE // {flagship.codeName}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-extrabold tracking-[-0.03em] text-white uppercase leading-[0.96]">
              ENGINEERED TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C8CDD5] to-[#D4FF00]">
                COMMAND VELOCITY.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#C8CDD5] max-w-2xl leading-relaxed font-normal">
              VELOX builds low-volume carbon hypercars and electrified grand tourers sculpted inside the wind tunnel. Unfiltered mechanical emotion meets computational precision.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-3 bg-[#D4FF00] text-[#08090B] px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                <span>Explore Vehicles ({allVehicles.length})</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#08090B]/80 backdrop-blur-md text-white border border-white/25 hover:border-[#D4FF00] px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-colors"
              >
                <span>Book a Viewing</span>
              </Link>
            </div>
          </div>

          {/* Bottom Hero Telemetry Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/15 bg-[#08090B]/85 backdrop-blur-md">
            <div className="p-5 sm:p-6 border-b sm:border-b-0 border-r border-white/10">
              <span className="block font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#9BA3B0]">
                FLAGSHIP MODEL
              </span>
              <span className="mt-1 block font-display text-lg sm:text-xl font-bold text-white truncate">
                {flagship.name.replace("VELOX ", "")}
              </span>
            </div>
            <div className="p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-white/10">
              <span className="block font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#9BA3B0]">
                0–100 KM/H ACCELERATION
              </span>
              <span className="mt-1 block font-mono-tech text-xl sm:text-2xl font-bold text-[#D4FF00]">
                {flagship.performance.zeroToHundred}
              </span>
            </div>
            <div className="p-5 sm:p-6 border-r border-white/10">
              <span className="block font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#9BA3B0]">
                COMBINED OUTPUT
              </span>
              <span className="mt-1 block font-mono-tech text-xl sm:text-2xl font-bold text-white">
                {flagship.performance.horsepower} PS
              </span>
            </div>
            <div className="p-5 sm:p-6 flex items-center justify-between">
              <div>
                <span className="block font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#9BA3B0]">
                  PEAK DOWNFORCE
                </span>
                <span className="mt-1 block font-mono-tech text-xl sm:text-2xl font-bold text-white">
                  {flagship.performance.downforceKg} KG
                </span>
              </div>
              <Link
                href={`/vehicles/${flagship.slug}`}
                aria-label={`Inspect ${flagship.name} dossier`}
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-[#D4FF00] hover:text-[#08090B] hover:border-[#D4FF00] transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRICAL EDITORIAL FEATURED VEHICLES */}
      <section className="py-24 lg:py-32 border-b border-white/10 bg-tech-grid">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
            <div className="space-y-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
                01 // CURATED LINEUP (LIVE DATABASE)
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                THE SIGNATURE MONOCOQUES
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#9BA3B0] max-w-md">
              Featured expressions of the VELOX engineering doctrine—managed dynamically via our SQLite database and Admin Telemetry Console.
            </p>
          </div>

          <div className="space-y-24">
            {featuredVehicles.map((vehicle, index) => {
              const isReversed = index % 2 === 1;
              return (
                <article
                  key={vehicle.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  <div
                    className={`lg:col-span-7 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Link
                      href={`/vehicles/${vehicle.slug}`}
                      className="group relative block aspect-[16/10] overflow-hidden bg-[#0F1115] border border-white/15"
                    >
                      <img
                        src={vehicle.images.hero}
                        alt={vehicle.name}
                        loading="lazy"
                        className="w-full h-full object-cover editorial-image-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                        <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-white bg-[#08090B]/85 px-3 py-1.5 border border-white/15">
                          {vehicle.series}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-[#D4FF00] text-[#08090B] px-3.5 py-1.5 font-mono-tech text-xs font-bold uppercase tracking-wider">
                          Inspect Dossier <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div
                    className={`lg:col-span-5 space-y-6 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#9BA3B0]">
                      <span className="text-[#D4FF00]">0{index + 1}</span>
                      <span>/</span>
                      <span>{vehicle.bodyType}</span>
                      <span>/</span>
                      <span>{vehicle.year}</span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                      {vehicle.name}
                    </h3>

                    <blockquote className="border-l-2 border-[#D4FF00] pl-4 text-sm sm:text-base text-[#C8CDD5] italic">
                      “{vehicle.editorialQuote}”
                    </blockquote>

                    <p className="text-sm text-[#9BA3B0] leading-relaxed">
                      {vehicle.overview}
                    </p>

                    <div className="grid grid-cols-3 border border-white/10 bg-[#0F1115] p-4 gap-4">
                      <div>
                        <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                          Power
                        </span>
                        <span className="font-mono-tech text-base font-bold text-white">
                          {vehicle.performance.horsepower} PS
                        </span>
                      </div>
                      <div className="border-x border-white/10 px-3">
                        <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                          0–100 km/h
                        </span>
                        <span className="font-mono-tech text-base font-bold text-[#D4FF00]">
                          {vehicle.performance.zeroToHundred}
                        </span>
                      </div>
                      <div>
                        <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                          Allocation
                        </span>
                        <span className="font-mono-tech text-base font-bold text-white">
                          {formatPrice(vehicle.price)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/vehicles/${vehicle.slug}`}
                        className="inline-flex items-center gap-2 bg-white text-[#08090B] hover:bg-[#D4FF00] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors"
                      >
                        <span>Full Specifications</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/contact?vehicle=${vehicle.slug}`}
                        className="inline-flex items-center gap-2 border border-white/20 hover:border-[#D4FF00] text-white px-6 py-3 text-xs font-mono-tech uppercase tracking-[0.18em] transition-colors"
                      >
                        <span>Request Viewing</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LIGHT EDITORIAL CONTRAST SECTION: ENGINEERING PHILOSOPHY */}
      <section className="bg-[#F2F3F5] text-[#08090B] py-24 lg:py-32 border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end border-b border-black/15 pb-12">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block font-mono-tech text-xs uppercase tracking-[0.25em] bg-[#08090B] text-[#D4FF00] px-3 py-1">
                02 // ARCHITECTURAL DOCTRINE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[0.98]">
                FORM FOLLOWS <br /> AERODYNAMIC VIOLENCE.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base sm:text-lg text-[#2C313A] leading-relaxed">
                At VELOX, styling never dictates engineering. Every intake aperture, dihedral door channel, and titanium wishbone is mathematically resolved before a single clay model is milled.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-black/10 p-7 space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Wind className="w-6 h-6 text-[#08090B]" />
                <span className="font-mono-tech text-xs font-bold text-[#5E6673]">
                  01 / CFD
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold uppercase">
                  Underbody Venturi Aero
                </h3>
                <p className="text-sm text-[#4A515E] leading-relaxed">
                  Sub-surface carbon tunnels generate up to 890 kg of ground-effect suction without the drag penalty of oversized fixed wings.
                </p>
              </div>
              <p className="font-mono-tech text-xs uppercase tracking-wider text-[#08090B] font-bold pt-2 border-t border-black/10">
                PEAK LOAD: 890 KG @ 280 KM/H
              </p>
            </div>

            <div className="bg-white border border-black/10 p-7 space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-6 h-6 text-[#08090B]" />
                <span className="font-mono-tech text-xs font-bold text-[#5E6673]">
                  02 / CHASSIS
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold uppercase">
                  T1000 Carbon-Titanium Tub
                </h3>
                <p className="text-sm text-[#4A515E] leading-relaxed">
                  Autoclave-cured pre-preg carbon interwoven with titanium matrix filaments delivers 52,000 Nm/deg of torsional rigidity.
                </p>
              </div>
              <p className="font-mono-tech text-xs uppercase tracking-wider text-[#08090B] font-bold pt-2 border-t border-black/10">
                MONOCOQUE MASS: 84.5 KG
              </p>
            </div>

            <div className="bg-white border border-black/10 p-7 space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Cpu className="w-6 h-6 text-[#08090B]" />
                <span className="font-mono-tech text-xs font-bold text-[#5E6673]">
                  03 / PROPULSION
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold uppercase">
                  Axial-Flux Torque Vectoring
                </h3>
                <p className="text-sm text-[#4A515E] leading-relaxed">
                  Ultra-compact axial-flux electric motors fill torque gaps in 2 milliseconds, pairing seamlessly with high-revving combustion or solid-state cells.
                </p>
              </div>
              <p className="font-mono-tech text-xs uppercase tracking-wider text-[#08090B] font-bold pt-2 border-t border-black/10">
                RESPONSE LATENCY: &lt; 2.0 MS
              </p>
            </div>

            <div className="bg-white border border-black/10 p-7 space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Gauge className="w-6 h-6 text-[#08090B]" />
                <span className="font-mono-tech text-xs font-bold text-[#5E6673]">
                  04 / TELEMETRY
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold uppercase">
                  Bespoke Driver Cockpit
                </h3>
                <p className="text-sm text-[#4A515E] leading-relaxed">
                  Zero touchscreen distraction. Billet-machined rotary switches, 3D-printed seat lattices mapped to the owner, and HUD apex projection.
                </p>
              </div>
              <p className="font-mono-tech text-xs uppercase tracking-wider text-[#08090B] font-bold pt-2 border-t border-black/10">
                INTERFACE: ANALOG + LASER HUD
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FULL SHOWROOM PREVIEW GRID */}
      <section className="py-24 lg:py-32 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
                03 // COMPLETE FLEET
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white">
                EXPLORE THE CATALOGUE
              </h2>
            </div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#D4FF00] text-white px-6 py-3.5 text-xs font-mono-tech uppercase tracking-[0.2em] transition-colors"
            >
              <span>Filter All {allVehicles.length} Models</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4FF00]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allVehicles.map((vehicle, idx) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRIVATE VIEWING / TEST-DRIVE INQUIRY BANNER */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="relative bg-[#0F1115] border border-white/15 p-8 sm:p-14 lg:p-20 overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">
                <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
                  04 // PRIVATE ATELIER & TRACK ACCESS
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white leading-tight">
                  COMMISSION YOUR SPECIFICATION OR REQUEST A TRACK TELEMETRY SESSION.
                </h2>
                <p className="text-sm sm:text-base text-[#9BA3B0] max-w-2xl leading-relaxed">
                  Private viewings are hosted by appointment at our Zürich, Modena, and Tokyo sanctuaries, or on closed FIA Grade-1 circuits with a VELOX factory test driver.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#D4FF00] text-[#08090B] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                >
                  <span>Schedule Private Viewing</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:border-[#D4FF00] px-8 py-4 text-xs font-mono-tech uppercase tracking-[0.2em] transition-colors"
                >
                  <span>Open Admin Console</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
