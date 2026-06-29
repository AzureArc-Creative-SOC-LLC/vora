"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Cinematic word-by-word reveal with a blur-to-focus transition.
 * Drives headings via SplitType + GSAP ScrollTrigger.
 */
export default function SplitReveal({
  text,
  as: Tag = "h2",
  className,
  trigger = true,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitType(ref.current, {
        types: "lines,words",
        tagName: "span",
      });

      if (prefersReduced) {
        gsap.set(split.words, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set(split.words, {
        yPercent: 115,
        opacity: 0,
        filter: "blur(10px)",
      });

      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.045,
        delay,
        scrollTrigger: trigger
          ? {
              trigger: ref.current,
              start: "top 85%",
            }
          : undefined,
      });

      return () => {
        split.revert();
      };
    },
    { scope: ref, dependencies: [text] }
  );

  return (
    <Tag ref={ref} className={cn("split-words", className)}>
      {text}
    </Tag>
  );
}
