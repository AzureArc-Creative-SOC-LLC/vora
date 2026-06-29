"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { FAQS } from "@/lib/data";
import { SectionHeading } from "./ui/Bits";

function Item({
  i,
  q,
  a,
  open,
  onToggle,
}: {
  i: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[22px] border border-sand bg-beige/70 p-2.5"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 rounded-[16px] bg-white px-6 py-5 text-left transition-colors"
      >
        <span className="font-serif text-lg text-navy sm:text-xl">
          {i + 1}. {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid h-8 w-8 flex-none place-items-center rounded-full text-navy"
        >
          <FiChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 py-5 text-[15px] leading-relaxed text-navy/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const left = FAQS.filter((_, i) => i % 2 === 0);
  const right = FAQS.filter((_, i) => i % 2 === 1);

  return (
    <section className="section-pad bg-ivory">
      <div className="container-x">
        <SectionHeading eyebrow="Our FAQ" title="Ask Questions" />

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            {left.map((f, idx) => {
              const realIndex = idx * 2;
              return (
                <Item
                  key={f.q}
                  i={realIndex}
                  q={f.q}
                  a={f.a}
                  open={open === realIndex}
                  onToggle={() => setOpen(open === realIndex ? null : realIndex)}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-5">
            {right.map((f, idx) => {
              const realIndex = idx * 2 + 1;
              return (
                <Item
                  key={f.q}
                  i={realIndex}
                  q={f.q}
                  a={f.a}
                  open={open === realIndex}
                  onToggle={() => setOpen(open === realIndex ? null : realIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
