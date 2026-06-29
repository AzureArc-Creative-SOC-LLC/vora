"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const gallery = images.length ? images : [];
  const [active, setActive] = useState(0);

  return (
    <div className="sticky top-28 flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={gallery[active]}
              alt={alt}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2.5">
          {gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative h-16 w-16 flex-none overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-[72px] sm:w-[72px]",
                active === i
                  ? "border-navy"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt={`${alt} view ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
