import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getVehicleBySlugFromDb, ensureDatabaseSeeded } from "@/lib/vehicles-db";
import { generateReferenceCode } from "@/lib/utils";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  phone: z.string().min(6, "Please enter a valid contact phone number."),
  vehicleSlug: z.string().min(1, "Please select a VELOX model."),
  experienceType: z.enum([
    "PRIVATE_VIEWING",
    "TRACK_TEST_DRIVE",
    "BESPOKE_COMMISSION",
  ]),
  preferredDate: z.string().min(1, "Please choose a preferred date."),
  location: z.string().min(2, "Please select a showroom location."),
  notes: z.string().max(600).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed. Please check the highlighted fields.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const vehicle = await getVehicleBySlugFromDb(data.vehicleSlug);
    const vehicleName = vehicle ? vehicle.name : data.vehicleSlug;
    const referenceCode = generateReferenceCode();

    let savedRecord = null;
    let persistedInDatabase = false;

    try {
      savedRecord = await prisma.inquiry.create({
        data: {
          referenceCode,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          vehicleSlug: data.vehicleSlug,
          vehicleName,
          experienceType: data.experienceType,
          preferredDate: data.preferredDate,
          location: data.location,
          notes: data.notes || null,
          status: "PENDING",
        },
      });
      persistedInDatabase = true;
    } catch {
      savedRecord = {
        id: `demo-${Date.now()}`,
        referenceCode,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        vehicleSlug: data.vehicleSlug,
        vehicleName,
        experienceType: data.experienceType,
        preferredDate: data.preferredDate,
        location: data.location,
        notes: data.notes || null,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json(
      {
        ok: true,
        persistedInDatabase,
        isPortfolioDemo: true,
        message:
          "Portfolio Concept Demo: Your inquiry was validated by the Next.js API and recorded in the local SQLite database. Manage this booking live in the /admin panel.",
        inquiry: savedRecord,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process your request at this time.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ensureDatabaseSeeded();
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, inquiries });
  } catch {
    return NextResponse.json({ ok: true, inquiries: [] });
  }
}
