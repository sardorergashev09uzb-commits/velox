import React from "react";
import type { Metadata } from "next";
import { getAllVehiclesFromDb } from "@/lib/vehicles-db";
import { VehicleCatalogueClient } from "@/components/vehicles/VehicleCatalogueClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vehicle Catalogue — VELOX Automotive",
  description:
    "Browse the complete VELOX Automotive fleet. Filter hypercars, electric grand tourers, V10 track coupes, and performance SUVs by powertrain and allocation.",
};

export default async function VehiclesPage() {
  const vehicles = await getAllVehiclesFromDb();

  return (
    <div className="bg-[#090B0F] pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <header className="border-b border-white/[0.08] pb-10 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
            <span>Showroom Inventory • {vehicles.length} Active Models</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
              The VELOX Fleet
            </h1>
            <p className="text-sm sm:text-base text-[#949CA8] max-w-xl leading-relaxed">
              Every VELOX model is hand-assembled around a structural carbon core. Filter by architecture, propulsion system, or base allocation below.
            </p>
          </div>
        </header>

        <VehicleCatalogueClient initialVehicles={vehicles} />
      </div>
    </div>
  );
}
