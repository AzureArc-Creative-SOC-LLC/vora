"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading } from "./ui/Bits";

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className="flex w-[340px] flex-none flex-col rounded-[28px] border border-sand bg-white p-7 sm:w-[400px]">
      <div className="flex items-center gap-4">
        <span className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
        </span>
        <div>
          <p className="font-semibold text-navy">{t.name},</p>
          <p className="text-[14px] text-navy/55">{t.sub}</p>
        </div>
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-navy/75">“{t.quote}”</p>

      <p className="mt-7 font-serif text-2xl text-navy">Verified Highlights</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {t.tags.map((tag) => (
          <span key={tag} className="chip-lime chip text-center justify-center">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="verify" className="section-pad relative overflow-hidden bg-ivory">
      <div className="absolute inset-0 topo-grid opacity-50" />
      <div className="container-x relative">
        <SectionHeading eyebrow="Verification" title="Trusted Through Testing" />
      </div>

      <div className="group relative mt-16 flex overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ivory to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ivory to-transparent" />

        <div className="flex w-max animate-marquee gap-6 px-3 group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
