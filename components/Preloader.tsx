"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuAtom } from "react-icons/lu";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const [done, setDone] = useState(false); // curtains start opening
  const [gone, setGone] = useState(false); // fully unmounted
  const [pct, setPct] = useState(0);

  // progress counter
  useEffect(() => {
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(100, n + Math.floor(Math.random() * 9) + 5);
      setPct(n);
      if (n >= 100) {
        clearInterval(iv);
        setTimeout(() => setDone(true), 380);
      }
    }, 55);
    const safety = setTimeout(() => setDone(true), 3500);
    return () => {
      clearInterval(iv);
      clearTimeout(safety);
    };
  }, []);

  // unmount after the curtain finishes opening
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 1000);
    return () => clearTimeout(t);
  }, [done]);

  // lock scroll while loading
  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] ${done ? "pointer-events-none" : ""}`}
    >
      {/* LEFT curtain panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: done ? "-101%" : 0 }}
        transition={{ duration: 0.95, ease: EASE }}
        className="absolute inset-y-0 left-0 w-[51%] bg-navy"
      />
      {/* RIGHT curtain panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: done ? "101%" : 0 }}
        transition={{ duration: 0.95, ease: EASE }}
        className="absolute inset-y-0 right-0 w-[51%] bg-navy"
      />

      {/* centre content — fades out as the curtains part */}
      <motion.div
        animate={{ opacity: done ? 0 : 1, scale: done ? 0.96 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        {/* faint radial rings */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-[0.12]">
          {[640, 460, 300].map((s) => (
            <span
              key={s}
              className="absolute rounded-full border border-lime"
              style={{ width: s, height: s, maxWidth: "92vw", maxHeight: "92vw" }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center gap-3"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-navy">
            <LuAtom size={26} className="animate-spinslow" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-3xl font-extrabold tracking-tight text-ivory">
              VORA
            </span>
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.36em] text-ivory/55">
              Labs
            </span>
          </span>
        </motion.div>

        <div className="relative mt-12 h-px w-56 overflow-hidden bg-white/15">
          <div
            className="h-full bg-lime transition-[width] duration-100 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="relative mt-5 flex w-56 items-center justify-between text-ivory/60">
          <span className="text-[11px] uppercase tracking-[0.2em]">Loading</span>
          <span className="font-serif text-lg tabular-nums text-ivory">{pct}%</span>
        </div>
      </motion.div>
    </div>
  );
}
