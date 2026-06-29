// Single source of truth for Vora Labs research products.
// FOR LABORATORY RESEARCH & DEVELOPMENT USE ONLY — NOT FOR HUMAN OR VETERINARY CONSUMPTION.

export type Product = {
  slug: string;
  id: string; // display label e.g. "RP 01"
  name: string;
  price: number; // GBP
  priceLabel: string; // "£100"
  image: string;
  gallery: string[];
  category: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  tags: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "tirzepatide-40mg",
    id: "RP 01",
    name: "Tirzepatide 40mg",
    price: 100,
    priceLabel: "£100",
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
      "Vora Labs Tirzepatide 40mg is supplied in a pre-filled precision pen at exact concentration, HPLC analysed and independently verified through Janoshik before release. Produced exclusively for controlled laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled pen (2.4ml)" },
      { label: "Concentration", value: "40mg · 4 doses of 10mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
      { label: "Shipping", value: "Tracked, cold-chain UK dispatch" },
    ],
    tags: ["99%+ Purity", "Janoshik Tested", "Cold Chain", "R&D Only"],
  },
  {
    slug: "retatrutide-20mg",
    id: "RP 02",
    name: "Retatrutide 20mg",
    price: 100,
    priceLabel: "£100",
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
      "Vora Labs Retatrutide 20mg is filled to precise concentration in a pre-filled pen, then HPLC analysed and independently certified. Every batch ships with a verifiable certificate of analysis for controlled R&D programmes.",
    specs: [
      { label: "Form", value: "Pre-filled pen (2.4ml)" },
      { label: "Concentration", value: "20mg · 4 doses of 5mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
      { label: "Shipping", value: "Tracked, cold-chain UK dispatch" },
    ],
    tags: ["99%+ Purity", "HPLC Verified", "Pre-Filled Pen", "R&D Only"],
  },
  {
    slug: "retatrutide-40mg",
    id: "RP 03",
    name: "Retatrutide 40mg",
    price: 180,
    priceLabel: "£180",
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
      "Vora Labs Retatrutide 40mg is our highest-concentration triple-agonist research pen — validated for 56-day room-temperature stability and independently verified through Janoshik with full batch traceability.",
    specs: [
      { label: "Form", value: "Pre-filled pen (2.4ml)" },
      { label: "Concentration", value: "40mg · 4 doses of 10mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
      { label: "Shipping", value: "Tracked, cold-chain UK dispatch" },
    ],
    tags: ["High Concentration", "56-Day Stability", "Janoshik Tested", "R&D Only"],
  },
  {
    slug: "bpc-157-tb-500-40mg",
    id: "RP 04",
    name: "BPC-157 & TB-500 40mg",
    price: 130,
    priceLabel: "£130",
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
      "Vora Labs BPC-157 & TB-500 40mg combines two research peptides in a single pre-filled pen, formulated in a controlled environment and independently certified. Supplied strictly for laboratory research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled pen (2.4ml)" },
      { label: "Blend", value: "BPC-157 & TB-500 · 40mg total" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
      { label: "Shipping", value: "Tracked, cold-chain UK dispatch" },
    ],
    tags: ["Dual Compound", "Recovery Blend", "COA Provided", "R&D Only"],
  },
  {
    slug: "glow-70mg",
    id: "RP 05",
    name: "Glow 70mg",
    price: 100,
    priceLabel: "£100",
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
      "Vora Labs Glow 70mg is a multi-peptide GHK-Cu research blend (BPC-157 / TB-500 / GHK-Cu) supplied in a pre-filled pen with full batch traceability and an independent certificate of analysis.",
    specs: [
      { label: "Form", value: "Pre-filled pen (2.4ml)" },
      { label: "Blend", value: "BPC-157 10mg / TB-500 10mg / GHK-Cu 50mg" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
      { label: "Shipping", value: "Tracked, cold-chain UK dispatch" },
    ],
    tags: ["Multi-Peptide", "Batch Traceable", "Cold Chain", "R&D Only"],
  },
  {
    slug: "nad-1000mg",
    id: "RP 06",
    name: "NAD+ 1,000mg",
    price: 140,
    priceLabel: "£140",
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
      "Vora Labs NAD+ 1,000mg is a high-dose research compound supplied in a pre-filled pen, HPLC verified and independently certified for controlled cellular research and in-vitro study.",
    specs: [
      { label: "Form", value: "Pre-filled pen (2.4ml)" },
      { label: "Concentration", value: "1,000mg · 100mg per dose" },
      { label: "Verified Purity", value: "99%+ (HPLC)" },
      { label: "Testing", value: "Janoshik — COA provided" },
      { label: "Storage", value: "2–8°C · 56-day room-temp hold" },
      { label: "Shipping", value: "Tracked, cold-chain UK dispatch" },
    ],
    tags: ["High Dose", "Cellular Research", "HPLC Verified", "R&D Only"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, count);
}
