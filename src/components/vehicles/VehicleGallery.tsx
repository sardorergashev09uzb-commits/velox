"use client";

import React, { useState } from "react";
import { VehicleGalleryItem } from "@/types/vehicle";

interface VehicleGalleryProps {
  vehicleName: string;
  items: VehicleGalleryItem[];
}

export function VehicleGallery({ vehicleName, items }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = items[activeIndex] || items[0];

  if (!current) return null;

  return (
    <div className="space-y-5">
      {/* Main Stage */}
      <div className="relative aspect-[16/9] w-full bg-[#11141B] rounded-xl border border-white/10 overflow-hidden">
        <img
          src={current.url}
          alt={current.alt}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B0F] via-transparent to-transparent opacity-80" />

        {/* Frame Counter & Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <span className="inline-block font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#D6C7B2] bg-[#090B0F]/85 backdrop-blur-md px-3 py-1 rounded-md border border-white/15">
              {current.category}
            </span>
            <p className="text-sm sm:text-base text-white font-medium pt-1">
              {current.caption}
            </p>
          </div>
          <div className="font-mono-tech text-xs text-[#949CA8] bg-[#090B0F]/85 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/10 shrink-0">
            Frame {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        role="tablist"
        aria-label={`${vehicleName} image gallery thumbnails`}
      >
        {items.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={`${item.url}-${idx}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(idx)}
              className={`group relative aspect-[16/10] rounded-lg overflow-hidden border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-white ring-1 ring-white"
                  : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
              }`}
            >
              <img
                src={item.url}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2.5 font-mono-tech text-[10px] uppercase tracking-wider text-white">
                0{idx + 1} • {item.category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
