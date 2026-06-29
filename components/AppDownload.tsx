"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { IMG } from "@/lib/data";
import SplitReveal from "./ui/SplitReveal";

function StoreButton({
  icon,
  top,
  bottom,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <a
      href="#"
      className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 backdrop-blur transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-white/20"
    >
      <span className="text-2xl text-ivory">{icon}</span>
      <span className="text-left text-ivory">
        <span className="block text-[11px] uppercase tracking-wider text-ivory/60">
          {top}
        </span>
        <span className="block text-[15px] font-semibold">{bottom}</span>
      </span>
    </a>
  );
}

export default function AppDownload() {
  return (
    <section className="section-pad-sm bg-ivory">
      <div className="container-x">
        <div className="relative grid items-center gap-12 overflow-hidden rounded-[36px] bg-navy p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <span className="absolute -right-16 -top-16 h-64 w-64 animate-spinslow rounded-full border border-white/10" />
          <span className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative z-10">
            <span className="mb-5 inline-flex rounded-full bg-lime/15 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-lime">
              Coming Soon
            </span>
            <SplitReveal
              as="h2"
              text="Track, Manage And Optimise Your Research — The Vora Labs R&D Platform"
              className="display-3 max-w-[20ch] font-serif text-ivory"
            />
            <p className="mt-5 max-w-md text-ivory/65">
              Structured data capture, scheduled supply and precision pens in one
              connected system. Join the waitlist for early access.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <StoreButton
                icon={<FaApple />}
                top="Coming soon to"
                bottom="App Store"
              />
              <StoreButton
                icon={<FaGooglePlay />}
                top="Coming soon to"
                bottom="Google Play"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[28px]"
          >
            <Image
              src={IMG.app}
              alt="Wellness app"
              fill
              sizes="(max-width:1024px) 100vw, 40vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
