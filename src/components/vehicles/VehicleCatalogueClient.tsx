"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, RotateCcw, Search } from "lucide-react";
import { Vehicle, BodyType, PowertrainType } from "@/types/vehicle";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { formatPrice } from "@/lib/utils";

interface VehicleCatalogueClientProps {
  initialVehicles: Vehicle[];
}

const BODY_TYPES: ("ALL" | BodyType)[] = [
  "ALL",
  "Hypercar",
  "Grand Tourer",
  "Track Coupe",
  "Performance SUV",
];

const POWERTRAINS: ("ALL" | PowertrainType)[] = [
  "ALL",
  "Twin-Turbo V8 Hybrid",
  "Full Electric Tri-Motor",
  "Naturally Aspirated V10",
  "Quad-Motor Electric",
];

export function VehicleCatalogueClient({
  initialVehicles,
}: VehicleCatalogueClientProps) {
  const [selectedBody, setSelectedBody] = useState<"ALL" | BodyType>("ALL");
  const [selectedPowertrain, setSelectedPowertrain] = useState<
    "ALL" | PowertrainType
  >("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "hp-desc"
  >("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = useMemo(() => {
    return initialVehicles
      .filter((v) => {
        if (selectedBody !== "ALL" && v.bodyType !== selectedBody) return false;
        if (
          selectedPowertrain !== "ALL" &&
          v.powertrain !== selectedPowertrain
        ) {
          return false;
        }
        if (v.price > maxPrice) return false;
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchName = v.name.toLowerCase().includes(q);
          const matchBody = v.bodyType.toLowerCase().includes(q);
          const matchPower = v.powertrain.toLowerCase().includes(q);
          if (!matchName && !matchBody && !matchPower) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "hp-desc")
          return b.performance.horsepower - a.performance.horsepower;
        return Number(b.featured) - Number(a.featured);
      });
  }, [
    initialVehicles,
    selectedBody,
    selectedPowertrain,
    maxPrice,
    sortBy,
    searchQuery,
  ]);

  const resetFilters = () => {
    setSelectedBody("ALL");
    setSelectedPowertrain("ALL");
    setMaxPrice(500000);
    setSortBy("featured");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedBody !== "ALL" ||
    selectedPowertrain !== "ALL" ||
    maxPrice < 500000 ||
    searchQuery.trim() !== "";

  return (
    <div className="space-y-12">
      {/* Interactive Filter Control Panel */}
      <section
        aria-label="Filter vehicles"
        className="bg-[#0F1115] border border-white/10 p-6 sm:p-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-[#D4FF00]" />
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.22em] text-white">
              TELEMETRY & SPECIFICATION FILTERS
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono-tech text-xs text-[#9BA3B0]">
              SHOWING <strong className="text-[#D4FF00]">{filteredVehicles.length}</strong> OF{" "}
              {initialVehicles.length} MODELS
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-wider text-[#D4FF00] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Body Type Pills */}
        <div className="space-y-3">
          <label className="block font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#9BA3B0]">
            01 // Chassis Architecture
          </label>
          <div className="flex flex-wrap gap-2">
            {BODY_TYPES.map((type) => {
              const active = selectedBody === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedBody(type)}
                  className={`px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider border transition-colors ${
                    active
                      ? "bg-[#D4FF00] text-[#08090B] border-[#D4FF00] font-bold"
                      : "bg-[#08090B] text-[#C8CDD5] border-white/15 hover:border-white/40"
                  }`}
                >
                  {type === "ALL" ? "All Chassis" : type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Powertrain Select */}
          <div className="space-y-2">
            <label
              htmlFor="powertrain-filter"
              className="block font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#9BA3B0]"
            >
              02 // Propulsion Unit
            </label>
            <select
              id="powertrain-filter"
              value={selectedPowertrain}
              onChange={(e) =>
                setSelectedPowertrain(e.target.value as "ALL" | PowertrainType)
              }
              className="w-full bg-[#08090B] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:border-[#D4FF00]"
            >
              {POWERTRAINS.map((pt) => (
                <option key={pt} value={pt}>
                  {pt === "ALL" ? "All Powertrains" : pt}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Range */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="price-range"
                className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#9BA3B0]"
              >
                03 // Max Allocation
              </label>
              <span className="font-mono-tech text-xs text-[#D4FF00] font-semibold">
                {formatPrice(maxPrice)}
              </span>
            </div>
            <input
              id="price-range"
              type="range"
              min={200000}
              max={500000}
              step={15000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#D4FF00] cursor-pointer mt-2"
            />
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <label
              htmlFor="sort-order"
              className="block font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#9BA3B0]"
            >
              04 // Sort Sequence
            </label>
            <select
              id="sort-order"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | "featured"
                    | "price-asc"
                    | "price-desc"
                    | "hp-desc"
                )
              }
              className="w-full bg-[#08090B] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:border-[#D4FF00]"
            >
              <option value="featured">Showroom Curated</option>
              <option value="hp-desc">Output: Highest PS First</option>
              <option value="price-desc">Allocation: High to Low</option>
              <option value="price-asc">Allocation: Low to High</option>
            </select>
          </div>

          {/* Search Model */}
          <div className="space-y-2">
            <label
              htmlFor="model-search"
              className="block font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#9BA3B0]"
            >
              05 // Direct Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#5E6673] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="model-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Valkyrie, V10, Electric..."
                className="w-full bg-[#08090B] border border-white/15 pl-9 pr-3.5 py-2.5 text-xs font-mono-tech text-white placeholder:text-[#5E6673] focus:border-[#D4FF00]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Grid or Empty State */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
      ) : (
        <div className="bg-[#0F1115] border border-white/10 p-16 text-center space-y-5">
          <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
            ZERO SPECIFICATIONS MATCHED
          </p>
          <h3 className="font-display text-2xl font-bold text-white uppercase">
            No VELOX models match your active filter parameters.
          </h3>
          <p className="text-sm text-[#9BA3B0] max-w-md mx-auto">
            Adjust the maximum allocation slider or reset your powertrain filters to view all available showroom configurations.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 bg-[#D4FF00] text-[#08090B] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
