"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { STEPS } from "@/lib/data";
import { SectionHeading, LimeButton } from "./ui/Bits";

export default function HowWeWork() {
  return (
    <section id="process" className="section-pad bg-beige">
      <div className="container-x">
        <SectionHeading eyebrow="Quality Assurance" title="Verified Through Testing" />

        <div className="mt-20 flex flex-col gap-6">
          {STEPS.map((s, i) => (
            <div key={s.id} className="sticky" style={{ top: `${110 + i * 16}px` }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6 rounded-[34px] bg-beige p-3 lg:grid-cols-2 lg:gap-8"
              >
                {/* image */}
                <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] lg:aspect-auto">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width:1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-[1.4s] ease-smooth hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-wider text-navy backdrop-blur">
                    {s.id}
                  </span>
                </div>

                {/* navy content card */}
                <div className="flex flex-col rounded-[28px] bg-navy p-8 text-ivory lg:p-11">
                  <h3 className="font-serif text-3xl text-ivory lg:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-ivory/70">{s.desc}</p>

                  <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-ivory/60">
                    Checked At This Stage:
                  </p>
                  <ul className="mt-4 rounded-2xl border border-white/10">
                    {s.points.map((pt, idx) => (
                      <li
                        key={pt}
                        className={`flex items-center gap-3 px-5 py-4 text-[15px] text-ivory/90 ${
                          idx !== s.points.length - 1 ? "border-b border-white/10" : ""
                        }`}
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-lime text-navy">
                          <FaCheck size={9} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9">
                    <LimeButton href="#verify">View Lab Reports</LimeButton>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
