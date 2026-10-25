import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getAllVehiclesFromDb, ensureDatabaseSeeded } from "@/lib/vehicles-db";
import { prisma } from "@/lib/prisma";
import {
  AdminDashboardClient,
  InquiryItem,
} from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Executive Studio CMS — VELOX Automotive",
  description:
    "Protected VELOX Automotive Staff Portal & CMS: manage fleet specifications, studio galleries, and client bookings.",
};

export default async function AdminPage() {
  await ensureDatabaseSeeded();
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get("velox_admin_session")?.value ===
    "authenticated_velox_staff";

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
    <AdminDashboardClient
      initialVehicles={vehicles}
      initialInquiries={inquiries}
      initialAuthenticated={isAuthenticated}
    />
  );
}
