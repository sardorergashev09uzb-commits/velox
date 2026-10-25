"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Edit3,
  Star,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  Car,
  CalendarCheck,
  Database,
  Search,
  Copy,
  RotateCcw,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Gauge,
  FileText,
  Ruler,
  Shield,
  Sliders,
  Sparkles,
  Lock,
  LogOut,
  KeyRound,
  LayoutGrid,
} from "lucide-react";
import {
  Vehicle,
  BodyType,
  PowertrainType,
  VehicleGalleryItem,
} from "@/types/vehicle";
import { formatPrice, formatNumber } from "@/lib/utils";

export interface InquiryItem {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  vehicleSlug: string;
  vehicleName: string;
  experienceType: string;
  preferredDate: string;
  location: string;
  notes: string | null;
  status: string;
  createdAt: string;
}

interface AdminDashboardClientProps {
  initialVehicles: Vehicle[];
  initialInquiries: InquiryItem[];
  initialAuthenticated: boolean;
}

const PRESET_STUDIO_IMAGES = [
  {
    label: "Valkyrie Studio",
    url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Aero Diffuser",
    url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Vortex Electric GT",
    url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Kronos Track Coupe",
    url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Midnight Silhouette",
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Titan Performance SUV",
    url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Driver Cockpit OLED",
    url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Carbon Wheel Detail",
    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=85",
  },
];

function createEmptyVehicleDraft(): Vehicle {
  return {
    id: "new",
    slug: "",
    name: "VELOX NEMESIS GT-R",
    codeName: "VX-07 // PROTOTYPE",
    series: "Ultimate Series",
    tagline:
      "Sculpted in carbon-titanium for uncompromising circuit authority.",
    year: 2026,
    price: 365000,
    bodyType: "Hypercar",
    powertrain: "Twin-Turbo V8 Hybrid",
    transmission: "8-Speed Magnesium Dual-Clutch",
    drivetrain: "AWD",
    fuelType: "Hybrid Petrol",
    featured: true,
    productionLimit: "Limited to 50 Units Worldwide",
    editorialQuote:
      "Every surface is mathematically resolved inside the wind tunnel before a single carbon ply is laid.",
    overview:
      "The VELOX Nemesis GT-R combines an autoclave-cured carbon-titanium monocoque with a high-revving twin-turbo V8 and axial-flux front e-motors.",
    engineeringStory:
      "Developed across 1,200 hours of computational fluid dynamics testing to achieve 820 kg of active ground-effect downforce.",
    exteriorFinish: "Obsidian Matte Stealth Carbon",
    interiorTrim: "Anthracite Alcantara & Billet Anodized Titanium",
    performance: {
      horsepower: 1020,
      torqueNm: 1100,
      zeroToHundred: "2.2 s",
      zeroToTwoHundred: "5.6 s",
      topSpeedKmh: 360,
      weightKg: 1410,
      downforceKg: 820,
      redlineRpm: "9,000 RPM",
      rangeKm: undefined,
    },
    dimensions: {
      lengthMm: 4660,
      widthMm: 2030,
      heightMm: 1140,
      wheelbaseMm: 2700,
      weightDistribution: "43% Front / 57% Rear",
    },
    chassisAndAero: {
      monocoque:
        "Autoclave-cured Carbon-Titanium Tub with integrated roll structure",
      suspension:
        "Pushrod-actuated active hydraulic dampers with track-height drop mode",
      brakes:
        "420mm Front / 390mm Rear Carbon-Ceramic discs, 6-piston monoblock",
      aerodynamics:
        "Active front splitter, underbody Venturi floor, DRS hydraulic rear wing",
      tires:
        "Pirelli P Zero Trofeo RS — 265/35 ZR20 (F) / 345/30 ZR21 (R)",
    },
    highlights: [
      "1,020 PS combined output from 4.0L flat-plane V8 + axial-flux e-axle",
      "820 kg of active aerodynamic downforce with automatic DRS",
      "1,410 kg dry weight for razor-sharp lateral turn-in response",
      "Bespoke driver telemetry HUD with billet titanium cockpit switchgear",
    ],
    images: {
      hero: PRESET_STUDIO_IMAGES[0].url,
      card: PRESET_STUDIO_IMAGES[0].url,
      editorial: PRESET_STUDIO_IMAGES[1].url,
      gallery: [
        {
          url: PRESET_STUDIO_IMAGES[0].url,
          alt: "Front three-quarter studio view",
          caption: "Low-slung dihedral nose section with laser-matrix headlamps.",
          category: "Exterior",
        },
        {
          url: PRESET_STUDIO_IMAGES[1].url,
          alt: "Rear aerodynamic diffuser profile",
          caption: "Active hydraulic wing and Venturi diffuser outlets.",
          category: "Aerodynamics",
        },
      ],
    },
  };
}

type EditorTab =
  | "identity"
  | "performance"
  | "editorial"
  | "dimensions"
  | "chassis"
  | "media";

