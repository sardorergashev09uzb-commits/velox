import { NextRequest, NextResponse } from "next/server";
import { getAllVehiclesFromDb, ensureDatabaseSeeded } from "@/lib/vehicles-db";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bodyType = searchParams.get("bodyType");
  const powertrain = searchParams.get("powertrain");
  const maxPrice = searchParams.get("maxPrice");
  const featured = searchParams.get("featured");

  let filtered = await getAllVehiclesFromDb();

  if (bodyType && bodyType !== "ALL") {
    filtered = filtered.filter((v) => v.bodyType === bodyType);
  }

  if (powertrain && powertrain !== "ALL") {
    filtered = filtered.filter((v) => v.powertrain === powertrain);
  }

  if (maxPrice && !Number.isNaN(Number(maxPrice))) {
    filtered = filtered.filter((v) => v.price <= Number(maxPrice));
  }

  if (featured === "true") {
    filtered = filtered.filter((v) => v.featured);
  }

  return NextResponse.json({
    ok: true,
    count: filtered.length,
    vehicles: filtered,
  });
}

export async function POST(request: NextRequest) {
  try {
    await ensureDatabaseSeeded();
    const body = await request.json();

    const baseSlug =
      body.slug ||
      String(body.name || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (!baseSlug || !body.name) {
      return NextResponse.json(
        { ok: false, error: "Vehicle name and slug are required." },
        { status: 400 }
      );
    }

    // Ensure unique slug if duplicate exists
    const existingSlug = await prisma.vehicleRecord.findUnique({
      where: { slug: baseSlug },
    });
    const finalSlug = existingSlug
      ? `${baseSlug}-${Math.floor(100 + Math.random() * 899)}`
      : baseSlug;

    const heroUrl =
      body.images?.hero ||
      body.heroImage ||
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=85";

    const cardUrl = body.images?.card || body.cardImage || heroUrl;
    const editorialUrl =
      body.images?.editorial || body.editorialImage || heroUrl;

    const perfInput = body.performance || body;
    const performance = {
      horsepower: Number(perfInput.horsepower) || 850,
      torqueNm: Number(perfInput.torqueNm) || 950,
      zeroToHundred: perfInput.zeroToHundred || "2.5 s",
      zeroToTwoHundred: perfInput.zeroToTwoHundred || "6.4 s",
      topSpeedKmh: Number(perfInput.topSpeedKmh) || 340,
      weightKg: Number(perfInput.weightKg) || 1490,
      downforceKg: Number(perfInput.downforceKg) || 520,
      redlineRpm: perfInput.redlineRpm || "8,500 RPM",
      rangeKm: perfInput.rangeKm ? Number(perfInput.rangeKm) : undefined,
    };

    const dimInput = body.dimensions || body;
    const dimensions = {
      lengthMm: Number(dimInput.lengthMm) || 4680,
      widthMm: Number(dimInput.widthMm) || 2010,
      heightMm: Number(dimInput.heightMm) || 1180,
      wheelbaseMm: Number(dimInput.wheelbaseMm) || 2720,
      weightDistribution: dimInput.weightDistribution || "44% Front / 56% Rear",
    };

    const chassisInput = body.chassisAndAero || body;
    const chassisAndAero = {
      monocoque:
        chassisInput.monocoque ||
        "Autoclave-cured Carbon-Titanium Monocoque with integrated roll structure",
      suspension:
        chassisInput.suspension ||
        "Active pushrod hydraulic suspension with track-height control",
      brakes:
        chassisInput.brakes ||
        "410mm Carbon-Ceramic discs with 6-piston monoblock calipers",
      aerodynamics:
        chassisInput.aerodynamics ||
        "Active front splitter, underbody Venturi tunnels & hydraulic rear wing",
      tires:
        chassisInput.tires ||
        "Pirelli P Zero Trofeo RS — 265/35 ZR20 (F) / 335/30 ZR21 (R)",
    };

    const highlights: string[] =
      Array.isArray(body.highlights) && body.highlights.length > 0
        ? body.highlights
        : [
            `${performance.horsepower} PS output with ${performance.zeroToHundred} 0–100 km/h sprint`,
            `${performance.downforceKg} kg of wind-tunnel calibrated active downforce`,
            `Ultra-lightweight ${performance.weightKg} kg dry carbon-titanium construction`,
            "Bespoke driver telemetry HUD & billet titanium cockpit controls",
          ];

    const gallery =
      Array.isArray(body.images?.gallery) && body.images.gallery.length > 0
        ? body.images.gallery
        : Array.isArray(body.gallery) && body.gallery.length > 0
        ? body.gallery
        : [
            {
              url: heroUrl,
              alt: `${body.name} primary studio view`,
              caption: `${body.name} sculpted for aerodynamic efficiency and nocturnal presence.`,
              category: "Exterior",
            },
            {
              url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
              alt: `${body.name} aerodynamic profile`,
              caption:
                "Wind-tunnel calibrated rear diffuser and active aero surfaces.",
              category: "Aerodynamics",
            },
          ];

    const created = await prisma.vehicleRecord.create({
      data: {
        slug: finalSlug,
        name: String(body.name).toUpperCase(),
        codeName:
          body.codeName || `VX-${Math.floor(10 + Math.random() * 89)} // BESPOKE`,
        series: body.series || "Ultimate Series",
        tagline:
          body.tagline ||
          "Engineered inside the wind tunnel for uncompromising velocity.",
        year: Number(body.year) || 2026,
        price: Number(body.price) || 295000,
        bodyType: body.bodyType || "Hypercar",
        powertrain: body.powertrain || "Twin-Turbo V8 Hybrid",
        transmission: body.transmission || "8-Speed Dual-Clutch",
        drivetrain: body.drivetrain || "AWD",
        fuelType: body.fuelType || "Hybrid Petrol",
        featured: Boolean(body.featured),
        productionLimit: body.productionLimit || "Limited Production",
        editorialQuote:
          body.editorialQuote ||
          "Built without stylistic ornament—every surface channels air or sheds mass.",
        overview:
          body.overview ||
          `${body.name} combines carbon-titanium monocoque rigidity with relentless propulsion.`,
        engineeringStory:
          body.engineeringStory ||
          "Calibrated across 1,000+ hours of computational fluid dynamics and closed-circuit telemetry testing.",
        exteriorFinish: body.exteriorFinish || "Obsidian Matte Stealth Carbon",
        interiorTrim:
          body.interiorTrim || "Anthracite Alcantara & Anodized Titanium",
        heroImage: heroUrl,
        cardImage: cardUrl,
        editorialImage: editorialUrl,
        performanceJson: JSON.stringify(performance),
        dimensionsJson: JSON.stringify(dimensions),
        chassisAndAeroJson: JSON.stringify(chassisAndAero),
        highlightsJson: JSON.stringify(highlights),
        galleryJson: JSON.stringify(gallery),
      },
    });

    return NextResponse.json({ ok: true, vehicle: created }, { status: 201 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create vehicle record.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
