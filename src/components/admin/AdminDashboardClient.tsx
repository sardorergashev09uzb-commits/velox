"use client";

import React, { useState } from "react";
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
  X,
} from "lucide-react";
import { Vehicle, BodyType, PowertrainType } from "@/types/vehicle";
import { formatPrice } from "@/lib/utils";

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

const PRESET_IMAGES = [
  {
    label: "Nocturnal Hypercar Studio",
    url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Dark Aero Rear Profile",
    url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Electric Grand Tourer",
    url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=85",
  },
  {
    label: "Track Coupe Silhouette",
    url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=85",
  },
];

export function AdminDashboardClient({
  initialVehicles,
  initialInquiries,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [inquiries, setInquiries] = useState<InquiryItem[]>(initialInquiries);
  const [activeTab, setActiveTab] = useState<"vehicles" | "inquiries">(
    "vehicles"
  );
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  // Add Vehicle Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCodeName, setNewCodeName] = useState("VX-07 // PROTOTYPE");
  const [newBodyType, setNewBodyType] = useState<BodyType>("Hypercar");
  const [newPowertrain, setNewPowertrain] = useState<PowertrainType>(
    "Twin-Turbo V8 Hybrid"
  );
  const [newPrice, setNewPrice] = useState(340000);
  const [newYear, setNewYear] = useState(2026);
  const [newHp, setNewHp] = useState(960);
  const [newTorque, setNewTorque] = useState(1050);
  const [newZeroToHundred, setNewZeroToHundred] = useState("2.2 s");
  const [newTopSpeed, setNewTopSpeed] = useState(352);
  const [newWeight, setNewWeight] = useState(1420);
  const [newTagline, setNewTagline] = useState(
    "Carbon-titanium prototype engineered for track supremacy."
  );
  const [newHeroImage, setNewHeroImage] = useState(PRESET_IMAGES[0].url);
  const [newFeatured, setNewFeatured] = useState(true);
  const [savingVehicle, setSavingVehicle] = useState(false);

  // Edit Vehicle Modal State
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editHp, setEditHp] = useState(0);
  const [editZero, setEditZero] = useState("");
  const [editTagline, setEditTagline] = useState("");

  const notify = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(null), 4000);
  };

  const refreshData = async () => {
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

  // Create new vehicle in SQLite
  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSavingVehicle(true);
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.startsWith("VELOX") ? newName : `VELOX ${newName}`,
          codeName: newCodeName,
          bodyType: newBodyType,
          powertrain: newPowertrain,
          price: newPrice,
          year: newYear,
          horsepower: newHp,
          torqueNm: newTorque,
          zeroToHundred: newZeroToHundred,
          topSpeedKmh: newTopSpeed,
          weightKg: newWeight,
          tagline: newTagline,
          heroImage: newHeroImage,
          featured: newFeatured,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setShowAddModal(false);
        setNewName("");
        await refreshData();
        notify(`Model "${data.vehicle.name}" saved to SQLite database.`);
      } else {
        notify(`Error: ${data.error || "Could not create vehicle"}`);
      }
    } finally {
      setSavingVehicle(false);
    }
  };

  // Toggle Featured Flag
  const handleToggleFeatured = async (vehicle: Vehicle) => {
    const res = await fetch(`/api/vehicles/${vehicle.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !vehicle.featured }),
    });
    if (res.ok) {
      await refreshData();
      notify(
        `${vehicle.name} ${
          !vehicle.featured ? "promoted to Featured" : "removed from Featured"
        }.`
      );
    }
  };

  // Open Edit Modal
  const openEditModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setEditPrice(v.price);
    setEditHp(v.performance.horsepower);
    setEditZero(v.performance.zeroToHundred);
    setEditTagline(v.tagline);
  };

  // Save Edited Vehicle
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;
    setSavingVehicle(true);
    try {
      const res = await fetch(`/api/vehicles/${editingVehicle.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: editPrice,
          horsepower: editHp,
          zeroToHundred: editZero,
          tagline: editTagline,
        }),
      });
      if (res.ok) {
        setEditingVehicle(null);
        await refreshData();
        notify(`Updated specifications for ${editingVehicle.name} in SQLite.`);
      }
    } finally {
      setSavingVehicle(false);
    }
  };

  // Delete Vehicle
  const handleDeleteVehicle = async (slug: string, name: string) => {
    const res = await fetch(`/api/vehicles/${slug}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await refreshData();
      notify(`Deleted "${name}" from SQLite database.`);
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      await refreshData();
      notify(`Inquiry status updated to ${status}.`);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string, refCode: string) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await refreshData();
      notify(`Inquiry ${refCode} removed from SQLite.`);
    }
  };

  const totalFleetValue = vehicles.reduce((acc, v) => acc + v.price, 0);
  const pendingCount = inquiries.filter((i) => i.status === "PENDING").length;

  return (
    <div className="space-y-10">
      {/* Live Feedback Banner */}
      {statusBanner && (
        <div
          role="status"
          className="bg-[#D4FF00] text-[#08090B] px-5 py-3 font-mono-tech text-xs font-bold uppercase tracking-wider flex items-center justify-between"
        >
          <span>SQLITE TELEMETRY SYNC // {statusBanner}</span>
          <button
            type="button"
            onClick={() => setStatusBanner(null)}
            className="text-[#08090B] font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/15 bg-[#0F1115]">
        <div className="p-6 border-b lg:border-b-0 sm:border-r border-white/10">
          <div className="flex items-center justify-between text-[#9BA3B0]">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest">
              ACTIVE MODELS IN DB
            </span>
            <Car className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <p className="mt-2 font-mono-tech text-3xl font-bold text-white">
            {vehicles.length}
          </p>
          <span className="font-mono-tech text-[11px] text-[#5E6673]">
            {vehicles.filter((v) => v.featured).length} Featured on Home
          </span>
        </div>

        <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center justify-between text-[#9BA3B0]">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest">
              FLEET VALUATION
            </span>
            <Database className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <p className="mt-2 font-mono-tech text-3xl font-bold text-white">
            {formatPrice(totalFleetValue)}
          </p>
          <span className="font-mono-tech text-[11px] text-[#5E6673]">
            Combined Base Allocation
          </span>
        </div>

        <div className="p-6 border-b sm:border-b-0 sm:border-r border-white/10">
          <div className="flex items-center justify-between text-[#9BA3B0]">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest">
              CLIENT INQUIRIES
            </span>
            <CalendarCheck className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <p className="mt-2 font-mono-tech text-3xl font-bold text-[#D4FF00]">
            {inquiries.length}
          </p>
          <span className="font-mono-tech text-[11px] text-[#5E6673]">
            Persisted in SQLite
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between text-[#9BA3B0]">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest">
              PENDING DISPATCH
            </span>
            <Clock className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <p className="mt-2 font-mono-tech text-3xl font-bold text-white">
            {pendingCount}
          </p>
          <span className="font-mono-tech text-[11px] text-[#5E6673]">
            Awaiting Concierge Confirmation
          </span>
        </div>
      </div>

      {/* Navigation Tabs & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("vehicles")}
            className={`px-5 py-3 font-mono-tech text-xs uppercase tracking-[0.2em] border transition-colors cursor-pointer ${
              activeTab === "vehicles"
                ? "bg-[#D4FF00] text-[#08090B] border-[#D4FF00] font-bold"
                : "bg-[#0F1115] text-[#C8CDD5] border-white/15 hover:border-white/40"
            }`}
          >
            01 // Fleet Inventory ({vehicles.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("inquiries")}
            className={`px-5 py-3 font-mono-tech text-xs uppercase tracking-[0.2em] border transition-colors cursor-pointer ${
              activeTab === "inquiries"
                ? "bg-[#D4FF00] text-[#08090B] border-[#D4FF00] font-bold"
                : "bg-[#0F1115] text-[#C8CDD5] border-white/15 hover:border-white/40"
            }`}
          >
            02 // Viewing Inquiries ({inquiries.length})
          </button>
        </div>

        {activeTab === "vehicles" && (
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-white text-[#08090B] hover:bg-[#D4FF00] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Commission New Model</span>
          </button>
        )}
      </div>

      {/* TAB 1: FLEET INVENTORY CRUD */}
      {activeTab === "vehicles" && (
        <div className="space-y-4">
          {vehicles.map((v) => (
            <div
              key={v.slug}
              className="bg-[#0F1115] border border-white/10 hover:border-white/25 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={v.images.card}
                  alt={v.name}
                  className="w-full sm:w-36 aspect-[16/10] object-cover border border-white/10 bg-[#08090B]"
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest bg-[#08090B] border border-white/15 px-2.5 py-0.5 text-[#D4FF00]">
                      {v.bodyType}
                    </span>
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#9BA3B0]">
                      {v.powertrain}
                    </span>
                    {v.featured && (
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest bg-[#D4FF00]/15 border border-[#D4FF00]/50 px-2 py-0.5 text-[#D4FF00]">
                        ★ FEATURED ON HOME
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-extrabold text-white uppercase">
                    {v.name}
                  </h3>
                  <p className="text-xs text-[#9BA3B0] max-w-xl">{v.tagline}</p>
                </div>
              </div>

              {/* Specs & Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
                <div className="grid grid-cols-3 gap-5 font-mono-tech">
                  <div>
                    <span className="block text-[10px] text-[#5E6673] uppercase">
                      OUTPUT
                    </span>
                    <span className="text-sm font-bold text-white">
                      {v.performance.horsepower} PS
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#5E6673] uppercase">
                      0–100
                    </span>
                    <span className="text-sm font-bold text-[#D4FF00]">
                      {v.performance.zeroToHundred}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#5E6673] uppercase">
                      PRICE
                    </span>
                    <span className="text-sm font-bold text-white">
                      {formatPrice(v.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(v)}
                    title="Toggle Featured Status"
                    className={`p-2.5 border transition-colors cursor-pointer ${
                      v.featured
                        ? "border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/10"
                        : "border-white/15 text-[#9BA3B0] hover:text-white"
                    }`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditModal(v)}
                    title="Edit Specifications"
                    className="p-2.5 border border-white/15 text-[#C8CDD5] hover:border-[#D4FF00] hover:text-[#D4FF00] transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <Link
                    href={`/vehicles/${v.slug}`}
                    title="View Live Page"
                    className="p-2.5 border border-white/15 text-[#C8CDD5] hover:border-white hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteVehicle(v.slug, v.name)}
                    title="Delete Vehicle"
                    className="p-2.5 border border-white/15 text-red-400 hover:border-red-500 hover:bg-red-950/30 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CLIENT INQUIRIES CRUD */}
      {activeTab === "inquiries" && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="bg-[#0F1115] border border-white/10 p-12 text-center font-mono-tech text-xs text-[#9BA3B0]">
              NO CLIENT INQUIRIES RECORDED YET.
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-[#0F1115] border border-white/10 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs">
                    <span className="bg-[#08090B] border border-[#D4FF00]/50 text-[#D4FF00] px-2.5 py-0.5 font-bold">
                      {inq.referenceCode}
                    </span>
                    <span className="text-white font-bold">
                      {inq.vehicleName}
                    </span>
                    <span className="text-[#9BA3B0]">
                      // {inq.experienceType.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="text-sm text-white font-semibold">
                    {inq.fullName}{" "}
                    <span className="text-xs font-mono-tech text-[#9BA3B0] font-normal ml-2">
                      ({inq.email} • {inq.phone})
                    </span>
                  </div>
                  <div className="font-mono-tech text-xs text-[#9BA3B0]">
                    DATE: <strong className="text-white">{inq.preferredDate}</strong>{" "}
                    | LOCATION: <strong className="text-white">{inq.location}</strong>
                  </div>
                  {inq.notes && (
                    <p className="text-xs text-[#C8CDD5] italic border-l-2 border-[#D4FF00] pl-3 mt-1">
                      “{inq.notes}”
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleUpdateInquiryStatus(inq.id, "PENDING")}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 font-mono-tech text-[11px] uppercase border cursor-pointer ${
                      inq.status === "PENDING"
                        ? "bg-amber-400/20 border-amber-400 text-amber-300 font-bold"
                        : "border-white/10 text-[#5E6673] hover:text-white"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    Pending
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateInquiryStatus(inq.id, "CONFIRMED")
                    }
                    className={`inline-flex items-center gap-1 px-3 py-1.5 font-mono-tech text-[11px] uppercase border cursor-pointer ${
                      inq.status === "CONFIRMED"
                        ? "bg-[#D4FF00]/20 border-[#D4FF00] text-[#D4FF00] font-bold"
                        : "border-white/10 text-[#5E6673] hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Confirmed
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateInquiryStatus(inq.id, "CANCELLED")
                    }
                    className={`inline-flex items-center gap-1 px-3 py-1.5 font-mono-tech text-[11px] uppercase border cursor-pointer ${
                      inq.status === "CANCELLED"
                        ? "bg-red-500/20 border-red-500 text-red-300 font-bold"
                        : "border-white/10 text-[#5E6673] hover:text-white"
                    }`}
                  >
                    <XCircle className="w-3 h-3" />
                    Cancelled
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteInquiry(inq.id, inq.referenceCode)
                    }
                    title="Delete Inquiry"
                    className="p-2 border border-white/15 text-red-400 hover:border-red-500 ml-2 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL 1: ADD NEW VEHICLE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F1115] border border-[#D4FF00] max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#D4FF00]">
                  SQLITE FLEET COMMISSION
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                  ADD NEW VELOX MODEL
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2 text-[#9BA3B0] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. VELOX NEMESIS R"
                    className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white font-mono-tech"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    Internal Code Name
                  </label>
                  <input
                    type="text"
                    value={newCodeName}
                    onChange={(e) => setNewCodeName(e.target.value)}
                    className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white font-mono-tech"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    Body Type
                  </label>
                  <select
                    value={newBodyType}
                    onChange={(e) => setNewBodyType(e.target.value as BodyType)}
                    className="w-full bg-[#08090B] border border-white/20 px-3 py-2.5 text-white font-mono-tech"
                  >
                    <option value="Hypercar">Hypercar</option>
                    <option value="Grand Tourer">Grand Tourer</option>
                    <option value="Track Coupe">Track Coupe</option>
                    <option value="Performance SUV">Performance SUV</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    Propulsion
                  </label>
                  <select
                    value={newPowertrain}
                    onChange={(e) =>
                      setNewPowertrain(e.target.value as PowertrainType)
                    }
                    className="w-full bg-[#08090B] border border-white/20 px-3 py-2.5 text-white font-mono-tech"
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
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    Base Allocation (USD)
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white font-mono-tech"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    Output (PS)
                  </label>
                  <input
                    type="number"
                    value={newHp}
                    onChange={(e) => setNewHp(Number(e.target.value))}
                    className="w-full bg-[#08090B] border border-white/20 px-3 py-2 text-white font-mono-tech"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    0–100 km/h
                  </label>
                  <input
                    type="text"
                    value={newZeroToHundred}
                    onChange={(e) => setNewZeroToHundred(e.target.value)}
                    className="w-full bg-[#08090B] border border-white/20 px-3 py-2 text-white font-mono-tech"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    V-Max (km/h)
                  </label>
                  <input
                    type="number"
                    value={newTopSpeed}
                    onChange={(e) => setNewTopSpeed(Number(e.target.value))}
                    className="w-full bg-[#08090B] border border-white/20 px-3 py-2 text-white font-mono-tech"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    Dry Mass (kg)
                  </label>
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full bg-[#08090B] border border-white/20 px-3 py-2 text-white font-mono-tech"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                  Editorial Tagline
                </label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                  Studio Photograph URL (or select preset)
                </label>
                <input
                  type="url"
                  value={newHeroImage}
                  onChange={(e) => setNewHeroImage(e.target.value)}
                  className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2 text-white font-mono-tech"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setNewHeroImage(preset.url)}
                      className="px-2.5 py-1 bg-[#08090B] border border-white/15 hover:border-[#D4FF00] font-mono-tech text-[10px] text-[#C8CDD5]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2.5 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newFeatured}
                  onChange={(e) => setNewFeatured(e.target.checked)}
                  className="accent-[#D4FF00] w-4 h-4"
                />
                <span className="font-mono-tech text-xs text-white uppercase">
                  Feature on Home Showroom Page
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 border border-white/20 text-white font-mono-tech uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingVehicle}
                  className="px-6 py-2.5 bg-[#D4FF00] text-[#08090B] font-mono-tech font-bold uppercase cursor-pointer"
                >
                  {savingVehicle ? "Saving to SQLite..." : "Save to Fleet DB"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT EXISTING VEHICLE */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1115] border border-[#D4FF00] max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#D4FF00]">
                  MODIFY HOMOLOGATION DATA
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                  {editingVehicle.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingVehicle(null)}
                className="p-2 text-[#9BA3B0] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                  Base Allocation (USD)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white font-mono-tech"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    Peak Output (PS)
                  </label>
                  <input
                    type="number"
                    value={editHp}
                    onChange={(e) => setEditHp(Number(e.target.value))}
                    className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white font-mono-tech"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                    0–100 km/h
                  </label>
                  <input
                    type="text"
                    value={editZero}
                    onChange={(e) => setEditZero(e.target.value)}
                    className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white font-mono-tech"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono-tech uppercase text-[#9BA3B0]">
                  Tagline
                </label>
                <input
                  type="text"
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  className="w-full bg-[#08090B] border border-white/20 px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="px-5 py-2.5 border border-white/20 text-white font-mono-tech uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingVehicle}
                  className="px-6 py-2.5 bg-[#D4FF00] text-[#08090B] font-mono-tech font-bold uppercase cursor-pointer"
                >
                  {savingVehicle ? "Updating..." : "Update SQLite Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
