"use client";

import { motion } from "framer-motion";
import {
  LuBadgeCheck,
  LuSnowflake,
  LuTruck,
  LuFileCheck,
  LuFlaskConical,
  LuScanBarcode,
  LuPackage,
} from "react-icons/lu";
import type { IconType } from "react-icons";

const ITEMS: { label: string; icon: IconType }[] = [
  { label: "Janoshik Tested", icon: LuBadgeCheck },
  { label: "Cold Chain Delivery", icon: LuSnowflake },
  { label: "Tracked UK Shipping", icon: LuTruck },
  { label: "Certificate of Analysis", icon: LuFileCheck },
  { label: "HPLC Verified", icon: LuFlaskConical },
  { label: "Batch Traceability", icon: LuScanBarcode },
  { label: "Discreet Packaging", icon: LuPackage },
];

export default function ClientsBar() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section className="bg-ivory py-14 sm:py-16">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center text-[13px] uppercase tracking-[0.22em] text-navy/45"
        >
          Independently verified &amp; trusted across the research community
        </motion.p>

        <div className="group relative overflow-hidden rounded-[30px] border border-sand bg-beige/70 py-6">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-beige to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-beige to-transparent sm:w-32" />

          <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
            {loop.map((item, i) => {
              const Icon = item.icon;
              return (
                <span
                  key={i}
                  className="flex flex-none items-center gap-2.5 px-7 text-navy/35 transition-colors duration-300 hover:text-navy/70 sm:px-9"
                >
                  <Icon size={26} strokeWidth={1.75} />
                  <span className="whitespace-nowrap text-lg font-semibold tracking-tight sm:text-xl">
                    {item.label}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
