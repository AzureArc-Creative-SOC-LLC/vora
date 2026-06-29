"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Tone = "dark" | "light" | "ivory";

// from = muted/background-blended start colour · to = full text colour
const TONES: Record<Tone, { from: string; to: string }> = {
  dark: { from: "#AEB7C1", to: "#043460" }, // navy text on cream
  light: { from: "#5E7E73", to: "#E1FCAD" }, // lime text on navy
  ivory: { from: "#7C8A97", to: "#FFFBF3" }, // ivory text on dark imagery
};

/**
 * Editorial scroll-driven reveal: text is fully visible from the start in a
 * soft, desaturated tone, then each word sequentially transitions to the full
 * brand colour, opacity and weight as the block scrolls through the viewport —
 * a highlight-as-you-read effect. No vertical movement, fade-up, scale or blur:
 * only colour, opacity and font emphasis change, driven entirely by scroll
 * position (ScrollTrigger scrub) for perfectly fluid motion with Lenis.
 */
export default function ScrollReveal({
  text,
  as: Tag = "p",
  className,
  tone = "dark",
  weightFrom = 400,
  weightTo = 600,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  tone?: Tone;
  weightFrom?: number;
  weightTo?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const { from, to } = TONES[tone] ?? TONES.dark;

      const split = new SplitType(el, { types: "lines,words", tagName: "span" });
      const words = split.words ?? [];
      if (!words.length) return;

      if (prefersReduced) {
        gsap.set(words, { opacity: 1, color: to, fontWeight: weightTo });
        return () => split.revert();
      }

      // Fully visible from the start, but faint & desaturated.
      gsap.set(words, {
        opacity: 0.25,
        color: from,
        fontWeight: weightFrom,
        willChange: "opacity, color",
      });

      // Word-by-word, left-to-right, line-by-line highlight tied to scroll.
      gsap.to(words, {
        opacity: 1,
        color: to,
        fontWeight: weightTo,
        ease: "none",
        duration: 0.5,
        stagger: { each: 0.25, from: "start" },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [text, tone] }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {text}
    </Tag>
  );
}
