import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { formatPrice } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  return (
    <article className="group relative bg-[#0F1115] border border-white/10 hover:border-[#D4FF00]/60 transition-colors duration-300 flex flex-col justify-between">
      {/* Top Meta Bar */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between text-[11px] font-mono-tech uppercase tracking-[0.18em]">
        <span className="text-[#9BA3B0]">
          {String(index + 1).padStart(2, "0")} // {vehicle.bodyType}
        </span>
        <span className="text-[#D4FF00]">{vehicle.year} SPEC</span>
      </div>

      {/* Image Container */}
      <Link
        href={`/vehicles/${vehicle.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#08090B]"
        aria-label={`Explore ${vehicle.name} specifications`}
      >
        <img
          src={vehicle.images.card}
          alt={`${vehicle.name} — ${vehicle.bodyType} in ${vehicle.exteriorFinish}`}
          loading="lazy"
          className="w-full h-full object-cover editorial-image-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-black/30 opacity-90" />

        {/* Powertrain Tag */}
        <div className="absolute top-4 left-4 bg-[#08090B]/85 backdrop-blur-sm border border-white/15 px-3 py-1">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#C8CDD5]">
            {vehicle.powertrain}
          </span>
        </div>

        {/* Drivetrain Tag */}
        <div className="absolute top-4 right-4 bg-[#08090B]/85 backdrop-blur-sm border border-white/15 px-2.5 py-1">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white">
            {vehicle.drivetrain}
          </span>
        </div>
      </Link>

      {/* Content & Specifications */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-2">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#5E6673]">
            {vehicle.codeName}
          </p>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-[#D4FF00] transition-colors">
              <Link href={`/vehicles/${vehicle.slug}`}>{vehicle.name}</Link>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#9BA3B0] line-clamp-2 leading-relaxed">
            {vehicle.tagline}
          </p>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-3 border-y border-white/10 py-4 gap-3">
          <div>
            <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              0–100 km/h
            </span>
            <span className="font-mono-tech text-sm sm:text-base font-semibold text-white">
              {vehicle.performance.zeroToHundred}
            </span>
          </div>
          <div className="border-x border-white/10 px-3">
            <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              Output
            </span>
            <span className="font-mono-tech text-sm sm:text-base font-semibold text-white">
              {vehicle.performance.horsepower} PS
            </span>
          </div>
          <div className="pl-1">
            <span className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              V-Max
            </span>
            <span className="font-mono-tech text-sm sm:text-base font-semibold text-white">
              {vehicle.performance.topSpeedKmh} km/h
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#5E6673]">
              Base Allocation
            </span>
            <span className="font-mono-tech text-base sm:text-lg font-semibold text-white">
              {formatPrice(vehicle.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/contact?vehicle=${vehicle.slug}`}
              className="px-3 py-2 text-[11px] font-mono-tech uppercase tracking-wider text-[#9BA3B0] hover:text-white border border-white/10 hover:border-white/30 transition-colors"
            >
              Inquire
            </Link>
            <Link
              href={`/vehicles/${vehicle.slug}`}
              className="inline-flex items-center gap-1.5 bg-white/5 group-hover:bg-[#D4FF00] text-white group-hover:text-[#08090B] border border-white/15 group-hover:border-[#D4FF00] px-4 py-2 text-xs font-mono-tech uppercase tracking-wider font-semibold transition-colors"
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
