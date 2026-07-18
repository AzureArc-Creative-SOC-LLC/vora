"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = { key: string; label: string; body: React.ReactNode };

export default function ProductInfoTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key ?? "");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product information"
        className="flex flex-wrap gap-2 rounded-full border border-sand bg-white/60 p-1.5"
      >
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.key)}
              className={`relative rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                isActive ? "text-ivory" : "text-navy/70 hover:text-navy"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] leading-relaxed text-navy/75"
          >
            {current.body}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
