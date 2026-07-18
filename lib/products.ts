// Single source of truth for Vora Labs research products.
// FOR LABORATORY RESEARCH & DEVELOPMENT USE ONLY — NOT FOR HUMAN OR VETERINARY CONSUMPTION.

export type LabAnalyte = {
  compound: string;
  concentration: string; // e.g. "16.83 mg/mL"
  verifiedContent: string; // e.g. "40.39 mg"
};

export type Product = {
  slug: string;
  id: string; // display label e.g. "RP 01"
  name: string;
  price: number; // USD
  priceLabel: string; // "$129.00"
  image: string;
  gallery: string[];
  category: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  tags: string[];
  // Janoshik third-party lab analysis panel
  batchNumber: string;
  fillVolume: string; // "2.4 mL"
  purity: string; // "99.24%"
  analytes: LabAnalyte[];
  janoshikUrl?: string;
  janoshikSamples?: string[];
  // Info tabs
  packageContents: string[];
  storageLogic: string;
  supplyChain: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "tirzepatide-40mg",
    id: "RP 01",
    name: "Tirzepatide 40mg",
    price: 129,
    priceLabel: "$129.00",
    image: "/images/products/tirzepatide.jpeg",
    gallery: [
      "/images/products/tirzepatide.jpeg",
      "/images/products/tirzepatide-2.jpeg",
      "/images/products/tirzepatide-3.jpeg",
      "/images/products/tirzepatide-4.jpeg",
    ],
    category: "GLP-1 / GIP",
    tagline: "Dual agonist of GLP-1 & GIP receptors, pre-filled for research.",
    description:
      "Vora Labs Tirzepatide 40mg is supplied in a pre-filled precision format at exact concentration, HPLC analysed and independently verified through Janoshik before release. Produced exclusively for controlled laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Concentration", value: "40 mg · 4 doses of 10 mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["99%+ Purity", "Janoshik Tested", "HPLC Verified", "R&D Only"],
    batchNumber: "VRA-TRZ-40-2601",
    fillVolume: "2.4 mL",
    purity: "99.24%",
    analytes: [
      { compound: "Tirzepatide", concentration: "16.83 mg/mL", verifiedContent: "40.39 mg" },
    ],
    janoshikUrl: "/certificates/tirzepatide-40mg/report.png",
    janoshikSamples: [
      "/certificates/tirzepatide-40mg/sample-1.jpg",
      "/certificates/tirzepatide-40mg/sample-2.jpg",
      "/certificates/tirzepatide-40mg/sample-3.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (40 mg Tirzepatide, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "retatrutide-20mg",
    id: "RP 02",
    name: "Retatrutide 20mg",
    price: 129,
    priceLabel: "$129.00",
    image: "/images/products/retatrutide-20.jpeg",
    gallery: [
      "/images/products/retatrutide-20.jpeg",
      "/images/products/retatrutide-20-2.jpeg",
      "/images/products/retatrutide-20-3.jpeg",
      "/images/products/retatrutide-20-4.jpeg",
    ],
    category: "GLP-1 / GIP / Glucagon",
    tagline: "Triple agonist research compound in an entry research quantity.",
    description:
      "Vora Labs Retatrutide 20mg is filled to precise concentration in a pre-filled research format, then HPLC analysed and independently certified. Every batch is released with a verifiable certificate of analysis for controlled R&D programmes.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Concentration", value: "20 mg · 4 doses of 5 mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["99%+ Purity", "HPLC Verified", "Pre-Filled Format", "R&D Only"],
    batchNumber: "VRA-RTA-20-2602",
    fillVolume: "2.4 mL",
    purity: "99.18%",
    analytes: [
      { compound: "Retatrutide", concentration: "8.42 mg/mL", verifiedContent: "20.21 mg" },
    ],
    janoshikUrl: "/certificates/retatrutide-20mg/report.png",
    janoshikSamples: [
      "/certificates/retatrutide-20mg/sample-1.jpg",
      "/certificates/retatrutide-20mg/sample-2.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (20 mg Retatrutide, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "retatrutide-40mg",
    id: "RP 03",
    name: "Retatrutide 40mg",
    price: 229,
    priceLabel: "$229.00",
    image: "/images/products/retatrutide-40.jpeg",
    gallery: [
      "/images/products/retatrutide-40.jpeg",
      "/images/products/retatrutide-40-2.jpeg",
      "/images/products/retatrutide-40-3.jpeg",
      "/images/products/retatrutide-40-4.jpeg",
    ],
    category: "GLP-1 / GIP / Glucagon",
    tagline: "Extended research quantity at the highest fill concentration.",
    description:
      "Vora Labs Retatrutide 40mg is our highest-concentration triple-agonist research format — validated for 56-day room-temperature stability and independently verified through Janoshik with full batch traceability.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Concentration", value: "40 mg · 4 doses of 10 mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["High Concentration", "56-Day Stability", "Janoshik Tested", "R&D Only"],
    batchNumber: "VRA-RTA-40-2603",
    fillVolume: "2.4 mL",
    purity: "99.31%",
    analytes: [
      { compound: "Retatrutide", concentration: "16.87 mg/mL", verifiedContent: "40.49 mg" },
    ],
    janoshikUrl: "/certificates/retatrutide-40mg/report.png",
    janoshikSamples: [
      "/certificates/retatrutide-40mg/sample-1.jpg",
      "/certificates/retatrutide-40mg/sample-2.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (40 mg Retatrutide, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "bpc-157-tb-500-40mg",
    id: "RP 04",
    name: "BPC-157 & TB-500 40mg",
    price: 169,
    priceLabel: "$169.00",
    image: "/images/products/bpc.jpeg",
    gallery: [
      "/images/products/bpc.jpeg",
      "/images/products/bpc-2.jpeg",
      "/images/products/bpc-3.jpeg",
      "/images/products/bpc-4.jpeg",
    ],
    category: "Recovery & Repair",
    tagline: "Dual-compound recovery & repair research blend.",
    description:
      "Vora Labs BPC-157 & TB-500 40mg combines two research peptides in a single pre-filled research format, formulated in a controlled environment and independently certified. Supplied strictly for laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Blend", value: "BPC-157 & TB-500 · 40 mg total" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["Dual Compound", "Recovery Blend", "COA Provided", "R&D Only"],
    batchNumber: "VRA-BPC-40-2604",
    fillVolume: "2.4 mL",
    purity: "99.12%",
    analytes: [
      { compound: "BPC-157", concentration: "8.34 mg/mL", verifiedContent: "20.02 mg" },
      { compound: "TB-500", concentration: "8.36 mg/mL", verifiedContent: "20.06 mg" },
    ],
    janoshikUrl: "/certificates/bpc-157-tb-500-40mg/report.png",
    janoshikSamples: [
      "/certificates/bpc-157-tb-500-40mg/sample-1.jpg",
      "/certificates/bpc-157-tb-500-40mg/sample-2.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (BPC-157 20 mg + TB-500 20 mg, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "glow-70mg",
    id: "RP 05",
    name: "Glow 70mg",
    price: 129,
    priceLabel: "$129.00",
    image: "/images/products/glow.jpeg",
    gallery: [
      "/images/products/glow.jpeg",
      "/images/products/glow-2.jpeg",
      "/images/products/glow-3.jpeg",
      "/images/products/glow-4.jpeg",
    ],
    category: "GHK-Cu Blend",
    tagline: "Multi-peptide GHK-Cu research blend for skin & repair study.",
    description:
      "Vora Labs Glow 70mg is a multi-peptide GHK-Cu research blend (BPC-157 / TB-500 / GHK-Cu) supplied in a pre-filled research format with full batch traceability and an independent certificate of analysis.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Blend", value: "BPC-157 10 mg / TB-500 10 mg / GHK-Cu 50 mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["Multi-Peptide", "Batch Traceable", "HPLC Verified", "R&D Only"],
    batchNumber: "VRA-GLW-70-2605",
    fillVolume: "2.4 mL",
    purity: "99.08%",
    analytes: [
      { compound: "BPC-157", concentration: "4.18 mg/mL", verifiedContent: "10.03 mg" },
      { compound: "TB-500", concentration: "4.19 mg/mL", verifiedContent: "10.06 mg" },
      { compound: "GHK-Cu", concentration: "20.91 mg/mL", verifiedContent: "50.18 mg" },
    ],
    janoshikUrl: "/certificates/glow-70mg/report.png",
    janoshikSamples: [
      "/certificates/glow-70mg/sample-1.jpg",
      "/certificates/glow-70mg/sample-2.jpg",
    ],
    packageContents: [
      "Pre-filled research pen (BPC-157 10 mg / TB-500 10 mg / GHK-Cu 50 mg, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
  {
    slug: "nad-1000mg",
    id: "RP 06",
    name: "NAD+ 1,000mg",
    price: 179,
    priceLabel: "$179.00",
    image: "/images/products/nad.jpeg",
    gallery: [
      "/images/products/nad.jpeg",
      "/images/products/nad-2.jpeg",
      "/images/products/nad-3.jpeg",
      "/images/products/nad-4.jpeg",
    ],
    category: "Cellular Research",
    tagline: "High-dose NAD+ for cellular repair & anti-aging research.",
    description:
      "Vora Labs NAD+ 1,000mg is a high-dose research compound supplied in a pre-filled research format, HPLC verified and independently certified for controlled cellular research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled research pen (2.4 mL)" },
      { label: "Concentration", value: "1,000 mg · 100 mg per dose" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
    ],
    tags: ["High Dose", "Cellular Research", "HPLC Verified", "R&D Only"],
    batchNumber: "VRA-NAD-1K-2606",
    fillVolume: "2.4 mL",
    purity: "99.02%",
    analytes: [
      { compound: "NAD+", concentration: "418.75 mg/mL", verifiedContent: "1,005.0 mg" },
    ],
    janoshikUrl: "",
    packageContents: [
      "Pre-filled research pen (1,000 mg NAD+, 2.4 mL fill)",
      "Batch-referenced Janoshik certificate reference card",
      "Research handling & storage sheet",
    ],
    storageLogic:
      "Store refrigerated at 2–8°C for long-term stability. The formulation is validated to hold verified purity and pH for 56 days at controlled room temperature during active research use. Protect from direct light and avoid freeze/thaw cycles.",
    supplyChain:
      "Synthesised to specification, filled in a controlled environment, HPLC analysed in-house, then independently verified by Janoshik before release. Every unit is batch-referenced end-to-end and released only after passing identity, purity and appearance criteria.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, count);
}
