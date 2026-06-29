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
  hero: "/images/hero-new.jpeg",
  heroVid1:
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
  heroVid2:
    "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&w=800&q=80",
  aboutA: "/images/about1.jpeg",
  aboutB: "/images/about2.jpeg",

  // Real Vora Labs product imagery (saved locally in /public/images/products)
  tirz: "/images/products/tirzepatide.jpeg",
  reta20: "/images/products/retatrutide-20.jpeg",
  reta40: "/images/products/retatrutide-40.jpeg",
  glow: "/images/products/glow.jpeg",
  bpc: "/images/products/bpc.jpeg",
  nad: "/images/products/nad.jpeg",
  app: `${ALLUVI}/Holding-iPhone_1Holding-iPhone.webp`,

  work1:
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1100&q=80",
  work2:
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1100&q=80",
  work3:
    "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&w=1100&q=80",
  work4:
    "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1100&q=80",
  fac1: "/images/Synthesis.jpeg",
  fac2: "/images/fill.jpeg",
  fac3: "/images/hplc.jpeg",
  fac4: "/images/coldchain.jpeg",
  fac5: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1000&q=80",
  fac6: "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&w=1000&q=80",
  blog1:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  blog2:
    "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=900&q=80",
  blog3:
    "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=900&q=80",
  cta: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1600&q=80",
  team1:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",
  team2:
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80",
  team3:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80",
};

export const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
];

// Research compounds (Products section — sticky stacking cards)
export const PRODUCTS = [
  {
    id: "RP 01",
    title: "Tirzepatide 40mg",
    price: "£100",
    img: IMG.tirz,
    tags: ["99%+ Purity", "Janoshik Tested", "Cold Chain", "R&D Only"],
  },
  {
    id: "RP 02",
    title: "Retatrutide 20mg",
    price: "£100",
    img: IMG.reta20,
    tags: ["99%+ Purity", "HPLC Verified", "Pre-Filled Pen", "R&D Only"],
  },
  {
    id: "RP 03",
    title: "Retatrutide 40mg",
    price: "£180",
    img: IMG.reta40,
    tags: ["High Concentration", "56-Day Stability", "Janoshik Tested", "R&D Only"],
  },
  {
    id: "RP 04",
    title: "BPC-157 & TB-500 40mg",
    price: "£130",
    img: IMG.bpc,
    tags: ["Dual Compound", "Recovery Blend", "COA Provided", "R&D Only"],
  },
  {
    id: "RP 05",
    title: "Glow 70mg",
    price: "£100",
    img: IMG.glow,
    tags: ["Multi-Peptide", "Batch Traceable", "Cold Chain", "R&D Only"],
  },
  {
    id: "RP 06",
    title: "NAD+ 1,000mg",
    price: "£140",
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
    title: "Cold Chain Delivery",
    desc: "Temperature-controlled handling from fill to dispatch keeps purity, potency and pH intact in transit.",
  },
  {
    title: "Pen Stability",
    desc: "Our in-house solution process holds purity for 56 days at room temperature — far beyond ordinary vials.",
  },
  {
    title: "Tracked UK Shipping",
    desc: "Discreet, fully tracked dispatch across the UK with batch-level traceability on every order.",
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
    desc: "Our own solution process fills each pen to a precise concentration inside a controlled environment built to protect the compound.",
    img: IMG.work2,
    points: [
      "Exact concentration per pen",
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
    price: "£100",
    img: IMG.reta20,
    popular: false,
    features: ["Janoshik COA", "99%+ verified purity", "Cold chain dispatch", "Tracked UK shipping"],
  },
  {
    n: "2",
    name: "BPC-157 & TB-500 40mg",
    desc: "Recovery & repair research blend.",
    price: "£130",
    img: IMG.bpc,
    popular: true,
    features: [
      "Dual-compound pen",
      "56-day pen stability",
      "Independent verification",
      "Priority dispatch",
    ],
  },
  {
    n: "3",
    name: "Retatrutide 40mg",
    desc: "Extended research quantity.",
    price: "£180",
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
    avatar: AVATARS[3],
    quote:
      "Easily the best supplier I've ordered from. The COA matched what arrived, packaging was discreet, and it landed in two days. I've already placed my third order.",
    tags: ["COA Matched", "Fast Delivery", "Discreet", "Reordered"],
  },
  {
    name: "Sophie M.",
    sub: "Returning Client",
    avatar: AVATARS[0],
    quote:
      "I was nervous ordering online but Vora Labs made it simple. Tracking updates the whole way, cold-chain packaging intact, and the pen quality is genuinely premium.",
    tags: ["Great Tracking", "Cold Chain", "Premium Pen", "Trusted"],
  },
  {
    name: "James T.",
    sub: "Verified Buyer",
    avatar: AVATARS[3],
    quote:
      "Every batch comes with a Janoshik certificate I can actually verify myself. That transparency is why I keep coming back — no other supplier comes close.",
    tags: ["Verifiable COA", "Transparent", "Consistent", "Loyal"],
  },
  {
    name: "Aisha K.",
    sub: "Verified Buyer",
    avatar: AVATARS[1],
    quote:
      "Ordering, payment and delivery were all smooth. Customer support answered within the hour and the purity was exactly as listed. Couldn't ask for more.",
    tags: ["Smooth Order", "Quick Support", "Accurate", "Recommended"],
  },
  {
    name: "Marcus L.",
    sub: "Returning Client",
    avatar: AVATARS[2],
    quote:
      "Five orders in and the quality has never dropped. Same purity, same fast UK shipping every time. Vora Labs has become my go-to supplier without question.",
    tags: ["Consistent", "Fast UK Shipping", "Reliable", "Go-To"],
  },
  {
    name: "Elena V.",
    sub: "Verified Buyer",
    avatar: AVATARS[0],
    quote:
      "Brilliant from start to finish. Clear product info, sealed cold-chain delivery, and the batch details on everything. Honestly the most professional service I've used.",
    tags: ["Clear Info", "Sealed Delivery", "Batch Details", "Professional"],
  },
];

// Capabilities (Facilities)
export const FACILITIES = [
  { n: "01", title: "Synthesis Suite", img: IMG.fac1 },
  { n: "02", title: "Fill & Finish", img: IMG.fac2 },
  { n: "03", title: "HPLC Analytics", img: IMG.fac3 },
  { n: "04", title: "Cold Chain Storage", img: IMG.fac4 },
  { n: "05", title: "Stability Testing", img: IMG.fac5 },
  { n: "06", title: "Dispatch & Logistics", img: IMG.fac6 },
];

// Scientific team
export const TEAM = [
  { name: "Dr. Naomi Reardon", role: "Head of Synthesis", img: IMG.team1 },
  { name: "Dr. Idris Bahri", role: "QA & Analytics Lead", img: IMG.team2 },
  { name: "Julian Marsh", role: "Cold Chain & Logistics", img: IMG.team3 },
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
    title: "Cold Chain: Protecting Peptide Integrity In Transit",
    author: "Julian Marsh",
    date: "Jan 09, 2026",
    category: "Logistics",
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
    q: "How are orders shipped and tracked?",
    a: "We dispatch discreetly across the UK with fully tracked, temperature-controlled cold-chain handling. A tracking reference is shared as soon as your order leaves the lab.",
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
  "Cold Chain Delivery",
  "Tracked UK Shipping",
  "Certificate of Analysis",
  "HPLC Verified",
  "Batch Traceability",
  "Discreet Packaging",
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
    { label: "Shipping Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Certificate of Analysis", href: "/#verify" },
    { label: "Wholesale Enquiries", href: "/#footer" },
  ],
};
