"use client";

import { LuLeaf } from "react-icons/lu";
import { MARQUEE_ITEMS } from "@/lib/data";

export default function Marquee() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section className="overflow-hidden bg-beige py-10">
      <div className="flex w-max animate-marquee items-center">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="px-8 font-serif text-4xl text-navy sm:text-6xl">
              {item}
            </span>
            <LuLeaf className="text-navy/40" size={28} />
          </div>
        ))}
      </div>
    </section>
  );
}
