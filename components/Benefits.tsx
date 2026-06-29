"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuFlaskConical, LuSnowflake, LuShieldCheck, LuTruck } from "react-icons/lu";
import { BENEFITS } from "@/lib/data";
import { SectionHeading } from "./ui/Bits";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS = [LuShieldCheck, LuSnowflake, LuFlaskConical, LuTruck];

export default function Benefits() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".why-card");
      if (!cards.length) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (prefersReduced || !isDesktop) {
        // Mobile / reduced-motion: simple in-place fade, no pinning.
        gsap.set(cards, { xPercent: 0, opacity: 1 });
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        return;
      }

      // Alternate start side: even cards from the left, odd from the right.
      cards.forEach((c, i) =>
        gsap.set(c, { xPercent: i % 2 === 0 ? -140 : 140, opacity: 0 })
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=" + cards.length * 60 + "%",
          pin: true,
          scrub: 1,
        },
      });

      cards.forEach((c, i) => {
        tl.to(
          c,
          { xPercent: 0, opacity: 1, ease: "power2.out", duration: 1 },
          i
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      id="why"
      ref={root}
      className="relative flex flex-col overflow-hidden bg-ivory py-20 lg:min-h-screen lg:justify-center"
    >
      <div className="absolute inset-0 topo-grid opacity-60" />
      <div className="container-x relative">
        <SectionHeading eyebrow="Why Vora Labs" title="Verified Quality" />

        <div className="relative mt-14">
          {/* Centred round focal graphic — stays put while cards fly in */}
          <div className="pointer-events-none absolute inset-0 z-0 grid place-items-center">
            {[640, 480, 330].map((s) => (
              <span
                key={s}
                className="absolute rounded-full border border-navy/10"
                style={{ width: s, height: s, maxWidth: "90vw", maxHeight: "90vw" }}
              />
            ))}
            <span className="grid h-[92px] w-[92px] place-items-center rounded-full bg-navy text-lime shadow-[0_30px_60px_-30px_rgba(4,52,96,0.6)]">
              <LuFlaskConical size={36} />
            </span>
          </div>

          {/* Cards fly in from the sides, around the round (diagonally staggered) */}
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:items-start lg:gap-x-[42%] lg:gap-y-10">
            {BENEFITS.map((b, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={b.title}
                  className={`why-card rounded-[26px] bg-white p-7 shadow-[0_35px_75px_-45px_rgba(4,52,96,0.5)] ${
                    i % 2 === 1 ? "lg:mt-[7rem]" : ""
                  }`}
                >
                  <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#cdee7a] text-navy">
                    <Icon size={28} />
                  </span>
                  <h3 className="font-serif text-2xl text-navy">{b.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy/70">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
