// Centralised content for the Vora Labs research-peptides site.
// FOR LABORATORY RESEARCH & DEVELOPMENT USE ONLY — NOT FOR HUMAN OR VETERINARY CONSUMPTION.

export const COMPLIANCE =
  "For laboratory research & development use only · Not for human or veterinary consumption";

export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why" },
  { label: "Testimonial", href: "#verify" },
  { label: "Contact", href: "#footer" },
];

const ALLUVI = "https://alluvi.bz/images";

export const IMG = {
  hero: "/images/update-img/updated.webp",
  heroVid1:
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
  heroVid2:
    "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&w=800&q=80",
  aboutA: "/images/update-img/verified-seo.webp",
  aboutB: "/images/update-img/room-temp-seo.webp",

  // Real Vora Labs product imagery (saved locally in /public/images/products)
  tirz: "/images/products/tirzepatide.jpeg",
  reta20: "/images/products/retatrutide-20.jpeg",
  reta40: "/images/products/retatrutide-40.jpeg",
  glow: "/images/products/glow.jpeg",
  bpc: "/images/products/bpc.jpeg",
  nad: "/images/products/nad.jpeg",
  app: `${ALLUVI}/Holding-iPhone_1Holding-iPhone.webp`,

  work1: "/images/update-img/synthesis-seo.webp",
  work2: "/images/update-img/02-option-2.png",
  work3: "/images/update-img/03-option-3.png",
  work4: "/images/update-img/verified-seo.webp",
  fac1: "/images/update-img/synthesis-seo.webp",
  fac2: "/images/update-img/fill-seo.webp",
  fac3: "/images/update-img/hplc-seo.webp",
  fac4: "/images/update-img/chain-storage.png",
  fac5: "/images/update-img/stability-seo.webp",
  fac6: "/images/update-img/dispatch-seo.webp",
  blog1:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  blog2:
    "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=900&q=80",
  blog3:
    "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=900&q=80",
  cta: "/images/update-img/compound-seo.webp",
  team1: "/images/update-img/team1-seo.webp",
  team2: "/images/update-img/team2-seo.webp",
  team3: "/images/update-img/team3-seo.webp",
};

export const AVATARS = [
  "/images/update-img/testimonial-1-seo.webp",
  "/images/update-img/testimonial-2-seo.webp",
  "/images/update-img/testimonial-3-seo.webp",
];

// Research compounds (Products section — sticky stacking cards)
export const PRODUCTS = [
  {
    id: "RP 01",
    title: "Tirzepatide 40mg",
    price: "$129.00",
    img: IMG.tirz,
    tags: ["99%+ Purity", "Janoshik Tested", "HPLC Verified", "R&D Only"],
  },
  {
    id: "RP 02",
    title: "Retatrutide 20mg",
    price: "$129.00",
    img: IMG.reta20,
    tags: ["99%+ Purity", "HPLC Verified", "Pre-Filled Pen", "R&D Only"],
  },
  {
    id: "RP 03",
    title: "Retatrutide 40mg",
    price: "$229.00",
    img: IMG.reta40,
    tags: ["High Concentration", "56-Day Stability", "Janoshik Tested", "R&D Only"],
  },
  {
    id: "RP 04",
    title: "BPC-157 & TB-500 40mg",
    price: "$169.00",
    img: IMG.bpc,
    tags: ["Dual Compound", "Recovery Blend", "COA Provided", "R&D Only"],
  },
  {
    id: "RP 05",
    title: "Glow 70mg",
    price: "$129.00",
    img: IMG.glow,
    tags: ["Multi-Peptide", "Batch Traceable", "HPLC Verified", "R&D Only"],
  },
  {
    id: "RP 06",
    title: "NAD+ 1,000mg",
    price: "$179.00",
    img: IMG.nad,
    tags: ["High Dose", "Cellular Research", "HPLC Verified", "R&D Only"],
  },
];

// Why Vora Labs (Benefits)
export const BENEFITS = [
  {
    title: "Independent Testing",
    desc: "Every batch is HPLC analysed through Janoshik before release, with a certificate of analysis you can verify yourself.",
  },
  {
    title: "Batch Traceability",
    desc: "Each unit carries a unique batch reference tied to its own Janoshik certificate and Certificate of Analysis.",
  },
  {
    title: "Formulation Stability",
    desc: "Our in-house solution process holds verified purity and pH for 56 days at controlled room temperature.",
  },
  {
    title: "Quality Assurance",
    desc: "Multi-stage QA covers identity, purity, potency and stability against a defined specification on every release.",
  },
];

