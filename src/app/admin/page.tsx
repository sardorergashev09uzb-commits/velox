import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllVehiclesFromDb, ensureDatabaseSeeded } from "@/lib/vehicles-db";
import { prisma } from "@/lib/prisma";
import {
  AdminDashboardClient,
  InquiryItem,
} from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Architect Studio — VELOX Automotive",
  description:
    "Full-featured VELOX Automotive CMS & Telemetry Studio: edit every vehicle specification, gallery frame, and client booking dossier in SQLite.",
};

export default async function AdminPage() {
  await ensureDatabaseSeeded();
  const vehicles = await getAllVehiclesFromDb();

  let inquiries: InquiryItem[] = [];
  try {
    const rawInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    inquiries = rawInquiries.map((i) => ({
      ...i,
      createdAt: i.createdAt.toISOString(),
    }));
  } catch {
    inquiries = [];
  }

  return (
    <div className="bg-[#08090B] pt-28 pb-24 lg:pb-32 min-h-screen bg-tech-grid">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <header className="bg-[#0F1115] border border-white/15 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#08090B] border border-[#D4FF00]/40 px-3 py-1">
              <span className="w-2 h-2 bg-[#D4FF00]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#D4FF00]">
                VELOX DIGITAL STUDIO // SQLITE + PRISMA CMS
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              FLEET ARCHITECT & TELEMETRY STUDIO
            </h1>
            <p className="text-xs sm:text-sm text-[#9BA3B0] max-w-2xl leading-relaxed">
              Full 6-tab specification editor: modify vehicle names, pricing, propulsion telemetry, dimensions, chassis hardware, editorial quotes, key highlights, and multi-angle studio galleries with real-time preview.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#D4FF00] text-white px-5 py-3 font-mono-tech text-xs uppercase tracking-wider transition-colors"
            >
              <span>Public Catalogue</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4FF00]" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-[#08090B] px-5 py-3 font-mono-tech text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Live Showroom</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <AdminDashboardClient
          initialVehicles={vehicles}
          initialInquiries={inquiries}
        />
      </div>
    </div>
  );
}
