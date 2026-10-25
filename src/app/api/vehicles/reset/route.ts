import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VEHICLES as INITIAL_SEED_VEHICLES } from "@/data/vehicles";
import { ensureDatabaseSeeded } from "@/lib/vehicles-db";

export async function POST() {
  try {
    await ensureDatabaseSeeded();
    await prisma.vehicleRecord.deleteMany({});

    for (const v of INITIAL_SEED_VEHICLES) {
      await prisma.vehicleRecord.create({
        data: {
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

    return NextResponse.json({
      ok: true,
      message: "Factory fleet restored (6 VELOX models).",
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to reset fleet";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
