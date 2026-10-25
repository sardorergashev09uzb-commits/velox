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
    <div className="bg-[#090B0F] pb-24 lg:pb-32">
      {/* 1. CINEMATIC MODEL HERO */}
      <section className="relative min-h-[82vh] flex flex-col justify-end pt-28 pb-12 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={vehicle.images.hero}
            alt={`${vehicle.name} hero studio view`}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090B0F] via-[#090B0F]/65 to-[#090B0F]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090B0F] via-[#090B0F]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.18em] text-[#CBD5E1] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Fleet Catalogue</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-white text-[#090B0F] rounded-md font-mono-tech text-[11px] font-semibold uppercase tracking-[0.18em] px-3 py-1">
                  {vehicle.bodyType}
                </span>
                <span className="bg-[#11141B]/90 rounded-md border border-white/15 text-[#CBD5E1] font-mono-tech text-[11px] uppercase tracking-[0.18em] px-3 py-1">
                  {vehicle.codeName}
                </span>
                {vehicle.productionLimit && (
                  <span className="bg-[#11141B]/90 rounded-md border border-white/15 text-[#D6C7B2] font-mono-tech text-[11px] uppercase tracking-[0.18em] px-3 py-1">
                    {vehicle.productionLimit}
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                {vehicle.name}
              </h1>
              <p className="text-base sm:text-xl text-[#CBD5E1] max-w-2xl">
                {vehicle.tagline}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-end lg:items-end justify-end gap-4">
              <div className="lg:text-right">
                <span className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-[#949CA8]">
                  {vehicle.year} Model Year • Base Allocation
                </span>
                <span className="font-mono-tech text-3xl sm:text-4xl font-bold text-white">
                  {formatPrice(vehicle.price)}
                </span>
              </div>
              <Link
                href={`/contact?vehicle=${vehicle.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-[#090B0F] hover:bg-[#E2E8F0] px-7 py-4 rounded-md text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
              >
                <span>Request Viewing / Test Drive</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-xl border border-white/10 bg-[#11141B]/90 backdrop-blur-xl overflow-hidden">
            <div className="p-5 border-b lg:border-b-0 border-r border-white/[0.08]">
              <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#949CA8]">
                0–100 km/h
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-[#D6C7B2]">
                {vehicle.performance.zeroToHundred}
              </span>
            </div>
            <div className="p-5 border-b lg:border-b-0 sm:border-r border-white/[0.08]">
              <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#949CA8]">
                0–200 km/h
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {vehicle.performance.zeroToTwoHundred}
              </span>
            </div>
            <div className="p-5 border-b sm:border-b-0 border-r border-white/[0.08]">
              <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#949CA8]">
                Peak Power
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {vehicle.performance.horsepower} PS
              </span>
            </div>
            <div className="p-5 border-b sm:border-b-0 lg:border-r border-white/[0.08]">
              <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#949CA8]">
                Peak Torque
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {vehicle.performance.torqueNm} Nm
              </span>
            </div>
            <div className="p-5 border-r border-white/[0.08]">
              <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#949CA8]">
                Top Speed
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {vehicle.performance.topSpeedKmh} km/h
              </span>
            </div>
            <div className="p-5">
              <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#949CA8]">
                Dry Mass
              </span>
              <span className="mt-1 block font-mono-tech text-xl font-bold text-white">
                {formatNumber(vehicle.performance.weightKg)} kg
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL OVERVIEW & HIGHLIGHTS */}
      <section className="py-20 lg:py-28 border-b border-white/[0.08]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
              01 // Engineering Dossier
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
              “{vehicle.editorialQuote}”
            </h2>
            <p className="text-base text-[#CBD5E1] leading-relaxed">
              {vehicle.overview}
            </p>
            <p className="text-sm sm:text-base text-[#949CA8] leading-relaxed">
              {vehicle.engineeringStory}
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#11141B] rounded-xl border border-white/[0.08] p-7 sm:p-9 space-y-6">
            <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2] border-b border-white/[0.08] pb-4">
              Key Specification Highlights
            </h3>
            <ul className="space-y-4">
              {vehicle.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#CBD5E1]">
                  <CheckCircle2 className="w-4 h-4 text-[#D6C7B2] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/[0.08] space-y-3 text-xs font-mono-tech">
              <div>
                <span className="text-[#5E6673] block uppercase">
                  Showroom Exterior Finish
                </span>
                <span className="text-white">{vehicle.exteriorFinish}</span>
              </div>
              <div>
                <span className="text-[#5E6673] block uppercase">
                  Cockpit Specification
                </span>
                <span className="text-white">{vehicle.interiorTrim}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE STUDIO GALLERY */}
      <section className="py-20 lg:py-28 border-b border-white/[0.08] bg-[#0C0E14]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
                02 // Visual Inspection
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
                Exterior & Aerodynamic Gallery
              </h2>
            </div>
            <p className="font-mono-tech text-xs text-[#949CA8]">
              Select a frame below to inspect angles
            </p>
          </div>

          <VehicleGallery
            vehicleName={vehicle.name}
            items={vehicle.images.gallery}
          />
        </div>
      </section>

      {/* 4. FULL TECHNICAL SPECIFICATIONS TABLE */}
      <section className="py-20 lg:py-28 border-b border-white/[0.08]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="space-y-2">
            <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
              03 // Homologation Data
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Technical Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#11141B] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2] border-b border-white/[0.08] pb-3">
                Propulsion & Performance
              </h3>
              <dl className="divide-y divide-white/[0.08] text-sm">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Powertrain Architecture</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.powertrain}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Fuel / Energy System</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.fuelType}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Transmission</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.transmission}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Drivetrain</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.drivetrain}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Peak Output</dt>
                  <dd className="font-mono-tech text-[#D6C7B2] font-bold text-right">
                    {vehicle.performance.horsepower} PS /{" "}
                    {vehicle.performance.torqueNm} Nm
                  </dd>
                </div>
                {vehicle.performance.redlineRpm && (
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#949CA8]">Maximum Engine Speed</dt>
                    <dd className="font-mono-tech text-white text-right">
                      {vehicle.performance.redlineRpm}
                    </dd>
                  </div>
                )}
                {vehicle.performance.rangeKm && (
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#949CA8]">WLTP Combined Range</dt>
                    <dd className="font-mono-tech text-white text-right">
                      {vehicle.performance.rangeKm} km
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="bg-[#11141B] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2] border-b border-white/[0.08] pb-3">
                Dimensions, Mass & Aerodynamics
              </h3>
              <dl className="divide-y divide-white/[0.08] text-sm">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Length × Width × Height</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.dimensions.lengthMm} × {vehicle.dimensions.widthMm}{" "}
                    × {vehicle.dimensions.heightMm} mm
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Wheelbase</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.dimensions.wheelbaseMm} mm
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Dry Weight</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {formatNumber(vehicle.performance.weightKg)} kg
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Static Weight Distribution</dt>
                  <dd className="font-mono-tech text-white text-right">
                    {vehicle.dimensions.weightDistribution}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#949CA8]">Peak Aerodynamic Downforce</dt>
                  <dd className="font-mono-tech text-[#D6C7B2] font-bold text-right">
                    {vehicle.performance.downforceKg} kg
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-2 bg-[#11141B] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2] border-b border-white/[0.08] pb-3">
                Chassis, Suspension & Braking Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs uppercase text-[#5E6673]">
                    Monocoque Structure
                  </span>
                  <p className="text-white">{vehicle.chassisAndAero.monocoque}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs uppercase text-[#5E6673]">
                    Suspension Dynamics
                  </span>
                  <p className="text-white">{vehicle.chassisAndAero.suspension}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs uppercase text-[#5E6673]">
                    Braking System
                  </span>
                  <p className="text-white">{vehicle.chassisAndAero.brakes}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs uppercase text-[#5E6673]">
                    Wheel & Tire Specification
                  </span>
                  <p className="text-white">{vehicle.chassisAndAero.tires}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#171B24] rounded-2xl border border-white/15 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2]">
                Private Viewing & Track Trial
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Experience the {vehicle.name} in Person
              </h3>
              <p className="text-sm text-[#949CA8]">
                Reserve a private showroom inspection or closed-circuit test drive with our factory telemetry engineers.
              </p>
            </div>
            <Link
              href={`/contact?vehicle=${vehicle.slug}`}
              className="shrink-0 inline-flex items-center gap-2 bg-white text-[#090B0F] hover:bg-[#E2E8F0] px-7 py-4 rounded-md text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
            >
              <span>Book {vehicle.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. RELATED VEHICLES */}
      <section className="pt-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
                04 // Comparable Engineering
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-2">
                Other Models in the Fleet
              </h2>
            </div>
            <Link
              href="/vehicles"
              className="font-mono-tech text-xs uppercase tracking-widest text-[#CBD5E1] hover:text-white"
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