// Quality Assurance Protocol (process steps)
export const STEPS = [
  {
    id: "STEP 01",
    title: "Synthesis & Sourcing",
    desc: "Research-grade APIs are synthesised and sourced to strict specification, then logged with full batch traceability from day one.",
    img: IMG.work1,
    points: [
      "APIs sourced to exact specification",
      "Full batch traceability recorded",
      "Identity confirmed before fill",
    ],
  },
  {
    id: "STEP 02",
    title: "Fill & Formulation",
    desc: "Our own solution process fills each research format to a precise concentration inside a controlled environment built to protect the compound.",
    img: IMG.work2,
    points: [
      "Exact concentration per unit",
      "Controlled fill environment",
      "Target pH locked in",
    ],
  },
  {
    id: "STEP 03",
    title: "Purity & Potency Analysis",
    desc: "Analytical HPLC testing confirms purity percentage and verified content before any batch is approved for release.",
    img: IMG.work3,
    points: [
      "HPLC purity confirmed",
      "Verified content measured",
      "Batch approved only on pass",
    ],
  },
  {
    id: "STEP 04",
    title: "Independent Verification",
    desc: "Representative samples are sent to Janoshik for independent certification, and every certificate of analysis is published.",
    img: IMG.work4,
    points: [
      "Independent Janoshik testing",
      "Certificate of analysis issued",
      "Results published for verification",
    ],
  },
];

// Wholesale & supply (Pricing)
export const PRICING = [
  {
    n: "1",
    name: "Retatrutide 20mg",
    desc: "Entry research quantity.",
    price: "$129.00",
    img: IMG.reta20,
    popular: false,
    features: ["Janoshik COA", "99%+ verified purity", "Batch traceability", "Independent verification"],
  },
  {
    n: "2",
    name: "BPC-157 & TB-500 40mg",
    desc: "Recovery & repair research blend.",
    price: "$169.00",
    img: IMG.bpc,
    popular: true,
    features: [
      "Dual-compound formulation",
      "56-day formulation stability",
      "Independent verification",
      "Priority release",
    ],
  },
  {
    n: "3",
    name: "Retatrutide 40mg",
    desc: "Extended research quantity.",
    price: "$229.00",
    img: IMG.reta40,
    popular: false,
    features: [
      "Highest fill concentration",
      "Batch traceability",
      "Certificate of analysis",
      "Wholesale rates available",
    ],
  },
];

// Verification / researcher notes (Testimonials)
export const TESTIMONIALS = [
  {
    name: "Daniel R.",
    sub: "Verified Buyer",
    avatar: AVATARS[0],
    quote:
      "Easily the best supplier I've ordered from. The COA matched what arrived and the batch number lined up exactly. I've already placed my third order.",
    tags: ["COA Matched", "Batch Verified", "Trusted", "Reordered"],
  },
  {
    name: "Sophie M.",
    sub: "Returning Client",
    avatar: AVATARS[1],
    quote:
      "I was nervous ordering online but Vora Labs made it simple. The formulation quality is genuinely premium and every batch reference checks out.",
    tags: ["Batch Verified", "Premium Formulation", "Trusted", "Consistent"],
  },
  {
    name: "James T.",
    sub: "Verified Buyer",
    avatar: AVATARS[2],
    quote:
      "Every batch comes with a Janoshik certificate I can actually verify myself. That transparency is why I keep coming back — no other supplier comes close.",
    tags: ["Verifiable COA", "Transparent", "Consistent", "Loyal"],
  },
  {
    name: "Aisha K.",
    sub: "Verified Buyer",
    avatar: AVATARS[0],
    quote:
      "Ordering was smooth and the purity was exactly as listed on the certificate. Customer support answered within the hour. Couldn't ask for more.",
    tags: ["Smooth Order", "Quick Support", "Accurate", "Recommended"],
  },
  {
    name: "Marcus L.",
    sub: "Returning Client",
    avatar: AVATARS[1],
    quote:
      "Five orders in and the quality has never dropped. Same purity, same verified batch every time. Vora Labs has become my go-to supplier without question.",
    tags: ["Consistent", "Batch Verified", "Reliable", "Go-To"],
  },
  {
    name: "Elena V.",
    sub: "Verified Buyer",
    avatar: AVATARS[2],
    quote:
      "Brilliant from start to finish. Clear product information, batch details on everything and full COA transparency. The most professional service I've used.",
    tags: ["Clear Info", "COA Transparent", "Batch Details", "Professional"],
  },
];

