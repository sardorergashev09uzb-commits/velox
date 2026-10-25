import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#08090B] flex items-center justify-center px-5 py-24">
      <div className="max-w-xl w-full bg-[#0F1115] border border-white/15 p-10 sm:p-14 text-center space-y-6">
        <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4FF00]">
          TELEMETRY ERROR // 404
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white">
          COORDINATES NOT FOUND
        </h1>
        <p className="text-sm text-[#9BA3B0] leading-relaxed">
          The requested specification dossier or showroom route does not exist in the VELOX catalogue.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 bg-[#D4FF00] text-[#08090B] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            <span>Explore Fleet</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/20 text-white hover:border-[#D4FF00] px-6 py-3.5 text-xs font-mono-tech uppercase tracking-[0.2em] transition-colors"
          >
            <span>Return to Showroom</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
