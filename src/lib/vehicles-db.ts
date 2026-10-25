import { prisma } from "@/lib/prisma";
import { VEHICLES as INITIAL_SEED_VEHICLES } from "@/data/vehicles";
import { Vehicle, BodyType, PowertrainType } from "@/types/vehicle";
import { VehicleRecord } from "@prisma/client";

function mapRecordToVehicle(record: VehicleRecord): Vehicle {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    codeName: record.codeName,
    series: record.series,
    tagline: record.tagline,
    year: record.year,
    price: record.price,
    bodyType: record.bodyType as BodyType,
    powertrain: record.powertrain as PowertrainType,
    transmission: record.transmission,
    drivetrain: (record.drivetrain as "AWD" | "RWD") || "AWD",
    fuelType:
      (record.fuelType as
        | "Hybrid Petrol"
        | "Battery Electric"
        | "High-Octane Petrol") || "Hybrid Petrol",
    featured: record.featured,
    productionLimit: record.productionLimit || undefined,
    editorialQuote: record.editorialQuote,
    overview: record.overview,
    engineeringStory: record.engineeringStory,
    exteriorFinish: record.exteriorFinish,
    interiorTrim: record.interiorTrim,
    performance: JSON.parse(record.performanceJson),
    dimensions: JSON.parse(record.dimensionsJson),
    chassisAndAero: JSON.parse(record.chassisAndAeroJson),
    highlights: JSON.parse(record.highlightsJson),
    images: {
      hero: record.heroImage,
      card: record.cardImage,
      editorial: record.editorialImage,
      gallery: JSON.parse(record.galleryJson),
    },
  };
}

let tablesInitialized = false;

export async function ensureDatabaseSeeded(): Promise<void> {
  try {
    if (!tablesInitialized) {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "VehicleRecord" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "slug" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "codeName" TEXT NOT NULL,
          "series" TEXT NOT NULL,
          "tagline" TEXT NOT NULL,
          "year" INTEGER NOT NULL,
          "price" INTEGER NOT NULL,
          "bodyType" TEXT NOT NULL,
          "powertrain" TEXT NOT NULL,
          "transmission" TEXT NOT NULL,
          "drivetrain" TEXT NOT NULL,
          "fuelType" TEXT NOT NULL,
          "featured" BOOLEAN NOT NULL DEFAULT false,
          "productionLimit" TEXT,
          "editorialQuote" TEXT NOT NULL,
          "overview" TEXT NOT NULL,
          "engineeringStory" TEXT NOT NULL,
          "exteriorFinish" TEXT NOT NULL,
          "interiorTrim" TEXT NOT NULL,
          "heroImage" TEXT NOT NULL,
          "cardImage" TEXT NOT NULL,
          "editorialImage" TEXT NOT NULL,
          "performanceJson" TEXT NOT NULL,
          "dimensionsJson" TEXT NOT NULL,
          "chassisAndAeroJson" TEXT NOT NULL,
          "highlightsJson" TEXT NOT NULL,
          "galleryJson" TEXT NOT NULL,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "VehicleRecord_slug_key" ON "VehicleRecord"("slug");
      `);
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Inquiry" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "referenceCode" TEXT NOT NULL,
          "fullName" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "phone" TEXT NOT NULL,
          "vehicleSlug" TEXT NOT NULL,
          "vehicleName" TEXT NOT NULL,
          "experienceType" TEXT NOT NULL,
          "preferredDate" TEXT NOT NULL,
          "location" TEXT NOT NULL,
          "notes" TEXT,
          "status" TEXT NOT NULL DEFAULT 'PENDING',
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Inquiry_referenceCode_key" ON "Inquiry"("referenceCode");
      `);
      tablesInitialized = true;
    }

    const count = await prisma.vehicleRecord.count();
    if (count === 0) {
      for (const v of INITIAL_SEED_VEHICLES) {
        await prisma.vehicleRecord.upsert({
          where: { slug: v.slug },
          update: {},
          create: {
            slug: v.slug,
            name: v.name,
            codeName: v.codeName,
            series: v.series,
            tagline: v.tagline,
            year: v.year,
            price: v.price,
            bodyType: v.bodyType,
            powertrain: v.powertrain,
            transmission: v.transmission,
            drivetrain: v.drivetrain,
            fuelType: v.fuelType,
            featured: v.featured,
            productionLimit: v.productionLimit || null,
            editorialQuote: v.editorialQuote,
            overview: v.overview,
            engineeringStory: v.engineeringStory,
            exteriorFinish: v.exteriorFinish,
            interiorTrim: v.interiorTrim,
            heroImage: v.images.hero,
            cardImage: v.images.card,
            editorialImage: v.images.editorial,
            performanceJson: JSON.stringify(v.performance),
            dimensionsJson: JSON.stringify(v.dimensions),
            chassisAndAeroJson: JSON.stringify(v.chassisAndAero),
            highlightsJson: JSON.stringify(v.highlights),
            galleryJson: JSON.stringify(v.images.gallery),
          },
        });
      }
    }

    const inquiryCount = await prisma.inquiry.count();
    if (inquiryCount === 0) {
      await prisma.inquiry.createMany({
        data: [
          {
            referenceCode: "VLX-2026-A9K4P",
            fullName: "Henrik Lindqvist",
            email: "h.lindqvist@nordic-capital.ch",
            phone: "+41 44 810 44 12",
            vehicleSlug: "velox-valkyrie-apex",
            vehicleName: "VELOX VALKYRIE APEX",
            experienceType: "TRACK_TEST_DRIVE",
            preferredDate: "2026-11-14",
            location: "Modena Autodromo Circuit",
            notes: "Interested in exposed matte carbon weave and telemetry coaching.",
            status: "CONFIRMED",
          },
          {
            referenceCode: "VLX-2026-M3X8R",
            fullName: "Elena Rostova",
            email: "elena@atelier-geneva.com",
            phone: "+41 22 901 18 55",
            vehicleSlug: "velox-vortex-gt",
            vehicleName: "VELOX VORTEX GT",
            experienceType: "PRIVATE_VIEWING",
            preferredDate: "2026-11-20",
            location: "Zürich Private Sanctuary",
            notes: "Requesting private evening viewing of the Liquid Titanium finish.",
            status: "PENDING",
          },
        ],
      });
    }
  } catch (err) {
    console.error("Database seed check warning:", err);
  }
}

