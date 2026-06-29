"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import { SectionHeading } from "./ui/Bits";

export default function Programs() {
  return (
    <section id="products" className="section-pad bg-navy">
      <div className="container-x">
        <SectionHeading eyebrow="Our Products" title="Research Peptides" light />

        <div className="mt-20 flex flex-col gap-6">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className="sticky"
              style={{ top: `${110 + i * 18}px` }}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-center gap-8 rounded-[34px] border border-white/10 bg-navy p-6 shadow-[0_-10px_60px_-30px_rgba(0,0,0,0.6)] lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-10 lg:p-8"
              >
                {/* Left: id + title */}
                <div className="flex min-h-[320px] flex-col justify-between rounded-[26px] border border-white/10 p-7">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-lime/60 px-5 py-2 font-serif text-xl text-lime">
                      {p.id}
                    </span>
                    <span className="h-2.5 w-2.5 flex-none rounded-full bg-lime" />
                    <span className="h-px flex-1 bg-lime/35" />
                  </div>
                  <h3 className="font-serif text-4xl leading-tight text-ivory lg:text-[44px]">
                    {p.name}
                  </h3>
                </div>

                {/* Center: image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[26px]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1.4s] ease-smooth hover:scale-105"
                  />
                </div>

                {/* Right: tags + cta */}
                <div className="flex min-h-[320px] flex-col justify-between">
                  <div>
                    <p className="mb-5 text-ivory/70">Specifications:</p>
                    <div className="flex flex-wrap gap-3">
                      {p.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
                    <span className="font-serif text-3xl text-lime">
                      {p.priceLabel}{" "}
                      <span className="text-base text-ivory/50">GBP</span>
                    </span>
                    <Link
                      href={`/products/${p.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)]"
                    >
                      Explore In Details
                    </Link>
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