// Capabilities (Facilities)
export const FACILITIES = [
  { n: "01", title: "Synthesis Suite", img: IMG.fac1 },
  { n: "02", title: "Fill & Finish", img: IMG.fac2 },
  { n: "03", title: "HPLC Analytics", img: IMG.fac3 },
  { n: "04", title: "Controlled Storage", img: IMG.fac4 },
  { n: "05", title: "Stability Testing", img: IMG.fac5 },
  { n: "06", title: "Batch Release", img: IMG.fac6 },
];

// Scientific team
export const TEAM = [
  { name: "Dr. Naomi Reardon", role: "Head of Synthesis", img: IMG.team1 },
  { name: "Dr. Idris Bahri", role: "QA & Analytics Lead", img: IMG.team2 },
  { name: "Julian Marsh", role: "Batch Release & Traceability", img: IMG.team3 },
];

// Research & insights (Blog)
export const BLOG = [
  {
    title: "Why 56-Day Room-Temperature Stability Actually Matters",
    author: "Dr. Naomi Reardon",
    date: "Feb 04, 2026",
    category: "Stability",
    read: "6 Min",
    img: IMG.blog1,
  },
  {
    title: "How To Read A Janoshik Certificate Of Analysis",
    author: "Dr. Idris Bahri",
    date: "Jan 21, 2026",
    category: "Verification",
    read: "5 Min",
    img: IMG.blog2,
  },
  {
    title: "Batch Traceability: The Backbone Of Research-Grade Peptides",
    author: "Julian Marsh",
    date: "Jan 09, 2026",
    category: "Quality",
    read: "4 Min",
    img: IMG.blog3,
  },
];

export const FAQS = [
  {
    q: "Are these products safe to use on humans?",
    a: "No. Every Vora Labs compound is supplied strictly for laboratory research and in-vitro study. Nothing we sell is intended or approved for human or veterinary consumption.",
  },
  {
    q: "How do I verify a batch's purity?",
    a: "Each compound ships with an independent Janoshik certificate of analysis. You can match the batch number on your order to the published HPLC report at any time.",
  },
  {
    q: "How is authenticity confirmed on each order?",
    a: "Every unit is batch-tracked. Cross-reference the batch number on your product against the published Janoshik certificate and Certificate of Analysis to confirm authenticity at any time.",
  },
  {
    q: "How should research material be stored?",
    a: "Our pen format is validated to hold purity and pH for 56 days at room temperature, with longer life refrigerated. Storage guidance is included with every batch.",
  },
  {
    q: "Do you offer wholesale or bulk supply?",
    a: "Yes. Research groups and labs can request wholesale pricing and scheduled supply. Reach out through the contact section and our team will arrange terms.",
  },
  {
    q: "Does Vora Labs operate on social media?",
    a: "No. Vora Labs never trades on any social platform. Order only through our official site and ignore any social account claiming to represent us.",
  },
];

export const MARQUEE_ITEMS = [
  "Tirzepatide",
  "Retatrutide",
  "BPC-157",
  "TB-500",
  "Glow",
  "NAD+",
  "Janoshik Verified",
];

export const TRUST_ITEMS = [
  "Janoshik Tested",
  "Independent Verification",
  "99%+ Verified Purity",
  "Certificate of Analysis",
  "HPLC Verified",
  "Batch Traceability",
  "Research Grade",
];

export const FOOTER_LINKS = {
  quick: [
    { label: "Home", href: "/#top" },
    { label: "About", href: "/#about" },
    { label: "Products", href: "/#products" },
    { label: "Why Us", href: "/#why" },
    { label: "Testimonials", href: "/#verify" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Cart", href: "/cart" },
    { label: "Contact", href: "/#footer" },
  ],
  utility: [
    { label: "Refund Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Certificate of Analysis", href: "/#verify" },
    { label: "Wholesale Enquiries", href: "/#footer" },
  ],
};