export async function getAllVehiclesFromDb(): Promise<Vehicle[]> {
  try {
    await ensureDatabaseSeeded();
    const records = await prisma.vehicleRecord.findMany({
      orderBy: [{ featured: "desc" }, { price: "desc" }],
    });
    return records.length > 0 ? records.map(mapRecordToVehicle) : INITIAL_SEED_VEHICLES;
  } catch {
    return INITIAL_SEED_VEHICLES;
  }
}

export async function getFeaturedVehiclesFromDb(): Promise<Vehicle[]> {
  const all = await getAllVehiclesFromDb();
  const featured = all.filter((v) => v.featured);
  return featured.length > 0 ? featured : all.slice(0, 3);
}

export async function getVehicleBySlugFromDb(
  slug: string
): Promise<Vehicle | undefined> {
  try {
    await ensureDatabaseSeeded();
    const record = await prisma.vehicleRecord.findUnique({
      where: { slug },
    });
    if (!record) return INITIAL_SEED_VEHICLES.find((v) => v.slug === slug);
    return mapRecordToVehicle(record);
  } catch {
    return INITIAL_SEED_VEHICLES.find((v) => v.slug === slug);
  }
}

export async function getRelatedVehiclesFromDb(
  currentSlug: string,
  limit = 2
): Promise<Vehicle[]> {
  const all = await getAllVehiclesFromDb();
  const current = all.find((v) => v.slug === currentSlug);
  if (!current) return all.slice(0, limit);
  const sameCategory = all.filter(
    (v) => v.slug !== currentSlug && v.bodyType === current.bodyType
  );
  const others = all.filter(
    (v) => v.slug !== currentSlug && v.bodyType !== current.bodyType
  );
  return [...sameCategory, ...others].slice(0, limit);
}
