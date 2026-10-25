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
        className="bg-[#11141B] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-7"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-[#D6C7B2]" />
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-white">
              Specification Filters
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono-tech text-xs text-[#949CA8]">
              Showing <strong className="text-white">{filteredVehicles.length}</strong> of{" "}
              {initialVehicles.length} Models
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-wider text-[#D6C7B2] hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Body Type Pills */}
        <div className="space-y-3">
          <label className="block font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#949CA8]">
            Chassis Architecture
          </label>
          <div className="flex flex-wrap gap-2">
            {BODY_TYPES.map((type) => {
              const active = selectedBody === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedBody(type)}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-white text-[#090B0F] font-semibold"
                      : "bg-[#090B0F] text-[#CBD5E1] border border-white/10 hover:border-white/30"
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
          <div className="space-y-2">
            <label
              htmlFor="powertrain-filter"
              className="block font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#949CA8]"
            >
              Propulsion Unit
            </label>
            <select
              id="powertrain-filter"
              value={selectedPowertrain}
              onChange={(e) =>
                setSelectedPowertrain(e.target.value as "ALL" | PowertrainType)
              }
              className="w-full bg-[#090B0F] rounded-md border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-white"
            >
              {POWERTRAINS.map((pt) => (
                <option key={pt} value={pt}>
                  {pt === "ALL" ? "All Powertrains" : pt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="price-range"
                className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#949CA8]"
              >
                Max Allocation
              </label>
              <span className="font-mono-tech text-xs text-white font-semibold">
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
              className="w-full accent-white cursor-pointer mt-2"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sort-order"
              className="block font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#949CA8]"
            >
              Sort Sequence
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
              className="w-full bg-[#090B0F] rounded-md border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-white"
            >
              <option value="featured">Showroom Curated</option>
              <option value="hp-desc">Output: Highest PS First</option>
              <option value="price-desc">Allocation: High to Low</option>
              <option value="price-asc">Allocation: Low to High</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="model-search"
              className="block font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#949CA8]"
            >
              Direct Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#5E6673] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="model-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Valkyrie, V10, Electric..."
                className="w-full bg-[#090B0F] rounded-md border border-white/15 pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-[#5E6673] focus:border-white"
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
        <div className="bg-[#11141B] rounded-xl border border-white/10 p-16 text-center space-y-5">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2]">
            Zero Specifications Matched
          </p>
          <h3 className="font-display text-2xl font-bold text-white">
            No VELOX models match your active filter parameters.
          </h3>
          <p className="text-sm text-[#949CA8] max-w-md mx-auto">
            Adjust the maximum allocation slider or reset your powertrain filters to view all available showroom configurations.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 bg-white text-[#090B0F] px-6 py-3 rounded-md text-xs font-semibold uppercase tracking-[0.16em]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
