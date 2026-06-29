"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { IMG } from "@/lib/data";
import SplitReveal from "./ui/SplitReveal";
import { LimeButton } from "./ui/Bits";

export default function CTA() {
  return (
    <section className="px-4 py-10 sm:py-12">
      <div className="relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-[34px] sm:rounded-[44px]">
        <Image
          src={IMG.cta}
          alt="Wellness journey"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* floating decorative blobs */}
        <span className="absolute -left-10 top-10 h-40 w-40 animate-floaty rounded-full bg-lime/20 blur-2xl" />
        <span className="absolute bottom-10 right-10 h-52 w-52 animate-floaty rounded-full bg-lime/15 blur-3xl [animation-delay:1.5s]" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-24 text-center sm:py-32 lg:py-40">
          <SplitReveal
            as="h2"
            text="From Compound To Data"
            className="display-1 font-serif text-ivory"
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-lg text-ivory/80"
          >
            Research-grade compounds, independent verification, scheduled supply and
            precision pens — one connected system for controlled R&amp;D.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <LimeButton href="#products">Shop Compounds</LimeButton>
            <a
              href="#footer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-ivory backdrop-blur-sm transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-white/20"
            >
              Talk To Our Team
              <FiArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
