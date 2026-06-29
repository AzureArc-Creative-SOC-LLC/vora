"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FACILITIES } from "@/lib/data";
import { Eyebrow } from "./ui/Bits";

// Per-card offsets (lg+) — varied vertical + slight horizontal nudges so every
// card lands in a different, shuffled position as it parallaxes over the title.
const SHUFFLE = [
  "lg:mt-0",
  "lg:mt-[8.5rem] lg:mr-[2.5rem]",
  "lg:mt-[3rem] lg:ml-[3rem]",
  "lg:mt-[11rem]",
  "lg:mt-[1.5rem] lg:ml-[1rem]",
  "lg:mt-[6rem] lg:mr-[3rem]",
];

function Card({ f, i }: { f: (typeof FACILITIES)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group w-full rounded-[22px] bg-white p-2.5 shadow-[0_45px_90px_-55px_rgba(0,0,0,0.8)] lg:max-w-[360px] ${
        i % 2 === 0 ? "lg:justify-self-start" : "lg:justify-self-end"
      } ${SHUFFLE[i % SHUFFLE.length]}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
        <Image
          src={f.img}
          alt={f.title}
          fill
          sizes="(max-width:1024px) 100vw, 360px"
          className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-105"
        />
      </div>
      <div className="px-2.5 pb-1.5 pt-4">
        <p className="font-mono text-[13px] tracking-wider text-navy/55">
          {`{ ${f.n} } —`}
        </p>
        <h3 className="mt-1.5 font-serif text-[22px] leading-tight text-navy">
          {f.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function Facilities() {
  return (
    <section
      id="capabilities"
      className="relative overflow-x-clip bg-navy py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="relative lg:pb-[26vh]">
          {/* Sticky centred title — stays put while the cards scroll over it */}
          <div className="z-0 lg:sticky lg:top-[44vh] lg:h-0">
            <div className="mb-14 flex flex-col items-center gap-6 text-center lg:mb-0 lg:-translate-y-1/2">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="display-2 font-serif text-lime">Inside The Lab</h2>
            </div>
          </div>

          {/* Two edge columns with a wide centre channel for the title */}
          <div className="relative z-10 grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-start lg:gap-x-[14%] lg:gap-y-16 lg:pt-[6vh]">
            {/* render order swaps card 3 (HPLC) to the right column & 4 to the left */}
            {[0, 1, 3, 2, 4, 5].map((idx, i) => (
              <Card key={FACILITIES[idx].n} f={FACILITIES[idx]} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
