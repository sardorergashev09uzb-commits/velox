import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getVehicleBySlugFromDb, ensureDatabaseSeeded } from "@/lib/vehicles-db";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const vehicle = await getVehicleBySlugFromDb(slug);
  if (!vehicle) {
    return NextResponse.json(
      { ok: false, error: "Vehicle not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true, vehicle });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    await ensureDatabaseSeeded();
    const { slug } = await context.params;
    const body = await request.json();

    const existing = await prisma.vehicleRecord.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Vehicle not found in database" },
        { status: 404 }
      );
    }

    const currentPerf = JSON.parse(existing.performanceJson);
    const incomingPerf = body.performance || {};
    const updatedPerf = {
      horsepower:
        incomingPerf.horsepower !== undefined
          ? Number(incomingPerf.horsepower)
          : body.horsepower !== undefined
          ? Number(body.horsepower)
          : currentPerf.horsepower,
      torqueNm:
        incomingPerf.torqueNm !== undefined
          ? Number(incomingPerf.torqueNm)
          : body.torqueNm !== undefined
          ? Number(body.torqueNm)
          : currentPerf.torqueNm,
      zeroToHundred:
        incomingPerf.zeroToHundred !== undefined
          ? String(incomingPerf.zeroToHundred)
          : body.zeroToHundred !== undefined
          ? String(body.zeroToHundred)
          : currentPerf.zeroToHundred,
      zeroToTwoHundred:
        incomingPerf.zeroToTwoHundred !== undefined
          ? String(incomingPerf.zeroToTwoHundred)
          : currentPerf.zeroToTwoHundred || "5.8 s",
      topSpeedKmh:
        incomingPerf.topSpeedKmh !== undefined
          ? Number(incomingPerf.topSpeedKmh)
          : body.topSpeedKmh !== undefined
          ? Number(body.topSpeedKmh)
          : currentPerf.topSpeedKmh,
      weightKg:
        incomingPerf.weightKg !== undefined
          ? Number(incomingPerf.weightKg)
          : body.weightKg !== undefined
          ? Number(body.weightKg)
          : currentPerf.weightKg,
      downforceKg:
        incomingPerf.downforceKg !== undefined
          ? Number(incomingPerf.downforceKg)
          : currentPerf.downforceKg || 450,
      redlineRpm:
        incomingPerf.redlineRpm !== undefined
          ? incomingPerf.redlineRpm
          : currentPerf.redlineRpm,
      rangeKm:
        incomingPerf.rangeKm !== undefined
          ? incomingPerf.rangeKm
            ? Number(incomingPerf.rangeKm)
            : undefined
          : currentPerf.rangeKm,
    };

    const currentDim = JSON.parse(existing.dimensionsJson);
    const incomingDim = body.dimensions || {};
    const updatedDim = {
      lengthMm:
        incomingDim.lengthMm !== undefined
          ? Number(incomingDim.lengthMm)
          : currentDim.lengthMm,
      widthMm:
        incomingDim.widthMm !== undefined
          ? Number(incomingDim.widthMm)
          : currentDim.widthMm,
      heightMm:
        incomingDim.heightMm !== undefined
          ? Number(incomingDim.heightMm)
          : currentDim.heightMm,
      wheelbaseMm:
        incomingDim.wheelbaseMm !== undefined
          ? Number(incomingDim.wheelbaseMm)
          : currentDim.wheelbaseMm,
      weightDistribution:
        incomingDim.weightDistribution !== undefined
          ? String(incomingDim.weightDistribution)
          : currentDim.weightDistribution,
    };

    const currentChassis = JSON.parse(existing.chassisAndAeroJson);
    const incomingChassis = body.chassisAndAero || {};
    const updatedChassis = {
      monocoque:
        incomingChassis.monocoque !== undefined
          ? String(incomingChassis.monocoque)
          : currentChassis.monocoque,
      suspension:
        incomingChassis.suspension !== undefined
          ? String(incomingChassis.suspension)
          : currentChassis.suspension,
      brakes:
        incomingChassis.brakes !== undefined
          ? String(incomingChassis.brakes)
          : currentChassis.brakes,
      aerodynamics:
        incomingChassis.aerodynamics !== undefined
          ? String(incomingChassis.aerodynamics)
          : currentChassis.aerodynamics,
      tires:
        incomingChassis.tires !== undefined
          ? String(incomingChassis.tires)
          : currentChassis.tires,
    };

    const currentHighlights = JSON.parse(existing.highlightsJson);
    const updatedHighlights = Array.isArray(body.highlights)
      ? body.highlights
      : currentHighlights;

    const currentGallery = JSON.parse(existing.galleryJson);
    const updatedGallery = Array.isArray(body.images?.gallery)
      ? body.images.gallery
      : Array.isArray(body.gallery)
      ? body.gallery
      : currentGallery;

    const heroImage =
      body.images?.hero ?? body.heroImage ?? existing.heroImage;
    const cardImage =
      body.images?.card ?? body.cardImage ?? heroImage ?? existing.cardImage;
    const editorialImage =
      body.images?.editorial ??
      body.editorialImage ??
      existing.editorialImage;

    const updated = await prisma.vehicleRecord.update({
      where: { slug },
      data: {
        name:
          body.name !== undefined
            ? String(body.name).toUpperCase()
            : existing.name,
        codeName:
          body.codeName !== undefined ? String(body.codeName) : existing.codeName,
        series:
          body.series !== undefined ? String(body.series) : existing.series,
        tagline:
          body.tagline !== undefined ? String(body.tagline) : existing.tagline,
        year: body.year !== undefined ? Number(body.year) : existing.year,
        price: body.price !== undefined ? Number(body.price) : existing.price,
        bodyType:
          body.bodyType !== undefined ? String(body.bodyType) : existing.bodyType,
        powertrain:
          body.powertrain !== undefined
            ? String(body.powertrain)
            : existing.powertrain,
        transmission:
          body.transmission !== undefined
            ? String(body.transmission)
            : existing.transmission,
        drivetrain:
          body.drivetrain !== undefined
            ? String(body.drivetrain)
            : existing.drivetrain,
        fuelType:
          body.fuelType !== undefined ? String(body.fuelType) : existing.fuelType,
        featured:
          body.featured !== undefined
            ? Boolean(body.featured)
            : existing.featured,
        productionLimit:
          body.productionLimit !== undefined
            ? body.productionLimit
              ? String(body.productionLimit)
              : null
            : existing.productionLimit,
        editorialQuote:
          body.editorialQuote !== undefined
            ? String(body.editorialQuote)
            : existing.editorialQuote,
        overview:
          body.overview !== undefined ? String(body.overview) : existing.overview,
        engineeringStory:
          body.engineeringStory !== undefined
            ? String(body.engineeringStory)
            : existing.engineeringStory,
        exteriorFinish:
          body.exteriorFinish !== undefined
            ? String(body.exteriorFinish)
            : existing.exteriorFinish,
        interiorTrim:
          body.interiorTrim !== undefined
            ? String(body.interiorTrim)
            : existing.interiorTrim,
        heroImage,
        cardImage,
        editorialImage,
        performanceJson: JSON.stringify(updatedPerf),
        dimensionsJson: JSON.stringify(updatedDim),
        chassisAndAeroJson: JSON.stringify(updatedChassis),
        highlightsJson: JSON.stringify(updatedHighlights),
        galleryJson: JSON.stringify(updatedGallery),
      },
    });

    return NextResponse.json({ ok: true, vehicle: updated });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update vehicle";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    await ensureDatabaseSeeded();
    const { slug } = await context.params;
    await prisma.vehicleRecord.delete({
      where: { slug },
    });
    return NextResponse.json({ ok: true, deletedSlug: slug });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete vehicle";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
