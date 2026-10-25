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
    const { inquiry, persistedInDatabase } = submittedData;
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#11141B] rounded-2xl border border-white/20 p-8 sm:p-12 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3.5">
            <CheckCircle2 className="w-7 h-7 text-[#A3E635] shrink-0" />
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2]">
                Booking Dossier Registered
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Private Viewing Request Confirmed
              </h2>
            </div>
          </div>
          <div className="bg-[#090B0F] rounded-lg border border-white/15 px-4 py-2.5 text-right">
            <span className="block font-mono-tech text-[10px] uppercase text-[#949CA8]">
              Reference Code
            </span>
            <span className="font-mono-tech text-lg font-bold text-white">
              {inquiry.referenceCode}
            </span>
          </div>
        </div>

        <div className="bg-[#171B24] rounded-xl border border-white/10 p-5 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-[#D6C7B2] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-[#CBD5E1]">
            <p className="font-semibold text-white">
              Portfolio Concept Demonstration Notice
            </p>
            <p>
              Your inquiry was validated by the Next.js server and recorded for demonstration purposes. No commercial dealership transmission was sent.
            </p>
            <p className="font-mono-tech text-[11px] text-[#949CA8] pt-1">
              STORAGE:{" "}
              {persistedInDatabase
                ? "RECORDED IN SQLITE DATABASE"
                : "PROCESSED IN DEMO SESSION"}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#090B0F] rounded-xl border border-white/[0.08] p-6 text-sm">
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              Client Name
            </dt>
            <dd className="text-white font-medium mt-1">{inquiry.fullName}</dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              Contact Details
            </dt>
            <dd className="text-white font-mono-tech text-xs mt-1">
              {inquiry.email} • {inquiry.phone}
            </dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              Selected Vehicle
            </dt>
            <dd className="text-[#D6C7B2] font-bold mt-1">
              {inquiry.vehicleName}
            </dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              Programme Type
            </dt>
            <dd className="text-white font-mono-tech text-xs mt-1">
              {inquiry.experienceType.replace(/_/g, " ")}
            </dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              Preferred Date
            </dt>
            <dd className="text-white font-mono-tech text-xs mt-1">
              {inquiry.preferredDate}
            </dd>
          </div>
          <div>
            <dt className="font-mono-tech text-[10px] uppercase tracking-wider text-[#5E6673]">
              Sanctuary / Circuit
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
            className="bg-white text-[#090B0F] hover:bg-[#E2E8F0] px-6 py-3.5 rounded-md text-xs font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
          <Link
            href={`/vehicles/${inquiry.vehicleSlug}`}
            className="inline-flex items-center gap-2 border border-white/15 text-white hover:border-white/40 px-6 py-3.5 rounded-md text-xs font-mono-tech uppercase tracking-[0.16em] transition-colors"
          >
            <span>Return to {inquiry.vehicleName}</span>
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
        className="lg:col-span-7 bg-[#11141B] rounded-2xl border border-white/[0.08] p-6 sm:p-10 space-y-8"
      >
        <div className="border-b border-white/[0.08] pb-5 space-y-1">
          <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D6C7B2]">
            01 // Client Concierge
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Reserve Your Appointment
          </h2>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="bg-red-950/50 rounded-lg border border-red-500/50 p-4 flex items-start gap-3 text-xs sm:text-sm text-red-200"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <fieldset className="space-y-3">
          <legend className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#949CA8]">
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
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    active
                      ? "bg-white/[0.08] border-white text-white"
                      : "bg-[#090B0F] border-white/10 text-[#949CA8] hover:border-white/30"
                  }`}
                >
                  <span
                    className={`block text-xs font-semibold ${
                      active ? "text-white" : "text-[#CBD5E1]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-[11px] text-[#949CA8] mt-1">
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
              className="block font-mono-tech text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
            >
              Selected VELOX Model *
            </label>
            <select
              id="vehicleSlug"
              name="vehicleSlug"
              value={vehicleSlug}
              onChange={(e) => setVehicleSlug(e.target.value)}
              required
              className="w-full bg-[#090B0F] rounded-lg border border-white/15 px-4 py-3 text-sm text-white focus:border-white"
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
              className="block font-mono-tech text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
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
              className="w-full bg-[#090B0F] rounded-lg border border-white/15 px-4 py-3 text-sm text-white focus:border-white"
            />
            {fieldErrors.preferredDate && (
              <p className="text-xs text-red-400">
                {fieldErrors.preferredDate[0]}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block font-mono-tech text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
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
              className="w-full bg-[#090B0F] rounded-lg border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#5E6673] focus:border-white"
            />
            {fieldErrors.fullName && (
              <p className="text-xs text-red-400">{fieldErrors.fullName[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block font-mono-tech text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
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
              className="w-full bg-[#090B0F] rounded-lg border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#5E6673] focus:border-white"
            />
            {fieldErrors.email && (
              <p className="text-xs text-red-400">{fieldErrors.email[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block font-mono-tech text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
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
              className="w-full bg-[#090B0F] rounded-lg border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#5E6673] focus:border-white"
            />
            {fieldErrors.phone && (
              <p className="text-xs text-red-400">{fieldErrors.phone[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block font-mono-tech text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
            >
              Showroom / Circuit Location *
            </label>
            <select
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#090B0F] rounded-lg border border-white/15 px-4 py-3 text-sm text-white focus:border-white"
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
            className="block font-mono-tech text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
          >
            Specification Preferences (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Specify preferred exterior finish, left/right-hand drive configuration, or track session notes..."
            className="w-full bg-[#090B0F] rounded-lg border border-white/15 p-4 text-sm text-white placeholder:text-[#5E6673] focus:border-white"
          />
        </div>

        <div className="pt-2 space-y-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-[#090B0F] hover:bg-[#E2E8F0] px-8 py-4 rounded-md text-xs font-semibold uppercase tracking-[0.18em] transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span>
              {submitting ? "Submitting Request..." : "Submit Viewing Request"}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-[#5E6673]">
            * Portfolio Demo Notice: Your inquiry will be validated and saved to the demo database. No real dealership will contact you.
          </p>
        </div>
      </form>

      {selectedVehicle && (
        <aside className="lg:col-span-5 bg-[#11141B] rounded-2xl border border-white/[0.08] overflow-hidden sticky top-28">
          <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
            <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D6C7B2]">
              02 // Selected Configuration
            </span>
            <span className="font-mono-tech text-xs text-[#949CA8]">
              {selectedVehicle.codeName}
            </span>
          </div>

          <div className="relative aspect-[16/10] bg-[#090B0F]">
            <img
              src={selectedVehicle.images.card}
              alt={selectedVehicle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11141B] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#D6C7B2]">
                  {selectedVehicle.bodyType}
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  {selectedVehicle.name}
                </h3>
              </div>
              <span className="font-mono-tech text-base font-bold text-white">
                {formatPrice(selectedVehicle.price)}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 rounded-lg border border-white/[0.08] bg-[#090B0F] p-4 gap-3 text-center">
              <div>
                <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                  0–100 km/h
                </span>
                <span className="font-mono-tech text-sm font-bold text-[#D6C7B2]">
                  {selectedVehicle.performance.zeroToHundred}
                </span>
              </div>
              <div className="border-x border-white/[0.08]">
                <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                  Output
                </span>
                <span className="font-mono-tech text-sm font-bold text-white">
                  {selectedVehicle.performance.horsepower} PS
                </span>
              </div>
              <div>
                <span className="block font-mono-tech text-[10px] uppercase text-[#5E6673]">
                  Top Speed
                </span>
                <span className="font-mono-tech text-sm font-bold text-white">
                  {selectedVehicle.performance.topSpeedKmh} km/h
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#949CA8]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6C7B2] shrink-0" />
                <span>Location: {location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#D6C7B2] shrink-0" />
                <span>
                  Dedicated 90-minute private telemetry & chassis walkthrough.
                </span>
              </div>
            </div>

            <Link
              href={`/vehicles/${selectedVehicle.slug}`}
              className="block w-full text-center rounded-md border border-white/15 hover:border-white/40 py-3 font-mono-tech text-xs uppercase tracking-[0.16em] text-white transition-colors"
            >
              Inspect Full {selectedVehicle.name} Specs →
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
