"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiExternalLink } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";

type Props = {
  reportUrl: string;
  productName: string;
  batchNumber: string;
  sampleImages?: string[];
};

export default function JanoshikReportModal({
  reportUrl,
  productName,
  batchNumber,
  sampleImages = [],
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-lime-btn px-6 py-3 text-[14px] font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6]"
      >
        <LuLeaf size={16} />
        View Janoshik Analytical Report
        <FiExternalLink size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Janoshik Analytical Report for ${productName}`}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[92vh] w-full max-w-[880px] flex-col overflow-hidden rounded-[24px] bg-ivory shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex flex-none items-center justify-between gap-4 border-b border-sand bg-white/80 px-5 py-4 sm:px-7">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/50">
                    Janoshik Analytical Report
                  </p>
                  <p className="mt-0.5 truncate font-serif text-lg text-navy sm:text-xl">
                    {productName}
                    <span className="ml-2 text-sm text-navy/50">
                      · {batchNumber}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-10 w-10 flex-none place-items-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:bg-navy hover:text-ivory"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Certificate image + sample photos */}
              <div className="flex-1 overflow-y-auto bg-beige/40 p-4 sm:p-6">
                <div className="mx-auto flex w-full max-w-[720px] flex-col gap-4">
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
                    <Image
                      src={reportUrl}
                      alt={`Janoshik test report for ${productName}`}
                      width={1200}
                      height={1600}
                      className="h-auto w-full"
                      priority
                      unoptimized
                    />
                  </div>

                  {sampleImages.length > 0 && (
                    <>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/50">
                        Attached Sample Photos
                      </p>
                      {sampleImages.map((src, i) => (
                        <div
                          key={src}
                          className="relative overflow-hidden rounded-2xl bg-white shadow-sm"
                        >
                          <Image
                            src={src}
                            alt={`Sample photo ${i + 1} for ${productName}`}
                            width={1200}
                            height={900}
                            className="h-auto w-full"
                            unoptimized
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-none items-center justify-center border-t border-sand bg-white/80 px-5 py-4 sm:px-7">
                <p className="text-[12px] text-navy/55">
                  Independently tested and verified by Janoshik Analytical.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
