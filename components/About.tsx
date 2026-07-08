"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuSparkles, LuArrowLeftToLine } from "react-icons/lu";
import { IMG } from "@/lib/data";
import { LimeButton } from "./ui/Bits";
import ScrollReveal from "./ui/ScrollReveal";
import Reveal from "./ui/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = Math.round(obj.v) + suffix;
        },
      });
    },
    { scope: ref }
  );
  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Reveal in deliberate reading order: eyebrow → heading → description → CTA,
      // independent of DOM/column placement.
      const order = [".ab-eyebrow", ".ab-cta"]
        .map((s) => root.current?.querySelector(s))
        .filter(Boolean) as HTMLElement[];
      if (!order.length) return;

      if (prefersReduced) {
        gsap.set(order, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(order, { opacity: 0, y: 42 });
      gsap.to(order, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root }
  );

  return (
    <section id="about" className="section-pad relative overflow-hidden bg-ivory">
      <div ref={root} className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <div className="flex flex-col justify-between gap-12">
            <span className="ab-eyebrow eyebrow self-start">
              <LuSparkles className="text-navy" size={15} />
              About Vora Labs
            </span>

            <div className="flex flex-col items-start gap-8">
              {/* decorative oversized arrow, sat directly above the CTA */}
              <LuArrowLeftToLine
                aria-hidden
                strokeWidth={1.6}
                className="pointer-events-none hidden h-auto w-[clamp(190px,17vw,310px)] select-none text-sand lg:block"
              />

              <div className="ab-cta">
                <LimeButton href="#process">More About Our Process</LimeButton>
              </div>
            </div>
          </div>

          <div>
            <ScrollReveal
              as="h2"
              text="We develop, fill and independently verify premium research compounds, guided entirely by science."
              className="display-2 max-w-[18ch] text-navy"
            />

            <ScrollReveal
              as="p"
              text="Every Vora Labs compound is synthesised, filled and independently verified before it leaves the lab — so each batch arrives with documented purity, potency and stability you can confirm yourself."
              className="mt-7 max-w-xl text-[18px] leading-relaxed"
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              <Reveal className="overflow-hidden rounded-[28px]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px]">
                  <Image
                    src={IMG.aboutA}
                    alt="Mountain yoga"
                    fill
                    sizes="(max-width:768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1.2s] ease-smooth hover:scale-105"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1} className="rounded-[28px] border border-sand bg-white p-9">
                <p className="font-serif text-5xl text-navy sm:text-6xl lg:text-7xl">
                  <Counter to={99} suffix="%" />
                </p>
                <div className="mt-6 h-px w-full bg-sand" />
                <p className="mt-5 text-navy/80">Average Verified Purity</p>
              </Reveal>

              <Reveal delay={0.15} className="rounded-[28px] border border-sand bg-white p-9">
                <p className="font-serif text-5xl text-navy sm:text-6xl lg:text-7xl">
                  <Counter to={56} suffix="" />
                </p>
                <div className="mt-6 h-px w-full bg-sand" />
                <p className="mt-5 text-navy/80">Days Room-Temp Stability</p>
              </Reveal>

              <Reveal delay={0.2} className="overflow-hidden rounded-[28px]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px]">
                  <Image
                    src={IMG.aboutB}
                    alt="Woman enjoying nature"
                    fill
                    sizes="(max-width:768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1.2s] ease-smooth hover:scale-105"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
