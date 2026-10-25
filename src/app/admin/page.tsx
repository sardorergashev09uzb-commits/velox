import React from "react";
import type { Metadata } from "next";
import { getAllVehiclesFromDb, ensureDatabaseSeeded } from "@/lib/vehicles-db";
import { prisma } from "@/lib/prisma";
import {
  AdminDashboardClient,
  InquiryItem,
} from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Telemetry Console — VELOX Automotive",
  description:
    "Manage VELOX fleet vehicles, technical specifications, and client private viewing inquiries stored in SQLite.",
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
    <div className="bg-[#08090B] pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <header className="border-b border-white/10 pb-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0F1115] border border-[#D4FF00]/40 px-3.5 py-1">
            <span className="w-2 h-2 bg-[#D4FF00]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4FF00]">
              LIVE SQLITE + PRISMA ORM BACKEND
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">
              ADMIN TELEMETRY CONSOLE
            </h1>
            <p className="text-sm sm:text-base text-[#9BA3B0] max-w-xl leading-relaxed">
              Every model card, specification table, and booking dossier on the public showroom is served dynamically from SQLite. Add, edit, or remove records below.
            </p>
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
