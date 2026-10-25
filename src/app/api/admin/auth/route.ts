import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "velox_admin_session";
const ADMIN_DEMO_EMAIL = process.env.ADMIN_EMAIL || "admin@velox.auto";
const ADMIN_DEMO_PASSWORD = process.env.ADMIN_PASSWORD || "velox2026";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return NextResponse.json({
    authenticated: session?.value === "authenticated_velox_staff",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();

    if (email === ADMIN_DEMO_EMAIL && password === ADMIN_DEMO_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE_NAME, "authenticated_velox_staff", {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        ok: true,
        authenticated: true,
      });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Invalid staff credentials. Use the demo credentials provided below.",
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Authentication request failed." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ ok: true, authenticated: false });
}
