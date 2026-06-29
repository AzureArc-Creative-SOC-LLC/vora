"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { FiArrowUpRight } from "react-icons/fi";
import { IMG, AVATARS } from "@/lib/data";
import { LimeButton } from "./ui/Bits";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const h1 = root.current?.querySelector("h1");
      let split: SplitType | null = null;

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.35,
      });

      if (h1 && !prefersReduced) {
        split = new SplitType(h1, { types: "lines,words", tagName: "span" });
        gsap.set(split.words, { yPercent: 120, opacity: 0, filter: "blur(12px)" });
        tl.to(split.words, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.25,
          stagger: 0.08,
        });
      }

      // Hero image scale-in
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: prefersReduced ? 1 : 1.12 },
          { scale: 1, duration: 1.8, ease: "power3.out" }
        );
        // Slow parallax drift on scroll
        if (!prefersReduced) {
          gsap.to(imgRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      tl.from(
        ".hero-fade",
        { y: 40, opacity: 0, duration: 1, stagger: 0.14 },
        prefersReduced ? 0 : "-=0.7"
      );

      return () => split?.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="px-2 pt-0 sm:px-4">
      <div className="relative mx-auto min-h-[100svh] w-full max-w-none overflow-hidden rounded-[24px] sm:rounded-[32px]">
        {/* Background image */}
        <div ref={imgRef} className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="People practicing wellness outdoors"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-navy/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1320px] flex-col justify-between px-5 pb-12 pt-32 sm:px-7 sm:pb-24 sm:pt-44">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 self-start rounded-full bg-white/90 py-2.5 pl-3 pr-6 backdrop-blur"
          >
            <div className="flex -space-x-3">
              {AVATARS.map((a, i) => (
                <span
                  key={i}
                  className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"
                >
                  <Image src={a} alt="" fill className="object-cover" sizes="36px" />
                </span>
              ))}
            </div>
            <div className="text-navy">
              <p className="text-[15px] font-semibold leading-tight">1,200+ Labs Supplied</p>
              <p className="text-[12px] uppercase tracking-wider text-navy/70">
                Independently Verified
              </p>
            </div>
          </motion.div>

          {/* Headline block */}
          <div className="mt-auto max-w-5xl">
            <h1 className="display-1 font-serif text-ivory">
              Research Peptides Built On Proof
            </h1>

            <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="hero-fade text-lg text-ivory/85">
                  Vora Labs develops, fills and independently verifies premium
                  research peptides for controlled laboratory R&amp;D.
                </p>
                <div className="hero-fade mt-7 flex flex-wrap items-center gap-3">
                  <LimeButton href="#products">Browse Compounds</LimeButton>
                  <a
                    href="#verify"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-ivory backdrop-blur-sm transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    View Lab Reports
                    <FiArrowUpRight size={16} />
                  </a>
                </div>
                <p className="hero-fade mt-6 text-[12px] uppercase tracking-[0.16em] text-ivory/55">
                  For laboratory R&amp;D use only · Not for human or veterinary
                  consumption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
