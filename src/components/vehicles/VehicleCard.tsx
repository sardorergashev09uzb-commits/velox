import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { formatPrice } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <article className="group relative bg-[#11141B] rounded-xl border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/30">
      {/* Image Container */}
      <Link
        href={`/vehicles/${vehicle.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#090B0F]"
        aria-label={`Explore ${vehicle.name} specifications`}
      >
        <img
          src={vehicle.images.card}
          alt={`${vehicle.name} — ${vehicle.bodyType}`}
          loading="lazy"
          className="w-full h-full object-cover editorial-image-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11141B] via-transparent to-black/25 opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <span className="bg-[#090B0F]/80 backdrop-blur-md border border-white/10 rounded-md px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-wider text-[#E2E8F0]">
            {vehicle.bodyType}
          </span>
          <span className="bg-[#090B0F]/80 backdrop-blur-md border border-white/10 rounded-md px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-wider text-[#949CA8]">
            {vehicle.year} • {vehicle.drivetrain}
          </span>
        </div>
      </Link>

      {/* Content & Specifications */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#949CA8]">
            {vehicle.powertrain}
          </p>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#D6C7B2] transition-colors">
            <Link href={`/vehicles/${vehicle.slug}`}>{vehicle.name}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-[#949CA8] line-clamp-2 leading-relaxed">
            {vehicle.tagline}
          </p>
        </div>

        {/* Clean Telemetry Row */}
        <div className="grid grid-cols-3 bg-[#090B0F]/70 rounded-lg border border-white/[0.06] p-3.5 gap-2">
          <div>
            <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
              0–100 km/h
            </span>
            <span className="font-mono-tech text-sm font-semibold text-white">
              {vehicle.performance.zeroToHundred}
            </span>
          </div>
          <div className="border-x border-white/[0.07] px-2.5">
            <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
              Output
            </span>
            <span className="font-mono-tech text-sm font-semibold text-white">
              {vehicle.performance.horsepower} PS
            </span>
          </div>
          <div className="pl-1">
            <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
              Top Speed
            </span>
            <span className="font-mono-tech text-sm font-semibold text-white">
              {vehicle.performance.topSpeedKmh} km/h
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              Base Allocation
            </span>
            <span className="font-mono-tech text-base sm:text-lg font-semibold text-white">
              {formatPrice(vehicle.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/contact?vehicle=${vehicle.slug}`}
              className="px-3.5 py-2 rounded-md text-xs font-medium text-[#949CA8] hover:text-white border border-white/10 hover:border-white/30 transition-colors"
            >
              Inquire
            </Link>
            <Link
              href={`/vehicles/${vehicle.slug}`}
              className="inline-flex items-center gap-1.5 bg-white text-[#090B0F] hover:bg-[#E2E8F0] px-4 py-2 rounded-md text-xs font-semibold transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
