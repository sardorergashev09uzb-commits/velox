"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Calendar,
  MapPin,
} from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { formatPrice } from "@/lib/utils";

interface SubmittedInquiry {
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  vehicleSlug: string;
  vehicleName: string;
  experienceType: string;
  preferredDate: string;
  location: string;
  notes?: string | null;
}

interface InquiryFormProps {
  vehicles: Vehicle[];
}

export function InquiryForm({ vehicles }: InquiryFormProps) {
  const searchParams = useSearchParams();
  const initialVehicleParam = searchParams.get("vehicle");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleSlug, setVehicleSlug] = useState(
    vehicles[0]?.slug || "velox-valkyrie-apex"
  );
  const [experienceType, setExperienceType] = useState<
    "PRIVATE_VIEWING" | "TRACK_TEST_DRIVE" | "BESPOKE_COMMISSION"
  >("PRIVATE_VIEWING");
  const [preferredDate, setPreferredDate] = useState("");
  const [location, setLocation] = useState("Zürich Private Sanctuary");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submittedData, setSubmittedData] = useState<{
    inquiry: SubmittedInquiry;
    persistedInDatabase: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (
      initialVehicleParam &&
      vehicles.some((v) => v.slug === initialVehicleParam)
    ) {
      setVehicleSlug(initialVehicleParam);
    }
  }, [initialVehicleParam, vehicles]);

  const selectedVehicle =
    vehicles.find((v) => v.slug === vehicleSlug) || vehicles[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          vehicleSlug,
          experienceType,
          preferredDate,
          location,
          notes,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrorMsg(
          result.error || "Please review the highlighted form fields."
        );
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setSubmitting(false);
        return;
      }

      setSubmittedData({
        inquiry: result.inquiry,
        persistedInDatabase: Boolean(result.persistedInDatabase),
        message: result.message,
      });
    } catch {
      setErrorMsg("Network error while submitting inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedData) {
    const { inquiry, persistedInDatabase, message } = submittedData;
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#0F1115] border-2 border-[#D4FF00] p-8 sm:p-12 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-7 h-7 text-[#D4FF00] shrink-0" />
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4FF00]">
                BOOKING DOSSIER REGISTERED
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
                INQUIRY CONFIRMED (DEMO MODE)
              </h2>
            </div>
          </div>
          <div className="bg-[#08090B] border border-[#D4FF00]/50 px-4 py-2 text-right">
            <span className="block font-mono-tech text-[10px] uppercase text-[#9BA3B0]">
              REFERENCE CODE
            </span>
            <span className="font-mono-tech text-lg font-bold text-[#D4FF00]">
              {inquiry.referenceCode}
            </span>
          </div>
        </div>

        <div className="bg-[#161920] border border-white/15 p-5 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-[#D4FF00] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-[#C8CDD5]">
            <p className="font-semibold text-white">
              Portfolio Concept Demonstration Notice
            </p>
            <p>{message}</p>
            <p className="font-mono-tech text-[11px] text-[#D4FF00] pt-1">
              STATUS:{" "}
              {persistedInDatabase
                ? "SAVED TO LOCAL SQLITE DATABASE VIA PRISMA ORM"
                : "PROCESSED IN STATELESS DEMO MEMORY"}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#08090B] border border-white/10 p-6 text-sm">
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-widest text-[#5E6673]">
              CLIENT NAME
            </dt>
            <dd className="text-white font-medium mt-1">{inquiry.fullName}</dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-widest text-[#5E6673]">
              CONTACT DETAILS
            </dt>
            <dd className="text-white font-mono-tech text-xs mt-1">
              {inquiry.email} // {inquiry.phone}
            </dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-widest text-[#5E6673]">
              SELECTED VEHICLE
            </dt>
            <dd className="text-[#D4FF00] font-bold mt-1">
              {inquiry.vehicleName}
            </dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-widest text-[#5E6673]">
              PROGRAMME TYPE
            </dt>
            <dd className="text-white font-mono-tech text-xs mt-1">
              {inquiry.experienceType.replace(/_/g, " ")}
            </dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-widest text-[#5E6673]">
              PREFERRED DATE
            </dt>
            <dd className="text-white font-mono-tech text-xs mt-1">
              {inquiry.preferredDate}
            </dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-widest text-[#5E6673]">
              SANCTUARY / CIRCUIT
            </dt>
            <dd className="text-white mt-1">{inquiry.location}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmittedData(null);
              setNotes("");
            }}
            className="bg-[#D4FF00] text-[#08090B] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            Submit Another Demo Inquiry
          </button>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 border border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-[#08090B] px-6 py-3.5 text-xs font-mono-tech uppercase tracking-[0.2em] transition-colors"
          >
            <span>Manage in Admin Panel</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="lg:col-span-7 bg-[#0F1115] border border-white/10 p-6 sm:p-10 space-y-8"
      >
        <div className="border-b border-white/10 pb-5 space-y-1">
          <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4FF00]">
            01 // CLIENT DOSSIER
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
            RESERVE YOUR APPOINTMENT
          </h2>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="bg-red-950/50 border border-red-500/60 p-4 flex items-start gap-3 text-xs sm:text-sm text-red-200"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <fieldset className="space-y-3">
          <legend className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#9BA3B0]">
            Select Programme Type *
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: "PRIVATE_VIEWING",
                label: "Private Viewing",
                sub: "Showroom Sanctuary",
              },
              {
                id: "TRACK_TEST_DRIVE",
                label: "Track Telemetry Drive",
                sub: "Closed Circuit Session",
              },
              {
                id: "BESPOKE_COMMISSION",
                label: "Bespoke Commission",
                sub: "Atelier Spec Consultation",
              },
            ].map((item) => {
              const active = experienceType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setExperienceType(
                      item.id as
                        | "PRIVATE_VIEWING"
                        | "TRACK_TEST_DRIVE"
                        | "BESPOKE_COMMISSION"
                    )
                  }
                  className={`p-4 text-left border transition-all ${
                    active
                      ? "bg-[#D4FF00]/10 border-[#D4FF00] text-white"
                      : "bg-[#08090B] border-white/15 text-[#9BA3B0] hover:border-white/35"
                  }`}
                >
                  <span
                    className={`block font-mono-tech text-xs uppercase font-bold ${
                      active ? "text-[#D4FF00]" : "text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-[11px] text-[#9BA3B0] mt-1">
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="vehicleSlug"
              className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-[#C8CDD5]"
            >
              Selected VELOX Model *
            </label>
            <select
              id="vehicleSlug"
              name="vehicleSlug"
              value={vehicleSlug}
              onChange={(e) => setVehicleSlug(e.target.value)}
              required
              className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
            >
              {vehicles.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.name} ({formatPrice(v.price)})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="preferredDate"
              className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-[#C8CDD5]"
            >
              Preferred Viewing Date *
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              value={preferredDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
              className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
            />
            {fieldErrors.preferredDate && (
              <p className="text-xs text-red-400 font-mono-tech">
                {fieldErrors.preferredDate[0]}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-[#C8CDD5]"
            >
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Marcus Vance"
              className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white placeholder:text-[#5E6673] focus:border-[#D4FF00]"
            />
            {fieldErrors.fullName && (
              <p className="text-xs text-red-400 font-mono-tech">
                {fieldErrors.fullName[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-[#C8CDD5]"
            >
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@domain.com"
              className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white placeholder:text-[#5E6673] focus:border-[#D4FF00]"
            />
            {fieldErrors.email && (
              <p className="text-xs text-red-400 font-mono-tech">
                {fieldErrors.email[0]}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-[#C8CDD5]"
            >
              Direct Telephone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+41 44 500 29 00"
              className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white placeholder:text-[#5E6673] focus:border-[#D4FF00]"
            />
            {fieldErrors.phone && (
              <p className="text-xs text-red-400 font-mono-tech">
                {fieldErrors.phone[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-[#C8CDD5]"
            >
              Showroom / Circuit Location *
            </label>
            <select
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white font-mono-tech focus:border-[#D4FF00]"
            >
              <option value="Zürich Private Sanctuary">
                Zürich Private Sanctuary (Switzerland)
              </option>
              <option value="Modena Autodromo Circuit">
                Modena Autodromo Circuit (Italy)
              </option>
              <option value="Tokyo Aoyama Lounge">
                Tokyo Aoyama Lounge (Japan)
              </option>
              <option value="Monterey Private Track Suite">
                Monterey Private Track Suite (USA)
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-[#C8CDD5]"
          >
            Specification Preferences / Telemetry Requests (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Specify preferred exterior carbon weave, left/right-hand drive configuration, or track helmet sizing..."
            className="w-full bg-[#08090B] border border-white/20 p-4 text-sm text-white placeholder:text-[#5E6673] focus:border-[#D4FF00]"
          />
        </div>

        <div className="pt-2 space-y-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#D4FF00] text-[#08090B] px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span>
              {submitting
                ? "Validating & Recording Dossier..."
                : "Submit Viewing Request"}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] font-mono-tech text-[#5E6673]">
            * DEMO TRANSPARENCY: Submitting this form validates your input via our Next.js API Route and stores the booking in SQLite (manageable via /admin).
          </p>
        </div>
      </form>

      {selectedVehicle && (
        <aside className="lg:col-span-5 bg-[#0F1115] border border-white/10 overflow-hidden sticky top-28">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D4FF00]">
              02 // SELECTED CONFIGURATION
            </span>
            <span className="font-mono-tech text-xs text-[#9BA3B0]">
              {selectedVehicle.codeName}
            </span>
          </div>

          <div className="relative aspect-[16/10] bg-[#08090B]">
            <img
              src={selectedVehicle.images.card}
              alt={selectedVehicle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#D4FF00]">
                  {selectedVehicle.bodyType}
                </span>
                <h3 className="font-display text-2xl font-extrabold text-white uppercase">
                  {selectedVehicle.name}
                </h3>
              </div>
              <span className="font-mono-tech text-base font-bold text-white">
                {formatPrice(selectedVehicle.price)}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 border border-white/10 bg-[#08090B] p-4 gap-3 text-center">
              <div>
                <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                  0–100 KM/H
                </span>
                <span className="font-mono-tech text-sm font-bold text-[#D4FF00]">
                  {selectedVehicle.performance.zeroToHundred}
                </span>
              </div>
              <div className="border-x border-white/10">
                <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                  OUTPUT
                </span>
                <span className="font-mono-tech text-sm font-bold text-white">
                  {selectedVehicle.performance.horsepower} PS
                </span>
              </div>
              <div>
                <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                  TOP SPEED
                </span>
                <span className="font-mono-tech text-sm font-bold text-white">
                  {selectedVehicle.performance.topSpeedKmh} KM/H
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#9BA3B0]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4FF00] shrink-0" />
                <span>Location: {location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#D4FF00] shrink-0" />
                <span>
                  Dedicated 90-minute private telemetry & chassis walkthrough.
                </span>
              </div>
            </div>

            <Link
              href={`/vehicles/${selectedVehicle.slug}`}
              className="block w-full text-center border border-white/15 hover:border-[#D4FF00] py-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-white transition-colors"
            >
              Inspect Full {selectedVehicle.name} Specs →
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
