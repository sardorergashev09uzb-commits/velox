import { Vehicle } from "@/types/vehicle";

export const VEHICLES: Vehicle[] = [
  {
    id: "vlx-01",
    slug: "velox-valkyrie-apex",
    name: "VELOX VALKYRIE APEX",
    codeName: "VX-01 // LABYRINTH",
    series: "Ultimate Series",
    tagline: "Sculpted by aerodynamic necessity. Built for the absolute limit.",
    year: 2026,
    price: 495000,
    bodyType: "Hypercar",
    powertrain: "Twin-Turbo V8 Hybrid",
    transmission: "8-Speed Magnesium Dual-Clutch",
    drivetrain: "AWD",
    fuelType: "Hybrid Petrol",
    featured: true,
    productionLimit: "Limited to 75 Units Worldwide",
    editorialQuote:
      "Every millimeter of carbon skin exists to channel air, cool the twin-turbocharged core, or pin the chassis to the tarmac at 360 km/h.",
    overview:
      "The VELOX Valkyrie Apex is our flagship hypercar—an uncompromising convergence of endurance-racing aerodynamics and high-voltage hybrid propulsion. Engineered around an exposed T1000 carbon-titanium monocoque, it pairs a flat-plane 4.0-liter twin-turbo V8 with an axial-flux front e-axle.",
    engineeringStory:
      "Developed over 1,400 hours inside our computational fluid dynamics tunnel, the Valkyrie Apex eliminates parasitic drag while generating 890 kg of peak downforce via underbody Venturi tunnels and an active hydraulic rear aero-blade.",
    performance: {
      horsepower: 1080,
      torqueNm: 1140,
      zeroToHundred: "2.1 s",
      zeroToTwoHundred: "5.4 s",
      topSpeedKmh: 368,
      weightKg: 1395,
      downforceKg: 890,
      redlineRpm: "9,200 RPM",
    },
    dimensions: {
      lengthMm: 4670,
      widthMm: 2045,
      heightMm: 1135,
      wheelbaseMm: 2710,
      weightDistribution: "42% Front / 58% Rear",
    },
    chassisAndAero: {
      monocoque: "Autoclave-cured Carbon-Titanium Tub with integrated roll structure",
      suspension: "Pushrod-actuated active hydraulic dampers with track-height drop mode",
      brakes: "420mm Front / 390mm Rear Carbon-Silicon-Carbide (CSiC) discs, 6-piston monoblock",
      aerodynamics: "Dual-element active front splitter, Venturi floor, DRS hydraulic rear wing",
      tires: "Pirelli P Zero Trofeo RS — 265/35 ZR20 (F) / 345/30 ZR21 (R)",
    },
    highlights: [
      "1,080 PS combined output from 4.0L flat-plane V8 + dual axial-flux motors",
      "890 kg of active downforce at 280 km/h with automatic Drag Reduction System",
      "Dry weight of 1,395 kg yielding a 774 PS-per-ton power-to-weight ratio",
      "F1-derived steer-by-wire yoke with telemetry HUD projection",
    ],
    exteriorFinish: "Obsidian Matte Stealth with Exposed Forged Carbon & Electric Lime Calipers",
    interiorTrim: "Anthracite Alcantara, Bead-Blasted Titanium & 3D-Printed Lattice Seating",
    images: {
      hero: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=85",
      card: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85",
      editorial: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Valkyrie Apex front three-quarter nocturnal studio view",
          caption: "Low-slung dihedral nose section with integrated laser-matrix headlamps.",
          category: "Exterior",
        },
        {
          url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Valkyrie Apex rear diffuser and active wing profile",
          caption: "Active hydraulic aero-blade and twin top-exit Inconel exhaust outlets.",
          category: "Aerodynamics",
        },
        {
          url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Valkyrie Apex silhouette in dark showroom",
          caption: "Teardrop canopy architecture minimizes wake turbulence at high velocity.",
          category: "Exterior",
        },
        {
          url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Valkyrie Apex carbon wheel and ceramic brake detail",
          caption: "Center-lock forged magnesium wheels housing 420mm carbon-ceramic rotors.",
          category: "Detail",
        },
      ],
    },
  },
  {
    id: "vlx-02",
    slug: "velox-vortex-gt",
    name: "VELOX VORTEX GT",
    codeName: "VX-02 // CONTINENTAL",
    series: "Grand Touring Series",
    tagline: "Continental velocity wrapped in nocturnal architectural calm.",
    year: 2026,
    price: 235000,
    bodyType: "Grand Tourer",
    powertrain: "Full Electric Tri-Motor",
    transmission: "2-Speed Rear Direct-Drive + Front Torque Vectoring",
    drivetrain: "AWD",
    fuelType: "Battery Electric",
    featured: true,
    editorialQuote:
      "Silence is the new luxury of speed. Twelve hundred Newton-meters delivered without a tremor, crossing borders in a single breath.",
    overview:
      "The VELOX Vortex GT redefines the transcontinental grand tourer for the post-combustion era. Built upon our 900-volt structural solid-state battery architecture, it combines brutal tri-motor acceleration with a whisper-quiet, hand-tailored cabin for effortless high-speed cruising.",
    engineeringStory:
      "By integrating the battery cell pack directly into the bonded aluminum-carbon floorpan, the Vortex GT achieves a center of gravity 65mm lower than conventional front-mid-engine GTs, paired with active anti-roll bars that keep the body dead flat through alpine switchbacks.",
    performance: {
      horsepower: 885,
      torqueNm: 1220,
      zeroToHundred: "2.4 s",
      zeroToTwoHundred: "6.8 s",
      topSpeedKmh: 325,
      weightKg: 1940,
      downforceKg: 340,
      rangeKm: 640,
    },
    dimensions: {
      lengthMm: 4920,
      widthMm: 1985,
      heightMm: 1310,
      wheelbaseMm: 2940,
      weightDistribution: "48% Front / 52% Rear",
    },
    chassisAndAero: {
      monocoque: "Bonded Extruded Aluminum & Carbon-Core Structural Battery Platform",
      suspension: "Three-chamber adaptive air suspension with rear-axle steering (4.5°)",
      brakes: "410mm Tungsten-Carbide coated rotors with regenerative blending up to 0.4G",
      aerodynamics: "0.21 Cd ultra-sleek fastback profile with flush active air curtains",
      tires: "Michelin Pilot Sport EV Acoustic — 255/35 R21 (F) / 315/30 R21 (R)",
    },
    highlights: [
      "900V architecture capable of 10% to 80% ultra-fast charge in 14 minutes",
      "Tri-motor torque vectoring processing wheel slip 1,000 times per second",
      "640 km WLTP range with active aero shutters and heat-pump thermal scavenging",
      "Electrochromic panoramic glass roof with bespoke acoustic isolation",
    ],
    exteriorFinish: "Liquid Titanium Metallic with Satin Graphite Aero Blades",
    interiorTrim: "Full-Grain Slate Nappa Leather & Machined Anodized Aluminum",
    images: {
      hero: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=85",
      card: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
      editorial: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Vortex GT dark studio front stance",
          caption: "Razor-thin DRL light signature framing the sealed aerodynamic nose.",
          category: "Exterior",
        },
        {
          url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Vortex GT fastback profile at dusk",
          caption: "Long-hood proportions preserved through front-trunk packaging and compact inverters.",
          category: "Exterior",
        },
        {
          url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Vortex GT minimalist driver cockpit",
          caption: "Driver-focused curved OLED instrument cluster with tactile knurled metal switchgear.",
          category: "Cockpit",
        },
      ],
    },
  },
  {
    id: "vlx-03",
    slug: "velox-kronos-rs",
    name: "VELOX KRONOS RS",
    codeName: "VX-03 // ANALOG PURITY",
    series: "Track Series",
    tagline: "Nine thousand RPM of naturally aspirated mechanical truth.",
    year: 2025,
    price: 289000,
    bodyType: "Track Coupe",
    powertrain: "Naturally Aspirated V10",
    transmission: "7-Speed Sequential-Shift Dual-Clutch",
    drivetrain: "RWD",
    fuelType: "High-Octane Petrol",
    featured: true,
    productionLimit: "Homologation Special — 150 Units",
    editorialQuote:
      "No turbochargers. No hybrid assist. Just a titanium-conrod V10 bolted directly to a carbon bulkhead, screaming to 9,000 RPM.",
    overview:
      "Created for purists who measure performance by throttle linearity and steering feedback, the VELOX Kronos RS channels the raw visceral energy of GT3 endurance machines into a road-legal track coupe. Rear-wheel drive and featherweight construction reward precision driving.",
    engineeringStory:
      "Every gram was interrogated. Polycarbonate rear glazing, a lithium-iron starter battery, titanium exhaust piping, and carbon-kevlar bucket seats strip 145 kg compared to a standard GT coupe, resulting in instantaneous turn-in response.",
    performance: {
      horsepower: 710,
      torqueNm: 650,
      zeroToHundred: "2.8 s",
      zeroToTwoHundred: "7.1 s",
      topSpeedKmh: 334,
      weightKg: 1320,
      downforceKg: 610,
      redlineRpm: "9,000 RPM",
    },
    dimensions: {
      lengthMm: 4580,
      widthMm: 1970,
      heightMm: 1190,
      wheelbaseMm: 2650,
      weightDistribution: "43% Front / 57% Rear",
    },
    chassisAndAero: {
      monocoque: "Carbon-composite tub with integrated chromoly rear subframe",
      suspension: "4-way manually & electronically adjustable coilovers with solid ball-joints",
      brakes: "400mm CCM-R track endurance carbon brakes with cooling ducts",
      aerodynamics: "Swan-neck carbon GT wing, louvered front wheel-arch pressure vents",
      tires: "Michelin Pilot Sport Cup 2 R — 265/35 ZR20 (F) / 325/30 ZR21 (R)",
    },
    highlights: [
      "5.2L Naturally Aspirated V10 with individual throttle bodies & titanium exhaust",
      "Pure Rear-Wheel Drive with mechanical limited-slip differential & 10-stage traction control",
      "Swan-neck rear wing producing 610 kg of track-calibrated downforce",
      "Hydraulic power steering tuned for unfiltered road surface telemetry",
    ],
    exteriorFinish: "Carbon Black with Electric Lime Aero Striping",
    interiorTrim: "Exposed Matte Twill Carbon & Nomex Race Weave with 6-Point Harness Mounts",
    images: {
      hero: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=85",
      card: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85",
      editorial: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Kronos RS front track coupe stance",
          caption: "Aggressive front splitter and fender louvers evacuate high-pressure wheel well air.",
          category: "Exterior",
        },
        {
          url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Kronos RS dark profile view",
          caption: "Short overhangs and rear-biased cabin geometry highlight its mid-engine balance.",
          category: "Aerodynamics",
        },
        {
          url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Kronos RS detail shot",
          caption: "Precision aerodynamic bodywork crafted entirely from pre-preg carbon fiber.",
          category: "Detail",
        },
      ],
    },
  },
  {
    id: "vlx-04",
    slug: "velox-titan-x",
    name: "VELOX TITAN X",
    codeName: "VX-04 // ALL-TERRAIN FORCE",
    series: "Utility Performance Series",
    tagline: "Supercar physics engineered into a commanding four-seat fortress.",
    year: 2026,
    price: 210000,
    bodyType: "Performance SUV",
    powertrain: "Twin-Turbo V8 Hybrid",
    transmission: "8-Speed Torque-Vectoring Automatic",
    drivetrain: "AWD",
    fuelType: "Hybrid Petrol",
    featured: false,
    editorialQuote:
      "Refusing the compromises of utility, the Titan X lowers its air suspension by 55mm at speed to carve corners like a low-slung coupe.",
    overview:
      "The VELOX Titan X brings our unmistakable sharp-edged design language and hybrid V8 firepower to the high-luxury performance SUV segment. Engineered for four adults and their luggage without surrendering sub-3-second acceleration.",
    engineeringStory:
      "Equipped with a 48-volt electromechanical active roll stabilization system and rear-wheel steering, the Titan X neutralizes body roll up to 1.1G of lateral acceleration while offering an acoustic-glass sanctuary inside.",
    performance: {
      horsepower: 790,
      torqueNm: 980,
      zeroToHundred: "2.9 s",
      zeroToTwoHundred: "8.9 s",
      topSpeedKmh: 312,
      weightKg: 2180,
      downforceKg: 280,
      redlineRpm: "7,200 RPM",
    },
    dimensions: {
      lengthMm: 5060,
      widthMm: 2015,
      heightMm: 1610,
      wheelbaseMm: 3005,
      weightDistribution: "51% Front / 49% Rear",
    },
    chassisAndAero: {
      monocoque: "High-strength aluminum spaceframe with carbon roof and tailgate",
      suspension: "Adaptive triple-chamber air springs with 48V active anti-roll bars",
      brakes: "440mm Front Carbon-Ceramic rotors — largest in any production SUV",
      aerodynamics: "Flow-through roof spoiler and active lower intake vanes",
      tires: "Pirelli P Zero Corsa — 285/35 ZR22 (F) / 325/30 ZR22 (R)",
    },
    highlights: [
      "790 PS Plug-in Hybrid V8 with 75 km of silent urban electric capability",
      "440mm 10-piston front carbon-ceramic braking system as standard",
      "Four individual executive bucket seats with rear telemetry & climate console",
      "Variable ride height adjusting across 85mm from Track to Gravel modes",
    ],
    exteriorFinish: "Basalt Gunmetal Satin with Brushed Titanium Trim",
    interiorTrim: "Charcoal Perforated Leather & Open-Pore Smoked Ash Carbon",
    images: {
      hero: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1920&q=85",
      card: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85",
      editorial: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Titan X dark performance SUV",
          caption: "Muscular faceted bodywork with a coupe-like roofline and wide rear haunches.",
          category: "Exterior",
        },
        {
          url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Titan X cockpit view",
          caption: "Commanding driving position with aircraft-inspired toggle controls.",
          category: "Cockpit",
        },
      ],
    },
  },
  {
    id: "vlx-05",
    slug: "velox-aether-ev",
    name: "VELOX AETHER EV",
    codeName: "VX-05 // ZERO-EMISSION HYPER",
    series: "Ultimate Series",
    tagline: "Four independent motors. Instantaneous vectoring at the speed of thought.",
    year: 2026,
    price: 420000,
    bodyType: "Hypercar",
    powertrain: "Quad-Motor Electric",
    transmission: "4x Independent Single-Speed Planetary Gearboxes",
    drivetrain: "AWD",
    fuelType: "Battery Electric",
    featured: false,
    productionLimit: "Limited to 50 Units Worldwide",
    editorialQuote:
      "By assigning an independent inverter and motor to each wheel, Aether bends the laws of cornering yaw before the driver even senses understeer.",
    overview:
      "The VELOX Aether EV is our laboratory on wheels for pure electric hyper-performance. Producing 1,360 horsepower across four independent axial-flux motors, it uses predictive software to apply positive and negative torque to individual wheels in milliseconds.",
    engineeringStory:
      "Cooling an electric hypercar under sustained track load requires radical thinking. The Aether uses dielectric immersion cooling for its battery modules, maintaining optimal thermal output even during consecutive hot laps.",
    performance: {
      horsepower: 1360,
      torqueNm: 1680,
      zeroToHundred: "1.85 s",
      zeroToTwoHundred: "4.6 s",
      topSpeedKmh: 355,
      weightKg: 1780,
      downforceKg: 760,
      rangeKm: 490,
    },
    dimensions: {
      lengthMm: 4695,
      widthMm: 2060,
      heightMm: 1120,
      wheelbaseMm: 2730,
      weightDistribution: "46% Front / 54% Rear",
    },
    chassisAndAero: {
      monocoque: "T1100 Carbon-Fiber Monocoque with integrated structural battery spine",
      suspension: "Fully active predictive electromagnetic damper system",
      brakes: "Electro-hydraulic brake-by-wire with 350 kW regenerative braking recovery",
      aerodynamics: "Sealed flat underfloor with active rear diffuser flaps",
      tires: "Bespoke Bridgestone Potenza Race Compound — 275/35 ZR20 / 335/30 ZR21",
    },
    highlights: [
      "1,360 PS Quad-Motor architecture with 0–100 km/h in 1.85 seconds",
      "Dielectric liquid-immersion battery cooling for repeatable track performance",
      "Independent 4-wheel torque vectoring capable of tank-turn yaw control",
      "350 kW regenerative braking blended seamlessly with carbon-ceramic discs",
    ],
    exteriorFinish: "Cryo Silver Satin with Gloss Carbon Aero Channels",
    interiorTrim: "Recycled Carbon Micro-Suede & Laser-Etched Titanium",
    images: {
      hero: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1920&q=85",
      card: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85",
      editorial: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Aether EV rear three-quarter view",
          caption: "Sculpted rear air channels exit through the full-width LED blade.",
          category: "Aerodynamics",
        },
        {
          url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Aether EV front studio view",
          caption: "Closed frontal area reduces drag while feeding underbody cooling radiators.",
          category: "Exterior",
        },
      ],
    },
  },
  {
    id: "vlx-06",
    slug: "velox-spectre-gt-s",
    name: "VELOX SPECTRE GT-S",
    codeName: "VX-06 // MIDNIGHT TOURER",
    series: "Grand Touring Series",
    tagline: "Front-mid V8 thunder tailored in a silhouette of pure shadow.",
    year: 2025,
    price: 268000,
    bodyType: "Grand Tourer",
    powertrain: "Twin-Turbo V8 Hybrid",
    transmission: "8-Speed Rear-Transaxle Dual-Clutch",
    drivetrain: "RWD",
    fuelType: "Hybrid Petrol",
    featured: false,
    editorialQuote:
      "A classic long-bonnet silhouette hiding a front-midship V8 and rear transaxle—delivering 49:51 weight balance and timeless presence.",
    overview:
      "For drivers who revere the classic proportions of a long-hood Grand Tourer combined with ferocious hybrid V8 torque, the VELOX Spectre GT-S bridges heritage GT architecture with modern carbon construction.",
    engineeringStory:
      "By mounting the twin-turbo V8 entirely behind the front axle line and placing the 8-speed dual-clutch transaxle with integrated e-motor between the rear wheels, the Spectre GT-S pivots around the driver's hips with telepathic grace.",
    performance: {
      horsepower: 815,
      torqueNm: 940,
      zeroToHundred: "2.7 s",
      zeroToTwoHundred: "6.9 s",
      topSpeedKmh: 340,
      weightKg: 1620,
      downforceKg: 390,
      redlineRpm: "8,000 RPM",
    },
    dimensions: {
      lengthMm: 4760,
      widthMm: 1965,
      heightMm: 1275,
      wheelbaseMm: 2815,
      weightDistribution: "49% Front / 51% Rear",
    },
    chassisAndAero: {
      monocoque: "Bonded carbon-aluminum chassis with carbon-fiber torque tube",
      suspension: "Double-wishbone all around with Bilstein Damptronic Sky adaptive valves",
      brakes: "405mm Carbon-Ceramic discs with 6-piston anodized monoblock calipers",
      aerodynamics: "Deployable rear lip spoiler and front gill vortex generators",
      tires: "Pirelli P Zero — 255/35 ZR20 (F) / 315/30 ZR21 (R)",
    },
    highlights: [
      "Front-midship 4.0L Twin-Turbo V8 paired with carbon-fiber torque tube",
      "Near-perfect 49:51 weight distribution with pure Rear-Wheel Drive dynamics",
      "Deployable speed-sensitive rear spoiler preserving clean stationary lines",
      "Bespoke 1,400W acoustic soundstage or pure V8 mechanical symphony valve mode",
    ],
    exteriorFinish: "Nocturne Black Metallic with Brushed Silver Window Surround",
    interiorTrim: "Obsidian Bridge of Weir Leather & Dark Knurled Ruthenium",
    images: {
      hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85",
      card: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
      editorial: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Spectre GT-S dark profile silhouette",
          caption: "Classic long-bonnet, cab-backward GT architecture sculpted in carbon.",
          category: "Exterior",
        },
        {
          url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85",
          alt: "VELOX Spectre GT-S rear quarter",
          caption: "Muscular rear fenders house 315-section tires and active cooling vents.",
          category: "Exterior",
        },
      ],
    },
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug);
}

export function getFeaturedVehicles(): Vehicle[] {
  return VEHICLES.filter((v) => v.featured);
}

export function getRelatedVehicles(currentSlug: string, limit = 2): Vehicle[] {
  const current = getVehicleBySlug(currentSlug);
  if (!current) return VEHICLES.slice(0, limit);
  const sameCategory = VEHICLES.filter(
    (v) => v.slug !== currentSlug && v.bodyType === current.bodyType
  );
  const others = VEHICLES.filter(
    (v) => v.slug !== currentSlug && v.bodyType !== current.bodyType
  );
  return [...sameCategory, ...others].slice(0, limit);
}
