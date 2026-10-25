import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getVehicleBySlugFromDb } from "@/lib/vehicles-db";

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
    const updatedPerf = {
      ...currentPerf,
      horsepower:
        body.horsepower !== undefined
          ? Number(body.horsepower)
          : currentPerf.horsepower,
      torqueNm:
        body.torqueNm !== undefined
          ? Number(body.torqueNm)
          : currentPerf.torqueNm,
      zeroToHundred:
        body.zeroToHundred !== undefined
          ? String(body.zeroToHundred)
          : currentPerf.zeroToHundred,
      topSpeedKmh:
        body.topSpeedKmh !== undefined
          ? Number(body.topSpeedKmh)
          : currentPerf.topSpeedKmh,
      weightKg:
        body.weightKg !== undefined
          ? Number(body.weightKg)
          : currentPerf.weightKg,
    };

    const updated = await prisma.vehicleRecord.update({
      where: { slug },
      data: {
        name: body.name !== undefined ? String(body.name).toUpperCase() : existing.name,
        tagline: body.tagline !== undefined ? String(body.tagline) : existing.tagline,
        price: body.price !== undefined ? Number(body.price) : existing.price,
        year: body.year !== undefined ? Number(body.year) : existing.year,
        bodyType: body.bodyType !== undefined ? String(body.bodyType) : existing.bodyType,
        powertrain:
          body.powertrain !== undefined ? String(body.powertrain) : existing.powertrain,
        featured:
          body.featured !== undefined ? Boolean(body.featured) : existing.featured,
        heroImage:
          body.heroImage !== undefined ? String(body.heroImage) : existing.heroImage,
        cardImage:
          body.heroImage !== undefined ? String(body.heroImage) : existing.cardImage,
        performanceJson: JSON.stringify(updatedPerf),
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
