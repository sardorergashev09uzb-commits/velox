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
}

const PRESET_STUDIO_IMAGES = [
  {
    label: "Valkyrie Dark Studio",
    url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Aero Rear Diffuser",
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
    exteriorFinish: "Obsidian Matte Stealth Carbon with Electric Lime Accents",
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
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [inquiries, setInquiries] = useState<InquiryItem[]>(initialInquiries);

  // Main navigation: "fleet" | "editor" | "inquiries"
  const [activeWorkspace, setActiveWorkspace] = useState<
    "fleet" | "editor" | "inquiries"
  >("fleet");

  // Search & filter in Fleet view
  const [fleetSearch, setFleetSearch] = useState("");
  const [fleetBodyFilter, setFleetBodyFilter] = useState<"ALL" | BodyType>(
    "ALL"
  );

  // Search & filter in Inquiries view
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("ALL");
  const [editingInquiry, setEditingInquiry] = useState<InquiryItem | null>(
    null
  );

  // Full Vehicle Architect Editor State
  const [editorMode, setEditorMode] = useState<"create" | "edit">("edit");
  const [originalSlug, setOriginalSlug] = useState<string>("");
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
    setTimeout(() => setToast(null), 4500);
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

  // Filtered Fleet
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

  // Filtered Inquiries
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

  // Open Editor to Create a Brand-New Vehicle
  const startCreateNewVehicle = () => {
    setEditorMode("create");
    setOriginalSlug("");
    setDraft(createEmptyVehicleDraft());
    setEditorTab("identity");
    setActiveWorkspace("editor");
  };

  // Open Editor to Edit ALL Fields of an Existing Vehicle
  const startEditVehicle = (vehicle: Vehicle) => {
    setEditorMode("edit");
    setOriginalSlug(vehicle.slug);
    // Deep clone so user can edit freely
    setDraft(JSON.parse(JSON.stringify(vehicle)));
    setEditorTab("identity");
    setActiveWorkspace("editor");
  };

  // Duplicate an Existing Vehicle in 1 Click
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
        showToast(`Duplicated "${vehicle.name}" in SQLite database.`);
      }
    } finally {
      setSaving(false);
    }
  };

  // Save Draft (Create or Update)
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
            ? `Commissioned "${draft.name}" into SQLite Fleet Database.`
            : `All specifications for "${draft.name}" saved to SQLite.`
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

  // Toggle Featured Flag Directly
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
          !vehicle.featured
            ? "promoted to Home Featured Lineup."
            : "removed from Home Featured Lineup."
        }`
      );
    }
  };

  // Delete Vehicle
  const handleDeleteVehicle = async (slug: string, name: string) => {
    const res = await fetch(`/api/vehicles/${slug}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await refreshAllData();
      showToast(`Removed "${name}" from SQLite database.`);
    }
  };

  // Reset Factory 6 Vehicles
  const handleResetFactoryFleet = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/vehicles/reset", { method: "POST" });
      if (res.ok) {
        await refreshAllData();
        showToast("Restored all 6 factory VELOX models in SQLite.");
      }
    } finally {
      setSaving(false);
    }
  };

  // Update Inquiry (Status or Details)
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
      showToast("Client booking dossier updated in SQLite.");
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string, refCode: string) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await refreshAllData();
      showToast(`Deleted booking dossier ${refCode}.`);
    }
  };

  // Helper to update nested performance fields in draft
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

  // Helper to update nested dimensions fields in draft
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

  // Helper to update nested chassis fields in draft
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

  // Helper to update gallery items
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
    <div className="space-y-10">
      {/* Floating Notification Banner */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 px-6 py-4 border shadow-2xl flex items-center gap-4 font-mono-tech text-xs uppercase tracking-wider ${
            toast.type === "error"
              ? "bg-red-950 border-red-500 text-red-200"
              : "bg-[#D4FF00] border-[#D4FF00] text-[#08090B] font-bold"
          }`}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="opacity-75 hover:opacity-100 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. STUDIO TELEMETRY KPI STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/15 bg-[#0F1115]">
        <div className="p-6 border-b lg:border-b-0 sm:border-r border-white/10">
          <div className="flex items-center justify-between text-[#9BA3B0]">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em]">
              01 // ACTIVE FLEET MODELS
            </span>
            <Car className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono-tech text-3xl font-bold text-white">
              {vehicles.length}
            </span>
            <span className="font-mono-tech text-xs text-[#D4FF00]">
              {vehicles.filter((v) => v.featured).length} Featured
            </span>
          </div>
        </div>

        <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center justify-between text-[#9BA3B0]">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em]">
              02 // TOTAL FLEET VALUE
            </span>
            <Database className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono-tech text-3xl font-bold text-white">
              {formatPrice(totalValuation)}
            </span>
            <span className="font-mono-tech text-xs text-[#9BA3B0]">
              SQLite Live
            </span>
          </div>
        </div>

        <div className="p-6 border-b sm:border-b-0 sm:border-r border-white/10">
          <div className="flex items-center justify-between text-[#9BA3B0]">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em]">
              03 // MEAN FLEET OUTPUT
            </span>
            <Gauge className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono-tech text-3xl font-bold text-white">
              {avgHorsepower} PS
            </span>
            <span className="font-mono-tech text-xs text-[#9BA3B0]">
              Homologated
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between text-[#9BA3B0]">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em]">
              04 // CLIENT VIEWING DOSSIERS
            </span>
            <CalendarCheck className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono-tech text-3xl font-bold text-[#D4FF00]">
              {inquiries.length}
            </span>
            <span className="font-mono-tech text-xs text-amber-300">
              {pendingInquiries} Pending
            </span>
          </div>
        </div>
      </div>

      {/* 2. STUDIO WORKSPACE NAVIGATION BAR */}
      <div className="bg-[#0F1115] border border-white/15 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveWorkspace("fleet")}
            className={`px-5 py-3 font-mono-tech text-xs uppercase tracking-[0.18em] border transition-colors cursor-pointer ${
              activeWorkspace === "fleet"
                ? "bg-[#D4FF00] text-[#08090B] border-[#D4FF00] font-bold"
                : "bg-[#08090B] text-[#C8CDD5] border-white/15 hover:border-white/40"
            }`}
          >
            01 // Fleet Manager ({vehicles.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveWorkspace("editor")}
            className={`px-5 py-3 font-mono-tech text-xs uppercase tracking-[0.18em] border transition-colors cursor-pointer ${
              activeWorkspace === "editor"
                ? "bg-[#D4FF00] text-[#08090B] border-[#D4FF00] font-bold"
                : "bg-[#08090B] text-[#C8CDD5] border-white/15 hover:border-white/40"
            }`}
          >
            02 // Model Architect Studio{" "}
            {editorMode === "create"
              ? "(New Model)"
              : `(${draft.name.replace("VELOX ", "")})`}
          </button>

          <button
            type="button"
            onClick={() => setActiveWorkspace("inquiries")}
            className={`px-5 py-3 font-mono-tech text-xs uppercase tracking-[0.18em] border transition-colors cursor-pointer ${
              activeWorkspace === "inquiries"
                ? "bg-[#D4FF00] text-[#08090B] border-[#D4FF00] font-bold"
                : "bg-[#08090B] text-[#C8CDD5] border-white/15 hover:border-white/40"
            }`}
          >
            03 // Concierge Bookings ({inquiries.length})
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleResetFactoryFleet}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#08090B] border border-white/20 hover:border-white text-[#C8CDD5] hover:text-white px-4 py-3 font-mono-tech text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Factory 6 Models</span>
          </button>

          <button
            type="button"
            onClick={startCreateNewVehicle}
            className="inline-flex items-center gap-2 bg-[#D4FF00] text-[#08090B] hover:bg-white px-5 py-3 font-mono-tech text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Commission New Model</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          WORKSPACE 1: FLEET MANAGER (SEARCH, FILTER, QUICK ACTIONS, CARDS)
         ===================================================================== */}
      {activeWorkspace === "fleet" && (
        <div className="space-y-8">
          {/* Search & Chassis Filter Bar */}
          <div className="bg-[#0F1115] border border-white/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                  className={`px-3.5 py-2 font-mono-tech text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                    fleetBodyFilter === type
                      ? "bg-white text-[#08090B] border-white font-bold"
                      : "bg-[#08090B] text-[#9BA3B0] border-white/15 hover:text-white"
                  }`}
                >
                  {type === "ALL" ? "All Chassis" : type}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#5E6673] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={fleetSearch}
                onChange={(e) => setFleetSearch(e.target.value)}
                placeholder="Search model, code, or engine..."
                className="w-full bg-[#08090B] border border-white/20 pl-10 pr-4 py-2.5 text-xs font-mono-tech text-white placeholder:text-[#5E6673] focus:border-[#D4FF00]"
              />
            </div>
          </div>

          {/* Fleet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVehicles.map((v) => (
              <div
                key={v.slug}
                className="bg-[#0F1115] border border-white/15 hover:border-[#D4FF00]/60 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Top Strip */}
                <div className="px-5 py-3.5 bg-[#08090B] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#0F1115] border border-white/15 text-[#D4FF00]">
                      {v.bodyType}
                    </span>
                    <span className="font-mono-tech text-[11px] text-[#9BA3B0]">
                      {v.codeName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(v)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono-tech text-[10px] uppercase border transition-colors cursor-pointer ${
                        v.featured
                          ? "bg-[#D4FF00]/15 border-[#D4FF00] text-[#D4FF00] font-bold"
                          : "border-white/15 text-[#5E6673] hover:text-white"
                      }`}
                    >
                      <Star className="w-3 h-3" />
                      {v.featured ? "Featured" : "Standard"}
                    </button>
                  </div>
                </div>

                {/* Middle Content */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  <div className="sm:col-span-5 relative aspect-[16/10] bg-[#08090B] border border-white/10 overflow-hidden">
                    <img
                      src={v.images.card}
                      alt={v.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-[#08090B]/90 border border-white/15 px-2 py-0.5 font-mono-tech text-[10px] text-white">
                      {v.year} MY
                    </span>
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <h3 className="font-display text-2xl font-extrabold text-white uppercase tracking-tight">
                        {v.name}
                      </h3>
                      <p className="font-mono-tech text-xs text-[#9BA3B0]">
                        {v.powertrain} • {v.drivetrain}
                      </p>
                    </div>

                    <p className="text-xs text-[#C8CDD5] line-clamp-2">
                      {v.tagline}
                    </p>

                    <div className="grid grid-cols-3 border border-white/10 bg-[#08090B] p-2.5 gap-2 font-mono-tech">
                      <div>
                        <span className="block text-[9px] text-[#5E6673] uppercase">
                          OUTPUT
                        </span>
                        <span className="text-xs font-bold text-white">
                          {v.performance.horsepower} PS
                        </span>
                      </div>
                      <div className="border-x border-white/10 px-2">
                        <span className="block text-[9px] text-[#5E6673] uppercase">
                          0–100 KM/H
                        </span>
                        <span className="text-xs font-bold text-[#D4FF00]">
                          {v.performance.zeroToHundred}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-[#5E6673] uppercase">
                          PRICE
                        </span>
                        <span className="text-xs font-bold text-white">
                          {formatPrice(v.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="px-6 py-4 bg-[#08090B]/60 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => startEditVehicle(v)}
                    className="inline-flex items-center gap-2 bg-[#D4FF00] text-[#08090B] hover:bg-white px-4 py-2 font-mono-tech text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit All Specs (6 Tabs)</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDuplicateVehicle(v)}
                      title="Duplicate Model"
                      className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 hover:border-white text-[#C8CDD5] hover:text-white font-mono-tech text-[11px] uppercase transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Clone</span>
                    </button>
                    <Link
                      href={`/vehicles/${v.slug}`}
                      title="Inspect Public Detail Page"
                      className="inline-flex items-center gap-1 px-3 py-2 border border-white/15 hover:border-[#D4FF00] text-[#C8CDD5] hover:text-[#D4FF00] font-mono-tech text-[11px] uppercase transition-colors"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteVehicle(v.slug, v.name)}
                      title="Delete Vehicle from SQLite"
                      className="p-2 border border-white/15 hover:border-red-500 text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 2: MODEL ARCHITECT STUDIO (6-TAB FULL SPECIFICATION EDITOR)
         ===================================================================== */}
      {activeWorkspace === "editor" && (
        <form
          onSubmit={handleSaveVehicleDraft}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left/Main Column: 6-Tab Engineering Editor */}
          <div className="lg:col-span-8 bg-[#0F1115] border border-white/15 overflow-hidden">
            {/* Editor Header */}
            <div className="p-6 bg-[#08090B] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveWorkspace("fleet")}
                    className="inline-flex items-center gap-1 font-mono-tech text-xs text-[#9BA3B0] hover:text-[#D4FF00] uppercase cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Fleet</span>
                  </button>
                  <span className="text-[#5E6673]">/</span>
                  <span className="font-mono-tech text-xs text-[#D4FF00] uppercase">
                    {editorMode === "create"
                      ? "NEW MODEL COMMISSION"
                      : `EDITING: ${originalSlug}`}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase">
                  {draft.name || "UNTITLED VELOX MODEL"}
                </h2>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 bg-[#D4FF00] text-[#08090B] hover:bg-white px-6 py-3.5 font-mono-tech text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>
                  {saving
                    ? "Syncing to SQLite..."
                    : editorMode === "create"
                    ? "Publish New Model"
                    : "Save All Changes"}
                </span>
              </button>
            </div>

            {/* 6 Engineering Sub-Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-white/10 bg-[#08090B]/60">
              {[
                { id: "identity", label: "01. Identity", icon: Sliders },
                { id: "performance", label: "02. Telemetry", icon: Gauge },
                { id: "editorial", label: "03. Editorial", icon: FileText },
                { id: "dimensions", label: "04. Dimensions", icon: Ruler },
                { id: "chassis", label: "05. Chassis/Aero", icon: Shield },
                { id: "media", label: "06. Studio Media", icon: ImageIcon },
              ].map((t) => {
                const Icon = t.icon;
                const active = editorTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setEditorTab(t.id as EditorTab)}
                    className={`p-3.5 font-mono-tech text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 border-r border-b lg:border-b-0 border-white/10 transition-colors cursor-pointer ${
                      active
                        ? "bg-[#D4FF00] text-[#08090B] font-bold"
                        : "text-[#9BA3B0] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* TAB 1: IDENTITY & PRICING */}
              {editorTab === "identity" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Model Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={draft.name}
                        onChange={(e) =>
                          setDraft({ ...draft, name: e.target.value })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Internal CodeName
                      </label>
                      <input
                        type="text"
                        value={draft.codeName}
                        onChange={(e) =>
                          setDraft({ ...draft, codeName: e.target.value })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Body Architecture
                      </label>
                      <select
                        value={draft.bodyType}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            bodyType: e.target.value as BodyType,
                          })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      >
                        <option value="Hypercar">Hypercar</option>
                        <option value="Grand Tourer">Grand Tourer</option>
                        <option value="Track Coupe">Track Coupe</option>
                        <option value="Performance SUV">Performance SUV</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Model Series
                      </label>
                      <input
                        type="text"
                        value={draft.series}
                        onChange={(e) =>
                          setDraft({ ...draft, series: e.target.value })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Model Year
                      </label>
                      <input
                        type="number"
                        value={draft.year}
                        onChange={(e) =>
                          setDraft({ ...draft, year: Number(e.target.value) })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Base Allocation Price (USD) *
                      </label>
                      <input
                        type="number"
                        step={1000}
                        value={draft.price}
                        onChange={(e) =>
                          setDraft({ ...draft, price: Number(e.target.value) })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-[#D4FF00] font-bold font-mono-tech focus:border-[#D4FF00]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Production Homologation Limit Badge
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
                        placeholder="e.g. Limited to 75 Units Worldwide"
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                      Showroom Hero Tagline *
                    </label>
                    <input
                      type="text"
                      value={draft.tagline}
                      onChange={(e) =>
                        setDraft({ ...draft, tagline: e.target.value })
                      }
                      className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white focus:border-[#D4FF00]"
                    />
                  </div>

                  <div className="p-4 bg-[#08090B] border border-white/15 flex items-center justify-between">
                    <div>
                      <span className="block font-mono-tech text-xs uppercase text-white font-bold">
                        Feature in Home Showroom Signature Lineup
                      </span>
                      <span className="text-xs text-[#9BA3B0]">
                        When enabled, this vehicle is showcased on the primary Home page editorial section.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={draft.featured}
                      onChange={(e) =>
                        setDraft({ ...draft, featured: e.target.checked })
                      }
                      className="w-5 h-5 accent-[#D4FF00] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PROPULSION & PERFORMANCE TELEMETRY */}
              {editorTab === "performance" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Propulsion Architecture
                      </label>
                      <select
                        value={draft.powertrain}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            powertrain: e.target.value as PowertrainType,
                          })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
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

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Transmission System
                      </label>
                      <input
                        type="text"
                        value={draft.transmission}
                        onChange={(e) =>
                          setDraft({ ...draft, transmission: e.target.value })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Drivetrain Layout
                      </label>
                      <select
                        value={draft.drivetrain}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            drivetrain: e.target.value as "AWD" | "RWD",
                          })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      >
                        <option value="AWD">AWD (All-Wheel Torque Vectoring)</option>
                        <option value="RWD">RWD (Pure Rear-Wheel Drive)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Energy / Fuel System
                      </label>
                      <select
                        value={draft.fuelType}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            fuelType: e.target.value as Vehicle["fuelType"],
                          })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
                      >
                        <option value="Hybrid Petrol">Hybrid Petrol</option>
                        <option value="Battery Electric">Battery Electric</option>
                        <option value="High-Octane Petrol">
                          High-Octane Petrol
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#D4FF00]">
                        Horsepower (PS)
                      </label>
                      <input
                        type="number"
                        value={draft.performance.horsepower}
                        onChange={(e) =>
                          updatePerf("horsepower", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Torque (Nm)
                      </label>
                      <input
                        type="number"
                        value={draft.performance.torqueNm}
                        onChange={(e) =>
                          updatePerf("torqueNm", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#D4FF00]">
                        0–100 km/h
                      </label>
                      <input
                        type="text"
                        value={draft.performance.zeroToHundred}
                        onChange={(e) =>
                          updatePerf("zeroToHundred", e.target.value)
                        }
                        placeholder="2.1 s"
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        0–200 km/h
                      </label>
                      <input
                        type="text"
                        value={draft.performance.zeroToTwoHundred}
                        onChange={(e) =>
                          updatePerf("zeroToTwoHundred", e.target.value)
                        }
                        placeholder="5.4 s"
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Top Speed (km/h)
                      </label>
                      <input
                        type="number"
                        value={draft.performance.topSpeedKmh}
                        onChange={(e) =>
                          updatePerf("topSpeedKmh", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Dry Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={draft.performance.weightKg}
                        onChange={(e) =>
                          updatePerf("weightKg", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Downforce (kg)
                      </label>
                      <input
                        type="number"
                        value={draft.performance.downforceKg}
                        onChange={(e) =>
                          updatePerf("downforceKg", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Redline RPM
                      </label>
                      <input
                        type="text"
                        value={draft.performance.redlineRpm || ""}
                        onChange={(e) =>
                          updatePerf("redlineRpm", e.target.value)
                        }
                        placeholder="9,200 RPM"
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        EV Range (km)
                      </label>
                      <input
                        type="number"
                        value={draft.performance.rangeKm || ""}
                        onChange={(e) =>
                          updatePerf(
                            "rangeKm",
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                        placeholder="640"
                        className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono-tech"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: EDITORIAL & HIGHLIGHTS */}
              {editorTab === "editorial" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#D4FF00]">
                      Editorial Pull-Quote
                    </label>
                    <textarea
                      rows={2}
                      value={draft.editorialQuote}
                      onChange={(e) =>
                        setDraft({ ...draft, editorialQuote: e.target.value })
                      }
                      className="w-full bg-[#08090B] border border-white/20 p-3.5 text-sm text-white focus:border-[#D4FF00]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                      Architectural Overview Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={draft.overview}
                      onChange={(e) =>
                        setDraft({ ...draft, overview: e.target.value })
                      }
                      className="w-full bg-[#08090B] border border-white/20 p-3.5 text-sm text-white focus:border-[#D4FF00]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                      Wind-Tunnel & Engineering Story
                    </label>
                    <textarea
                      rows={3}
                      value={draft.engineeringStory}
                      onChange={(e) =>
                        setDraft({ ...draft, engineeringStory: e.target.value })
                      }
                      className="w-full bg-[#08090B] border border-white/20 p-3.5 text-sm text-white focus:border-[#D4FF00]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Showroom Exterior Finish
                      </label>
                      <input
                        type="text"
                        value={draft.exteriorFinish}
                        onChange={(e) =>
                          setDraft({ ...draft, exteriorFinish: e.target.value })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Cockpit Interior Trim
                      </label>
                      <input
                        type="text"
                        value={draft.interiorTrim}
                        onChange={(e) =>
                          setDraft({ ...draft, interiorTrim: e.target.value })
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* Interactive Key Highlights List Editor */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="font-mono-tech text-xs uppercase text-[#D4FF00]">
                        Key Specification Highlights ({draft.highlights.length})
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            highlights: [
                              ...draft.highlights,
                              "Bespoke carbon-titanium engineering highlight",
                            ],
                          })
                        }
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-[#D4FF00] text-white hover:text-[#08090B] font-mono-tech text-xs uppercase transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {draft.highlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-mono-tech text-xs text-[#5E6673] w-6">
                            0{idx + 1}
                          </span>
                          <input
                            type="text"
                            value={hl}
                            onChange={(e) => {
                              const next = [...draft.highlights];
                              next[idx] = e.target.value;
                              setDraft({ ...draft, highlights: next });
                            }}
                            className="flex-1 bg-[#08090B] border border-white/20 px-3.5 py-2 text-xs text-white"
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
                            className="p-2 border border-white/15 text-red-400 hover:border-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DIMENSIONS & HOMOLOGATION */}
              {editorTab === "dimensions" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Overall Length (mm)
                      </label>
                      <input
                        type="number"
                        value={draft.dimensions.lengthMm}
                        onChange={(e) =>
                          updateDim("lengthMm", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Overall Width (mm)
                      </label>
                      <input
                        type="number"
                        value={draft.dimensions.widthMm}
                        onChange={(e) =>
                          updateDim("widthMm", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Overall Height (mm)
                      </label>
                      <input
                        type="number"
                        value={draft.dimensions.heightMm}
                        onChange={(e) =>
                          updateDim("heightMm", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                        Wheelbase (mm)
                      </label>
                      <input
                        type="number"
                        value={draft.dimensions.wheelbaseMm}
                        onChange={(e) =>
                          updateDim("wheelbaseMm", Number(e.target.value))
                        }
                        className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#D4FF00]">
                      Static Axle Weight Distribution
                    </label>
                    <input
                      type="text"
                      value={draft.dimensions.weightDistribution}
                      onChange={(e) =>
                        updateDim("weightDistribution", e.target.value)
                      }
                      placeholder="42% Front / 58% Rear"
                      className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: CHASSIS, AERO & BRAKES */}
              {editorTab === "chassis" && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#D4FF00]">
                      Monocoque & Structural Architecture
                    </label>
                    <input
                      type="text"
                      value={draft.chassisAndAero.monocoque}
                      onChange={(e) =>
                        updateChassis("monocoque", e.target.value)
                      }
                      className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                      Suspension & Damper Dynamics
                    </label>
                    <input
                      type="text"
                      value={draft.chassisAndAero.suspension}
                      onChange={(e) =>
                        updateChassis("suspension", e.target.value)
                      }
                      className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                      Braking System Specification
                    </label>
                    <input
                      type="text"
                      value={draft.chassisAndAero.brakes}
                      onChange={(e) => updateChassis("brakes", e.target.value)}
                      className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                      Active Aerodynamics Package
                    </label>
                    <input
                      type="text"
                      value={draft.chassisAndAero.aerodynamics}
                      onChange={(e) =>
                        updateChassis("aerodynamics", e.target.value)
                      }
                      className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono-tech text-xs uppercase text-[#C8CDD5]">
                      Wheel & Tire Homologation
                    </label>
                    <input
                      type="text"
                      value={draft.chassisAndAero.tires}
                      onChange={(e) => updateChassis("tires", e.target.value)}
                      className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: STUDIO MEDIA & GALLERY MANAGER */}
              {editorTab === "media" && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="block font-mono-tech text-xs uppercase text-[#D4FF00]">
                      Primary Hero & Card Studio Photograph URL
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
                      className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-xs text-white font-mono-tech"
                    />

                    {/* Curated Studio Presets */}
                    <div className="space-y-2">
                      <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#9BA3B0]">
                        1-Click Studio Photography Presets:
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
                            className="group relative aspect-[16/10] border border-white/15 hover:border-[#D4FF00] overflow-hidden text-left cursor-pointer"
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <span className="absolute bottom-1.5 left-2 right-2 font-mono-tech text-[9px] text-white uppercase truncate">
                              {preset.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Gallery Frames Editor */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono-tech text-xs uppercase text-[#D4FF00] block">
                          Interactive Vehicle Gallery Frames (
                          {draft.images.gallery.length})
                        </span>
                        <span className="text-xs text-[#9BA3B0]">
                          Manage the multi-angle photographs displayed on the vehicle detail page.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={addGalleryFrame}
                        className="inline-flex items-center gap-1.5 bg-white text-[#08090B] hover:bg-[#D4FF00] px-4 py-2 font-mono-tech text-xs font-bold uppercase cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Frame
                      </button>
                    </div>

                    <div className="space-y-4">
                      {draft.images.gallery.map((frame, idx) => (
                        <div
                          key={idx}
                          className="bg-[#08090B] border border-white/15 p-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                        >
                          <div className="sm:col-span-3 aspect-[16/10] bg-[#0F1115] border border-white/10 overflow-hidden">
                            <img
                              src={frame.url}
                              alt={frame.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="sm:col-span-8 space-y-2.5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              <select
                                value={frame.category}
                                onChange={(e) =>
                                  updateGalleryItem(
                                    idx,
                                    "category",
                                    e.target.value
                                  )
                                }
                                className="bg-[#0F1115] border border-white/20 px-3 py-1.5 text-xs font-mono-tech text-[#D4FF00]"
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
                                  updateGalleryItem(idx, "url", e.target.value)
                                }
                                placeholder="Image URL"
                                className="sm:col-span-2 bg-[#0F1115] border border-white/20 px-3 py-1.5 text-xs font-mono-tech text-white"
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
                              placeholder="Editorial caption for this angle..."
                              className="w-full bg-[#0F1115] border border-white/20 px-3 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-1 flex justify-end">
                            <button
                              type="button"
                              onClick={() => removeGalleryFrame(idx)}
                              className="p-2.5 border border-white/15 text-red-400 hover:border-red-500 cursor-pointer"
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

          {/* Right Column: LIVE REAL-TIME SHOWROOM PREVIEW */}
          <aside className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="bg-[#0F1115] border border-[#D4FF00]/50 overflow-hidden">
              <div className="px-5 py-3.5 bg-[#08090B] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#D4FF00]">
                    LIVE SHOWROOM CARD PREVIEW
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] text-[#9BA3B0]">
                  {draft.year} SPEC
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#08090B]">
                <img
                  src={draft.images.hero}
                  alt={draft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 bg-[#08090B]/90 border border-white/15 px-2.5 py-1 font-mono-tech text-[10px] text-[#C8CDD5] uppercase">
                  {draft.powertrain}
                </div>
                <div className="absolute top-3 right-3 bg-[#08090B]/90 border border-white/15 px-2.5 py-1 font-mono-tech text-[10px] text-white uppercase">
                  {draft.drivetrain}
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#D4FF00]">
                    {draft.bodyType} // {draft.codeName}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-white uppercase">
                    {draft.name || "VELOX PROTOTYPE"}
                  </h3>
                  <p className="text-xs text-[#9BA3B0] leading-relaxed">
                    {draft.tagline}
                  </p>
                </div>

                <div className="grid grid-cols-3 border-y border-white/10 py-3.5 gap-2 font-mono-tech">
                  <div>
                    <span className="block text-[9px] uppercase text-[#5E6673]">
                      0–100 KM/H
                    </span>
                    <span className="text-sm font-bold text-[#D4FF00]">
                      {draft.performance.zeroToHundred}
                    </span>
                  </div>
                  <div className="border-x border-white/10 px-2">
                    <span className="block text-[9px] uppercase text-[#5E6673]">
                      OUTPUT
                    </span>
                    <span className="text-sm font-bold text-white">
                      {draft.performance.horsepower} PS
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase text-[#5E6673]">
                      V-MAX
                    </span>
                    <span className="text-sm font-bold text-white">
                      {draft.performance.topSpeedKmh} KM/H
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono-tech">
                  <div className="flex justify-between">
                    <span className="text-[#5E6673]">DRY MASS</span>
                    <span className="text-white">
                      {formatNumber(draft.performance.weightKg)} KG
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6673]">DOWNFORCE</span>
                    <span className="text-white">
                      {draft.performance.downforceKg} KG
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6673]">BASE ALLOCATION</span>
                    <span className="text-[#D4FF00] font-bold text-sm">
                      {formatPrice(draft.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </form>
      )}

      {/* =====================================================================
          WORKSPACE 3: CONCIERGE INQUIRIES & BOOKINGS MANAGER
         ===================================================================== */}
      {activeWorkspace === "inquiries" && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="bg-[#0F1115] border border-white/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-3.5 py-2 font-mono-tech text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                      inquiryStatusFilter === st
                        ? "bg-white text-[#08090B] border-white font-bold"
                        : "bg-[#08090B] text-[#9BA3B0] border-white/15 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#5E6673] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search client, reference, model..."
                className="w-full bg-[#08090B] border border-white/20 pl-10 pr-4 py-2.5 text-xs font-mono-tech text-white placeholder:text-[#5E6673] focus:border-[#D4FF00]"
              />
            </div>
          </div>

          {filteredInquiries.length === 0 ? (
            <div className="bg-[#0F1115] border border-white/10 p-14 text-center font-mono-tech text-xs text-[#9BA3B0]">
              NO BOOKING DOSSIERS MATCH YOUR FILTER.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-[#0F1115] border border-white/15 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs">
                      <span className="bg-[#08090B] border border-[#D4FF00]/50 text-[#D4FF00] px-2.5 py-1 font-bold">
                        {inq.referenceCode}
                      </span>
                      <span className="text-white font-bold uppercase">
                        {inq.vehicleName}
                      </span>
                      <span className="text-[#9BA3B0]">
                        // {inq.experienceType.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="text-base text-white font-semibold">
                      {inq.fullName}{" "}
                      <span className="text-xs font-mono-tech text-[#9BA3B0] font-normal ml-2">
                        {inq.email} • {inq.phone}
                      </span>
                    </div>

                    <div className="font-mono-tech text-xs text-[#9BA3B0] flex flex-wrap gap-4">
                      <span>
                        PREFERRED DATE:{" "}
                        <strong className="text-white">
                          {inq.preferredDate}
                        </strong>
                      </span>
                      <span>
                        SANCTUARY:{" "}
                        <strong className="text-white">{inq.location}</strong>
                      </span>
                    </div>

                    {inq.notes && (
                      <p className="text-xs text-[#C8CDD5] italic border-l-2 border-[#D4FF00] pl-3">
                        “{inq.notes}”
                      </p>
                    )}
                  </div>

                  {/* Status & Edit Controls */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateInquiry(inq.id, { status: "PENDING" })
                      }
                      className={`inline-flex items-center gap-1 px-3 py-2 font-mono-tech text-[11px] uppercase border cursor-pointer ${
                        inq.status === "PENDING"
                          ? "bg-amber-400/20 border-amber-400 text-amber-300 font-bold"
                          : "border-white/15 text-[#5E6673] hover:text-white"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateInquiry(inq.id, { status: "CONFIRMED" })
                      }
                      className={`inline-flex items-center gap-1 px-3 py-2 font-mono-tech text-[11px] uppercase border cursor-pointer ${
                        inq.status === "CONFIRMED"
                          ? "bg-[#D4FF00]/20 border-[#D4FF00] text-[#D4FF00] font-bold"
                          : "border-white/15 text-[#5E6673] hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateInquiry(inq.id, { status: "COMPLETED" })
                      }
                      className={`inline-flex items-center gap-1 px-3 py-2 font-mono-tech text-[11px] uppercase border cursor-pointer ${
                        inq.status === "COMPLETED"
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold"
                          : "border-white/15 text-[#5E6673] hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateInquiry(inq.id, { status: "CANCELLED" })
                      }
                      className={`inline-flex items-center gap-1 px-3 py-2 font-mono-tech text-[11px] uppercase border cursor-pointer ${
                        inq.status === "CANCELLED"
                          ? "bg-red-500/20 border-red-500 text-red-300 font-bold"
                          : "border-white/15 text-[#5E6673] hover:text-white"
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" /> Cancelled
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingInquiry(inq)}
                      title="Edit Date, Location or Notes"
                      className="p-2 border border-white/15 text-[#C8CDD5] hover:border-[#D4FF00] hover:text-[#D4FF00] cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteInquiry(inq.id, inq.referenceCode)
                      }
                      title="Delete Booking"
                      className="p-2 border border-white/15 text-red-400 hover:border-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Inquiry Modal */}
          {editingInquiry && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#0F1115] border border-[#D4FF00] max-w-lg w-full p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono-tech text-[10px] uppercase text-[#D4FF00]">
                      EDIT BOOKING DOSSIER // {editingInquiry.referenceCode}
                    </span>
                    <h3 className="font-display text-2xl font-extrabold text-white uppercase">
                      {editingInquiry.fullName}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingInquiry(null)}
                    className="text-[#9BA3B0] hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                      Preferred Viewing Date
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
                      className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white font-mono-tech"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                      Sanctuary / Circuit Location
                    </label>
                    <input
                      type="text"
                      value={editingInquiry.location}
                      onChange={(e) =>
                        setEditingInquiry({
                          ...editingInquiry,
                          location: e.target.value,
                        })
                      }
                      className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                      Concierge & Telemetry Notes
                    </label>
                    <textarea
                      rows={3}
                      value={editingInquiry.notes || ""}
                      onChange={(e) =>
                        setEditingInquiry({
                          ...editingInquiry,
                          notes: e.target.value,
                        })
                      }
                      className="w-full bg-[#08090B] border border-white/20 p-3.5 text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditingInquiry(null)}
                      className="px-5 py-2.5 border border-white/20 text-white font-mono-tech uppercase"
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
                      className="px-6 py-2.5 bg-[#D4FF00] text-[#08090B] font-mono-tech font-bold uppercase cursor-pointer"
                    >
                      Save Booking Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
