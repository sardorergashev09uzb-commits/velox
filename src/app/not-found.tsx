import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#090B0F] flex items-center justify-center px-5 py-24">
      <div className="max-w-xl w-full bg-[#11141B] rounded-2xl border border-white/10 p-10 sm:p-14 text-center space-y-6">
        <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D6C7B2]">
          Telemetry Error • 404
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
          Coordinates Not Found
        </h1>
        <p className="text-sm text-[#949CA8] leading-relaxed">
          The requested specification dossier or showroom route does not exist in the VELOX catalogue.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 bg-white text-[#090B0F] hover:bg-[#E2E8F0] px-6 py-3.5 rounded-md text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            <span>Explore Fleet</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/15 text-white hover:border-white/40 px-6 py-3.5 rounded-md text-xs font-mono-tech uppercase tracking-[0.18em] transition-colors"
          >
            <span>Return to Showroom</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
