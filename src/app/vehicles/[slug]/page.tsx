import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  getVehicleBySlugFromDb,
  getRelatedVehiclesFromDb,
} from "@/lib/vehicles-db";
import { formatPrice, formatNumber } from "@/lib/utils";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

export const dynamic = "force-dynamic";

interface VehicleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: VehicleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlugFromDb(slug);
  if (!vehicle) {
    return { title: "Model Not Found — VELOX Automotive" };
  }
  return {
    title: `${vehicle.name} (${vehicle.year}) — VELOX Automotive`,
    description: `${vehicle.tagline} Explore full technical specifications, gallery, and private viewing inquiries for the ${vehicle.name}.`,
  };
}

export default async function VehicleDetailPage({
  params,
}: VehicleDetailPageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlugFromDb(slug);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = await getRelatedVehiclesFromDb(vehicle.slug, 2);

  return (
    <div className="bg-[#08090B] pb-24 lg:pb-32">
      {/* 1. CINEMATIC MODEL HERO */}
      <section className="relative min-h-[82vh] flex flex-col justify-end pt-28 pb-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={vehicle.images.hero}
            alt={`${vehicle.name} hero studio view`}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/65 to-[#08090B]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#C8CDD5] hover:text-[#D4FF00] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Fleet Catalogue</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#D4FF00] text-[#08090B] font-mono-tech text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1">
                  {vehicle.bodyType}
                </span>
                <span className="bg-[#0F1115]/90 border border-white/15 text-[#C8CDD5] font-mono-tech text-[11px] uppercase tracking-[0.2em] px-3 py-1">
                  {vehicle.codeName}
                </span>
                {vehicle.productionLimit && (
                  <span className="bg-[#0F1115]/90 border border-white/15 text-[#D4FF00] font-mono-tech text-[11px] uppercase tracking-[0.2em] px-3 py-1">
                    {vehicle.productionLimit}
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white">
                {vehicle.name}
              </h1>
              <p className="text-base sm:text-xl text-[#C8CDD5] max-w-2xl">
                {vehicle.tagline}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-end lg:items-end justify-end gap-4">
              <div className="lg:text-right">
                <span className="block font-mono-tech text-xs uppercase tracking-[0.2em] text-[#9BA3B0]">
                  {vehicle.year} MODEL YEAR // BASE ALLOCATION
                </span>
                <span className="font-mono-tech text-3xl sm:text-4xl font-bold text-white">
                  {formatPrice(vehicle.price)}
                </span>
              </div>
              <Link
                href={`/contact?vehicle=${vehicle.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4FF00] text-[#08090B] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                <span>Request Viewing / Test Drive</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-white/15 bg-[#0F1115]/90 backdrop-blur-md">
            <div className="p-5 border-b lg:border-b-0 border-r border-white/10">
              <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#9BA3B0]">
                0–100 KM/H
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-[#D4FF00]">
                {vehicle.performance.zeroToHundred}
              </span>
            </div>
            <div className="p-5 border-b lg:border-b-0 sm:border-r border-white/10">
              <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#9BA3B0]">
                0–200 KM/H
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {vehicle.performance.zeroToTwoHundred}
              </span>
            </div>
            <div className="p-5 border-b sm:border-b-0 border-r border-white/10">
              <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#9BA3B0]">
                PEAK POWER
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {vehicle.performance.horsepower} PS
              </span>
            </div>
            <div className="p-5 border-b sm:border-b-0 lg:border-r border-white/10">
              <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#9BA3B0]">
                PEAK TORQUE
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {vehicle.performance.torqueNm} NM
              </span>
            </div>
            <div className="p-5 border-r border-white/10">
              <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#9BA3B0]">
                TOP SPEED
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {vehicle.performance.topSpeedKmh} KM/H
              </span>
            </div>
            <div className="p-5">
              <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#9BA3B0]">
                DRY MASS
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {formatNumber(vehicle.performance.weightKg)} KG
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL OVERVIEW & HIGHLIGHTS */}
      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
              01 // ENGINEERING DOSSIER
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-white leading-tight">
              “{vehicle.editorialQuote}”
            </h2>
            <p className="text-base text-[#C8CDD5] leading-relaxed">
              {vehicle.overview}
            </p>
            <p className="text-sm sm:text-base text-[#9BA3B0] leading-relaxed">
              {vehicle.engineeringStory}
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#0F1115] border border-white/10 p-7 sm:p-9 space-y-6">
            <h3 className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4FF00] border-b border-white/10 pb-4">
              KEY SPECIFICATION HIGHLIGHTS
            </h3>
            <ul className="space-y-4">
              {vehicle.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#C8CDD5]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-3 text-xs font-mono-tech">
              <div>
                <span className="text-[#5E6673] block uppercase">
                  SHOWROOM EXTERIOR FINISH
                </span>
                <span className="text-white">{vehicle.exteriorFinish}</span>
              </div>
              <div>
                <span className="text-[#5E6673] block uppercase">
                  COCKPIT SPECIFICATION
                </span>
                <span className="text-white">{vehicle.interiorTrim}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE STUDIO GALLERY */}
      <section className="py-20 lg:py-28 border-b border-white/10 bg-[#0B0D10]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
                02 // VISUAL INSPECTION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white mt-2">
                EXTERIOR & AERODYNAMIC GALLERY
              </h2>
            </div>
            <p className="font-mono-tech text-xs text-[#9BA3B0]">
              SELECT A FRAME BELOW TO INSPECT ANGLES
            </p>
          </div>

          <VehicleGallery
            vehicleName={vehicle.name}
            items={vehicle.images.gallery}
          />
        </div>
      </section>

      {/* 4. FULL TECHNICAL SPECIFICATIONS TABLE */}
      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="space-y-2">
            <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
              03 // HOMOLOGATION DATA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
              TECHNICAL SPECIFICATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#0F1115] border border-white/10 p-6 sm:p-8 space-y-6">
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4FF00] border-b border-white/10 pb-3">
                PROPULSION & PERFORMANCE
              </h3>
              <dl className="divide-y divide-white/10 text-sm">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Powertrain Architecture</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.powertrain}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Fuel / Energy System</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.fuelType}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Transmission</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.transmission}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Drivetrain</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.drivetrain}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Peak Output</dt>
                  <dd className="font-mono-tech text-[#D4FF00] font-bold text-right">
                    {vehicle.performance.horsepower} PS /{" "}
                    {vehicle.performance.torqueNm} Nm
                  </dd>
                </div>
                {vehicle.performance.redlineRpm && (
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#9BA3B0]">Maximum Engine Speed</dt>
                    <dd className="font-mono-tech text-white text-right">
                      {vehicle.performance.redlineRpm}
                    </dd>
                  </div>
                )}
                {vehicle.performance.rangeKm && (
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#9BA3B0]">WLTP Combined Range</dt>
                    <dd className="font-mono-tech text-white text-right">
                      {vehicle.performance.rangeKm} km
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="bg-[#0F1115] border border-white/10 p-6 sm:p-8 space-y-6">
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4FF00] border-b border-white/10 pb-3">
                DIMENSIONS, MASS & AERODYNAMICS
              </h3>
              <dl className="divide-y divide-white/10 text-sm">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Length × Width × Height</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.dimensions.lengthMm} × {vehicle.dimensions.widthMm}{" "}
                    × {vehicle.dimensions.heightMm} mm
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Wheelbase</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.dimensions.wheelbaseMm} mm
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Dry Weight</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {formatNumber(vehicle.performance.weightKg)} kg
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Static Weight Distribution</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.dimensions.weightDistribution}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#9BA3B0]">Peak Aerodynamic Downforce</dt>
                  <dd className="font-mono-tech text-[#D4FF00] font-bold text-right">
                    {vehicle.performance.downforceKg} kg
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-2 bg-[#0F1115] border border-white/10 p-6 sm:p-8 space-y-6">
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4FF00] border-b border-white/10 pb-3">
                CHASSIS, SUSPENSION & BRAKING ARCHITECTURE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs uppercase text-[#5E6673]">
                    MONOCOQUE STRUCTURE
                  </span>
                  <p className="text-white">{vehicle.chassisAndAero.monocoque}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs uppercase text-[#5E6673]">
                    SUSPENSION DYNAMICS
                  </span>
                  <p className="text-white">{vehicle.chassisAndAero.suspension}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs uppercase text-[#5E6673]">
                    BRAKING SYSTEM
                  </span>
                  <p className="text-white">{vehicle.chassisAndAero.brakes}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs uppercase text-[#5E6673]">
                    WHEEL & TIRE SPECIFICATION
                  </span>
                  <p className="text-white">{vehicle.chassisAndAero.tires}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#161920] border border-[#D4FF00]/40 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D4FF00]">
                PRIVATE VIEWING & TRACK TRIAL
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
                EXPERIENCE THE {vehicle.name} IN PERSON
              </h3>
              <p className="text-sm text-[#9BA3B0]">
                Reserve a private showroom inspection or closed-circuit test drive with our factory telemetry engineers.
              </p>
            </div>
            <Link
              href={`/contact?vehicle=${vehicle.slug}`}
              className="shrink-0 inline-flex items-center gap-2 bg-[#D4FF00] text-[#08090B] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              <span>Book {vehicle.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. RELATED VEHICLES */}
      <section className="pt-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
                04 // COMPARABLE ENGINEERING
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-white mt-2">
                OTHER MODELS IN THE FLEET
              </h2>
            </div>
            <Link
              href="/vehicles"
              className="font-mono-tech text-xs uppercase tracking-widest text-[#C8CDD5] hover:text-[#D4FF00]"
            >
              View All Models →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedVehicles.map((rel, idx) => (
              <VehicleCard key={rel.id} vehicle={rel} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
