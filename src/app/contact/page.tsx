import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getAllVehiclesFromDb } from "@/lib/vehicles-db";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Viewing & Test-Drive Inquiry — VELOX Automotive",
  description:
    "Schedule a private showroom viewing, closed-circuit test drive, or bespoke specification consultation with VELOX Automotive.",
};

export default async function ContactPage() {
  const vehicles = await getAllVehiclesFromDb();

  return (
    <div className="bg-[#090B0F] pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <header className="border-b border-white/[0.08] pb-10 space-y-4">
          <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
            Private Concierge & Telemetry Trials
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Book a Private Viewing
            </h1>
            <p className="text-sm sm:text-base text-[#949CA8] max-w-xl leading-relaxed">
              Select your preferred VELOX monocoque, programme type, and international sanctuary below.
            </p>
          </div>
        </header>

        <Suspense
          fallback={
            <div className="bg-[#11141B] rounded-xl border border-white/10 p-12 font-mono-tech text-xs text-[#949CA8]">
              Loading concierge form...
            </div>
          }
        >
          <InquiryForm vehicles={vehicles} />
        </Suspense>
      </div>
    </div>
  );
}
