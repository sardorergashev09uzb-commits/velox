<div align="center">

# VELOX AUTOMOTIVE
### Nocturnal Hypercar & Grand Tourer Digital Showroom

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-velox--x1.vercel.app-FFFFFF?style=for-the-badge&logo=vercel&logoColor=000000)](https://velox-x1.vercel.app)
[![Next.js 15](https://img.shields.io/badge/Next.js_15-App_Router-090B0F?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma + SQLite](https://img.shields.io/badge/Prisma_ORM-SQLite-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

<p align="center">
  <strong>An art-directed, full-stack luxury automotive brand experience and fleet management studio built for a freelance developer portfolio.</strong>
</p>

<p align="center">
  <a href="https://velox-x1.vercel.app"><strong>🌐 Live Showroom</strong></a> •
  <a href="https://velox-x1.vercel.app/vehicles"><strong>🏎️ Fleet Catalogue</strong></a> •
  <a href="https://velox-x1.vercel.app/about"><strong>📐 Engineering Philosophy</strong></a> •
  <a href="https://velox-x1.vercel.app/contact"><strong>📅 Private Viewing</strong></a> •
  <a href="https://velox-x1.vercel.app/admin"><strong>🔐 Staff Studio CMS</strong></a>
</p>

</div>

---

## 🔗 Live Deployment & Demo Access

| Environment | URL | Notes |
| :--- | :--- | :--- |
| **Public Showroom (Home)** | [**https://velox-x1.vercel.app**](https://velox-x1.vercel.app) | Hero premiere, curated monocoques, architectural doctrine & full fleet |
| **Interactive Fleet Catalogue** | [**https://velox-x1.vercel.app/vehicles**](https://velox-x1.vercel.app/vehicles) | Real-time filtering by chassis, propulsion, allocation ceiling & search |
| **Brand Manifesto** | [**https://velox-x1.vercel.app/about**](https://velox-x1.vercel.app/about) | Zürich • Modena • Tokyo engineering triad & portfolio case study |
| **Private Viewing Concierge** | [**https://velox-x1.vercel.app/contact**](https://velox-x1.vercel.app/contact) | Validated booking flow with live vehicle preview & reference code |
| **Protected Staff Studio CMS** | [**https://velox-x1.vercel.app/admin**](https://velox-x1.vercel.app/admin) | **Demo Login:** `admin@velox.auto` / **Passkey:** `velox2026` |

---

## 🎯 Project Overview & Creative Direction

**VELOX Automotive** is a fictional high-performance automotive marque conceived to demonstrate range in digital art direction, UX architecture, and modern full-stack engineering. Designed as the dark, cinematic counterpart to bright luxury editorial experiences, VELOX pairs nocturnal studio photography with precision technical typography and a database-driven CMS.

### Visual & UX Principles
- **Nocturnal Showroom Palette:** Deep obsidian (`#090B0F`) and carbon (`#11141B`) surfaces paired with crisp alabaster white (`#F3F5F8`), platinum silver (`#CBD5E1`), and warm champagne-gold (`#D6C7B2`) accents.
- **High-Contrast Editorial Pacing:** Balances dark showroom sections with high-contrast light architectural sections (`#F4F5F7`) to highlight engineering metrics.
- **Precision Typography:** Geometric display headlines (`Outfit`), high-legibility UI copy (`Plus Jakarta Sans`), and monospaced homologation telemetry (`JetBrains Mono`).
- **Strict Separation of Guest & Admin Workspaces:** Public visitors experience an uncluttered luxury showroom, while authenticated staff access a dedicated, ergonomic sidebar studio at `/admin`.

---

## ✨ Key Features

### 1. Public Showroom & Vehicle Discovery
- **Cinematic Hero & Telemetry Strip:** Full-viewport flagship presentation with live `0–100 km/h`, peak horsepower (`PS`), and aerodynamic downforce (`kg`) readouts.
- **Multi-Criteria Fleet Filtering (`/vehicles`):** Filter dynamically by chassis architecture (`Hypercar`, `Grand Tourer`, `Track Coupe`, `Performance SUV`), propulsion system (`Twin-Turbo V8 Hybrid`, `Full Electric Tri-Motor`, `Naturally Aspirated V10`, `Quad-Motor Electric`), maximum price allocation slider, and keyword search.
- **Homologation Dossier (`/vehicles/[slug]`):** Interactive multi-angle studio gallery (`Exterior`, `Aerodynamics`, `Cockpit`, `Detail`), propulsion/dimension tables, chassis hardware breakdown, and direct pre-selected model inquiry links.

### 2. Private Viewing & Telemetry Concierge (`/contact`)
- **Live Configuration Preview:** Selecting a model dynamically updates the sticky specification card with the vehicle's studio photograph, output, sprint time, and base allocation.
- **Server-Side Validation & Reference Dossier:** Powered by `Zod` and `Prisma`, generating a unique booking reference (`VLX-2026-XXXXX`) with explicit portfolio demo transparency.

### 3. Protected Executive Studio CMS (`/admin`)
- **Staff Authentication Gate:** Protected by an HTTP-only session cookie (`/api/admin/auth`) with a 1-click **"Auto-Fill Demo Credentials"** helper for portfolio reviewers.
- **6-Tab Vehicle Architect Editor:** Edit every attribute of any vehicle with a real-time **Live Showroom Preview**:
  1. *Basic Info:* Name, CodeName, Body Type, Series, Model Year, Price, Production Limit, Tagline & Featured toggle.
  2. *Performance:* Powertrain, Transmission, Drivetrain, Fuel Type, Horsepower, Torque, `0–100 km/h`, `0–200 km/h`, Top Speed, Dry Weight, Downforce & Redline/Range.
  3. *Description:* Editorial Pull-Quote, Overview, Engineering Story, Exterior/Interior finishes & dynamic Key Highlights list.
  4. *Dimensions:* Length, Width, Height, Wheelbase & Static Weight Distribution.
  5. *Chassis & Aero:* Monocoque, Suspension, Brakes, Active Aerodynamics & Tires.
  6. *Photos & Gallery:* Hero/Card studio image presets + multi-angle interactive gallery frame manager.
- **1-Click Fleet Utilities:** Clone existing models, toggle Home page featured status, manage client booking statuses (`PENDING`, `CONFIRMED`, `CANCELLED`), or restore the default 6 factory models at any time.

---

## 🏎️ Signature Fleet Lineup

| Code | Model | Category | Propulsion | Output | 0–100 km/h | Top Speed | Base Allocation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `VX-01` | **VELOX VALKYRIE APEX** | Hypercar | Twin-Turbo V8 Hybrid | `1,080 PS` | `2.1 s` | `368 km/h` | `$495,000` |
| `VX-02` | **VELOX VORTEX GT** | Grand Tourer | Full Electric Tri-Motor | `885 PS` | `2.4 s` | `325 km/h` | `$235,000` |
| `VX-03` | **VELOX KRONOS RS** | Track Coupe | Naturally Aspirated V10 | `710 PS` | `2.8 s` | `334 km/h` | `$289,000` |
| `VX-04` | **VELOX TITAN X** | Performance SUV | Twin-Turbo V8 Hybrid | `790 PS` | `2.9 s` | `312 km/h` | `$210,000` |
| `VX-05` | **VELOX AETHER EV** | Hypercar | Quad-Motor Electric | `1,360 PS` | `1.85 s` | `355 km/h` | `$420,000` |
| `VX-06` | **VELOX SPECTRE GT-S** | Grand Tourer | Twin-Turbo V8 Hybrid | `815 PS` | `2.7 s` | `340 km/h` | `$268,000` |

---

## 🏗️ Tech Stack & Architecture

```text
velox/
├── prisma/
│   └── schema.prisma                         # SQLite schema (VehicleRecord & Inquiry models)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/auth/route.ts           # Staff authentication session API (GET/POST/DELETE)
│   │   │   ├── vehicles/route.ts             # Fleet list & new vehicle creation API (GET/POST)
│   │   │   ├── vehicles/[slug]/route.ts      # Vehicle specification update & delete API (GET/PATCH/DELETE)
│   │   │   ├── vehicles/reset/route.ts       # 1-click factory fleet restore API (POST)
│   │   │   ├── inquiries/route.ts            # Client viewing inquiry submission & list API (GET/POST)
│   │   │   └── inquiries/[id]/route.ts       # Inquiry status & dossier update API (PATCH/DELETE)
│   │   ├── vehicles/
│   │   │   ├── page.tsx                      # Dynamic fleet catalogue page
│   │   │   └── [slug]/page.tsx               # Dynamic vehicle homologation detail page
│   │   ├── about/page.tsx                    # Brand philosophy & portfolio case study disclosure
│   │   ├── contact/page.tsx                  # Private viewing & test-drive booking page
│   │   ├── admin/page.tsx                    # Protected Executive Studio CMS
│   │   ├── layout.tsx                        # Global fonts (Outfit, Plus Jakarta Sans, JetBrains Mono)
│   │   ├── page.tsx                          # Showroom Home page
│   │   └── globals.css                       # Design tokens, custom utilities & reduced-motion rules
│   ├── components/
│   │   ├── admin/AdminDashboardClient.tsx    # Standalone Admin Workspace, 6-Tab Editor & Auth Gate
│   │   ├── forms/InquiryForm.tsx             # Accessible booking form with live vehicle preview
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                    # Guest showroom navigation bar
│   │   │   └── Footer.tsx                    # Guest footer with portfolio disclosure & staff portal link
│   │   └── vehicles/
│   │       ├── VehicleCard.tsx               # Showroom specification card
│   │       ├── VehicleCatalogueClient.tsx    # Interactive filter, sort & search engine
│   │       └── VehicleGallery.tsx            # Multi-angle studio frame switcher
│   ├── data/
│   │   └── vehicles.ts                       # Initial factory seed dataset (6 VELOX models)
│   ├── lib/
│   │   ├── prisma.ts                         # Prisma client with automatic Vercel /tmp SQLite support
│   │   ├── vehicles-db.ts                    # Database service layer & automatic table/seed initializer
│   │   └── utils.ts                          # Currency, number & booking reference formatters
│   └── types/
│       └── vehicle.ts                        # Strict TypeScript interfaces
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/sardorergashev09uzb-commits/velox.git
cd velox
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize the local SQLite database
```bash
npx prisma db push
```

### 4. Start the development server
```bash
npm run dev
```

- **Public Showroom:** `http://localhost:3000`
- **Staff Studio CMS:** `http://localhost:3000/admin` (`admin@velox.auto` / `velox2026`)

---

## 📄 License & Portfolio Disclaimer

This project is a **fictional automotive brand concept** created strictly for portfolio demonstration. Vehicle specifications, pricing allocations, and showroom locations are curated sample data and do not represent a real commercial automaker.
