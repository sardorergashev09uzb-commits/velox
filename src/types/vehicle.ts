export type BodyType = "Hypercar" | "Grand Tourer" | "Track Coupe" | "Performance SUV";

export type PowertrainType =
  | "Twin-Turbo V8 Hybrid"
  | "Full Electric Tri-Motor"
  | "Naturally Aspirated V10"
  | "Quad-Motor Electric";

export interface VehicleGalleryItem {
  url: string;
  alt: string;
  caption: string;
  category: "Exterior" | "Aerodynamics" | "Cockpit" | "Detail";
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  codeName: string;
  series: string;
  tagline: string;
  year: number;
  price: number;
  bodyType: BodyType;
  powertrain: PowertrainType;
  transmission: string;
  drivetrain: "AWD" | "RWD";
  fuelType: "Hybrid Petrol" | "Battery Electric" | "High-Octane Petrol";
  featured: boolean;
  productionLimit?: string;
  editorialQuote: string;
  overview: string;
  engineeringStory: string;
  performance: {
    horsepower: number;
    torqueNm: number;
    zeroToHundred: string;
    zeroToTwoHundred: string;
    topSpeedKmh: number;
    weightKg: number;
    downforceKg: number;
    redlineRpm?: string;
    rangeKm?: number;
  };
  dimensions: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
    wheelbaseMm: number;
    weightDistribution: string;
  };
  chassisAndAero: {
    monocoque: string;
    suspension: string;
    brakes: string;
    aerodynamics: string;
    tires: string;
  };
  highlights: string[];
  exteriorFinish: string;
  interiorTrim: string;
  images: {
    hero: string;
    card: string;
    editorial: string;
    gallery: VehicleGalleryItem[];
  };
}

export interface InquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  vehicleSlug: string;
  experienceType: "PRIVATE_VIEWING" | "TRACK_TEST_DRIVE" | "BESPOKE_COMMISSION";
  preferredDate: string;
  location: string;
  notes?: string;
}
