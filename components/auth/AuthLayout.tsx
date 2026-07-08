"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import BrandLogo from "@/components/ui/BrandLogo";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  note,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  note?: string;
}) {
  return (
    <main className="relative flex min-h-screen flex-col bg-ivory">
      {/* subtle background texture */}
      <div className="pointer-events-none absolute inset-0 topo-grid opacity-60" />

      {/* header */}
      <header className="relative z-10 border-b border-sand/70 bg-ivory/80 backdrop-blur-xl">
        <div className="container-x flex h-20 items-center justify-between">
          <BrandLogo />
          <Link
            href="/"
            className="flex items-center gap-2 text-[15px] font-medium text-navy/70 transition-colors hover:text-navy"
          >
            <FiArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </header>

      {/* centered card */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="rounded-[28px] border border-sand bg-white p-7 shadow-[0_50px_120px_-60px_rgba(4,52,96,0.55)] sm:p-9">
            <h1 className="font-serif text-3xl text-navy sm:text-4xl">{title}</h1>
            <p className="mt-2 text-[15px] text-navy/60">{subtitle}</p>

            <div className="mt-7">{children}</div>
          </div>

          <div className="mt-6 text-center text-[15px] text-navy/65">{footer}</div>

          {note && (
            <p className="mt-4 text-center text-[12px] uppercase tracking-[0.16em] text-navy/40">
              {note}
            </p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