export function AdminDashboardClient({
  initialVehicles,
  initialInquiries,
  initialAuthenticated,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [inquiries, setInquiries] = useState<InquiryItem[]>(initialInquiries);

  const [activeWorkspace, setActiveWorkspace] = useState<
    "fleet" | "editor" | "inquiries"
  >("fleet");

  const [fleetSearch, setFleetSearch] = useState("");
  const [fleetBodyFilter, setFleetBodyFilter] = useState<"ALL" | BodyType>(
    "ALL"
  );

  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("ALL");
  const [editingInquiry, setEditingInquiry] = useState<InquiryItem | null>(
    null
  );

  const [editorMode, setEditorMode] = useState<"create" | "edit">("edit");
  const [originalSlug, setOriginalSlug] = useState<string>(
    initialVehicles[0]?.slug || ""
  );
  const [draft, setDraft] = useState<Vehicle>(
    initialVehicles[0] || createEmptyVehicleDraft()
  );
  const [editorTab, setEditorTab] = useState<EditorTab>("identity");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Staff Login Handler
  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setIsAuthenticated(true);
        router.refresh();
      } else {
        setLoginError(data.error || "Invalid credentials.");
      }
    } catch {
      setLoginError("Unable to reach authentication server.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleStaffLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
    router.refresh();
  };

  const refreshAllData = async () => {
    const [vRes, iRes] = await Promise.all([
      fetch("/api/vehicles"),
      fetch("/api/inquiries"),
    ]);
    if (vRes.ok) {
      const vData = await vRes.json();
      setVehicles(vData.vehicles || []);
    }
    if (iRes.ok) {
      const iData = await iRes.json();
      setInquiries(iData.inquiries || []);
    }
    router.refresh();
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (fleetBodyFilter !== "ALL" && v.bodyType !== fleetBodyFilter) {
        return false;
      }
      if (fleetSearch.trim() !== "") {
        const q = fleetSearch.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.codeName.toLowerCase().includes(q) ||
          v.powertrain.toLowerCase().includes(q) ||
          v.bodyType.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [vehicles, fleetBodyFilter, fleetSearch]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      if (
        inquiryStatusFilter !== "ALL" &&
        inq.status !== inquiryStatusFilter
      ) {
        return false;
      }
      if (inquirySearch.trim() !== "") {
        const q = inquirySearch.toLowerCase();
        return (
          inq.fullName.toLowerCase().includes(q) ||
          inq.referenceCode.toLowerCase().includes(q) ||
          inq.vehicleName.toLowerCase().includes(q) ||
          inq.email.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [inquiries, inquiryStatusFilter, inquirySearch]);

  const startCreateNewVehicle = () => {
    setEditorMode("create");
    setOriginalSlug("");
    setDraft(createEmptyVehicleDraft());
    setEditorTab("identity");
    setActiveWorkspace("editor");
  };

  const startEditVehicle = (vehicle: Vehicle) => {
    setEditorMode("edit");
    setOriginalSlug(vehicle.slug);
    setDraft(JSON.parse(JSON.stringify(vehicle)));
    setEditorTab("identity");
    setActiveWorkspace("editor");
  };

  const handleDuplicateVehicle = async (vehicle: Vehicle) => {
    setSaving(true);
    try {
      const copyPayload = {
        ...vehicle,
        name: `${vehicle.name} BESPOKE`,
        slug: `${vehicle.slug}-bespoke-${Math.floor(10 + Math.random() * 89)}`,
        codeName: `${vehicle.codeName} // ED.2`,
      };
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(copyPayload),
      });
      if (res.ok) {
        await refreshAllData();
        showToast(`Cloned "${vehicle.name}" in database.`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSaveVehicleDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const endpoint =
        editorMode === "create"
          ? "/api/vehicles"
          : `/api/vehicles/${originalSlug}`;
      const method = editorMode === "create" ? "POST" : "PATCH";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        await refreshAllData();
        showToast(
          editorMode === "create"
            ? `Added "${draft.name}" to Fleet Catalogue.`
            : `Saved changes to "${draft.name}".`
        );
        setActiveWorkspace("fleet");
      } else {
        showToast(data.error || "Failed to save vehicle.", "error");
      }
    } catch {
      showToast("Network error while saving vehicle.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async (vehicle: Vehicle) => {
    const res = await fetch(`/api/vehicles/${vehicle.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !vehicle.featured }),
    });
    if (res.ok) {
      await refreshAllData();
      showToast(
        `${vehicle.name} ${
          !vehicle.featured ? "marked as Featured." : "removed from Featured."
        }`
      );
    }
  };

  const handleDeleteVehicle = async (slug: string, name: string) => {
    const res = await fetch(`/api/vehicles/${slug}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await refreshAllData();
      showToast(`Deleted "${name}".`);
    }
  };

  const handleResetFactoryFleet = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/vehicles/reset", { method: "POST" });
      if (res.ok) {
        await refreshAllData();
        showToast("Restored all 6 factory VELOX models.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateInquiry = async (
    id: string,
    payload: Partial<InquiryItem>
  ) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setEditingInquiry(null);
      await refreshAllData();
      showToast("Updated booking dossier.");
    }
  };

  const handleDeleteInquiry = async (id: string, refCode: string) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await refreshAllData();
      showToast(`Deleted booking ${refCode}.`);
    }
  };

  const updatePerf = (
    key: keyof Vehicle["performance"],
    value: string | number | undefined
  ) => {
    setDraft((prev) => ({
      ...prev,
      performance: {
        ...prev.performance,
        [key]: value,
      },
    }));
  };

  const updateDim = (
    key: keyof Vehicle["dimensions"],
    value: string | number
  ) => {
    setDraft((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [key]: value,
      },
    }));
  };

  const updateChassis = (
    key: keyof Vehicle["chassisAndAero"],
    value: string
  ) => {
    setDraft((prev) => ({
      ...prev,
      chassisAndAero: {
        ...prev.chassisAndAero,
        [key]: value,
      },
    }));
  };

  const updateGalleryItem = (
    index: number,
    field: keyof VehicleGalleryItem,
    value: string
  ) => {
    setDraft((prev) => {
      const nextGallery = [...prev.images.gallery];
      nextGallery[index] = {
        ...nextGallery[index],
        [field]: value,
      };
      return {
        ...prev,
        images: {
          ...prev.images,
          gallery: nextGallery,
        },
      };
    });
  };

  const addGalleryFrame = () => {
    setDraft((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        gallery: [
          ...prev.images.gallery,
          {
            url: PRESET_STUDIO_IMAGES[2].url,
            alt: `${prev.name} studio angle`,
            caption: "Aerodynamic carbon bodywork and nocturnal studio lighting.",
            category: "Exterior",
          },
        ],
      },
    }));
  };

  const removeGalleryFrame = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        gallery: prev.images.gallery.filter((_, idx) => idx !== index),
      },
    }));
  };

  // =========================================================================
  // STAFF AUTHENTICATION GATE (IF NOT LOGGED IN)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0D12] text-[#F3F5F8] flex flex-col justify-between p-6">
        <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-1.5 h-5 bg-white rounded-full inline-block" />
            <span className="font-display text-lg font-bold tracking-[0.22em] text-white">
              VELOX
            </span>
            <span className="text-xs text-[#949CA8] font-mono-tech">
              // STAFF PORTAL
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#949CA8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Showroom</span>
          </Link>
        </header>

        <div className="max-w-md w-full mx-auto bg-[#12161F] rounded-2xl border border-white/10 p-8 sm:p-10 shadow-2xl space-y-7">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-[#D6C7B2]" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Executive Studio Access
            </h1>
            <p className="text-xs text-[#949CA8] leading-relaxed">
              Sign in with authorized staff credentials to manage the VELOX fleet inventory and client viewing dossiers.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-950/50 border border-red-500/40 rounded-lg p-3.5 text-xs text-red-200 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleStaffLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="staff-email"
                className="block text-xs font-medium text-[#CBD5E1]"
              >
                Staff Email
              </label>
              <input
                id="staff-email"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@velox.auto"
                className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#5E6673] focus:border-white"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="staff-password"
                className="block text-xs font-medium text-[#CBD5E1]"
              >
                Access Passkey
              </label>
              <input
                id="staff-password"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="•••••••••"
                className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#5E6673] focus:border-white"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-white text-[#0B0D12] hover:bg-[#E2E8F0] py-3.5 rounded-lg text-xs font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer mt-2"
            >
              {loggingIn ? "Verifying Access..." : "Sign In to Studio"}
            </button>
          </form>

          {/* Portfolio Reviewer Quick-Fill Helper */}
          <div className="pt-5 border-t border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[#949CA8]">
              <span>Portfolio Demo Credentials:</span>
              <span className="font-mono-tech text-[#CBD5E1]">
                admin@velox.auto / velox2026
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setLoginEmail("admin@velox.auto");
                setLoginPassword("velox2026");
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#181D29] hover:bg-white/10 text-[#CBD5E1] border border-white/10 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#D6C7B2]" />
              <span>Auto-Fill Demo Credentials</span>
            </button>
          </div>
        </div>

        <footer className="text-center text-xs text-[#5E6673] font-mono-tech">
          VELOX AUTOMOTIVE • PROTECTED MANAGEMENT CONSOLE
        </footer>
      </div>
    );
  }

  // =========================================================================
  // AUTHENTICATED ADMIN WORKSPACE (STANDALONE SIDEBAR + MAIN PANEL)
  // =========================================================================
  const totalValuation = vehicles.reduce((sum, v) => sum + v.price, 0);
  const avgHorsepower =
    vehicles.length > 0
      ? Math.round(
          vehicles.reduce((sum, v) => sum + v.performance.horsepower, 0) /
            vehicles.length
        )
      : 0;
  const pendingInquiries = inquiries.filter(
    (i) => i.status === "PENDING"
  ).length;

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F3F5F8] flex flex-col lg:flex-row">
      {/* Toast Feedback */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl border shadow-2xl flex items-center gap-3 text-xs font-medium ${
            toast.type === "error"
              ? "bg-red-950 border-red-500/60 text-red-200"
              : "bg-[#181D29] border-white/20 text-white"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0" />
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-[#949CA8] hover:text-white ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-[#10131A] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between shrink-0 lg:sticky lg:top-0 lg:h-screen">
        <div className="p-6 space-y-8">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-white rounded-full inline-block" />
              <div>
                <span className="font-display text-lg font-bold tracking-[0.2em] text-white block leading-none">
                  VELOX
                </span>
                <span className="font-mono-tech text-[10px] text-[#D6C7B2] tracking-widest uppercase mt-1 block">
                  Studio CMS
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono-tech text-emerald-300">
              SQLite
            </span>
          </div>

          {/* Primary Action */}
          <button
            type="button"
            onClick={startCreateNewVehicle}
            className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#0B0D12] hover:bg-[#E2E8F0] px-4 py-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Vehicle</span>
          </button>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            <p className="px-3 text-[10px] font-mono-tech uppercase tracking-wider text-[#5E6673] mb-2">
              Management
            </p>
            <button
              type="button"
              onClick={() => setActiveWorkspace("fleet")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeWorkspace === "fleet"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-[#949CA8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutGrid className="w-4 h-4 text-[#D6C7B2]" />
                <span>Fleet Catalogue</span>
              </span>
              <span className="font-mono-tech text-[11px] bg-[#0B0D12] px-2 py-0.5 rounded text-[#CBD5E1]">
                {vehicles.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveWorkspace("editor")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeWorkspace === "editor"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-[#949CA8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Edit3 className="w-4 h-4 text-[#D6C7B2]" />
                <span>Model Editor</span>
              </span>
              <span className="text-[10px] text-[#949CA8] truncate max-w-[75px]">
                {editorMode === "create"
                  ? "New"
                  : draft.name.replace("VELOX ", "")}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveWorkspace("inquiries")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeWorkspace === "inquiries"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-[#949CA8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <CalendarCheck className="w-4 h-4 text-[#D6C7B2]" />
                <span>Client Bookings</span>
              </span>
              <span className="font-mono-tech text-[11px] bg-[#0B0D12] px-2 py-0.5 rounded text-[#CBD5E1]">
                {inquiries.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Utility Links */}
        <div className="p-6 border-t border-white/[0.08] space-y-2">
          <button
            type="button"
            onClick={handleResetFactoryFleet}
            disabled={saving}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#949CA8] hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Default 6 Cars</span>
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#949CA8] hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <span>Open Public Showroom</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleStaffLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN STUDIO WORKSPACE */}
      <div className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto max-w-[1400px]">
        {/* Top Overview KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#12161F] rounded-xl border border-white/[0.07] p-5">
            <div className="flex items-center justify-between text-[#949CA8] text-xs">
              <span>Fleet Inventory</span>
              <Car className="w-4 h-4 text-[#D6C7B2]" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display text-2xl font-bold text-white">
                {vehicles.length} Models
              </span>
              <span className="text-xs text-[#949CA8]">
                {vehicles.filter((v) => v.featured).length} Featured
              </span>
            </div>
          </div>

          <div className="bg-[#12161F] rounded-xl border border-white/[0.07] p-5">
            <div className="flex items-center justify-between text-[#949CA8] text-xs">
              <span>Fleet Valuation</span>
              <Database className="w-4 h-4 text-[#D6C7B2]" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display text-2xl font-bold text-white">
                {formatPrice(totalValuation)}
              </span>
              <span className="text-xs text-[#949CA8]">Total Base</span>
            </div>
          </div>

          <div className="bg-[#12161F] rounded-xl border border-white/[0.07] p-5">
            <div className="flex items-center justify-between text-[#949CA8] text-xs">
              <span>Average Output</span>
              <Gauge className="w-4 h-4 text-[#D6C7B2]" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display text-2xl font-bold text-white">
                {avgHorsepower} PS
              </span>
              <span className="text-xs text-[#949CA8]">Homologated</span>
            </div>
          </div>

          <div className="bg-[#12161F] rounded-xl border border-white/[0.07] p-5">
            <div className="flex items-center justify-between text-[#949CA8] text-xs">
              <span>Viewing Bookings</span>
              <CalendarCheck className="w-4 h-4 text-[#D6C7B2]" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display text-2xl font-bold text-white">
                {inquiries.length} Total
              </span>
              <span className="text-xs text-amber-300">
                {pendingInquiries} Pending
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            VIEW 1: FLEET CATALOGUE MANAGER
           =================================================================== */}
        {activeWorkspace === "fleet" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  Fleet Inventory
                </h1>
                <p className="text-xs text-[#949CA8]">
                  Click “Edit Vehicle” on any model to modify its specifications, photos, or pricing.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#5E6673] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    placeholder="Search models..."
                    className="w-full bg-[#12161F] rounded-lg border border-white/10 pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-[#5E6673] focus:border-white"
                  />
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  "ALL",
                  "Hypercar",
                  "Grand Tourer",
                  "Track Coupe",
                  "Performance SUV",
                ] as const
              ).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFleetBodyFilter(type)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    fleetBodyFilter === type
                      ? "bg-white text-[#0B0D12] font-semibold"
                      : "bg-[#12161F] text-[#949CA8] border border-white/[0.07] hover:text-white"
                  }`}
                >
                  {type === "ALL" ? "All Categories" : type}
                </button>
              ))}
            </div>

            {/* Clean, Ergonomic Vehicle Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredVehicles.map((v) => (
                <div
                  key={v.slug}
                  className="bg-[#12161F] rounded-xl border border-white/[0.08] hover:border-white/20 transition-all p-5 flex flex-col justify-between gap-5"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img
                      src={v.images.card}
                      alt={v.name}
                      className="w-full sm:w-40 aspect-[16/10] object-cover rounded-lg bg-[#0B0D12] border border-white/10 shrink-0"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono-tech text-[#D6C7B2]">
                          {v.bodyType} • {v.year}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(v)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border cursor-pointer ${
                            v.featured
                              ? "bg-amber-400/15 border-amber-400/40 text-amber-200"
                              : "border-white/10 text-[#5E6673] hover:text-white"
                          }`}
                        >
                          <Star className="w-3 h-3" />
                          {v.featured ? "Featured" : "Standard"}
                        </button>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white truncate">
                        {v.name}
                      </h3>
                      <p className="text-xs text-[#949CA8] line-clamp-1">
                        {v.tagline}
                      </p>

                      <div className="pt-1 flex items-center gap-4 text-xs font-mono-tech text-[#CBD5E1]">
                        <span>{formatPrice(v.price)}</span>
                        <span className="text-[#5E6673]">•</span>
                        <span>{v.performance.horsepower} PS</span>
                        <span className="text-[#5E6673]">•</span>
                        <span>{v.performance.zeroToHundred}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => startEditVehicle(v)}
                      className="inline-flex items-center gap-1.5 bg-white text-[#0B0D12] hover:bg-[#E2E8F0] px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Vehicle</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDuplicateVehicle(v)}
                        title="Duplicate Vehicle"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#181D29] hover:bg-white/10 text-xs text-[#CBD5E1] transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Clone</span>
                      </button>
                      <Link
                        href={`/vehicles/${v.slug}`}
                        title="View on Public Site"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#181D29] hover:bg-white/10 text-xs text-[#CBD5E1] transition-colors"
                      >
                        <span>Preview</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteVehicle(v.slug, v.name)}
                        title="Delete Vehicle"
                        className="p-2 rounded-lg bg-[#181D29] hover:bg-red-950/50 text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 2: ERGONOMIC 6-TAB MODEL EDITOR WITH LIVE PREVIEW
           =================================================================== */}
        {activeWorkspace === "editor" && (
          <form
            onSubmit={handleSaveVehicleDraft}
            className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start"
          >
            <div className="xl:col-span-8 bg-[#12161F] rounded-2xl border border-white/[0.08] overflow-hidden">
              {/* Editor Top Bar */}
              <div className="p-6 bg-[#161B26] border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveWorkspace("fleet")}
                    className="inline-flex items-center gap-1.5 text-xs text-[#949CA8] hover:text-white mb-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Fleet List</span>
                  </button>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {editorMode === "create"
                      ? "Add New Vehicle Model"
                      : `Editing: ${draft.name}`}
                  </h2>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0B0D12] hover:bg-[#E2E8F0] px-6 py-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {saving
                      ? "Saving..."
                      : editorMode === "create"
                      ? "Publish Vehicle"
                      : "Save Changes"}
                  </span>
                </button>
              </div>

              {/* Clean Pill Navigation for the 6 Sections */}
              <div className="px-6 py-3 bg-[#0E1118] border-b border-white/[0.08] flex flex-wrap gap-1.5">
                {[
                  { id: "identity", label: "1. Basic Info", icon: Sliders },
                  { id: "performance", label: "2. Performance", icon: Gauge },
                  { id: "editorial", label: "3. Description", icon: FileText },
                  { id: "dimensions", label: "4. Dimensions", icon: Ruler },
                  { id: "chassis", label: "5. Chassis & Aero", icon: Shield },
                  { id: "media", label: "6. Photos & Gallery", icon: ImageIcon },
                ].map((t) => {
                  const Icon = t.icon;
                  const active = editorTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEditorTab(t.id as EditorTab)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                        active
                          ? "bg-white text-[#0B0D12] font-semibold"
                          : "text-[#949CA8] hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Editor Form Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {editorTab === "identity" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Vehicle Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={draft.name}
                          onChange={(e) =>
                            setDraft({ ...draft, name: e.target.value })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Code Name
                        </label>
                        <input
                          type="text"
                          value={draft.codeName}
                          onChange={(e) =>
                            setDraft({ ...draft, codeName: e.target.value })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Category / Body Type
                        </label>
                        <select
                          value={draft.bodyType}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              bodyType: e.target.value as BodyType,
                            })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-white"
                        >
                          <option value="Hypercar">Hypercar</option>
                          <option value="Grand Tourer">Grand Tourer</option>
                          <option value="Track Coupe">Track Coupe</option>
                          <option value="Performance SUV">
                            Performance SUV
                          </option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Series Name
                        </label>
                        <input
                          type="text"
                          value={draft.series}
                          onChange={(e) =>
                            setDraft({ ...draft, series: e.target.value })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Model Year
                        </label>
                        <input
                          type="number"
                          value={draft.year}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              year: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Base Price (USD) *
                        </label>
                        <input
                          type="number"
                          step={1000}
                          value={draft.price}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              price: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white font-semibold focus:border-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Production Limit Note
                        </label>
                        <input
                          type="text"
                          value={draft.productionLimit || ""}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              productionLimit: e.target.value,
                            })
                          }
                          placeholder="Limited to 75 Units Worldwide"
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Short Tagline *
                      </label>
                      <input
                        type="text"
                        value={draft.tagline}
                        onChange={(e) =>
                          setDraft({ ...draft, tagline: e.target.value })
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-white"
                      />
                    </div>

                    <label className="p-4 rounded-xl bg-[#0B0D12] border border-white/10 flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="block text-xs font-semibold text-white">
                          Display in Home Page Featured Section
                        </span>
                        <span className="text-xs text-[#949CA8]">
                          Highlights this vehicle in the main Home page editorial showcase.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={draft.featured}
                        onChange={(e) =>
                          setDraft({ ...draft, featured: e.target.checked })
                        }
                        className="w-4 h-4 accent-white"
                      />
                    </label>
                  </div>
                )}

                {editorTab === "performance" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Powertrain Type
                        </label>
                        <select
                          value={draft.powertrain}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              powertrain: e.target.value as PowertrainType,
                            })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        >
                          <option value="Twin-Turbo V8 Hybrid">
                            Twin-Turbo V8 Hybrid
                          </option>
                          <option value="Full Electric Tri-Motor">
                            Full Electric Tri-Motor
                          </option>
                          <option value="Naturally Aspirated V10">
                            Naturally Aspirated V10
                          </option>
                          <option value="Quad-Motor Electric">
                            Quad-Motor Electric
                          </option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Transmission
                        </label>
                        <input
                          type="text"
                          value={draft.transmission}
                          onChange={(e) =>
                            setDraft({ ...draft, transmission: e.target.value })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Drivetrain
                        </label>
                        <select
                          value={draft.drivetrain}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              drivetrain: e.target.value as "AWD" | "RWD",
                            })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        >
                          <option value="AWD">AWD (All-Wheel Drive)</option>
                          <option value="RWD">RWD (Rear-Wheel Drive)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Fuel / Energy Type
                        </label>
                        <select
                          value={draft.fuelType}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              fuelType: e.target.value as Vehicle["fuelType"],
                            })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        >
                          <option value="Hybrid Petrol">Hybrid Petrol</option>
                          <option value="Battery Electric">
                            Battery Electric
                          </option>
                          <option value="High-Octane Petrol">
                            High-Octane Petrol
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-white/[0.08]">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Horsepower (PS)
                        </label>
                        <input
                          type="number"
                          value={draft.performance.horsepower}
                          onChange={(e) =>
                            updatePerf("horsepower", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Torque (Nm)
                        </label>
                        <input
                          type="number"
                          value={draft.performance.torqueNm}
                          onChange={(e) =>
                            updatePerf("torqueNm", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          0–100 km/h
                        </label>
                        <input
                          type="text"
                          value={draft.performance.zeroToHundred}
                          onChange={(e) =>
                            updatePerf("zeroToHundred", e.target.value)
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          0–200 km/h
                        </label>
                        <input
                          type="text"
                          value={draft.performance.zeroToTwoHundred}
                          onChange={(e) =>
                            updatePerf("zeroToTwoHundred", e.target.value)
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Top Speed (km/h)
                        </label>
                        <input
                          type="number"
                          value={draft.performance.topSpeedKmh}
                          onChange={(e) =>
                            updatePerf("topSpeedKmh", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Dry Weight (kg)
                        </label>
                        <input
                          type="number"
                          value={draft.performance.weightKg}
                          onChange={(e) =>
                            updatePerf("weightKg", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Downforce (kg)
                        </label>
                        <input
                          type="number"
                          value={draft.performance.downforceKg}
                          onChange={(e) =>
                            updatePerf("downforceKg", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Redline / Range
                        </label>
                        <input
                          type="text"
                          value={draft.performance.redlineRpm || ""}
                          onChange={(e) =>
                            updatePerf("redlineRpm", e.target.value)
                          }
                          placeholder="9,000 RPM"
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {editorTab === "editorial" && (
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Editorial Quote
                      </label>
                      <textarea
                        rows={2}
                        value={draft.editorialQuote}
                        onChange={(e) =>
                          setDraft({ ...draft, editorialQuote: e.target.value })
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 p-3.5 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Vehicle Overview
                      </label>
                      <textarea
                        rows={3}
                        value={draft.overview}
                        onChange={(e) =>
                          setDraft({ ...draft, overview: e.target.value })
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 p-3.5 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Engineering Story
                      </label>
                      <textarea
                        rows={3}
                        value={draft.engineeringStory}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            engineeringStory: e.target.value,
                          })
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 p-3.5 text-sm text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Exterior Finish
                        </label>
                        <input
                          type="text"
                          value={draft.exteriorFinish}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              exteriorFinish: e.target.value,
                            })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Interior Trim
                        </label>
                        <input
                          type="text"
                          value={draft.interiorTrim}
                          onChange={(e) =>
                            setDraft({ ...draft, interiorTrim: e.target.value })
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        />
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-[#CBD5E1]">
                          Key Highlights ({draft.highlights.length})
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setDraft({
                              ...draft,
                              highlights: [
                                ...draft.highlights,
                                "New specification highlight",
                              ],
                            })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181D29] hover:bg-white/10 text-xs text-white cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Highlight
                        </button>
                      </div>

                      <div className="space-y-2">
                        {draft.highlights.map((hl, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={hl}
                              onChange={(e) => {
                                const next = [...draft.highlights];
                                next[idx] = e.target.value;
                                setDraft({ ...draft, highlights: next });
                              }}
                              className="flex-1 bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setDraft({
                                  ...draft,
                                  highlights: draft.highlights.filter(
                                    (_, i) => i !== idx
                                  ),
                                })
                              }
                              className="p-2 rounded-lg bg-[#181D29] text-red-400 hover:bg-red-950/40 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {editorTab === "dimensions" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Length (mm)
                        </label>
                        <input
                          type="number"
                          value={draft.dimensions.lengthMm}
                          onChange={(e) =>
                            updateDim("lengthMm", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Width (mm)
                        </label>
                        <input
                          type="number"
                          value={draft.dimensions.widthMm}
                          onChange={(e) =>
                            updateDim("widthMm", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Height (mm)
                        </label>
                        <input
                          type="number"
                          value={draft.dimensions.heightMm}
                          onChange={(e) =>
                            updateDim("heightMm", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[#CBD5E1]">
                          Wheelbase (mm)
                        </label>
                        <input
                          type="number"
                          value={draft.dimensions.wheelbaseMm}
                          onChange={(e) =>
                            updateDim("wheelbaseMm", Number(e.target.value))
                          }
                          className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Weight Distribution
                      </label>
                      <input
                        type="text"
                        value={draft.dimensions.weightDistribution}
                        onChange={(e) =>
                          updateDim("weightDistribution", e.target.value)
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>
                )}

                {editorTab === "chassis" && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Monocoque Structure
                      </label>
                      <input
                        type="text"
                        value={draft.chassisAndAero.monocoque}
                        onChange={(e) =>
                          updateChassis("monocoque", e.target.value)
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Suspension System
                      </label>
                      <input
                        type="text"
                        value={draft.chassisAndAero.suspension}
                        onChange={(e) =>
                          updateChassis("suspension", e.target.value)
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Braking System
                      </label>
                      <input
                        type="text"
                        value={draft.chassisAndAero.brakes}
                        onChange={(e) =>
                          updateChassis("brakes", e.target.value)
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Aerodynamics
                      </label>
                      <input
                        type="text"
                        value={draft.chassisAndAero.aerodynamics}
                        onChange={(e) =>
                          updateChassis("aerodynamics", e.target.value)
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Tires & Wheels
                      </label>
                      <input
                        type="text"
                        value={draft.chassisAndAero.tires}
                        onChange={(e) => updateChassis("tires", e.target.value)}
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>
                )}

                {editorTab === "media" && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-xs font-medium text-[#CBD5E1]">
                        Main Hero & Card Image URL
                      </label>
                      <input
                        type="url"
                        value={draft.images.hero}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            images: {
                              ...draft.images,
                              hero: e.target.value,
                              card: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-xs text-white font-mono-tech"
                      />

                      <div className="space-y-2 pt-1">
                        <span className="block text-xs text-[#949CA8]">
                          Quick-Select Studio Photography:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {PRESET_STUDIO_IMAGES.map((preset) => (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() =>
                                setDraft({
                                  ...draft,
                                  images: {
                                    ...draft.images,
                                    hero: preset.url,
                                    card: preset.url,
                                  },
                                })
                              }
                              className="group relative aspect-[16/10] rounded-lg border border-white/15 hover:border-white overflow-hidden text-left cursor-pointer"
                            >
                              <img
                                src={preset.url}
                                alt={preset.label}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                              <span className="absolute bottom-1.5 left-2 right-2 text-[10px] text-white font-medium truncate">
                                {preset.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Gallery Manager */}
                    <div className="space-y-4 pt-5 border-t border-white/[0.08]">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            Gallery Angles ({draft.images.gallery.length})
                          </span>
                          <span className="text-xs text-[#949CA8]">
                            Add or edit gallery photos shown on the vehicle detail page.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={addGalleryFrame}
                          className="inline-flex items-center gap-1.5 bg-[#181D29] hover:bg-white/10 text-white px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Photo
                        </button>
                      </div>

                      <div className="space-y-3">
                        {draft.images.gallery.map((frame, idx) => (
                          <div
                            key={idx}
                            className="bg-[#0B0D12] rounded-xl border border-white/10 p-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                          >
                            <div className="sm:col-span-3 aspect-[16/10] rounded-lg overflow-hidden bg-[#12161F]">
                              <img
                                src={frame.url}
                                alt={frame.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="sm:col-span-8 space-y-2">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <select
                                  value={frame.category}
                                  onChange={(e) =>
                                    updateGalleryItem(
                                      idx,
                                      "category",
                                      e.target.value
                                    )
                                  }
                                  className="bg-[#12161F] rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-white"
                                >
                                  <option value="Exterior">Exterior</option>
                                  <option value="Aerodynamics">
                                    Aerodynamics
                                  </option>
                                  <option value="Cockpit">Cockpit</option>
                                  <option value="Detail">Detail</option>
                                </select>
                                <input
                                  type="url"
                                  value={frame.url}
                                  onChange={(e) =>
                                    updateGalleryItem(
                                      idx,
                                      "url",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Image URL"
                                  className="sm:col-span-2 bg-[#12161F] rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-white font-mono-tech"
                                />
                              </div>
                              <input
                                type="text"
                                value={frame.caption}
                                onChange={(e) =>
                                  updateGalleryItem(
                                    idx,
                                    "caption",
                                    e.target.value
                                  )
                                }
                                placeholder="Photo caption..."
                                className="w-full bg-[#12161F] rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div className="sm:col-span-1 flex justify-end">
                              <button
                                type="button"
                                onClick={() => removeGalleryFrame(idx)}
                                className="p-2 rounded-lg bg-[#181D29] text-red-400 hover:bg-red-950/40 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Live Card Preview */}
            <aside className="xl:col-span-4 space-y-4 sticky top-8">
              <div className="bg-[#12161F] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                <div className="px-5 py-3.5 bg-[#161B26] border-b border-white/[0.08] flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium text-[#D6C7B2]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live Showroom Preview</span>
                  </span>
                  <span className="font-mono-tech text-[11px] text-[#949CA8]">
                    {draft.year}
                  </span>
                </div>

                <div className="relative aspect-[16/10] bg-[#0B0D12]">
                  <img
                    src={draft.images.hero}
                    alt={draft.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161F] via-transparent to-transparent" />
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#D6C7B2]">
                      {draft.bodyType} • {draft.powertrain}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-0.5">
                      {draft.name || "VELOX MODEL"}
                    </h3>
                    <p className="text-xs text-[#949CA8] mt-1 line-clamp-2">
                      {draft.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 rounded-lg bg-[#0B0D12] border border-white/[0.07] p-3 gap-2 font-mono-tech text-xs">
                    <div>
                      <span className="block text-[9px] text-[#5E6673]">
                        0–100
                      </span>
                      <span className="font-semibold text-white">
                        {draft.performance.zeroToHundred}
                      </span>
                    </div>
                    <div className="border-x border-white/[0.07] px-2">
                      <span className="block text-[9px] text-[#5E6673]">
                        POWER
                      </span>
                      <span className="font-semibold text-white">
                        {draft.performance.horsepower} PS
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-[#5E6673]">
                        PRICE
                      </span>
                      <span className="font-semibold text-[#D6C7B2]">
                        {formatPrice(draft.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </form>
        )}

        {/* ===================================================================
            VIEW 3: CLIENT VIEWING BOOKINGS
           =================================================================== */}
        {activeWorkspace === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  Client Viewing & Test-Drive Bookings
                </h1>
                <p className="text-xs text-[#949CA8]">
                  Manage appointments submitted through the public Private Viewing form.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#5E6673] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search client or code..."
                  className="w-full bg-[#12161F] rounded-lg border border-white/10 pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-[#5E6673]"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      inquiryStatusFilter === st
                        ? "bg-white text-[#0B0D12] font-semibold"
                        : "bg-[#12161F] text-[#949CA8] border border-white/[0.07] hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="bg-[#12161F] rounded-xl border border-white/[0.07] p-12 text-center text-xs text-[#949CA8]">
                No bookings match the selected filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-[#12161F] rounded-xl border border-white/[0.08] p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs">
                        <span className="font-mono-tech bg-[#0B0D12] border border-white/10 px-2.5 py-0.5 rounded text-[#D6C7B2] font-semibold">
                          {inq.referenceCode}
                        </span>
                        <span className="font-semibold text-white">
                          {inq.vehicleName}
                        </span>
                        <span className="text-[#949CA8]">
                          • {inq.experienceType.replace(/_/g, " ")}
                        </span>
                      </div>

                      <div className="text-sm text-white font-medium">
                        {inq.fullName}{" "}
                        <span className="text-xs text-[#949CA8] font-normal ml-2">
                          ({inq.email} • {inq.phone})
                        </span>
                      </div>

                      <div className="text-xs text-[#949CA8]">
                        Date: <strong className="text-white">{inq.preferredDate}</strong>{" "}
                        • Location:{" "}
                        <strong className="text-white">{inq.location}</strong>
                      </div>

                      {inq.notes && (
                        <p className="text-xs text-[#CBD5E1] italic pt-1">
                          “{inq.notes}”
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateInquiry(inq.id, { status: "PENDING" })
                        }
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border cursor-pointer ${
                          inq.status === "PENDING"
                            ? "bg-amber-400/15 border-amber-400/50 text-amber-200 font-semibold"
                            : "border-white/10 text-[#949CA8] hover:text-white"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateInquiry(inq.id, { status: "CONFIRMED" })
                        }
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border cursor-pointer ${
                          inq.status === "CONFIRMED"
                            ? "bg-emerald-500/15 border-emerald-400/50 text-emerald-200 font-semibold"
                            : "border-white/10 text-[#949CA8] hover:text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateInquiry(inq.id, { status: "CANCELLED" })
                        }
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border cursor-pointer ${
                          inq.status === "CANCELLED"
                            ? "bg-red-500/15 border-red-500/50 text-red-200 font-semibold"
                            : "border-white/10 text-[#949CA8] hover:text-white"
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancelled
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingInquiry(inq)}
                        className="p-2 rounded-lg bg-[#181D29] text-[#CBD5E1] hover:text-white cursor-pointer"
                        title="Edit Booking"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteInquiry(inq.id, inq.referenceCode)
                        }
                        className="p-2 rounded-lg bg-[#181D29] text-red-400 hover:bg-red-950/40 cursor-pointer"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {editingInquiry && (
              <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#12161F] rounded-2xl border border-white/15 max-w-md w-full p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-display text-lg font-bold text-white">
                      Edit Booking ({editingInquiry.referenceCode})
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingInquiry(null)}
                      className="text-[#949CA8] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="block text-[#CBD5E1]">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={editingInquiry.preferredDate}
                        onChange={(e) =>
                          setEditingInquiry({
                            ...editingInquiry,
                            preferredDate: e.target.value,
                          })
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[#CBD5E1]">Location</label>
                      <input
                        type="text"
                        value={editingInquiry.location}
                        onChange={(e) =>
                          setEditingInquiry({
                            ...editingInquiry,
                            location: e.target.value,
                          })
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 px-3.5 py-2.5 text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[#CBD5E1]">Notes</label>
                      <textarea
                        rows={3}
                        value={editingInquiry.notes || ""}
                        onChange={(e) =>
                          setEditingInquiry({
                            ...editingInquiry,
                            notes: e.target.value,
                          })
                        }
                        className="w-full bg-[#0B0D12] rounded-lg border border-white/15 p-3 text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingInquiry(null)}
                        className="px-4 py-2 rounded-lg border border-white/15 text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateInquiry(editingInquiry.id, {
                            preferredDate: editingInquiry.preferredDate,
                            location: editingInquiry.location,
                            notes: editingInquiry.notes,
                          })
                        }
                        className="px-5 py-2 rounded-lg bg-white text-[#0B0D12] font-semibold cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
