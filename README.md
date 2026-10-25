# VELOX Automotive — Nocturnal Hypercar & Grand Tourer Showroom

**VELOX Automotive** is a full-stack premium automotive brand and showroom concept built for a freelance developer portfolio. Art-directed with a nocturnal, high-contrast aesthetic (`#08090B` Obsidian, `#C8CDD5` Silver, and `#D4FF00` Electric Lime accents), it contrasts bright luxury editorial templates with precision automotive engineering.

## Tech Stack
- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling & Typography:** Tailwind CSS v4 + Google Fonts (`Syne`, `Plus Jakarta Sans`, `JetBrains Mono`)
- **Database & ORM:** SQLite + Prisma ORM (with automatic serverless `/tmp` initialization & seeding for zero-config Vercel deployments)
- **Validation:** Zod server-side schema validation

## Key Features
- **Immersive Showroom (`/`)**: Flagship telemetry strip, asymmetrical featured monocoques, light-editorial architectural doctrine contrast section, and live fleet grid.
- **Interactive Fleet Catalogue (`/vehicles`)**: Multi-criteria filtering by chassis architecture, propulsion system, allocation ceiling, and keyword search.
- **Homologation Vehicle Detail (`/vehicles/[slug]`)**: Interactive studio frame gallery, propulsion & chassis specification tables, and direct booking link.
- **Brand Manifesto (`/about`)**: Global engineering triad (Zürich, Modena, Tokyo) and explicit portfolio case-study disclosure.
- **Private Viewing & Telemetry Concierge (`/contact`)**: Live vehicle configuration preview, Zod server validation, and reference code generation (`VLX-2026-XXXXX`).
- **Admin Telemetry Console (`/admin`)**: Full CRUD management for fleet vehicles and client viewing inquiries backed by SQLite.

## Local Development

```bash
npm install
npx prisma db push
npm run dev
```

Open `http://localhost:3000` (Showroom) or `http://localhost:3000/admin` (Admin Console).
