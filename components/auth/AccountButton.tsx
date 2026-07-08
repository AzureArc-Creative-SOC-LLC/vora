"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiUser, FiLogOut, FiPackage, FiGrid } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export default function AccountButton({ dark = false }: { dark?: boolean }) {
  const { user, isAuthenticated, logout } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const btnCls = cn(
    "grid h-11 w-11 place-items-center rounded-full border transition-colors",
    dark
      ? "border-white/20 bg-white/10 text-ivory hover:bg-white/20"
      : "border-navy/15 bg-white text-navy hover:bg-navy hover:text-ivory"
  );

  if (!isAuthenticated || !user) {
    return (
      <Link href="/login" aria-label="Sign in" className={btnCls}>
        <FiUser size={18} />
      </Link>
    );
  }

  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  const doLogout = () => {
    logout();
    setOpen(false);
    toast.success("Signed out.");
    router.push("/");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Account menu"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "grid h-11 w-11 place-items-center rounded-full border text-[15px] font-semibold transition-colors",
          dark
            ? "border-white/20 bg-lime text-navy"
            : "border-navy/15 bg-navy text-ivory hover:bg-navy-muted"
        )}
      >
        {initial}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-60 overflow-hidden rounded-2xl border border-sand bg-white p-2 shadow-[0_30px_80px_-40px_rgba(4,52,96,0.6)]"
          >
            <div className="px-3 py-2.5">
              <p className="text-[13px] text-navy/50">Signed in as</p>
              <p className="truncate font-medium text-navy">{user.name || "Account"}</p>
              <p className="truncate text-[13px] text-navy/55">{user.email}</p>
            </div>
            <div className="my-1 h-px bg-sand" />
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] text-navy transition-colors hover:bg-beige"
            >
              <FiGrid size={16} /> My account
            </Link>
            <Link
              href="/track"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] text-navy transition-colors hover:bg-beige"
            >
              <FiPackage size={16} /> Track an order
            </Link>
            <div className="my-1 h-px bg-sand" />
            <button
              onClick={doLogout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] text-navy transition-colors hover:bg-beige"
            >
              <FiLogOut size={16} /> Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
