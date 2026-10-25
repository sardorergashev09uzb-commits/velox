import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const existing = await prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Inquiry not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        status: body.status !== undefined ? String(body.status) : existing.status,
        preferredDate:
          body.preferredDate !== undefined
            ? String(body.preferredDate)
            : existing.preferredDate,
        location:
          body.location !== undefined
            ? String(body.location)
            : existing.location,
        notes:
          body.notes !== undefined
            ? body.notes
              ? String(body.notes)
              : null
            : existing.notes,
      },
    });

    return NextResponse.json({ ok: true, inquiry: updated });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update inquiry";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await prisma.inquiry.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true, deletedId: id });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete inquiry";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
